// ===============================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================
const path = require("path");
const fs = require("fs");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = (app) => {

    app.get("/api/notes", (req, res) => {
        fs.readFile(path.join(__dirname, "../db/db.json"), function (err, data) {
            if (err) throw err;
            var jsonData = JSON.parse(data);

            console.log(jsonData);
            return jsonData;
        });
    });

    app.post("/api/notes", (req, res) => {
        // req.body hosts is equal to the JSON post sent from the user
        // This works because of our body parsing middleware
        var notes = req.body;

        console.log(notes);

    });
}