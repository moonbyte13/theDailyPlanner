const express = require('express');
const router = express.Router();
const { Widget } = require('../../models');

// Get all widgets
router.get('/', async (req, res) => {
  try {
    const widgets = await Widget.find({}).populate('owner', 'displayName');
    res.json(widgets);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// Create a new widget
router.post('/', async (req, res) => {
  try {
    if (req.user) {
      const widget = new Widget({ ...req.body, owner: req.user._id });
      await widget.save();
      res.json(widget);
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// Update a widget by ID
router.put('/:id', async (req, res) => {
  try {
    if (req.user) {
      const widget = await Widget.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(widget);
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// Delete a widget by ID
router.delete('/:id', async (req, res) => {
  try {
    if (req.user) {
      await Widget.findByIdAndDelete(req.params.id);
      res.sendStatus(200);
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;
