const User = require("../models/User");
const { secret } = require('../config/config');
const jwt = require('jsonwebtoken');

module.exports = {
  register: function (req, res, next) {
    User
      .create(req.body)
      .then(user => {
        const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '24h' });
        res.json({ user, token, message: 'Thank you for registering' });
      })
      .catch(next);
  },
  login: function (req, res, next) {
    User
      .findOne({ email: req.body.email })
      .then(user => {
        if (!user || !user.validatePassword(req.body.pasword)) {
          return res.status(401).json({ message: 'Unauthorized' });
        }

        const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '24h' });
        res.json({ user, token, message: `Welcome back ${user.username}` });
      })
      .catch(next);
  },
  updateUserRoute(req, res, next) {
    return User.findById(req.currentUser._id)
      .then(user => {
        if (!user || !user.validatePassword(req.body.password)) {
          return res.status(401).json({ message: 'Unauthorized' });
        }
        Object.assign(user, req.body, { passwordConfirmation: req.body.password });
        return user.save();
      })
      .then(user => res.json(user))
      .catch(next);
    //error caught by global error handler as 422 but wih no error message
  },
  showUserRoute(req, res, next) {
    User.findById(req.currentUser._id)
      .then(user => res.json(user))
      .catch(next);
  }
}