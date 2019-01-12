const projectRoles = require('../../shared/project-role');
const { ForbiddenError, AuthenticationError } = require('apollo-server');
let RoleGuard = {};

RoleGuard.canActivate = function(context, targetRole) {
  if (!context.user) {
    throw new AuthenticationError('Please login first');
  } else {
    if (projectRoles.can(context.user.role, targetRole)) {
      return true;
    } else {
      throw new ForbiddenError('Unauthorized');
    }
  }
};

module.exports = RoleGuard;
