const db = require("../models");
const passport = require('../config/passport');
const jwt = require('jsonwebtoken');

module.exports = {
    findByEmail: function(req, res) {
        db.User
          .findOne({ email: req.body.email })
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      }
    };