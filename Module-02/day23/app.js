// ==========================================
// ADDIS EATS
// Module 2 - Day 23/24 Project
// ==========================================


// ==========================================
// 1. APPLICATION STATE
// ==========================================

const state = {
  dishes: [],
  cart: [],
  search: ""
};


// ==========================================
// 2. GET HTML ELEMENTS
// ==========================================

const menuEl = document.querySelector("#menu");

const menuCountEl =
  document.querySelector("#menu-count");

const searchEl =
  document.querySelector("#search");

const cartItemsEl =
  document.querySelector("#cart-items");

const cartCountEl =
  document.querySelector("#cart-count");

const totalEl =
  document.querySelector("#total");

const checkoutForm =
  document.querySelector("#checkout-form");

const nameInput =
  document.querySelector("#customer-name");

const phoneInput =
  document.querySelector("#phone");

const nameError =
  document.querySelector("#name-error");

const phoneError =
  document.querySelector("#phone-error");

const checkoutError =
  document.querySelector("#checkout-error");


// ==========================================
// 3. LOCAL STORAGE
// ==========================================

function saveCart() {

  localStorage.setItem(
    "addisEatsCart",
    JSON.stringify(state.cart)
  );

}


function loadCart() {

  const savedCart =
    localStorage.getItem("addisEatsCart");

  if (!savedCart) {
    return;
  }

  try {

    state.cart = JSON.parse(savedCart);

  } catch (error) {

    console.error(
      "Could not load saved cart:",
      error
    );

    state.cart = [];

  }

}


// ==========================================
// 4. LOAD MENU FROM JSON
// ==========================================

async function loadMenu() {

  menuEl.innerHTML = `
    <p class="loading">
      Loading menu...
    </p>
  `;

  try {

    const response =
      await fetch("data/menu.json");

    if (!response.ok) {

      throw new Error(
        `HTTP error: ${response.status}`
      );

    }

    state.dishes =
      await response.json();

    render();

  } catch (error) {

    console.error(
      "MENU ERROR:",
      error
    );

    menuEl.innerHTML = `
      <p class="error-message">
        Could not load the menu.
        Please make sure menu.json exists
        inside the data folder.
      </p>
    `;

  }

}


// ==========================================
// 5. GET DISH ICON
// ==========================================

function getDishIcon(category) {

  if (category === "Main") {
    return "🍛";
  }

  if (category === "Vegetarian") {
    return "🥗";
  }

  if (category === "Breakfast") {
    return "🍳";
  }

  if (category === "Side") {
    return "🧀";
  }

  return "🍽️";

}


// ==========================================
// 6. RENDER EVERYTHING
// ==========================================

function render() {

  renderMenu();

  renderCart();

}


// ==========================================
// 7. RENDER MENU
// ==========================================

function renderMenu() {

  const term =
    state.search
      .toLowerCase()
      .trim();


  const shown =
    state.dishes.filter((dish) => {

      const name =
        dish.name.toLowerCase();

      const category =
        dish.category.toLowerCase();

      return (
        name.includes(term) ||
        category.includes(term)
      );

    });


  // Update menu count

  menuCountEl.textContent =
    `${shown.length} dishes`;


  // No results

  if (shown.length === 0) {

    menuEl.innerHTML = `
      <div class="no-results">

        <div class="no-results-icon">
          🔍
        </div>

        <h3>
          No dishes found
        </h3>

        <p>
          Try another search.
        </p>

      </div>
    `;

    return;

  }


  // Create dish cards

  menuEl.innerHTML =
    shown.map((dish) => {

      const icon =
        getDishIcon(dish.category);


      return `

        <article
          class="dish"
          data-id="${dish.id}"
        >

          <div
            class="dish-icon"
            aria-hidden="true"
          >
            ${icon}
          </div>


          <div class="dish-content">

            <span class="dish-category">
              ${dish.category}
            </span>


            <h3>
              ${dish.name}
            </h3>


            <div class="dish-info">

              <span class="price">
                ${dish.price.toLocaleString()} ETB
              </span>


              ${
                dish.spicy
                  ? `
                    <span class="spicy">
                      🌶️ Spicy
                    </span>
                  `
                  : ""
              }

            </div>


            <button
              class="add"
              type="button"
            >
              Add to Cart
            </button>

          </div>

        </article>

      `;

    }).join("");

}


// ==========================================
// 8. SEARCH
// ==========================================

searchEl.addEventListener(
  "input",
  (event) => {

    state.search =
      event.target.value;

    renderMenu();

  }
);


// ==========================================
// 9. ADD TO CART
// ==========================================

menuEl.addEventListener(
  "click",
  (event) => {

    if (
      !event.target.matches(".add")
    ) {
      return;
    }


    // Find the dish card

    const card =
      event.target.closest(".dish");


    // Get dish ID

    const id =
      Number(card.dataset.id);


    // Find dish in state

    const dish =
      state.dishes.find(
        (item) => item.id === id
      );


    if (!dish) {
      return;
    }


    // Check whether it already exists

    const existing =
      state.cart.find(
        (item) => item.id === id
      );


    if (existing) {

      existing.qty += 1;

    } else {

      state.cart.push({

        ...dish,

        qty: 1

      });

    }


    saveCart();

    renderCart();

  }
);


// ==========================================
// 10. RENDER CART
// ==========================================

