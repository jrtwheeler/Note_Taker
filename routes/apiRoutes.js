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
    //Express verb get the api
    app.get("/api/notes", (req, res) => {
        //Try to read the db.json database
        try {
            readFileAsync(database, "utf8", function (err, notes) {
                //Turn the response into an array using JSON.parse
                notes = JSON.parse(notes);
                //Respond to the browser with json notes
                res.json(notes);
            });
        //Error handling
        } catch (err) {
            console.log(err);
        }
    });
    //Express verb post writes to the database json.db
    app.post("/api/notes", (req, res) => {
        //Try to read the database 
        try {
            readFileAsync(database, "utf8", (err, data) => {
                //Take the data from the callback function and turn it into
                //an array with JSON.parse and assign it to variable newNote
                let newNote = JSON.parse(data);
                //Take the object from api and give it an id value that equals
                //the length of the newNote array
                req.body.id = newNote.length;
                //Push the req.body object into the newNote array
                newNote.push(req.body);
                //NewNote is turned into a string
                newNote = JSON.stringify(newNote);
                //Write the newNote array to the db.json file
                writeFileAsync(database, newNote, "utf8");
                //Send the data back to the browser
                res.send(JSON.parse(newNote));
            });
        } catch (err) {
            console.log(err);
        }
    });

    app.delete("/api/notes/:id", (req, res) => {
        try {
            readFileAsync(database, "utf8", (err, data) => {
                let newNote = JSON.parse(data);
                newNote = newNote.filter((notes) => {
                    if (notes.id != req.params.id) {
                        return notes
                    };
                    newNote = JSON.stringify(newNote);
                    writeFileAsync(database, newNote, "utf8");
                    res.send(JSON.parse(newNote));
                })
            });
        } catch (err) {
            console.log(err);
        }
    });

}