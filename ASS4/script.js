<<<<<<< HEAD

const form = document.getElementById("employeeForm");
=======
<<<<<<< HEAD

const form = document.getElementById("studentForm");
const table = document.getElementById("studentTable");
const message = document.getElementById("message");

let students = [];
>>>>>>> 5dd0b6973da3f6192ddd58019813a17ac62aaea4

form.addEventListener("submit", function (event) {
    event.preventDefault();

<<<<<<< HEAD
    // Get form values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const phone = document.getElementById("phone").value.trim();
    const department = document.getElementById("department").value;

    let valid = true;

    // Clear previous errors
    document.querySelectorAll("small").forEach(error => {
        error.textContent = "";
    });

    document.getElementById("message").textContent = "";

    // Validate name
    if (!/^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/.test(name)) {
        document.getElementById("nameError").textContent =
            "Enter a valid name using letters only.";
        valid = false;
    }

    // Validate email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        document.getElementById("emailError").textContent =
            "Please enter a valid email address.";
        valid = false;
    }

    // Validate password: 8+ characters, uppercase, lowercase, number
    if (
        password.length < 8 ||
        !/[A-Z]/.test(password) ||
        !/[a-z]/.test(password) ||
        !/[0-9]/.test(password)
    ) {
        document.getElementById("passwordError").textContent =
            "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number.";
        valid = false;
    }

    // Validate phone number
    if (!/^[6-9][0-9]{9}$/.test(phone)) {
        document.getElementById("phoneError").textContent =
            "Enter a valid 10-digit Indian mobile number.";
        valid = false;
    }

    // Validate department
    if (department === "") {
        document.getElementById("departmentError").textContent =
            "Please select a department.";
        valid = false;
    }

    // Stop if any validation fails
    if (!valid) {
        return;
    }

    // Registration successful
    document.getElementById("message").textContent =
        "Employee registered successfully!";

    document.getElementById("message").style.color = "green";

    // Reset form after successful registration
    form.reset();
});

=======
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

=======
/*====================================================
        KBTCOE WEBSITE
        script.js
====================================================*/


// ============================================
// LOADER
// ============================================

window.addEventListener("load", function () {

    const loader = document.querySelector(".loader");

    if (loader) {

        loader.style.opacity = "0";

        setTimeout(() => {

            loader.style.display = "none";

        }, 500);

    }

});



// ============================================
// STICKY NAVBAR
// ============================================

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", function () {

    if (window.scrollY > 80) {

        navbar.classList.add("shadow");

        navbar.style.padding = "10px 0";

    }

    else {

        navbar.classList.remove("shadow");

        navbar.style.padding = "15px 0";

    }

});




// ============================================
// SCROLL REVEAL
// ============================================

const reveals = document.querySelectorAll(".reveal");

function revealSection() {

    const windowHeight = window.innerHeight;

    reveals.forEach(function (element) {

        const top = element.getBoundingClientRect().top;

        if (top < windowHeight - 120) {

            element.classList.add("active");

        }

    });

}

window.addEventListener("scroll", revealSection);

revealSection();




// ============================================
// COUNTER ANIMATION
// ============================================

const counters = document.querySelectorAll(".counter");

const speed = 200;

counters.forEach(counter => {

    function updateCount() {

        const target = +counter.getAttribute("data-target");

        const count = +counter.innerText;

        const increment = target / speed;

        if (count < target) {

            counter.innerText = Math.ceil(count + increment);

            setTimeout(updateCount, 10);

        }

        else {

            counter.innerText = target;

        }

    }

    updateCount();

});




// ============================================
// BACK TO TOP BUTTON
// ============================================

const topButton = document.querySelector(".top-btn");

window.addEventListener("scroll", function () {

    if (!topButton) return;

    if (window.scrollY > 300) {

        topButton.style.display = "flex";

    }

    else {

        topButton.style.display = "none";

    }

});

if (topButton) {

    topButton.addEventListener("click", function (e) {

        e.preventDefault();

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}




// ============================================
// ACTIVE NAVIGATION
// ============================================

const currentPage = window.location.pathname.split("/").pop();

document.querySelectorAll(".navbar-nav .nav-link").forEach(link => {

    const href = link.getAttribute("href");

    if (href === currentPage) {

        link.classList.add("active");

    }

});




// ============================================
// CONTACT FORM VALIDATION
// ============================================

const form = document.querySelector("form");

if (form) {

    form.addEventListener("submit", function (e) {

        const name = document.querySelector("#name");

        const email = document.querySelector("#email");

        const message = document.querySelector("#message");

        if (

            name.value.trim() === "" ||

            email.value.trim() === "" ||

            message.value.trim() === ""

        ) {

            e.preventDefault();

            alert("Please fill all required fields.");

        }

    });

}




// ============================================
// SMOOTH SCROLL
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            e.preventDefault();

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});




// ============================================
// CARD HOVER EFFECT
// ============================================

const cards = document.querySelectorAll(".card");

cards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-10px)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0px)";

    });

});




// ============================================
// IMAGE ZOOM EFFECT
// ============================================

const images = document.querySelectorAll(".zoom img");

images.forEach(img => {

    img.addEventListener("mouseenter", () => {

        img.style.transform = "scale(1.1)";

    });

    img.addEventListener("mouseleave", () => {

        img.style.transform = "scale(1)";

    });

});




// ============================================
// BUTTON RIPPLE EFFECT
// ============================================

const buttons = document.querySelectorAll(".btn");

buttons.forEach(button => {

    button.addEventListener("click", function (e) {

        const circle = document.createElement("span");

        const diameter = Math.max(button.clientWidth, button.clientHeight);

        circle.style.width = diameter + "px";

        circle.style.height = diameter + "px";

        circle.style.position = "absolute";

        circle.style.borderRadius = "50%";

        circle.style.background = "rgba(255,255,255,.4)";

        circle.style.left =

            e.offsetX - diameter / 2 + "px";

        circle.style.top =

            e.offsetY - diameter / 2 + "px";

        circle.style.transform = "scale(0)";

        circle.style.animation = "ripple .6s linear";

        button.appendChild(circle);

        setTimeout(() => {

            circle.remove();

        }, 600);

    });

});




// ============================================
// CURRENT YEAR
// ============================================

const year = document.querySelector("#year");

if (year) {

    year.innerHTML = new Date().getFullYear();

}




// ============================================
// CONSOLE MESSAGE
// ============================================

console.log("KBTCOE Bootstrap Website Loaded Successfully.");
>>>>>>> 4d8a94c7beabe57384abe1da91fa731dd9003465
>>>>>>> 5dd0b6973da3f6192ddd58019813a17ac62aaea4