function renderCart() {

  // Empty cart

  if (state.cart.length === 0) {

    cartItemsEl.innerHTML = `
      <div class="empty-cart">

        <div
          class="empty-cart-icon"
          aria-hidden="true"
        >
          🛒
        </div>

        <p>
          Your cart is empty.
        </p>

        <small>
          Add some Ethiopian favorites!
        </small>

      </div>
    `;


    cartCountEl.textContent = "0";

    totalEl.textContent = "0 ETB";

    return;

  }


  // Render cart items

  cartItemsEl.innerHTML =
    state.cart.map((item) => {

      return `

        <div
          class="cart-item"
          data-id="${item.id}"
        >

          <div class="cart-item-info">

            <strong>
              ${item.name}
            </strong>

            <span>
              ${item.price.toLocaleString()} ETB
            </span>

          </div>


          <div class="cart-item-actions">

            <button
              class="qty-minus"
              type="button"
              aria-label="Decrease quantity"
            >
              −
            </button>


            <span class="quantity">
              ${item.qty}
            </span>


            <button
              class="qty-plus"
              type="button"
              aria-label="Increase quantity"
            >
              +
            </button>


            <button
              class="rm"
              type="button"
              aria-label="Remove ${item.name}"
            >
              ×
            </button>

          </div>


          <strong class="item-subtotal">
            ${(item.price * item.qty).toLocaleString()} ETB
          </strong>

        </div>

      `;

    }).join("");


  // Calculate total quantity

  const totalItems =
    state.cart.reduce(
      (sum, item) =>
        sum + item.qty,
      0
    );


  cartCountEl.textContent =
    totalItems;


  // Calculate total price

  const total =
    cartTotal();


  totalEl.textContent =
    `${total.toLocaleString()} ETB`;

}


// ==========================================
// 11. CALCULATE CART TOTAL
// ==========================================

function cartTotal() {

  return state.cart.reduce(
    (sum, item) => {

      return (
        sum +
        item.price * item.qty
      );

    },
    0
  );

}


// ==========================================
// 12. CART BUTTONS
// ==========================================

cartItemsEl.addEventListener(
  "click",
  (event) => {

    const cartItem =
      event.target.closest(".cart-item");


    if (!cartItem) {
      return;
    }


    const id =
      Number(cartItem.dataset.id);


    const item =
      state.cart.find(
        (product) => product.id === id
      );


    if (!item) {
      return;
    }


    // Increase quantity

    if (
      event.target.matches(".qty-plus")
    ) {

      item.qty += 1;

    }


    // Decrease quantity

    else if (
      event.target.matches(".qty-minus")
    ) {

      item.qty -= 1;


      if (item.qty <= 0) {

        state.cart =
          state.cart.filter(
            (product) =>
              product.id !== id
          );

      }

    }


    // Remove completely

    else if (
      event.target.matches(".rm")
    ) {

      state.cart =
        state.cart.filter(
          (product) =>
            product.id !== id
        );

    }


    saveCart();

    renderCart();

  }
);


// ==========================================
// 13. VALIDATE NAME
// ==========================================

function validateName() {

  const name =
    nameInput.value.trim();


  if (name.length < 2) {

    nameError.textContent =
      "Name must be at least 2 characters.";

    return false;

  }


  nameError.textContent = "";

  return true;

}


// ==========================================
// 14. VALIDATE ETHIOPIAN PHONE
// ==========================================

function validatePhone() {

  const phone =
    phoneInput.value.trim();


  const phoneRegex =
    /^(09\d{8}|\+2519\d{8})$/;


  if (!phoneRegex.test(phone)) {

    phoneError.textContent =
      "Enter a valid Ethiopian phone number.";

    return false;

  }


  phoneError.textContent = "";

  return true;

}


// ==========================================
// 15. LIVE NAME VALIDATION
// ==========================================

nameInput.addEventListener(
  "input",
  () => {

    validateName();

  }
);


// ==========================================
// 16. LIVE PHONE VALIDATION
// ==========================================

phoneInput.addEventListener(
  "input",
  () => {

    validatePhone();

  }
);


// ==========================================
// 17. CHECKOUT
// ==========================================

checkoutForm.addEventListener(
  "submit",
  (event) => {

    event.preventDefault();


    // Clear previous checkout error

    checkoutError.textContent = "";


    // Don't allow empty cart

    if (state.cart.length === 0) {

      checkoutError.textContent =
        "Your cart is empty. Add a dish before placing an order.";

      return;

    }


    // Validate name

    const validName =
      validateName();


    // Validate phone

    const validPhone =
      validatePhone();


    if (!validName || !validPhone) {

      checkoutError.textContent =
        "Please correct the errors above.";

      return;

    }


    // Get selected payment method

    const paymentInput =
      document.querySelector(
        'input[name="payment"]:checked'
      );


    const payment =
      paymentInput.value;


    // Get customer information

    const customerName =
      nameInput.value.trim();


    const phone =
      phoneInput.value.trim();


    // Get total

    const total =
      cartTotal();


    // Create payment display name

    let paymentName;


    if (payment === "telebirr") {

      paymentName = "TeleBirr";

    }

    else if (payment === "cbe-birr") {

      paymentName = "CBE Birr";

    }

    else {

      paymentName =
        "Cash on Delivery";

    }


    // Show confirmation

    checkoutError.innerHTML = `
      <strong>
        Order placed successfully! 🎉
      </strong>
      <br>
      Thank you, ${customerName}.
      <br>
      Total:
      ${total.toLocaleString()} ETB
      <br>
      Payment:
      ${paymentName}
    `;


    checkoutError.classList.add(
      "success-message"
    );


    // Clear cart

    state.cart = [];

    saveCart();

    renderCart();


    // Clear form

    checkoutForm.reset();


    // Restore TeleBirr as default

    const defaultPayment =
      document.querySelector(
        'input[value="telebirr"]'
      );


    if (defaultPayment) {
      defaultPayment.checked = true;
    }

  }
);


// ==========================================
// 18. APPLICATION START
// ==========================================

async function init() {

  loadCart();

  await loadMenu();

}


// Start application

init();