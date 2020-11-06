const express = require('express');
const path = require("path");
const fs = require("fs");
// const notes = require('./data/tabledata');
// const waitlist = require('./data/waitlist');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Route Handling
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// APIs
app.get("/api/notes", function(req, res) {
  return res.json(notes);
});

app.post("/api/waitlist", function(req, res) {
  return res.json(waitlist);
})

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});