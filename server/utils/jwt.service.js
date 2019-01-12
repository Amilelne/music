const jsonwebtoken = require('jsonwebtoken');
const { conf } = require('../config');

let JWT = {};

JWT.getUser = function(token) {
  let user = null;
  if (token) {
    try {
      // decode token and get user infomation
      user = jsonwebtoken.verify(token, conf('security.jwt_secret'));
    } catch (errors) {
      // TODO: deal with errors
      throw new Error(errors);
    }
  }
  return user;
};

JWT.generateToken = function(user) {
  return jsonwebtoken.sign(
    {
      id: user._id,
      role: user.role,
      level: user.level
    },
    conf('security.jwt_secret'),
    { expiresIn: '10h' }
  );
};

module.exports = JWT;
