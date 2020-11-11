// ===============================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================
const path = require("path");
const fs = require("fs");
const util = require("util");
const database = "./db/db.json";
// let notes = JSON.parse(fs.readFileSync(database, "utf8"));

// ===============================================================================
// PROMISIFY
// ===============================================================================

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = (app) => {
    
    getNotes();

    async function getNotes() {
    app.get("/api/notes", (req, res) => {
        try {
            let notes = readFileAsync(database, "utf8");
            res.json(notes);
        } catch (err) {
            console.log(err);
        }
    })
}

    app.post("/api/notes", (req, res) => {
        try {
            let notes = readFileAsync(database, "utf8");
            req.json(notes);
            console.log(res.json(notes))
        } catch (err) {
            console.log(err);
        }
            //     notes = [req.body];

            //     notes.push({ title: req.body.title, text: req.body.text });

            //     writeFileAsync(database, JSON.stringify(notes))
            //         .then((notes) => {
            //             res.json(notes);
            //         }).catch((err) => {
            //             console.log(err);
            //         })
            // }).catch((err) => {
            //     console.log(err);
            // })
    });

    app.delete("/api/notes/:id", function (req, res) {

        let noteId = req.params.id;
        let newId = 0;
        notes = notes.filter(currentNote => {
            return currentNote.id != noteId;
        });
        for (currentNote of notes) {
            currentNote.id = newId.toString();
            newId++;
        }
        writeFileAsync(database, JSON.stringify(notes)).then(function (err, notes) {
            if (err) throw (err);

            res.json(notes);
        })
    });

}