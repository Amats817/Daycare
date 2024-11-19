// Specify the class name you want to display
const urlParams = new URLSearchParams(window.location.search);
const targetClassName = urlParams.get("className");// Change this to the desired class name

// Function to fetch class data and display the specified class
function fetchAndDisplayClass() {
    fetch('/retrieve/class') // Adjust the path to match your backend route
        .then(response => {
            console.log("Raw response:", response); // Log response for debugging
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log("Fetched data:", data); // Log parsed JSON
            // Find the class with the specified name
            const classItem = data.find(item => item.className === targetClassName);

            if (classItem) {
                const attendanceContainer = document.createElement('div');
                attendanceContainer.id = 'attendanceContainer';

                const classDiv = document.createElement('div');
                classDiv.className = 'class-item';
                classDiv.innerHTML = `<h3>${classItem.className}</h3>`;

                const studentList = document.createElement('ul');
                classItem.students.forEach(student => {
                    const studentItem = document.createElement('li');
                    studentItem.setAttribute('data-child-id', student.child_id); // Add child_id as a data attribute
                    studentItem.innerHTML = `
                        ${student.child_name} (${student.child_id}) 
                        <label>
                            <input type="radio" name="attendance-${student.child_id}" value="Present"> Present
                        </label>
                        <label>
                            <input type="radio" name="attendance-${student.child_id}" value="Absent"> Absent
                        </label>
                    `;
                    studentList.appendChild(studentItem);
                });

                classDiv.appendChild(studentList);
                attendanceContainer.appendChild(classDiv);

                // Add date input
                const dateDiv = document.createElement('div');
                dateDiv.innerHTML = `
                    <label for="attendanceDate">Date:</label>
                    <input type="date" id="attendanceDate" required>
                `;
                attendanceContainer.appendChild(dateDiv);

                // Add submit button
                const submitButton = document.createElement('button');
                submitButton.textContent = "Submit Attendance";
                submitButton.id = "submitAttendance";
                submitButton.onclick = submitAttendance;
                attendanceContainer.appendChild(submitButton);

                // Append the attendance container to the body or a specific section
                document.body.appendChild(attendanceContainer);
            } else {
                const errorDiv = document.createElement('div');
                errorDiv.textContent = `Class "${targetClassName}" not found.`;
                document.body.appendChild(errorDiv);
            }
        })
        .catch(error => console.error('Error fetching the class data:', error));
}

// Function to handle attendance submission
function submitAttendance() {
    const attendanceDate = document.getElementById("attendanceDate").value;
    if (!attendanceDate) {
        alert("Please select a date.");
        return;
    }

    const students = Array.from(document.querySelectorAll("#attendanceContainer ul li")).map(li => {
        const studentId = li.getAttribute("data-child-id");  // Fetch child_id from the data attribute
        const attendance = Array.from(li.querySelectorAll('input[type="radio"]')).find(input => input.checked)?.value || "Not Marked";

        // Log each student's data
        console.log('Student data:', { studentId, attendance });

        return { child_id: studentId, attendance };
    });

    const attendanceData = {
        date: attendanceDate,
        className: targetClassName,
        students: students,
    };

    console.log("Attendance Data:", attendanceData);

    fetch('/submit-attendance', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(attendanceData),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to submit attendance.");
            }
            return response.json();
        })
        .then(data => {
            console.log("Attendance submitted:", data);
        
            // Display success message
            displayMessage("Attendance submitted successfully!", "success");
        
            // Optionally, hide or remove the success message after a few seconds
            setTimeout(() => {
                removeMessage();
            }, 5000);  // Hide after 5 seconds
        })        
        .catch(error => {
            console.error("Error submitting attendance:", error);
        
            // Display error message
            displayMessage("Error submitting attendance. Please try again.", "error");
        
            // Optionally, hide or remove the error message after a few seconds
            setTimeout(() => {
                removeMessage();
            }, 5000);  // Hide after 5 seconds
        });
}

// Function to display a message
function displayMessage(messageText, type) {
    const message = document.createElement('div');
    message.classList.add('message', `${type}-message`);
    message.textContent = messageText;
    document.body.appendChild(message);
}

// Function to remove the message
function removeMessage() {
    const message = document.querySelector('.message');
    if (message) {
        message.remove();
    }
}


fetchAndDisplayClass();
