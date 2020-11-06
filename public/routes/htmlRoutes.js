// ===============================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================
var path = require("path");
const fs = require("fs");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // HTML GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases the user is shown an HTML page of content
  // ---------------------------------------------------------------------------

  app.get("/notes", function (req, res) {
    fs.readFile("./public/notes.html", "utf8", function (err, data) {
      if (err) return res.sendStatus(404);
  
      res.sendFile(path.join(__dirname, "../notes.html"));
    });
  });

  // If no matching route is found default to home
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../notes.html"));
  });
};
