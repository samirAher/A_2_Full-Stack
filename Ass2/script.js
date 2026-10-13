// Get stored students from localStorage
let students = JSON.parse(localStorage.getItem("students")) || [];

// Form submission
document.getElementById("studentForm").addEventListener("submit", function (event) {

    event.preventDefault();

    // Get student information
    const name = document.getElementById("studentName").value.trim();
    const rollNo = document.getElementById("rollNo").value.trim();

    // Get marks
    const marks = [
        Number(document.getElementById("subject1").value),
        Number(document.getElementById("subject2").value),
        Number(document.getElementById("subject3").value),
        Number(document.getElementById("subject4").value),
        Number(document.getElementById("subject5").value)
    ];

    // Validate marks
    for (let mark of marks) {
        if (mark < 0 || mark > 100 || isNaN(mark)) {
            alert("Marks must be between 0 and 100.");
            return;
        }
    }

    // Check duplicate roll number
    const duplicate = students.some(student => student.rollNo === rollNo);

    if (duplicate) {
        alert("A student with this roll number already exists.");
        return;
    }

    // Calculate total
    const total = marks.reduce((sum, mark) => sum + mark, 0);

    // Calculate percentage
    const percentage = total / 5;

    // Calculate grade
    const grade = calculateGrade(percentage);

    // Create student object
    const student = {
        id: Date.now(),
        name: name,
        rollNo: rollNo,
        marks: marks,
        total: total,
        percentage: percentage,
        grade: grade
    };

    // Add student to array
    students.push(student);

    // Save to localStorage
    saveStudents();

    // Display records
    displayStudents();

    // Display topper
    displayTopper();

    // Clear form
    clearForm();

    alert("Student record added successfully!");
});


// Calculate grade
function calculateGrade(percentage) {

    if (percentage >= 90) {
        return "A+";
    } else if (percentage >= 80) {
        return "A";
    } else if (percentage >= 70) {
        return "B";
    } else if (percentage >= 60) {
        return "C";
    } else if (percentage >= 50) {
        return "D";
    } else if (percentage >= 35) {
        return "E";
    } else {
        return "F";
    }
}


// Display all students
function displayStudents() {

    const tableBody = document.getElementById("studentTableBody");

    tableBody.innerHTML = "";

    if (students.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="12">
                    No student records available.
                </td>
            </tr>
        `;

        return;
    }

    students.forEach((student, index) => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>

            <td>${student.name}</td>

            <td>${student.rollNo}</td>

            <td>${student.marks[0]}</td>

            <td>${student.marks[1]}</td>

            <td>${student.marks[2]}</td>

            <td>${student.marks[3]}</td>

            <td>${student.marks[4]}</td>

            <td><strong>${student.total}</strong></td>

            <td class="percentage">
                ${student.percentage.toFixed(2)}%
            </td>

            <td class="grade">
                ${student.grade}
            </td>

            <td>
                <button
                    class="delete-btn"
                    onclick="deleteStudent(${student.id})">
                    Delete
                </button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}


// Display topper
function displayTopper() {

    const topperElement = document.getElementById("topper");

    if (students.length === 0) {
        topperElement.innerHTML = "No student records available.";
        return;
    }

    // Find student with highest percentage
    const highestPercentage = Math.max(
        ...students.map(student => student.percentage)
    );

    // Find all students having the highest percentage
    const toppers = students.filter(
        student => student.percentage === highestPercentage
    );

    if (toppers.length === 1) {

        const topper = toppers[0];

        topperElement.innerHTML = `
            🏆 <strong>${topper.name}</strong>
            <br>
            Roll No: ${topper.rollNo}
            <br>
            Total Marks: ${topper.total}/500
            <br>
            Percentage:
            <span class="percentage">
                ${topper.percentage.toFixed(2)}%
            </span>
            <br>
            Grade: ${topper.grade}
        `;

    } else {

        let topperHTML = `
            🏆 <strong>Joint Toppers</strong>
            <br><br>
        `;

        toppers.forEach(topper => {

            topperHTML += `
                <div>
                    <strong>${topper.name}</strong>
                    (Roll No: ${topper.rollNo})
                    -
                    ${topper.percentage.toFixed(2)}%
                </div>
            `;
        });

        topperElement.innerHTML = topperHTML;
    }
}


// Delete one student
function deleteStudent(id) {

    const confirmation = confirm(
        "Are you sure you want to delete this student record?"
    );

    if (!confirmation) {
        return;
    }

    students = students.filter(student => student.id !== id);

    saveStudents();

    displayStudents();

    displayTopper();
}


// Delete all students
function deleteAllStudents() {

    if (students.length === 0) {
        alert("There are no records to delete.");
        return;
    }

    const confirmation = confirm(
        "Are you sure you want to delete ALL student records?"
    );

    if (!confirmation) {
        return;
    }

    students = [];

    saveStudents();

    displayStudents();

    displayTopper();
}


// Clear form
function clearForm() {

    document.getElementById("studentForm").reset();

    document.getElementById("studentName").focus();
}


// Save students to localStorage
function saveStudents() {

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );
}


// Load records when page opens
displayStudents();

displayTopper();