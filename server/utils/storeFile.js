const fs = require("fs");
const { conf } = require("../config");
const nanoid = require("nanoid");
const uploadDir = "./server/uploads/";
const host = conf("server.host");
const port = conf("server.port");
module.exports = ({ stream, suffix, folder }) => {
  const id = nanoid(10);
  let path = `${folder}/${id}.${suffix}`;
  const httpPath = "http://" + host + ":" + port + "/" + path;
  return new Promise((resolve, reject) => {
    stream
      .on("error", error => {
        if (stream.truncated) {
          fs.unlinkSync(path);
        }
        reject(error);
      })
      .pipe(fs.createWriteStream(uploadDir + path))
      .on("error", error => reject(error))
      .on("finish", () => resolve({ id, path: httpPath }));
  });
};
