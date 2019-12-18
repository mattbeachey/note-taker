const express = require("express");
const path = require("path");
const fs = require("fs");

//set up express app
const app = express();
const PORT = process.env.PORT || 3000;

//note generating mechanics
// let idGenerator = 0

//data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//routes
app.use(express.static("public"))

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "notes.html"));
});

// Displays all notes
app.get("/api/notes", function (req, res) {
    fs.readFile("db/db.json", "utf8", function (err, notes) {
        if (err) {
            console.log(err)
            return
        }
        res.json(JSON.parse(notes));
    })
});



//Posting note to db.json

app.post("/api/notes", function (req, res) {
    const newNote = req.body
    let notesDB = []
    // idGenerator++
    // newNote.id = idGenerator
    fs.readFile(path.join(__dirname + "/db/db.json"), "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }
        if (data === "") { // if starting from an empty json file
            notesDB.push({ "id": 1, "title": newNote.title, "text": newNote.text });
        } else {
            console.log(data)
            notesDB = JSON.parse(data);
            notesDB.push({ "id": notesDB.length + 1, "title": newNote.title, "text": newNote.text });
        }
        // updated notes pushed to db.json
        fs.writeFile((path.join(__dirname + "/db/db.json")), JSON.stringify(notesDB), function (error) {
            if (error) { return console.log(error); }
            res.json(notesDB);
        });
    });
});


//Deleting Note - pull JSON file, stringify, specify individual note id, remove, rewrite JSON file
app.delete("/api/notes/:id", function (req, res) {
    const newNote = req.body
    const noteID = req.params.id
    let notesDB = []
    fs.readFile(path.join(__dirname + "/db/db.json"), "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }
        console.log(data)
        notesDB = JSON.parse(data);
        notesDB = notesDB.filter(function(object){
            console.log(object.id, noteID)
            return object.id != noteID
        })

        // updated notes pushed to db.json
        fs.writeFile((path.join(__dirname + "/db/db.json")), JSON.stringify(notesDB), function (error) {
            if (error) { return console.log(error); }
            res.json(notesDB);
        });
    });
});




// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
