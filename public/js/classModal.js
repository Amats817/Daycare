// Get modal and related elements
const modal = document.getElementById("classModal");
const btn = document.getElementById("addClassBtn");
const span = document.getElementsByClassName("close")[0];
const classContainer = document.getElementById("classContainer");
const addStudentBtn = document.getElementById("addStudentBtn");
const studentList = document.getElementById("studentList");
const studentNameInput = document.getElementById("studentNameInput");
const saveClassBtn = document.getElementById("saveClassBtn");
const startTimeInput = document.getElementById("startTime");
const endTimeInput = document.getElementById("endTime");

// Fetch and display classes on page load
window.onload = function () {
    fetchClasses();
};

// Fetch classes from the backend
function fetchClasses() {
    fetch('/retrieve/class')
        .then(response => response.json())
        .then(data => {
            data.forEach(classItem => {
                createClassCard(
                    classItem.className,
                    classItem.students,
                    classItem.classStart,
                    classItem.classEnd,
                    classItem.class_id
                );
            });
        })
        .catch(error => {
            console.error('Error fetching classes:', error);
            alert('Failed to load class data.');
        });
}

// Open modal when add class button is clicked
btn.onclick = function () {
    modal.style.display = "block";
};

// Close modal when close button is clicked
span.onclick = function () {
    modal.style.display = "none";
    resetModal();
};

// Close modal when clicking outside the modal
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
        resetModal();
    }
};

// Add individual student
addStudentBtn.onclick = function () {
    const studentName = studentNameInput.value.trim();
    if (studentName) {
        const li = document.createElement("li");
        li.innerHTML = `${studentName} <button class="remove-student">❌</button>`;
        studentList.appendChild(li);

        studentNameInput.value = "";

        li.querySelector(".remove-student").onclick = function () {
            li.remove();
        };
    } else {
        alert("Please enter a valid student name.");
    }
};

// Save class and students
saveClassBtn.onclick = function () {
    const className = document.getElementById("className").value.trim();
    const students = Array.from(studentList.getElementsByTagName("li")).map(li => li.textContent.replace("❌", "").trim());
    const startTime = startTimeInput.value.trim();
    const endTime = endTimeInput.value.trim();

    if (className && students.length > 0 && startTime && endTime) {
        // Save the data to the database
        saveClassToDatabase(className, students, startTime, endTime)
            .then(classId => {
                // Create the class card using the returned classId
                createClassCard(className, students, startTime, endTime, classId);

                // Reset modal and close
                resetModal();
                modal.style.display = "none";
            })
            .catch(error => {
                console.error("Error saving class:", error);
                alert("Failed to save class. Please try again.");
            });
    } else {
        alert("Please enter all required fields.");
    }
};

// Function to create a clickable class card
function createClassCard(className, students, startTime, endTime, classId) {
    const classCard = document.createElement("div");
    classCard.className = "class-card clickable-card"; // Add the `clickable-card` class

    // Create a clickable link for the card
    const classLink = document.createElement("a");
    classLink.href = `/teacher/attendance?classId=${encodeURIComponent(classId)}`;
    classLink.innerHTML = `
        <h3>${className}</h3>
        <p>Class ID: ${classId}</p>
        <p>Schedule: ${startTime} - ${endTime}</p>
        <p>Students: ${students.map(student => student.child_name).join(", ")}</p>
    `;
    classLink.style.textDecoration = "none"; // Remove underline for the link
    classLink.style.color = "inherit"; // Keep link text color same as card

    // Create a remove button
    const removeBtn = document.createElement("button");
    removeBtn.innerHTML = "Delete Class";
    removeBtn.className = "remove-card-btn";

    // Append the link to the card
    classCard.appendChild(classLink);
    classCard.appendChild(removeBtn);
    classContainer.appendChild(classCard);

    // Delete class functionality
    removeBtn.onclick = function () {
        const confirmDelete = confirm("Are you sure you want to delete this class?");
        if (confirmDelete) {
            // Send DELETE request to delete class
            fetch('/delete-class', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ classId: classId })  // Pass classId in the request body
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete class');
                }
                return response.json();
            })
            .then(data => {
                console.log('Class deleted successfully:', data);
                // Remove the class card from the UI
                classCard.remove();
            })
            .catch(error => {
                console.error('Error deleting class:', error);
                alert('Failed to delete class.');
            });
        }
    };
}


// Function to save class data to a database
function saveClassToDatabase(className, students, startTime, endTime) {
    const classData = {
        className: className,
        students: students,
        classStart: startTime,
        classEnd: endTime,
    };

    console.log("Class data being sent to backend:", classData);

    return fetch('/save-class', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(classData),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Class saved successfully:', data);
            return data.classId; // Assuming the backend returns the `class_id` in the response
        });
}



function resetModal() {
    document.getElementById("className").value = "";
    studentList.innerHTML = "";
    startTimeInput.value = "";
    endTimeInput.value = "";
}
