const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors');

// Validate a user's access token and extract the user ID
function validateAccessToken(token) {
  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    return userId;
  } catch (err) {
    throw new UnauthorizedError('Invalid access token');
  }
}

// Generate a new JWT for a given user ID
function generateAccessToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

module.exports = {
  validateAccessToken,
  generateAccessToken,
};
