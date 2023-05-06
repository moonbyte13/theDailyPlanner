const express = require('express');
const router = express.Router();
const { Widget } = require('../../models');

// Create a new widget
router.post('/', async (req, res) => {
  try {
    const { type, title, content, position } = req.body;
    const widget = new Widget({
      user: req.user._id,
      type,
      title,
      content,
      position,
    });
    await widget.save();
    res.json(widget);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// Get all widgets for the current user
router.get('/', async (req, res) => {
  try {
    if (req.user) {
      const widgets = await Widget.find({ user: req.user._id });
      res.json(widgets);
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// Update a widget
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { type, title, content, position } = req.body;
    const widget = await Widget.findById(id);
    if (widget) {
      widget.type = type;
      widget.title = title;
      widget.content = content;
      widget.position = position;
      widget.updatedAt = Date.now();
      await widget.save();
      res.json(widget);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// Delete a widget
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const widget = await Widget.findById(id);
    if (widget) {
      await widget.remove();
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;
