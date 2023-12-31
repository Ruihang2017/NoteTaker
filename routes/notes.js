const notes = require('express').Router();
const uuid = require('../utils/uuid');
const { captureRejectionSymbol } = require('events');
const fs = require('fs').promises;

// return the post data
notes.get('/', (req, res) => {
    fs.readFile('./db/db.json', 'utf8').then(data => {
        res.status(200).json(JSON.parse(data));
    }).catch(err => {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while fetching data' });
    });

});


// saved the post data to file
notes.post('/', (req, res) => {
    const { title, text } = req.body;
    if (title && text) {
        const newTask = {
            title,
            text,
            id: uuid(),
        }
        console.log(`id = ${newTask.id}`)
        fs.readFile('./db/db.json', 'utf8').then(data => {
            const parseData = JSON.parse(data);
            parseData.push(newTask);
            fs.writeFile('./db/db.json', JSON.stringify(parseData, null, 4), 'utf8', (err) => {
                if (err) {
                    res.status(500).json({ error: 'An error occured serverside' });
                } else {
                    console.info(`Data writted successful to ./db/db.json`);
                }
            });
        }).catch(err => {
            res.status(500).json({ error: 'An error occured serverside' });
        });

        const response = {
            status: 'success',
            body: newTask,
        };

        res.status(200).json(response);
    }
});


// Define a DELETE route for a specific note resource
notes.delete('/:noteId', (req, res) => {
    const noteId = req.params.noteId;
    if (noteId) {
        console.log(noteId);
        fs.readFile('./db/db.json', 'utf8').then(data => {
            const parseData = JSON.parse(data);
            const newData = parseData.filter(task => task.id !== noteId);

            fs.writeFile('./db/db.json', JSON.stringify(newData, null, 4), 'utf8', (err) => {
                if (err) {
                    res.status(500).json({ error: 'An error occured serverside' });
                } else {
                    console.info(`Data updated successful to ./db/db.json`);
                }
            });

        }).catch(err => {
            res.status(500).json({ error: 'An error occured serverside' });
        });
    }
    console.info(`DELETE request received for note with ID: ${noteId}`);
    res.status(200).send(`DELETE request received for note with ID: ${noteId}`);
});




module.exports = notes;