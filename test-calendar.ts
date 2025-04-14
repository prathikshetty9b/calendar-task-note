import { createEvent, updateEvent, deleteEvent, listEvents, EventDetails } from './src/services/calendarService';

function createTestEvent(): EventDetails {
  const now = Date.now();
  return {
    summary: 'Test Event',
    description: 'This is a test event from the API',
    startDateTime: new Date(now + 3600000).toISOString(), // 1 hour from now
    endDateTime: new Date(now + 7200000).toISOString(),   // 2 hours from now
  };
}

function createUpdatedTestEvent(): EventDetails {
  const now = Date.now();
  return {
    summary: 'Updated Test Event',
    description: 'This is an updated test event',
    startDateTime: new Date(now + 7200000).toISOString(),  // 2 hours from now
    endDateTime: new Date(now + 10800000).toISOString(),   // 3 hours from now
  };
}

async function testCalendarIntegration() {
  try {
    // Test creating an event
    console.log('Creating test event...');
    const newEvent = await createEvent(createTestEvent());
    console.log('Event created:', newEvent);

    // Test listing events
    console.log('\nListing events...');
    const events = await listEvents();
    console.log('Upcoming events:', events);

    if (newEvent.id) {
      // Test updating the event
      console.log('\nUpdating event...');
      const updatedEvent = await updateEvent(newEvent.id, createUpdatedTestEvent());
      console.log('Event updated:', updatedEvent);

      // Test deleting the event
      // console.log('\nDeleting event...');
      // await deleteEvent(newEvent.id);
      // console.log('Event deleted successfully');
    }
  } catch (error) {
    console.error('Error during testing:', error);
    process.exit(1);
  }
}

testCalendarIntegration();