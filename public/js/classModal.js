// Get modal and related elements
const modal = document.getElementById("classModal");
const btn = document.getElementById("addClassBtn");
const span = document.getElementsByClassName("close")[0];
const classContainer = document.getElementById("classContainer");
const addStudentBtn = document.getElementById("addStudentBtn");
const studentList = document.getElementById("studentList");
const studentNameInput = document.getElementById("studentNameInput");
const saveClassBtn = document.getElementById("saveClassBtn");

// Fetch and display classes on page load
window.onload = function () {
    fetchClasses();
};

// Fetch classes from the backend
function fetchClasses() {
    fetch('/retrieve/class') // This fetches the class data
        .then(response => response.json())
        .then(data => {
            // Process and create clickable class cards
            data.forEach(classItem => {
                createClassCard(classItem.className, classItem.students);
            });
        })
        .catch(error => {
            console.error('Error fetching classes:', error);
            alert('Failed to load class data.');
        });
}

// Function to create a clickable class card
function createClassCard(className, students) {
    const classCard = document.createElement("div");
    classCard.className = "class-card clickable-card"; // Add the `clickable-card` class

    // Create a clickable link for the card
    const classLink = document.createElement("a");
    classLink.href = `/teacher/attendance?className=${encodeURIComponent(className)}`;
    classLink.innerHTML = `
        <h3>${className}</h3>
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

    // Add click event for removing class card
    removeBtn.onclick = function () {
        const confirmDelete = confirm("Are you sure you want to delete this class?");
        if (confirmDelete) {
            classCard.remove();
        }
    };
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
    const students = Array.from(studentList.children).map((li) => {
        // Select only the text node for the student name
        return li.childNodes[0].nodeValue.trim();
    });

    if (className && students.length > 0) {
        const classCard = document.createElement("div");
        classCard.className = "class-card clickable-card"; // Add the `clickable-card` class

        // Create a clickable link for the card
        const classLink = document.createElement("a");
        classLink.href = `/teacher/attendance?className=${encodeURIComponent(className)}`;
        classLink.innerHTML = `
            <h3>${className}</h3>
            <p>Students: ${students.join(", ")}</p>
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

        // Add click event for removing class card
        removeBtn.onclick = function () {
            const confirmDelete = confirm("Are you sure you want to delete this class?");
            if (confirmDelete) {
                classCard.remove();
            }
        };

        // Save the data (placeholder for SQL integration)
        saveClassToDatabase(className, students);

        // Reset modal and close
        resetModal();
        modal.style.display = "none";
    } else {
        alert("Please enter a class name and add at least one student.");
    }
};

// Placeholder function to save class data to a database
function saveClassToDatabase(className, students) {
    const classData = {
        className: className,
        students: students,
    };

    console.log("Data to save:", classData);

    // Here, you can later add code to send the data to your backend
    // Example using fetch:
    // fetch('/api/save-class', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(classData),
    // })
    // .then(response => response.json())
    // .then(data => console.log('Success:', data))
    // .catch(error => console.error('Error:', error));
}

function resetModal() {
    document.getElementById("className").value = '';
    studentList.innerHTML = '';
}
