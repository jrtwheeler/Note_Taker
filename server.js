// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3001;;

// Sets up the Express app to handle data parsing
// =============================================================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

//Require html and API routes
// =============================================================
require("./routes/htmlRoutes")(app);
require("./routes/apiRoutes")(app);

//Listener
// =============================================================
app.listen(PORT, () => {
  console.log("http://localhost:" + PORT);
});
