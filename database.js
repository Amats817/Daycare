// This file will connect to the database and assign it to the variable 'db'.
// Then, it will export the database, assigned to 'db' variable, using ' module.exports = db; ' (as seen at the end of this file)
// From there, we can import this database.js file within other JavaScript files using ' const db = require('./database'); '

const db = 'mysql';
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Class_Of_2033',
    database: 'Local instance MySQL90'
});
connection.connect((err) => {
    if(err) {
        console.error('Error connecting to database: ', err);
        return;
    }
    console.log('Connected to database');
});

module.exports = db;