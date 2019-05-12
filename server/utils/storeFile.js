const fs = require("fs");
const path = require("path");
const { conf } = require("../config");
const nanoid = require("nanoid");
const uploadDir = "./server/uploads/";
const host = conf("server.host");
const port = conf("server.port");
module.exports = ({ stream, suffix, folder }) => {
  const id = nanoid(10);
  let folderPath = `${folder}/${id}.${suffix}`;
  let serverPath = path.join("server/uploads/", folderPath);
  console.log(`serverPath: ${serverPath}`);
  const httpPath = "http://" + host + ":" + port + "/" + folderPath;
  return new Promise((resolve, reject) => {
    stream
      .on("error", error => {
        if (stream.truncated) {
          fs.unlinkSync(folderPath);
        }
        reject(error);
      })
      .pipe(fs.createWriteStream(uploadDir + folderPath))
      .on("error", error => reject(error))
      .on("finish", () => resolve({ id, httpPath, serverPath }));
  });
};
