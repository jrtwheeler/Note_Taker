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

    app.get("/api/notes", (req, res) => {
        try {
            readFileAsync(database, "utf8", function(err, notes) {
                notes = JSON.parse(notes);
                res.json(notes);
            });
        } catch (err) {
            console.log(err);
        }
    });

    app.post("/api/notes", (req, res) => {
        // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
        // It will do this by sending out the value "true" have a table
        // req.body is available since we're using the body parsing middleware
        try {
            readFileAsync(database, "utf8", (err, data) => {
                let newNote = JSON.parse(data);
                req.body.id = newNote.length;
                newNote.push(req.body);
                newNote = JSON.stringify(newNote);
                writeFileAsync(database, newNote, "utf8");
                 console.log(newNote);
            });
        } catch (err) {
            console.log(err);
        }
    });

    // .post((req, res) => {
    //     try {
    //         let notes = async ()=> {
    //         await readFileAsync(database, "utf8");
    //         };
    //         console.log(notes)

    //         let returnData = [notes];
    //         returnData.push(req.body);

    //         writeFileAsync(database, JSON.stringify(returnData));
    //     } catch (err) {
    //         console.log(err);
    //     }
    //         //     notes = [req.body];

    //         //     notes.push({ title: req.body.title, text: req.body.text });

    //         //     writeFileAsync(database, JSON.stringify(notes))
    //         //         .then((notes) => {
    //             res.json(notes);
    //         }).catch((err) => {
    //             console.log(err);
    //         })
    // }).catch((err) => {
    //     console.log(err);
    // })
    // });

    // app.delete("/api/notes/:id", function (req, res) {

    //     let noteId = req.params.id;
    //     let newId = 0;
    //     notes = notes.filter(currentNote => {
    //         return currentNote.id != noteId;
    //     });
    //     for (currentNote of notes) {
    //         currentNote.id = newId.toString();
    //         newId++;
    //     }
    //     writeFileAsync(database, JSON.stringify(notes)).then(function (err, notes) {
    //         if (err) throw (err);

    //         res.json(notes);
    //     })
    // });

}