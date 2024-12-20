//
// This file is the 'main' file in the project. It connects everything together and runs the server.
//

const express = require('express');         // Imports Express.js
const path = require('path');               // Imports path, which is a way for concatenating file paths in a modular way
const bodyParser = require('body-parser');  // Imports body-parser, which is used for parsing data such as JavaScript Objects
const session = require('express-session'); // Imports express-session, which is middleware for Express.js that allows session management within the Web App.
const app = express();                      // This creates an instance of an Express application and assigns it to the variable 'app'.


// This is used to store a secure login cookie for users. The 'secret' is a key used to sign session cookies.
app.use(session({
    secret: "Daycare!@#$%^&*()1234567890",
    resave: false,
    saveUninitialized: true,
    cookie: { 
      secure: false,             // Set to true if we're using HTTPS (secure)
      maxAge: 24 * 60 * 60 * 1000, // 24 hours cookie expire date
      httpOnly: true             // Prevents client-side JavaScript from accessing the cookie (for security purposes)
    }
}));

// Connect to the database using the 'database.js' file.
    const connection = require('./database'); 
// Note: Connecting to the database in this file doesn't really matter here since we'll be doing database queries in another js file anyway. I put it here to just showcase it.

// Importing bodyparser stuff into our express app.
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

// Serve static files from the public directory (static files are files that are publicly available to all users, typically any file that doesn't pose a security risk)
    app.use(express.static(path.join(__dirname, 'public')));

// Connect 'routes' files 
    // Route files will be like URL paths. For example website.com/parent or website.com/supervisor.
    // These route handlers will be written in a different file located in the 'routes' folder.
    const parentRoute = require('./routes/parentRoute');
    const supervisorRoute = require('./routes/supervisorRoute');
    const teacherRoute = require('./routes/teacherRoute');
    app.use('/parent', parentRoute);
    app.use('/supervisor', supervisorRoute);
    app.use('/teacher', teacherRoute);

// Connect 'requests' files
    // Request files will handle any and all backend requests such as querying the database and making changes to it.
    // These request files will stored in the 'requests' folder. 
    // Right now we only have one request file but there will most likely be more added.
    const loginReg = require('./requests/login-reg');
    const teacher = require('./requests/teacher-req');
    app.use(loginReg); // File to manage all requests associated with the login/registration page.
    app.use(teacher);

// The following code will handle URL directing for public files. (Files located in 'public' folder)
    // For example, if you goto localhost:3000/login it will serve you the login-reg.html file

    //getting the sql request 
    app.get('/dbTest', (req, res) => { // TO TEST THIS, GO TO localhost:3000/dbTest
        console.log("GET /dbTest triggered");
        
        // Execute the SQL query test
        connection.query('SELECT * FROM child', (err, results) => {
            if (err) {
                console.error('Error executing query: ', err);
                res.status(500).send('Error retrieving data from database');
                return;
            }
            // Send the results back as JSON
            res.json(results);
            console.log("Data successfully sent as JSON");
        });
    });
    app.get('/login', (req, res) => {
        res.sendFile(path.join(__dirname, './public/index.html'));
        //res.sendFile(path.join(__dirname, './public/html/login-reg.html'));
    });
    app.get('/register', (req, res) => {
        res.sendFile(path.join(__dirname, './public/html/Register.html'));
    });
    app.get('/registrationComplete', (req, res) => {
        res.sendFile(path.join(__dirname, './public/regComplete.html'));
    });
    app.all('*', (req, res) => {
        res.send('Error 404 - PAGE NOT FOUND');
    });
    /* Note: 
        'req' - request from user
        'res' - response from server
    */

// Starts the server once you run this file.
// To access the web app, go to web browser and type 'localhost:3000' into URL bar. (Make sure this file is running before you do this.)
// The result should be that it displays the index.html file located in the 'public' folder.
const PORT = process.env.PORT || 3000; // // KEEP IN MIND, DATABASE PORT IS 3306, SERVER.JS PORT IS 3000. KEEP THEM DIFFERENT OR ELSE IT DOESN'T WORK!
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
