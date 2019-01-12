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

module.exports = JWT;
