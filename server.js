// IP: SOURCE_ADDR:network:hardware_address:protocol_port||DEST_ADDR:network:hardware_address:protocol_port 

// while(true){
// listen for socketAPI
// if GET request on PORT:protocol_port rooute "/"
// use information in headers of request
// get a website
// use file system to get html file
// return the html file to the source IP address
// };

const express = require("express");
const path = require("path");
const app = express();
const PORT = 8000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const fs = require("fs");

app.get("/notes", function (req, res) {
  fs.readFile("./public/notes.html", "utf8", function (err, html) {
    if (err) return res.sendStatus(404);

    res.send(html);
  });
});


app.listen(PORT, function () {
  console.log("http://localhost:" + PORT);
});
