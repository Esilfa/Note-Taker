const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();


// module.exports = router => {

    // Setup notes variable
    fs.readFile("db/db.json", (err, data) => {

        if (err) throw err;

        var notes = JSON.parse(data);


        // Setup the api get route
        router.get('/api/notes', (req, res) => {
            console.log(notes);
            res.json(notes);
        });
        router.post('/api/notes', (req, res) => {
            // Receives a new note
            let newNote = req.body;
            notes.push(newNote);
            updateDb();
            console.log(notes);
            return console.log("Added new note: " + newNote.title);
        });
        router.get('/api/notes/:id', (req, res) => {
            console.log(notes);
            res.json(notes[req.params.id]);
        });

        // Deletes a note 
        router.delete('/api/notes/:id', (req, res) => {
            notes.splice(req.params.id,);
            updateDb();
            console.log("Deleted note with id ");
        });
        // return the Note.html
        router.get('/notes', (req, res) => {
            res.sendFile(path.join(__dirname, './public/notes.html'));
        });
        // return the `index.html` file
        router.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, './public/index.html '));
        });
        function updateDb() {
            fs.writeFile("db/db.json", JSON.stringify(notes, '\t'), err => {
                // if (err) throw err;
                // return true;
                updateDb(err);
                return true;
            });

            function updateDb(err) {
                if (err)
                    throw err;
            }
        }

    });

module.exports = router;