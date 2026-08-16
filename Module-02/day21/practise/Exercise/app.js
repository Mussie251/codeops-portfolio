const PHONE = /^(?:\+251|0)9\d{8}$/;

const STORAGE_KEY = "people";

const form = document.querySelector("#signupForm");
const nameInput = document.querySelector("#name");
const phoneInput = document.querySelector("#phone");
const error = document.querySelector("#error");
const signupCount = document.querySelector("#signupCount");


// Save an array to localStorage
function save(items) {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(items)
    );
}


// Load an array from localStorage
function load() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);

        if (data === null) {
            return [];
        }

        const items = JSON.parse(data);

        if (!Array.isArray(items)) {
            return [];
        }

        return items;

    } catch (error) {
        return [];
    }
}


// Validate form data
function validate(name, phone) {

    if (name.trim().length < 2) {
        return "Enter your full name.";
    }

    if (!PHONE.test(phone)) {
        return "Enter a valid phone.";
    }

    return "";
}


// Display signup count
function updateSignupCount() {

    const entries = load();

    if (entries.length === 1) {
        signupCount.textContent = "1 person has signed up.";
    } else {
        signupCount.textContent =
            `${entries.length} people have signed up.`;
    }
}


// Handle form submission
form.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();

    const message = validate(name, phone);

    if (message !== "") {
        error.textContent = message;
        return;
    }

    const entries = load();

    entries.push({
        name: name,
        phone: phone
    });

    save(entries);

    error.textContent = "";

    form.reset();

    updateSignupCount();
});


// Run when the page loads
updateSignupCount();