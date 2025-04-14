const calendarService = require('./src/services/calendarService');

async function testCalendarIntegration() {
  try {
    // Test creating an event
    console.log('Creating test event...');
    const newEvent = await calendarService.createEvent({
      summary: 'Test Event',
      description: 'This is a test event from the API',
      startDateTime: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
      endDateTime: new Date(Date.now() + 7200000).toISOString(),   // 2 hours from now
    });
    console.log('Event created:', newEvent);

    // Test listing events
    console.log('\nListing events...');
    const events = await calendarService.listEvents();
    console.log('Upcoming events:', events);

    // Test updating the event
    console.log('\nUpdating event...');
    const updatedEvent = await calendarService.updateEvent(newEvent.id, {
      summary: 'Updated Test Event',
      description: 'This is an updated test event',
      startDateTime: new Date(Date.now() + 7200000).toISOString(), // 2 hours from now
      endDateTime: new Date(Date.now() + 10800000).toISOString(),  // 3 hours from now
    });
    console.log('Event updated:', updatedEvent);

    // Test deleting the event
    //console.log('\nDeleting event...');
    //await calendarService.deleteEvent(newEvent.id);
    //console.log('Event deleted successfully');

  } catch (error) {
    console.error('Error during testing:', error);
  }
}

testCalendarIntegration(); 