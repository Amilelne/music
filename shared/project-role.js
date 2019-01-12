const { RBAC } = require('./utils/rbac.service');

const projectRoles = new RBAC({
  guest: [],
  user: ['guest'],
  expert: ['user'],
  admin: ['expert']
});

module.exports = projectRoles;
