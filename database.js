// This file will connect to the database and assign it to the variable 'db'.
// Then, it will export the database, assigned to 'db' variable, using ' module.exports = db; ' (as seen at the end of this file)
// From there, we can import this database.js file within other JavaScript files using ' const db = require('./database'); '
const mysql = require('mysql2/promise'); // Use the promise version

const db = mysql.createPool({
    // HAMACHI CONNECTION (Levi's desktop)
    /* host: '25.4.154.178',
    user: 'super_user',
    password: 'Class_of_2033',
    database: 'child_daycare_db', // The name of the schema in MYSQL Workbench, change if you need to test.
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0 */

    // LOCALHOST CONNECTION (your own computer)
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'daycare_project',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0

    // KEEP IN MIND, DATABASE PORT IS 3306, SERVER.JS PORT IS 3000. KEEP THEM DIFFERENT OR ELSE IT DOESN'T WORK!
});

// Test the connection
(async () => {
    try {
        const connection = await db.getConnection();
        console.log('Connected to the database');
        connection.release(); // Release the connection back to the pool
    } catch (err) {
        console.error('Error connecting to the database:', err);
    }
})();

module.exports = db;