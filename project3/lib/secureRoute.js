const Promise = require('bluebird');
const jwt = Promise.promisifyAll(require('jsonwebtoken'));
const { secret } = require('../config/config');
const db = require('../models');

function secureRoute(req, res, next) {
  if(!req.headers.authorization) return res.status(401).json({ message: 'Unauthorized' });

  const token = req.headers.authorization.replace('Bearer ', '');
  jwt.verifyAsync(token, secret)
    .then(payload => db.User.findById(payload.sub))
    .then(user => {
      if(!user) return res.status(401).json({ message: 'Unauthorized' });
      req.currentUser = user;
      next();
    })
    .catch(next);
}

module.exports = secureRoute;