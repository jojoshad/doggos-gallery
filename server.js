// server.js
var express = require("express");
var serveStatic = require("serve-static");
const path = require("path");
var app = express();
app.use(serveStatic(__dirname + "/dist"));
var port = process.env.PORT || 5000;
app.get("*", (request, response) => {
  response.sendFile(path.join(__dirname, "/dist", "index.html"));
});
app.listen(port);
console.log("server started " + port);
