const jwt = require('jsonwebtoken');
const config = require('../config');
const { error } = require('../network/response');

const generateToken = (userData) => {
    const token = jwt.sign(
        {
          email: userData.email,
          id: userData._id,
        },
        config.tokenKey,
        {
          expiresIn: "1h",
        }
      );

    return token;
};

const verifyToken = (req, res, next) => {
  const bearerToken = req.headers["authorization"];
  if (!bearerToken) {
    error(req, res, "A token is required for authentication", 403);
    return;
  }

  const token = bearerToken.split(" ")[1];

  if (!token) {
    error(req, res, "A token is required for authentication", 403);
    return;
  }

  try {
    const decoded = jwt.verify(token, config.tokenKey);
    req.user = decoded;
  } catch (err) {
    error(req, res, "A token is required for authentication", 403);
    return;
  }
  return next();
};

module.exports = { generateToken, verifyToken };