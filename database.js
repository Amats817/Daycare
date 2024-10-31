// This file will connect to the database and assign it to the variable 'db'.
// Then, it will export the database, assigned to 'db' variable, using ' module.exports = db; ' (as seen at the end of this file)
// From there, we can import this database.js file within other JavaScript files using ' const db = require('./database'); '
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: '25.4.154.178',
    user: 'super_user',
    password: 'Class_of_2033',
    database: 'child_daycare_db' // The name of the schema in MYSQL Workbench, change if you need to test.
    // KEEP IN MIND, DATABASE PORT IS 3306, SERVER.JS PORT IS 3000. KEEP THEM DIFFERENT OR ELSE IT DOESN'T WORK!
});
db.connect((err) => {
    if(err) {
        console.error('Error connecting to database: ', err);
        return;
    }
    console.log('Connected to database');
});

module.exports = db;