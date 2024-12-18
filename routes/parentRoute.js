// This file handles anything related to parents.
const express = require('express');
const router = express.Router();
const path = require('path');
const db = require('../database');

router.get("/", (req, res)=>{
    verifyUser(req, res, '../parent/parent.html');
})

function verifyUser(req, res, dir){
    // Verifies if the user has logged in or not. If not, it redirects them to the login page.
    if(!req.session || !req.session.logged_in){
        res.redirect('/login');
    }
    else{
        // Checks which clearance level the credentials have and redirects them to the appropiate page.
        switch(req.session.user.clearance){
            case 1: // Parent clearance
                res.sendFile(path.join(__dirname, dir));
                break;
            case 2: // Teacher clearance
                res.redirect('/teacher');
                break;
            case 3: // Supervisor clearance
                res.redirect('/supervisor');
                break;
            case 4: // Testing purposes
                res.sendFile(path.join(__dirname, dir));
                break;
            default:
                res.redirect('/login');
        }
    }
}

module.exports = router; // Export router to be used in 'server.js' file.