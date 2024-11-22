CREATE TABLE parent (
    parent_id INT(10) PRIMARY KEY NOT NULL,
    fname VARCHAR(15),
    lname VARCHAR(15),
    phoneNum VARCHAR(15)  # Updated to VARCHAR to better handle phone numbers
);

CREATE TABLE child (
    child_id INT(10) PRIMARY KEY NOT NULL,
    fname VARCHAR(15),
    lname VARCHAR(15),
    age INT(2)
);

CREATE TABLE teacher (
    teacher_id INT(10) PRIMARY KEY NOT NULL,
    fname VARCHAR(15),
    lname VARCHAR(15),
    roomNum INT(10)
);

CREATE TABLE supervisor (
    supervisor_id INT(10) PRIMARY KEY NOT NULL,
    fname VARCHAR(15),
    lname VARCHAR(15),
    numOfClass INT(10)
);

CREATE TABLE security (
    guard_id INT(10) PRIMARY KEY NOT NULL,
    fname VARCHAR(15),
    lname VARCHAR(15)
);

CREATE TABLE class (
    class_id INT(10) AUTO_INCREMENT PRIMARY KEY NOT NULL,
    class_subject varchar(30),
    teacher_id INT(10),
    FOREIGN KEY (teacher_id) REFERENCES teacher(teacher_id),
    classStart TIME,
    classEnd TIME
);

CREATE TABLE classEnroll (
    class_id INT(10),
    child_id INT(10),
    enrollDate DATE DEFAULT (CURRENT_DATE()),
    FOREIGN KEY (class_id) REFERENCES class(class_id) ON DELETE CASCADE,
    FOREIGN KEY (child_id) REFERENCES child(child_id)
);

CREATE TABLE relationship (
    parent_id INT(10),
    child_id INT(10),
    relation VARCHAR(255),
    FOREIGN KEY (parent_id) REFERENCES parent(parent_id),
    FOREIGN KEY (child_id) REFERENCES child(child_id)
);

CREATE TABLE checkInAndOut (
    parent_id INT(10),
    child_id INT(10),
    checkIn DATETIME,
    checkOut DATETIME,
    FOREIGN KEY (parent_id) REFERENCES parent(parent_id),
    FOREIGN KEY (child_id) REFERENCES child(child_id)
);

CREATE TABLE teacherLogin (
	teacher_id INT(10),
    FOREIGN KEY (teacher_id) REFERENCES teacher(teacher_id),
    t_username VARCHAR(20),
    t_password VARCHAR(20),
    clearance int DEFAULT 2
);

CREATE TABLE attendance (
    attendance_id INT AUTO_INCREMENT PRIMARY KEY,
    class_id INT NOT NULL,
    child_id INT NOT NULL, FOREIGN KEY (child_id) REFERENCES child(child_id) ON DELETE CASCADE,
    attendance_date DATE NOT NULL,
    status ENUM('Present', 'Absent', 'Not Marked') DEFAULT 'Not Marked',
    FOREIGN KEY (class_id) REFERENCES class(class_id) ON DELETE CASCADE
);

INSERT INTO parent (parent_id, fname, lname, phoneNum) VALUES
   (1, 'John', 'Smith', 1234567890),
   (2, 'Mary', 'Johnson', 2345678901),
   (3, 'Robert', 'Brown', 3456789012);
   
 INSERT INTO child (child_id, fname, lname, age) VALUES
   (1, 'Emily', 'Smith', 5),
   (2, 'Jacob', 'Johnson', 4),
   (3, 'Olivia', 'Brown', 3);
   
 INSERT INTO teacher (teacher_id, fname, lname, roomNum) VALUES
   (1, 'Sarah', 'Miller', 101),
   (2, 'James', 'Davis', 102),
   (3, 'Jessica', 'Wilson', 103);

INSERT INTO supervisor (supervisor_id, fname, lname, numOfClass) VALUES(1, 'Michael', 'Taylor', 3),(2, 'Linda', 'Anderson', 2);

INSERT INTO security (guard_id, fname, lname) VALUES
   (1, 'David', 'Harris'),
   (2, 'Laura', 'Clark');
   
INSERT INTO class (class_id, class_subject, teacher_id, classStart, classEnd) VALUES
   (1, "Art", 1, '08:00:00', '10:00:00'),
   (2, "History", 2, '10:30:00', '12:30:00'),
   (3, "Math", 3, '13:00:00', '15:00:00'),
   (4, "Music", 1, '15:30:00', '16:30:00');
   
INSERT INTO classEnroll (class_id, child_id, enrollDate) VALUES
   (1, 1, '2024-01-15'),
   (2, 2, '2024-01-16'),
   (3, 3, '2024-01-17'),
   (4, 1, '2024-01-15'),
   (4, 2, '2024-01-16'),
   (4, 3, '2024-01-17');
INSERT INTO relationship (parent_id, child_id, relation) VALUES
   (1, 1, 'Father'),
   (2, 2, 'Mother'),
   (3, 3, 'Father');
   
INSERT INTO checkInAndOut (parent_id, child_id, checkIn, checkOut) VALUES
   (1, 1, '2024-03-01 08:00:00', '2024-03-01 15:00:00'),
   (2, 2, '2024-03-01 09:00:00', '2024-03-01 14:00:00'),
   (3, 3, '2024-03-01 08:30:00', '2024-03-01 15:30:00');
   
INSERT INTO teacherLogin(teacher_id, t_username, t_password)
	VALUES
	(1, "Ryan", "123"),
    (2, "Mark", "123");

