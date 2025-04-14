const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const calendarRoutes = require('./routes/calendarRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/calendar', calendarRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Calendar Task Note API' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 