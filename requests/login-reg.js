// This file handles anything related to login, registration, and authentication/validation HTTP requests.
const express = require('express');
const router = express.Router();
const path = require('path');
const db = require('../database');

router.post('/login', (req, res) => {
    // Handles any HTTP post requests with the code 'login'

    //
    // Code Here
    //
});

module.exports = router; // Export router to be used in 'server.js' file.