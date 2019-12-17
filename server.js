const express = require("express");
const path = require("path");


//set up express app
const app = express();
const PORT = process.env.PORT || 3000;

//data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let noteData = [
    {
        id: "uniqueID",
        content: "content"
    }
]


//routes
app.use(express.static("public"))

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "add.html"));
});

// Displays all notes
app.get("/api/notesarray", function (req, res) {
    return res.json(noteData);
});




// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
