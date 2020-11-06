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
    let notes = [];

    fs.readFile(path.join(__dirname, "../db/db.json"), (err, data) => {
        if (err) throw err;
        var notes = JSON.parse(data);
        return notes;
    });

    app.get("/api/notes", (req, res) => {        
            res.json(notes);
            console.log(notes);   
    });

    app.post("/api/notes", (req, res) => {
        // req.body hosts is equal to the JSON post sent from the user
        // This works because of our body parsing middleware
        var note = req.body;
        notes.push(note);
        fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(notes,'\t'), err => {
            if (err) throw err;
            return true;
        });
        return console.log("Added new note: " + note.title);

    });
}