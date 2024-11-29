// This file handles anything related to login, registration, and authentication/validation HTTP requests.
const express = require("express");
const router = express.Router();
const path = require("path");
const db = require("../database");

router.post("/login/teacher", async (req, res) => {
  // Handles any HTTP post requests involving teacher logins
  const { username, password } = req.body;

  try {
    // Execute the query using async/await
    const [rows] = await db.query(
      "SELECT * FROM teacherLogin WHERE lower(t_username) = ? AND t_password = ?",
      [username.toLowerCase(), password]
    );

    if (rows.length > 0) {
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
          username: row.t_username, // Saves username
          clearance: row.clearance,
          teacher_id: row.teacher_id
        };

        res.status(200).json({ redirect: "/teacher" });
      });
    } else {
      res.status(401).json({ error: "Incorrect username or password." });
    }
  } catch (err) {
    console.error("Error querying database:", err.message);
    res.status(500).send("Internal Server Error");
  }
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
