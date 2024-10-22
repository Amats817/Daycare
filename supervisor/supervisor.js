//mock data !! soon to be replaced when program is connected into a database!!
// mockclass is an array containing objects
// className is a string
// student is an array containing object (name and status)
const mockClasses = [
  {
    className: "Class 1",
    students: [
      { name: "Student 1", status: "present" },
      { name: "Student 2", status: "absent" },
      { name: "Student 3", status: "present" },
    ],
    date: "2024-10-20"
  },
  {
    className: "Class 2",
    students: [
      { name: "Student 1", status: "present" },
      { name: "Student 2", status: "present" },
      { name: "Student 3", status: "absent" },
    ],
    date: "2024-10-21"
  },
  {
    className: "Class 3",
    students: [
      { name: "Student 1", status: "absent" },
      { name: "Student 2", status: "present" },
      { name: "Student 3", status: "absent" },
    ],
    date: "2024-10-22"
  }
  // Add more class objects with dates
];


// List of available dates
const availableDates = [...new Set(mockClasses.map((classData) => classData.date))];

// Current date starts from the first available date
let currentIndex = 0;
let currentDate = availableDates[currentIndex]; 

document.getElementById("current-date").textContent = currentDate;

function updateDate(direction) {
  currentIndex += direction;
  if (currentIndex < 0) {
      currentIndex = 0;
  } else if (currentIndex >= availableDates.length) {
      currentIndex = availableDates.length - 1;
  }
  currentDate = availableDates[currentIndex];
  document.getElementById("current-date").textContent = currentDate;
  createClassCards(); // Refresh cards for the new date
}

// Event listeners for date navigation
document.getElementById("prev-date").addEventListener("click", () => {
  updateDate(-1); // Go to the previous available date
});

document.getElementById("next-date").addEventListener("click", () => {
  updateDate(1); // Go to the next available date
});

//HTML REPRESENTATION
//   <div class="class-card">
//   <h3>Class 1</h3>
//   <div class="students">
//       <div class="student present">Student 1: Present</div>
//       <div class="student absent">Student 2: Absent</div>
//       <div class="student present">Student 3: Present</div>
//   </div>
// </div>

  function createClassCards() {
    const classCardsContainer = document.querySelector(".class-cards");
    classCardsContainer.innerHTML = ""; 

     // Filter classes by current date
     const filteredClasses = mockClasses.filter(classData => classData.date === currentDate);

     if (filteredClasses.length === 0) {
      classCardsContainer.innerHTML = "<p>No classes found for the selected date.</p>";
      return;
    }
  
    filteredClasses.forEach((classData) => {
      const classCard = document.createElement("div");
      classCard.classList.add("class-card");
  
      // add class title
      const classTitle = document.createElement("h3");
      classTitle.textContent = classData.className;
      classCard.appendChild(classTitle);
  
      // student div
      const studentsContainer = document.createElement("div");
      studentsContainer.classList.add("students");
  
      // create student divs
      classData.students.forEach((student) => {
        const studentDiv = document.createElement("div");
        studentDiv.classList.add("student", student.status);
        studentDiv.textContent = `${student.name}: ${student.status.charAt(0).toUpperCase() + student.status.slice(1)}`;
        studentsContainer.appendChild(studentDiv);
      });
  
      // add students to card
      classCard.appendChild(studentsContainer);

       // Create Confirm button
      const confirmButton = document.createElement("button");
      confirmButton.textContent = "Confirm Attendance";
      confirmButton.classList.add("confirm-button");

      confirmButton.addEventListener("click", () => {
        alert(`Confirmed attendance for ${classData.className}`);
        // handle confirm button in the future !!!!!!!!!!!!!!!!!!!!!
      });

      classCard.appendChild(confirmButton);
  
      // add card to container
      classCardsContainer.appendChild(classCard);
    });
  }
  
  

  createClassCards();
