const passport = require('passport');

const authController = {
  // Authenticate with Google OAuth2
  googleAuth: passport.authenticate('google', { scope: ['profile', 'email'] }),

  // Google OAuth2 callback
  googleAuthCallback: passport.authenticate('google', {
    failureRedirect: '/login',
    successRedirect: '/dashboard',
  }),

  // Logout
  logout: (req, res) => {
    req.logout();
    res.redirect('/login');
  },
};

module.exports = authController;
