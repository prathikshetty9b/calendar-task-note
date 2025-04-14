import express, { Request, Response } from 'express';
import { createEvent, updateEvent, deleteEvent, listEvents, EventDetails } from '../services/calendarService';

const router = express.Router();

// Create a new event
router.post('/events', async (req: Request, res: Response) => {
  try {
    const event = await createEvent(req.body as EventDetails);
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Update an existing event
router.put('/events/:eventId', async (req: Request, res: Response) => {
  try {
    const event = await updateEvent(req.params.eventId, req.body as EventDetails);
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Delete an event
router.delete('/events/:eventId', async (req: Request, res: Response) => {
  try {
    await deleteEvent(req.params.eventId);
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// List events
router.get('/events', async (_req: Request, res: Response) => {
  try {
    const events = await listEvents();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

export default router;