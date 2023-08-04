const notes = require('express').Router();

const { readFromFile, readAndAppend } = require('../helpers/fsUtils');

const uuid = require('../helpers/uuid');

// Notes GET route
notes.get('/', (req, res) => {
    readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)));
});

// Notes POST route
notes.post('/', (req, res) => {
    console.log(req.body);

    const { noteTitle, noteBody } = req.body;

    if (req.body) {
        const newNote = {
            noteTitle,
            noteBody,
            note_id: uuid(),
        };

        readAndAppend(newNote, './db/notes.json');
        res.json(`Note added successfully 🚀`);
    } else {
        res.error('Error in adding note');
    }
});

module.exports = notes;