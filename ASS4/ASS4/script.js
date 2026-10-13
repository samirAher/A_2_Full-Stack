
const form = document.getElementById("employeeForm");

form.addEventListener("submit", function (event) {
    event.preventDefault();

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

