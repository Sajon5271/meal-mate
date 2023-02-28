const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../configs');
const User = require('./../models/Users');

const authMiddleware = async (req, res, next) => {
  const authHeaders = req.headers['authorization'];
  if (!authHeaders) return res.sendStatus(403);
  const token = authHeaders.split(' ')[1];

  try {
    const { _id } = jwt.verify(token, SECRET_KEY);
    // attempt to find user object and set to req
    const user = await User.findOne({ _id });
    if (!user) return res.sendStatus(401);
    req.currentUser = user;
    next();
  } catch (error) {
    res.sendStatus(401);
    next();
  }
};

module.exports = authMiddleware;
