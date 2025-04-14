import { google, Auth } from 'googleapis';
import { authenticate } from '@google-cloud/local-auth';
import path from 'path';
import fs from 'fs/promises';

interface EventDetails {
  summary: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
}

interface Credentials {
  type: string;
  client_id: string;
  client_secret: string;
  refresh_token: string;
}

const SCOPES = ['https://www.googleapis.com/auth/calendar'];
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

async function loadSavedCredentialsIfExist(): Promise<Auth.OAuth2Client | null> {
  try {
    const content = await fs.readFile(TOKEN_PATH, 'utf-8');
    const credentials: Credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials) as Auth.OAuth2Client;
  } catch (err) {
    return null;
  }
}

async function saveCredentials(client: Auth.OAuth2Client) {
  const content = await fs.readFile(CREDENTIALS_PATH, 'utf-8');
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

async function authorize(): Promise<Auth.OAuth2Client> {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  }) as Auth.OAuth2Client;
  
  if (!client) {
    throw new Error('Failed to authorize');
  }
  
  if (client.credentials) {
    await saveCredentials(client);
  }
  
  return client;
}

function createEventObject(eventDetails: EventDetails) {
  return {
    summary: eventDetails.summary,
    description: eventDetails.description,
    start: {
      dateTime: eventDetails.startDateTime,
      timeZone: 'UTC',
    },
    end: {
      dateTime: eventDetails.endDateTime,
      timeZone: 'UTC',
    },
  };
}

async function createEvent(eventDetails: EventDetails) {
  const auth = await authorize();
  const calendar = google.calendar({ version: 'v3', auth });

  try {
    const response = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: createEventObject(eventDetails),
    });
    return response.data;
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
}

async function updateEvent(eventId: string, eventDetails: EventDetails) {
  const auth = await authorize();
  const calendar = google.calendar({ version: 'v3', auth });

  try {
    const response = await calendar.events.update({
      calendarId: 'primary',
      eventId,
      requestBody: createEventObject(eventDetails),
    });
    return response.data;
  } catch (error) {
    console.error('Error updating event:', error);
    throw error;
  }
}

async function deleteEvent(eventId: string) {
  const auth = await authorize();
  const calendar = google.calendar({ version: 'v3', auth });

  try {
    await calendar.events.delete({
      calendarId: 'primary',
      eventId,
    });
    return { success: true };
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
}

async function listEvents() {
  const auth = await authorize();
  const calendar = google.calendar({ version: 'v3', auth });

  try {
    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });
    return response.data.items;
  } catch (error) {
    console.error('Error listing events:', error);
    throw error;
  }
}

export {
  createEvent,
  updateEvent,
  deleteEvent,
  listEvents,
  EventDetails,
};