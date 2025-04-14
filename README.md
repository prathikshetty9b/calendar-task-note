# Calendar Task Note Backend

A TypeScript-based backend application for managing calendar events with Google Calendar integration.

## Features

- Create, update, delete, and list calendar events
- Google Calendar API integration
- TypeScript support with type safety
- Express.js REST API
- Environment-based configuration

## Prerequisites

- Node.js v22.14.0 or higher
- npm (comes with Node.js)
- Google Cloud Platform account
- Google Calendar API enabled

## Setup

1. Clone the repository:
```bash
git clone https://github.com/prathikshetty9b/calendar-task-note.git
cd calendar-task-note
```

2. Install dependencies:
```bash
npm install
```

3. Set up Google Calendar API:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project
   - Enable Google Calendar API
   - Create OAuth 2.0 credentials
   - Download the credentials and save as `credentials.json` in the project root

4. Create a `.env` file in the project root with the following variables:
```
PORT=3000
GOOGLE_CALENDAR_ID=primary
```

## Development

1. Start the development server:
```bash
npm run dev
```

2. Build the project:
```bash
npm run build
```

3. Run tests:
```bash
npm test
```

4. Lint the code:
```bash
npm run lint
```

## API Endpoints

- `POST /api/calendar/events` - Create a new event
- `PUT /api/calendar/events/:id` - Update an existing event
- `DELETE /api/calendar/events/:id` - Delete an event
- `GET /api/calendar/events` - List upcoming events

## Project Structure

```
src/
├── index.ts              # Application entry point
├── routes/
│   └── calendarRoutes.ts # Calendar API routes
└── services/
    └── calendarService.ts # Google Calendar service
```

## TypeScript Configuration

The project uses TypeScript with the following configuration:
- Strict type checking
- ES2020 target
- CommonJS modules
- Source maps for debugging

## Contributing

1. Create a new branch:
```bash
git checkout -b feature/your-feature-name
```

2. Make your changes and commit them:
```bash
git commit -m "feat: your feature description"
```

3. Push to the branch:
```bash
git push origin feature/your-feature-name
```

4. Create a pull request

## License

ISC 