const express = require('express');
const router = express.Router();
const { User } = require('../../models');

// Get the current user
router.get('/me', async (req, res) => {
  try {
    if (req.user) {
      const user = await User.findById(req.user._id);
      res.json(user);
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// Update the current user's email address
router.put('/me/email', async (req, res) => {
  try {
    if (req.user) {
      const user = await User.findByIdAndUpdate(req.user._id, { email: req.body.email }, { new: true });
      res.json(user);
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;
