// ===============================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================
const path = require("path");
const fs = require("fs");
const util = require("util");
let notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

// ===============================================================================
// PROMISIFY
// ===============================================================================

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = (app) => {

    app.get("/api/notes", (req, res) => {
        readFileAsync("./db/db.json", "utf8")
        .then(function (err, notes) {
            if (err) throw (err);

            res.json(notes)
        })
    });

    app.post("/api/notes", function (req, res) {

        let newNote = req.body;
        let noteID = (notes.length).toString();
        newNote.id = noteID;
        notes.push(newNote);

        writeFileAsync("./db/db.json", JSON.stringify(notes)).then(function (err, notes) {
            if (err) throw (err);

            res.json(notes);
            res.end();
        });

        console.log(newNote, "Has been successfully added to your notes!");
        console.log("Here are your updated notes:", notes);
        
    });

    app.delete("/api/notes/:id", function (req, res) {

        let noteId = req.params.id;
        let newId = 0;
        console.log(`Deleting note with ID number = ${noteId}`);
        notes = notes.filter(currentNote => {
            return currentNote.id != noteId;
        });
        for (currentNote of notes) {
            currentNote.id = newId.toString();
            newId++;
        }
        writeFileAsync("./db/db.json", JSON.stringify(notes)).then(function (err, notes) {
            if (err) throw (err);
            
            res.json(notes);
            console.log("Here are your updated notes:", notes);
        })
    });

}