// Import required modules
const express = require('express');
const cors = require('cors');
const passport = require('./config/passport-setup');
const session = require('express-session');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const { userRoutes, widgetRoutes } = require('./routes');
const logger = require('./utils/logger');

// Load environment variables from the .env file
dotenv.config();

// Initialize the app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Use the routes
app.use('/api/user.js', userRoutes);
app.use('/api/widgets.js', widgetRoutes);

// Google OAuth2 routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect to dashboard.
    res.redirect('/dashboard');
  }
);

// Logout route
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}\u{1F680}`);
});
