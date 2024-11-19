// This file handles anything related to login, registration, and authentication/validation HTTP requests.
const express = require("express");
const router = express.Router();
const path = require("path");
const db = require("../database");

router.post("/login/teacher", (req, res) => {
  // Handles any HTTP post requests involving teacher logins
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM teacherLogin WHERE lower(username) = ? AND password = ?",
    [username.toLowerCase(), password],
    (err, rows) => {
      if (err) {
        console.error("Error querying database:", err.message);
        res.status(500).send("Internal Server Error");
        return;
      }

      if (rows.length > 0) {
        // Check if any row was returned
        const row = rows[0]; // Access the first (and likely only) row

        // Regenerate the session to create a new session ID
        req.session.regenerate((err) => {
          if (err) {
            console.error("Error regenerating session:", err);
            res.status(500).send("Internal Server Error");
            return;
          }

          // Set user session data after regenerating session ID
          req.session.logged_in = true;
          req.session.user = {
            username: row.username, // Saves username
            clearance: row.clearance,
            teacher_id: row.teacher_id
          };
          res.status(200).json({ redirect: "/teacher" });
        });
      } else {
        res.status(401).json({ error: "Incorrect username or password." });
      }
    }
  );
});

router.get('/auth-status', (req, res) => {
  if (req.session.logged_in) {
      res.json({ loggedIn: true, username: req.session.user.username, teacher_id: req.session.user.teacher_id });
  } else {
      res.json({ loggedIn: false });
  }
});

router.get('/test', (req, res) => {
  // For testing login
  req.session.regenerate((err) => {
      if (err) {
        console.error("Error regenerating session:", err);
        res.status(500).send("Internal Server Error");
        return;
      }

      // Set user session data after regenerating session ID
      req.session.logged_in = true;
      req.session.user = {
        username: "Ryan", // Saves username
        clearance: 2,
        teacher_id: 1
      };
      res.redirect("/teacher");
    });
});

module.exports = router; // Export router to be used in 'server.js' file.
