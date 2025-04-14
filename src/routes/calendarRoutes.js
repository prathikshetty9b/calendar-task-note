const express = require('express');
const router = express.Router();
const calendarService = require('../services/calendarService');

// Create a new event
router.post('/events', async (req, res) => {
  try {
    const event = await calendarService.createEvent(req.body);
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an existing event
router.put('/events/:eventId', async (req, res) => {
  try {
    const event = await calendarService.updateEvent(req.params.eventId, req.body);
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete an event
router.delete('/events/:eventId', async (req, res) => {
  try {
    await calendarService.deleteEvent(req.params.eventId);
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// List events
router.get('/events', async (req, res) => {
  try {
    const events = await calendarService.listEvents();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 