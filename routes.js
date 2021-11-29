const fs = require('fs');
const path = require('path');


module.exports = app => {

    // Setup notes variable
    fs.readFile("db/db.json", (err, data) => {

        if (err) throw err;

        var notes = JSON.parse(data);


        // Setup the /api/notes get route
        app.get('/', (req, res) => {
            res.json(notes);
        });
        app.post('/', (req, res) => {
            // Receives a new note, adds it to db.json, then returns the new note
            let newNote = req.body;
            notes.push(newNote);
            updateDb();
            return console.log("Added new note: " + newNote.title);
        });
        app.get('/api/notes/:id', (req, res) => {
            res.json(notes[req.params.id]);
        });

        // Deletes a note with specific id
        app.delete('/api/notes/:id', (req, res) => {
            notes.splice(req.params.id,);
            updateDb();
            console.log("Deleted note with id ");
        });
        // return the Note.html
        app.get('/notes', (req, res) => {
            res.sendFile(path.join(__dirname, '../public/notes.html'));
        });
        // return the `index.html` file
        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../public/index.html '));
        });
        function updateDb() {
            fs.writeFile("db/db.json", JSON.stringify(notes, '\t'), err => {
                // if (err) throw err;
                // return true;
                newFunction(err);
                return true;
            });

            function newFunction(err) {
                if (err)
                    throw err;
            }
        }

    });
}
// module.exports = app;