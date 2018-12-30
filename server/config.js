const { join } = require('path');
const { has, get, merge } = require('lodash');
const { parse } = require('properties');
const { readFileSync, existsSync } = require('fs');

const confDir = join(process.cwd(), 'config');

// parse default configure
const defaultFile = readFileSync(join(confDir, 'default.conf'), 'utf-8');
let configure = parse(defaultFile, { sections: true });

// parse environment configure
const envPath = join(confDir, 'env.conf');
if (existsSync(envPath)) {
  function processEnv(obj) {
    const result = {};

    for (const key of Object.keys(obj)) {
      if (typeof obj[key] === 'object') result[key] = processEnv(obj[key]);
      else if (typeof obj[key] === 'string' && process.env[obj[key]]) {
        result[key] = process.env[obj[key]];
      }
    }
    return result;
  }

  const envConf = parse(readFileSync(envPath, 'utf-8'), { sections: true });
  configure = merge(configure, processEnv(envConf));
}

module.exports = {
  configure,
  conf: (path) => {
    if (!has(configure, path)) throw new Error(`config ${path} is missing!`);
    else return get(configure, path);
  }
};
