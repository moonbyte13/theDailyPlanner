const express = require('express');
const passport = require('passport');
const router = express.Router();

// Authenticate with Google OAuth2
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth2 callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/dashboard');
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

module.exports = router;
