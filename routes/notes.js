const notes = require('express').Router();

const { json } = require('express');
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');

const uuid = require('../helpers/uuid');

// Notes GET route
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.get('/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
    .then((json) => { const results = json.filter((notes) => notes.id === noteId);
    return results.length < 0 
        ? res.json(results)
        : res.json('No notes with that id.')});
});

// Notes POST route
notes.post('/', (req, res) => {
    console.log(req.body);

    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuid(),
        };

        readAndAppend(newNote, './db/db.json');
        res.json(`Note added successfully 🚀`);
    } else {
        res.error('Error in adding note');
    }
});

notes.delete('/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json').then((data) => JSON.parse(data))
    .then((json) => { const results = json.filter((notes) => notes.id !== noteId);

    writeToFile('./db/db.json', results);

    res.json(`Item ${noteId} has been deleted.`);
    })
});

module.exports = notes;