class Role {
  constructor(name, inherits) {
    this.name = name;
    this.inherits = new Set(inherits);
  }

  can(role) {
    if (this.name === role) {
      return true;
    } else if (this.inherits.size) {
      console.log(this.inherits);
      return Array.from(this.inherits).some((r) => r.can(role));
    } else {
      return false;
    }
  }
}

class RBAC {
  constructor(roles) {
    this.roles = new Set([]);
    for (const role of Object.keys(roles)) {
      this.addRoles(role, roles[role]);
    }
  }
  findRole(name) {
    return Array.from(this.roles).find((role) => role.name === name);
  }
  addRoles(name, inherits) {
    // check role if already exists
    if (this.findRole(name)) {
      throw new Error(`Role name ${name} already exists`);
    }

    // check inherits role exists
    const inheritRoles = [];
    for (const inherit of inherits) {
      const inheritRole = this.findRole(inherit);
      if (!inheritRole) {
        throw new Error(`Set inherits failed, role ${inherit} didn't exist`);
      }
      inheritRoles.push(inheritRole);
    }

    this.roles.add(new Role(name, inheritRoles));
  }

  can(roleName, target) {
    const role = this.findRole(roleName);
    if (!role) throw new Error(`Role name ${roleName} didn't exist`);
    const targetRole = this.findRole(target);
    if (!targetRole) throw new Error(`Role name ${target} didn't exist`);
    return role.can(target);
  }
}

module.exports = { Role, RBAC };
