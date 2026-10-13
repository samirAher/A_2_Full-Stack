
const form = document.getElementById("studentForm");
const table = document.getElementById("studentTable");
const message = document.getElementById("message");

let students = [];

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const roll = document.getElementById("roll").value.trim();
    const name = document.getElementById("name").value.trim();
    const course = document.getElementById("course").value.trim();

    // Validate text fields
    if (!roll || !name || !course) {
        showMessage("Please fill in all student details.", "red");
        return;
    }

    if (!/^[A-Za-z ]+$/.test(name)) {
        showMessage("Name must contain only letters and spaces.", "red");
        return;
    }

    // Prevent duplicate roll numbers
    if (students.some(s => s.roll.toLowerCase() === roll.toLowerCase())) {
        showMessage("This roll number already exists.", "red");
        return;
    }

    // Read and validate marks
    const marks = ["m1", "m2", "m3", "m4", "m5"].map(id => {
        const input = document.getElementById(id);
        return input.value.trim() === "" ? NaN : Number(input.value);
    });

    if (marks.some(mark =>
        !Number.isFinite(mark) ||
        !Number.isInteger(mark) ||
        mark < 0 ||
        mark > 100
    )) {
        showMessage("Enter whole-number marks from 0 to 100 in every subject.", "red");
        return;
    }

    // Calculate result
    const total = marks.reduce((sum, mark) => sum + mark, 0);
    const percentage = total / 5;

    const result = marks.every(mark => mark >= 35) ? "Pass" : "Fail";

    // Save student
    const student = {
        roll,
        name,
        course,
        total,
        percentage,
        result
    };

    students.push(student);

    // Update page
    displayStudents();
    updateSummary();

    form.reset();

    showMessage("Student result added successfully!", "green");
});

function showMessage(text, color) {
    message.textContent = text;
    message.style.color = color;
}

function displayStudents() {
    // Always clear the old table content first
    table.replaceChildren();

    if (students.length === 0) {
        const row = table.insertRow();
        const cell = row.insertCell();
        cell.colSpan = 7;
        cell.textContent = "No student records available.";
        return;
    }

    const highest = Math.max(...students.map(s => s.total));

    students.forEach(student => {
        const row = table.insertRow();

        const values = [
            student.roll,
            student.name,
            student.course,
            `${student.total} / 500`,
            `${student.percentage.toFixed(2)}%`,
            student.result + (student.total === highest ? " 🏆" : "")
        ];

        values.forEach(value => {
            const cell = row.insertCell();
            cell.textContent = value;
        });

        const actionCell = row.insertCell();
        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", function () {
            students = students.filter(s => s.roll !== student.roll);
            displayStudents();
            updateSummary();
            showMessage("Student record deleted.", "green");
        });

        actionCell.appendChild(deleteButton);
    });
}

function updateSummary() {
    document.getElementById("count").textContent = students.length;

    if (students.length === 0) {
        document.getElementById("topper").textContent = "None";
        return;
    }

    const highest = Math.max(...students.map(s => s.total));
    const toppers = students.filter(s => s.total === highest);

    document.getElementById("topper").textContent =
        toppers.length === 1
            ? `${toppers[0].name} (${highest}/500)`
            : `${toppers.length} students tied (${highest}/500)`;
}

// Display the empty state when the page first opens
displayStudents();
updateSummary();

