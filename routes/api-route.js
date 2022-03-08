const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const notes = require('../db/db.json');
console.log(notes);

router.get('/notes', (req, res) => {
    const nodeData = JSON.parse(fs.readFileSync(
        path.join(__dirname, '../db/db.json'),
        'utf-8'
    ))
    return res.json(nodeData);
});

router.post('/notes', (req, res) => {
    const newNote = { ...req.body, id: notes.length};
    console.log(newNote);
    notes.push(newNote);
    console.log(notes);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify(notes, null, 2)
    );
    return res.json(notes);
});

module.exports = router;