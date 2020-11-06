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
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

require("./routes/htmlRoutes")(app);

app.get("/api/notes", function(req, res) {
  fs.readFile(path.join(__dirname, "../db/db.json"), function(err, data) {
      if (err) throw err;
      var jsonData = JSON.parse(data);

      
      console.log(jsonData);
      return jsonData;
    });
    console.log("Working code block")
});

app.post("/api/notes", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var notes = req.body;

  console.log(notes);

});

app.listen(PORT, function () {
  console.log("http://localhost:" + PORT);
});
