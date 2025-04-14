const { google } = require('googleapis');
const { authenticate } = require('@google-cloud/local-auth');
const path = require('path');
const fs = require('fs').promises;

const SCOPES = ['https://www.googleapis.com/auth/calendar'];
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
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

async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}

async function createEvent(eventDetails) {
  const auth = await authorize();
  const calendar = google.calendar({ version: 'v3', auth });

  const event = {
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

  try {
    const response = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
    });
    return response.data;
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
}

async function updateEvent(eventId, eventDetails) {
  const auth = await authorize();
  const calendar = google.calendar({ version: 'v3', auth });

  const event = {
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

  try {
    const response = await calendar.events.update({
      calendarId: 'primary',
      eventId: eventId,
      resource: event,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating event:', error);
    throw error;
  }
}

async function deleteEvent(eventId) {
  const auth = await authorize();
  const calendar = google.calendar({ version: 'v3', auth });

  try {
    await calendar.events.delete({
      calendarId: 'primary',
      eventId: eventId,
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

module.exports = {
  createEvent,
  updateEvent,
  deleteEvent,
  listEvents,
}; 