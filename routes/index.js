const express = require('express');
const app = express();

const notesRouter = require('./notes');

// Import modular router for /notes
app.use('/notes', notesRouter);

module.exports = app;