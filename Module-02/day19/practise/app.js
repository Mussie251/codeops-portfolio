// Cache DOM elements
const form = document.querySelector("#add-form");
const nameInput = document.querySelector("#name");
const priceInput = document.querySelector("#price");
const list = document.querySelector("#list");
const totalEl = document.querySelector("#total");


// Add a new item to the list
function addRow(name, price) {
    const li = document.createElement("li");

    li.innerHTML = `
        <div class="item-info">
            <span class="item-name"></span>
            <span class="item-price"></span>
        </div>

        <div class="actions">
            <button class="delete" type="button">
                Delete
            </button>
        </div>
    `;

    li.querySelector(".item-name").textContent = name;

    li.querySelector(".item-price").textContent =
        `${price.toFixed(2)} ETB`;

    list.append(li);
}


// Calculate and display total
function updateTotal() {
    let total = 0;

    const items = list.querySelectorAll("li");

    items.forEach((item) => {
        const priceText = item.querySelector(".item-price").textContent;

        const price = Number(
            priceText.replace(" ETB", "")
        );

        total += price;
    });

    totalEl.textContent = `${total.toFixed(2)} ETB`;
}


// Handle form submission
form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = nameInput.value.trim();
    const price = Number(priceInput.value);

    // Validate input
    if (!name || !price || price < 0) {
        return;
    }

    addRow(name, price);

    form.reset();

    updateTotal();
});


// Event delegation
list.addEventListener("click", (event) => {

    // Delete item
    if (event.target.matches(".delete")) {

        event.target.closest("li").remove();

        updateTotal();

    }

    // Toggle bought state
    else if (event.target.closest("li")) {

        event.target.closest("li").classList.toggle("bought");

    }

});