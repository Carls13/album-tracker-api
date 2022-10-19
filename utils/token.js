const jwt = require('jsonwebtoken');
const config = require('../config');

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

module.exports = { generateToken };