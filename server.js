// IP: SOURCE_ADDR:network:hardware_address:protocol_port||DEST_ADDR:network:hardware_address:protocol_port 

// while(true){
// listen for socketAPI
// if GET request on PORT:protocol_port rooute "/"
// use information in headers of request
// get a website
// use file system to get html file
// return the html file to the source IP address
// };
// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = 8000;

// Sets up the Express app to handle data parsing
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./public/routes/htmlRoutes.js")(app);

app.listen(PORT, function () {
  console.log("http://localhost:" + PORT);
});
