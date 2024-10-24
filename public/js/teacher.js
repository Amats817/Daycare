// Mock data for teacher's class and students
const mockClasses = [
    {
      className: "Class 1",
      students: [
        { name: "Student 1", status: null },
        { name: "Student 2", status: null },
        { name: "Student 3", status: null },
      ],
    },
    {
      className: "Class 2",
      students: [
        { name: "Student 1", status: null },
        { name: "Student 2", status: null },
        { name: "Student 3", status: null },
      ],
    }
    
];

// Create class cards for the teacher to mark attendance !!!!!!!

//TEMPLATE
/* <h3>Class 1</h3>
<div class="students">
    <div class="student">Student 1</div>
    <div class="attendance-controls">
        <button class="present-btn">Present</button>
        <button class="absent-btn">Absent</button>
    </div>

    <div class="student">Student 2</div>
    <div class="attendance-controls">
        <button class="present-btn">Present</button>
        <button class="absent-btn">Absent</button>
    </div>

    <div class="student">Student 3</div>
    <div class="attendance-controls">
        <button class="present-btn">Present</button>
        <button class="absent-btn">Absent</button>
    </div>
</div>
<button class="submit-attendance">Submit Attendance</button> */

function createClassCards() {
    const classCardsContainer = document.querySelector(".class-cards");
    classCardsContainer.innerHTML = ''; // Clear previous cards

    mockClasses.forEach((classData, classIndex) => {
        const classCard = document.createElement("div");
        classCard.classList.add("class-card");

        // Add class title
        const classTitle = document.createElement("h3");
        classTitle.textContent = classData.className;
        classCard.appendChild(classTitle);

        // Students container
        const studentsContainer = document.createElement("div");
        studentsContainer.classList.add("students");

        classData.students.forEach((student, studentIndex) => {
            const studentDiv = document.createElement("div");
            studentDiv.classList.add("student");
            studentDiv.textContent = student.name;

            const controlsDiv = document.createElement("div");
            controlsDiv.classList.add("attendance-controls");

            const presentBtn = document.createElement("button");
            presentBtn.classList.add("present-btn");
            presentBtn.textContent = "Present";
            presentBtn.onclick = () => markAttendance(classIndex, studentIndex, "present"); //function below

            const absentBtn = document.createElement("button");
            absentBtn.classList.add("absent-btn");
            absentBtn.textContent = "Absent";
            absentBtn.onclick = () => markAttendance(classIndex, studentIndex, "absent");

            controlsDiv.appendChild(presentBtn);
            controlsDiv.appendChild(absentBtn);
            studentDiv.appendChild(controlsDiv);

            studentsContainer.appendChild(studentDiv);
        });

        classCard.appendChild(studentsContainer);

        // Create Submit Attendance button
        const submitBtn = document.createElement("button");
        submitBtn.textContent = "Submit Attendance";
        submitBtn.classList.add("submit-attendance");
        submitBtn.onclick = () => submitAttendance(classData.className);

        classCard.appendChild(submitBtn);
        classCardsContainer.appendChild(classCard);
    });
}




// Mark attendance for a student
function markAttendance(classIndex, studentIndex, status) {
    mockClasses[classIndex].students[studentIndex].status = status;
    
    const studentElement = document.querySelectorAll('.class-card')[classIndex].querySelectorAll('.student')[studentIndex];

    if (status === 'present') {
        studentElement.style.backgroundColor = '#aeecb0'; 
    } else if (status === 'absent') {
        studentElement.style.backgroundColor = '#ee9993';
    }
}

// Submit attendance (mock functionality for now) !! CHANGE THIS FOR BACKEND !! ALSO ADD A DATE
function submitAttendance(className) {
    const classData = mockClasses.find(c => c.className === className);
    
    // Get the current date in yyyy-mm-dd format
    const currentDate = new Date().toISOString().split('T')[0];
    
    classData.date = currentDate;

    // Format attendance as a string
    const attendance = classData.students.map(s => `${s.name}: ${s.status}`).join(', ');

    alert(`Attendance for ${className} on ${currentDate}: ${attendance}`);
    

    //!!!! FINAL OBJECT ARRAY IS STORED IN THE VARIABLE "ATTENDANCE" !!!!!!!
}

// Initialize the class cards on page load
createClassCards();
