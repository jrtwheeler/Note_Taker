const express = require('express');
var path = require("path");
var fs = require("fs");
const notes = require('./data/tabledata');
const waitlist = require('./data/waitlist');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Route Handling
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "notes.html"));
});

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

// APIs
app.get("/api/notes", function(req, res) {
  return res.json(notes);
});

app.post("/api/waitlist", function(req, res) {
  return res.json(waitlist);
})

// Initializing Server
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});