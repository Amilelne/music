const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const { join } = require('path');

const schemaDir = join(process.cwd(), 'schemas');
module.exports = async () => {
  return await fs
    .readdirAsync(schemaDir)
    .map((file) => fs.readFileAsync(join(schemaDir, file), 'utf-8'))
    .then((contents) => {
      return contents.join('\n');
    });
};
