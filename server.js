const express = require('express');
const path = require('path');

const { clog } = require('./middleware/clog');
const api = require('./routes/index.js');

const PORT = process.env.PORT || 3001;

const app = express();

// Import custom middleware
app.use(clog);

// Middleware for parsing JSON and urlencoded from data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', api);
app.use(express.static('public'));


//  GET Route from homepage
app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '/public/index.html'));
});

// Get Route for note page
app.get('/notes', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '/public/notes.html'));
});

//  deligate the rest of get request to the home page
app.get('*', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '/public/index.html'));
});

app.listen(PORT, () => {
    console.log(`App listening at the ${PORT}`);
});

