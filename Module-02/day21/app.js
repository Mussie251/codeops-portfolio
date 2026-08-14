const form = document.getElementById("signupForm");
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const errorArea = document.getElementById("error");
const signupCount = document.getElementById("signupCount");

// Ethiopian phone number regex
const ethiopianPhoneRegex = /^(09|07)\d{8}$/;

// Get existing signups from localStorage
let signups = JSON.parse(localStorage.getItem("signups")) || [];

// Show number of people already signed up
signupCount.textContent = `${signups.length} people have signed up.`;

// Handle form submission
form.addEventListener("submit", function (event) {

    // Stop the page from refreshing
    event.preventDefault();

    // Read and trim values
    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();

    // Clear previous error
    errorArea.textContent = "";

    // Validate name first
    if (name.length < 2) {
        errorArea.textContent = "Name must be at least 2 characters.";
        return;
    }

    // Validate phone
    if (!ethiopianPhoneRegex.test(phone)) {
        errorArea.textContent =
            "Please enter a valid Ethiopian phone number, e.g. 0912345678.";
        return;
    }

    // Create signup object
    const person = {
        name: name,
        phone: phone
    };

    // Add person to the array
    signups.push(person);

    // Save array as JSON in localStorage
    localStorage.setItem("signups", JSON.stringify(signups));

    // Clear the form
    form.reset();

    // Update signup count
    signupCount.textContent = `${signups.length} people have signed up.`;

    // Show success message
    errorArea.textContent = "Signup successful!";
});