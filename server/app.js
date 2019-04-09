const { configure } = require("./config");
const express = require("express");
const cors = require("cors");
const path = require("path");

const mongoose = require("./mongoose");

const distDir = "/dist/music-ai";
const app = express();
app.use(cors());
// serve front-end
app.use(express.static(path.resolve(process.cwd() + distDir)));
// upload files
app.use(express.static(path.resolve(process.cwd() + "/server/uploads")));
// redirect router
app.use(/^((?!(graphql)).)*/, (req, res) => {
  res.sendFile(path.join(process.cwd(), distDir + "/index.html"));
});
// Get configures form config file
const { server } = configure;
for (const key of Object.keys(server)) {
  app.set(key, server[key]);
}

// Connect to DB
mongoose.connect(mongoose.get("db_uri"), { useNewUrlParser: true });

module.exports = app;
