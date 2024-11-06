// This file handles anything related to login, registration, and authentication/validation HTTP requests.
const express = require("express");
const router = express.Router();
const path = require("path");
const db = require("../database");

router.post("/login", (req, res) => {
  // Handles any HTTP post requests with the code 'login'
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM login WHERE lower(username) = ? AND password = ?",
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
            clearance: row.clearance, // Saves clearance level
          };

          // Checks which clearance level the credentials have and redirects to the appropriate page.
          switch (req.session.user.clearance) {
            case 1: // Parent clearance
              res.status(200).json({ redirect: "/parent" });
              break;
            case 2: // Teacher clearance
              res.status(200).json({ redirect: "/teacher" });
              break;
            case 3: // Supervisor clearance
              res.status(200).json({ redirect: "/supervisor" });
              break;
            case 4: // Testing purposes
              res.status(200).json({ redirect: "/supervisor" });
              break;
            default:
              res.redirect("/login");
          }
        });
      } else {
        res.status(401).json({ error: "Incorrect username or password." });
      }
    }
  );
});

module.exports = router; // Export router to be used in 'server.js' file.
