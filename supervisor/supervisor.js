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
        {name:"Brandon Ovwigho", status: "present"},
      ],
    },
    {
      className: "Class 2",
      students: [
        { name: "Student 1", status: "present" },
        { name: "Student 2", status: "present" },
        { name: "Student 3", status: "absent" },
        {name: "BRANDON OWNOWKANGHO", status:"absent"},
      ],
    },
    {
        className: "Class 3",
        students: [
          { name: "Student 1", status: "present" },
          { name: "Student 2", status: "present" },
          { name: "Student 3", status: "absent" },
          {name: "Ryan Chan", status: "present"}
        ],
      },
      {
        className: "Class 4",
        students: [
          { name: "Student 1", status: "present" },
          { name: "Student 2", status: "present" },
          { name: "Student 3", status: "absent" },
        ],
      },
      {
        className: "Class 5",
        students: [
          { name: "Student 1", status: "present" },
          { name: "Student 2", status: "present" },
          { name: "Student 3", status: "absent" },
        ],
      },
      {
        className: "Class 6",
        students: [
          { name: "Student 1", status: "present" },
          { name: "Student 2", status: "present" },
          { name: "Student 3", status: "absent" },
        ],
      },
    
  ];


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
  
    mockClasses.forEach((classData) => {
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
  
      // add card to container
      classCardsContainer.appendChild(classCard);
    });
  }

  createClassCards();
