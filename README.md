# Calendar Task Note Backend

A Node.js and Express.js backend application for managing Google Calendar events.

## Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
cd calendar-task-note
```

2. Install dependencies:
```bash
npm install
```

3. Set up Google Calendar API:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project
   - Enable the Google Calendar API
   - Create OAuth 2.0 credentials
   - Download the credentials and save as `credentials.json` in the project root
   - Make sure to add `http://localhost` to the authorized redirect URIs

4. Create a `.env` file in the project root:
```
PORT=3000
NODE_ENV=development
```

5. Start the development server:
```bash
npm run dev
```

## API Endpoints

- `POST /api/calendar/events` - Create a new event
- `GET /api/calendar/events` - List upcoming events
- `PUT /api/calendar/events/:eventId` - Update an event
- `DELETE /api/calendar/events/:eventId` - Delete an event

## Security Note

Never commit the following files to version control:
- `credentials.json`
- `token.json`
- `.env`

These files contain sensitive information and are included in `.gitignore`.

## Testing

Run the test script:
```bash
node test-calendar.js
```

The first time you run this, it will open a browser window for authorization. 