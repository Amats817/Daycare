// This file handles anything related to teacher HTTP requests.
const express = require("express");
const router = express.Router();
const path = require("path");
const db = require("../database");

// Retrieve class attendance sheet data
router.get("/retrieve/class", async (req, res) => {
    if (!req.session || !req.session.logged_in) {
        return res.status(401).json({ error: "Not logged in." });
    }

    const teacherId = req.session.user.teacher_id;

    try {
        // Fetch class information along with child_id and child_name for each student
        const [rows] = await db.query(`
            SELECT 
                c.class_subject AS className,
                ch.child_id,
                CONCAT(ch.fname, ' ', ch.lname) AS child_name
            FROM 
                class c
            LEFT JOIN 
                classEnroll ce ON c.class_id = ce.class_id
            LEFT JOIN 
                child ch ON ce.child_id = ch.child_id
            WHERE 
                c.teacher_id = ?
        `, [teacherId]);

        console.log("Query result:", rows);

        if (rows.length === 0) {
            return res.status(404).json({ error: "No classes found for the teacher." });
        }

        // Grouping students by class
        const classes = rows.reduce((acc, row) => {
            const classIndex = acc.findIndex(c => c.className === row.className);

            // If class is found, add the student to it
            if (classIndex !== -1) {
                acc[classIndex].students.push({
                    child_id: row.child_id,
                    child_name: row.child_name,
                });
            } else {
                // Otherwise, create a new class entry
                acc.push({
                    className: row.className,
                    students: [{
                        child_id: row.child_id,
                        child_name: row.child_name,
                    }]
                });
            }

            return acc;
        }, []);

        res.json(classes);
    } catch (error) {
        console.error("Error retrieving class data:", error.message); // Log the error message
        console.error("Stack Trace:", error.stack); // Log the stack trace
        res.status(500).json({ error: "Failed to retrieve class data due to server error." });
    }
});

router.post("/submit-attendance", async (req, res) => {
    const { date, className, students } = req.body;

    if (!req.session || !req.session.logged_in) {
        return res.status(401).json({ error: "Not logged in." });
    }

    const teacherId = req.session.user.teacher_id;

    try {
        // 1. Find the class_id for the given teacher and className
        const [classResult] = await db.query(
            `SELECT class_id 
             FROM class 
             WHERE teacher_id = ? AND class_subject = ?`,
            [teacherId, className]
        );

        if (!classResult.length) {
            return res.status(404).json({ error: "Class not found for this teacher." });
        }

        const classId = classResult[0].class_id;

        // 2. Insert attendance for each student using child_id
        const insertPromises = students.map(student =>
            db.query(
                `INSERT INTO attendance (class_id, child_id, attendance_date, status) 
                 VALUES (?, ?, ?, ?)`,
                [classId, student.child_id, date, student.attendance]
            )
        );

        await Promise.all(insertPromises);
        res.status(200).json({ message: "Attendance submitted successfully" });
    } catch (error) {
        console.error("Error submitting attendance:", error);
        res.status(500).json({ error: "Failed to submit attendance" });
    }
});


module.exports = router; // Export router to be used in 'server.js' file.