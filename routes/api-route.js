const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const notes = require('../db/db.json');

console.log(notes);

// get notes array from db.json
router.get('/notes', (req, res) => {
    const noteData = JSON.parse(fs.readFileSync(
        path.join(__dirname, '../db/db.json'),
        'utf-8'
    ))
    return res.json(noteData);
});

// post notes array to the /notes endpoint
router.post('/notes', (req, res) => {
    // create the new note
    const newNote = { ...req.body, id: notes.length};
    console.log(newNote);
    // add new note into the previous array
    notes.push(newNote);
    console.log(notes);
    // write the array with the new note into db.json
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify(notes, null, 2)
    );
    return res.json(notes);
});

// delete one of the notes array according to its id
router.delete('/notes/:id', (req, res) => {
    // loop through each note's id to see which one matches what user choose to delete
    for(let i = 0; i < notes.length; i++) {
        if(notes[i].id == req.params.id) {
            notes.splice(i, 1);
        };
    };

    // rewrite the new file into db.json
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify(notes, null, 2)
    );
    return res.json(notes);
});

module.exports = router;