# Daycare
---------
Explaination of project folder:
    Main files:
        - server.js is the main file of the project that runs the server and connects every file together.
        - database.js is the file that connects the web app server (server.js) to the database (MySQL).
        - Daycare SQL.sql is the file that has the database SQL creates and inserts.
    
    Requests Files:
        In the 'request' folder, there will be a login-reg.js and teacher-req.js file.
        - login-reg.js handles all database queries relating to the login page.
        - teacher-req.js handles all database queries relating to the teacher page.

    Public folder:
        In the 'public' folder, there will be HTML, CSS, IMAGES, AND JS. These are just the front-end parts of the project.
    
    Teacher, Parent, and Supervisor folder:
        These are also front-end parts of the project but placed in their respective folders so that no user can access them without
        being logged in. (Authentication is handled in the routes folder.)

    Routes folder:
        The files in the 'routes' folder handles authentication of the user.
        For example, you cannot access the teacher page without being logged in as a teacher.
            The teacherRoute.js file checks if you are logged in as a teacher, if so, it will direct you to the teacher page.
---------

THE WEB APP WON'T WORK IF THE DATABASE ISN'T CONNECTED.
    1. To make sure the database will connect to the web server, go to MySQL workbench and create a schema called 'daycare_project'.
    2. Make sure daycare_project is set as your default schema by right clicking daycare_project and setting it to default schema.
    3. Then, open up the Daycare SQL.sql file and execute every line. This should execute without issue.
    4. Now, go to the database.js file and change the password to the password you have set for your MySQL workbench root.
    5. If everything is done correctly, you can run the server.js file. It will say 'Connected to the database' in the console if it's working.

How to access the page:
    1. Go to the server.js file and run it. It should output:   
        Server is running on port 3000
        http://localhost:3000
        Connected to the database
    2. Go to http://localhost:3000 in your web browser. This should load the web app.
    3. Click login (it will be under the register button).
    4. Here are some credentials you can login as:
        Username: Ryan
        Password: 123
    5. This will load the teacher page. Here you can view the teacher's classes.
        You can add and delete classes.
        When adding classes, you must add an already existing child in the database (first and last name along with their child_id).
        Deleting classes is simple, just press delete and confirm. It will remove the class from the database.
    6. If you click on a class, you can take attendance of that specific class.
        Once you submit the attendance, it will be added to the database under the 'attendance' table.


