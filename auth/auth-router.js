/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-use-before-define */
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secret.js');

const Auth = require('./auth-model.js');

router.post('/register', validateBody, (req, res) => {
  // implement registration
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Auth.add(user)
    .then((saved) => {
      const token = genToken(saved);
      res.status(201).json({ created_user: saved, token });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.post('/login', validateBody, (req, res) => {
  // implement login
  const { username, password } = req.body;

  Auth.findBy({ username })
    .first()
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = genToken(user);

        res.status(200).json({ username: user.username, token });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});


function genToken(user) {
  const payload = {
    userid: user.id,
    username: user.username,
  };

  const options = { expiresIn: '1h' };
  const token = jwt.sign(payload, secrets.jwtSecret, options);

  return token;
}
function validateBody(req, res, next) {
  const { username, password } = req.body;
  Object.entries(req.body).length === 0
    ? res.status(404).json({ message: 'Missing post data' })
    : !username || !password
      ? res.status(401).json({ message: 'Missing required username or password field' })
      : next();
}
module.exports = router;
