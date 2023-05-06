const User = require('../models/User/User');

const userController = {
  // Get the current user
  getCurrentUser: async (req, res) => {
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
  },
};

module.exports = userController;
