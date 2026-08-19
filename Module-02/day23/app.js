/* =========================================
   STATE
========================================= */

const state = {
  dishes: [],
  cart: [],
  search: ""
};


/* =========================================
   DOM ELEMENTS
========================================= */

const menuEl = document.querySelector("#menu");

const cartEl = document.querySelector("#cart");

const searchEl = document.querySelector("#search");

const menuCountEl = document.querySelector("#menu-count");


/* =========================================
   CATEGORY ICON
========================================= */

function getCategoryIcon(category) {

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
    return "🥣";
  }

  return "🍽️";
}


/* =========================================
   LOAD MENU
========================================= */

async function loadMenu() {

  menuEl.innerHTML = `
    <p class="loading">
      Loading menu...
    </p>
  `;

  try {

    const res = await fetch("data/menu.json");

    if (!res.ok) {
      throw new Error(
        `HTTP error: ${res.status}`
      );
    }

    state.dishes = await res.json();

    render();

  } catch (error) {

    console.error(error);

    menuEl.innerHTML = `
      <p class="error-message">
        Could not load the menu.
        Please make sure menu.json exists
        inside the data folder.
      </p>
    `;
  }
}


/* =========================================
   RENDER EVERYTHING
========================================= */

function render() {

  renderMenu();

  renderCart();
}


/* =========================================
   RENDER MENU
========================================= */

function renderMenu() {

  const term =
    state.search
      .trim()
      .toLowerCase();


  const shown =
    state.dishes.filter(dish =>
      dish.name
        .toLowerCase()
        .includes(term)
    );


  menuCountEl.textContent =
    `${shown.length} dishes`;


  if (shown.length === 0) {

    menuEl.innerHTML = `
      <p class="no-results">
        No dishes found.
      </p>
    `;

    return;
  }


  menuEl.innerHTML =
    shown.map(dish => `

      <article
        class="dish"
        data-id="${dish.id}"
      >

        <div
          class="dish-icon"
          aria-hidden="true"
        >
          ${getCategoryIcon(dish.category)}
        </div>


        <div class="dish-content">

          <h3>
            ${dish.name}
          </h3>


          <p class="category">
            ${dish.category}
          </p>


          <p class="price">
            ${dish.price.toLocaleString()} ETB
          </p>


          ${
            dish.spicy

              ? `
                <span class="spicy">
                  🌶️ Spicy
                </span>
              `

              : `
                <span class="mild">
                  Mild
                </span>
              `
          }


          <button
            type="button"
            class="add"
          >
            Add to cart
          </button>

        </div>

      </article>

    `).join("");
}


/* =========================================
   CART TOTAL
========================================= */

function cartTotal() {

  return state.cart.reduce(
    (total, item) => {

      return total +
        item.price * item.qty;

    },
    0
  );
}


/* =========================================
   CART ITEM COUNT
========================================= */

function cartItemCount() {

  return state.cart.reduce(
    (total, item) => {

      return total + item.qty;

    },
    0
  );
}


/* =========================================
   RENDER CART
========================================= */

function renderCart() {

  const total =
    cartTotal();

  const itemCount =
    cartItemCount();


  if (state.cart.length === 0) {

    cartEl.innerHTML = `

      <div class="cart-header">

        <h2 id="cart-heading">
          Your Order
        </h2>

        <span
          class="cart-icon"
          aria-hidden="true"
        >
          🛒
        </span>

      </div>


      <div class="empty-cart">

        <span
          class="empty-cart-icon"
          aria-hidden="true"
        >
          🛍️
        </span>

        <p>
          Your cart is empty.
        </p>

        <p>
          Add a dish to get started.
        </p>

      </div>

    `;

    return;
  }


  cartEl.innerHTML = `

    <div class="cart-header">

      <h2 id="cart-heading">
        Your Order
      </h2>

      <span class="cart-icon">
        🛒 ${itemCount}
      </span>

    </div>


    <ul class="cart-list">

      ${state.cart.map(item => `

        <li
          class="cart-item"
          data-id="${item.id}"
        >

          <div class="cart-item-info">

            <h3>
              ${item.name}
            </h3>

            <p class="cart-item-price">
              ${item.price.toLocaleString()} ETB each
            </p>


            <div
              class="quantity-controls"
              aria-label="Quantity controls"
            >

              <button
                type="button"
                class="qty-btn decrease"
                aria-label="Decrease ${item.name} quantity"
              >
                −
              </button>


              <span class="quantity">
                ${item.qty}
              </span>


              <button
                type="button"
                class="qty-btn increase"
                aria-label="Increase ${item.name} quantity"
              >
                +
              </button>

            </div>

          </div>


          <button
            type="button"
            class="remove"
            aria-label="Remove ${item.name}"
          >
            Remove
          </button>

        </li>

      `).join("")}

    </ul>


    <div class="cart-total">

      <span>
        Total
      </span>

      <strong class="total-amount">
        ${total.toLocaleString()} ETB
      </strong>

    </div>


    <button
      type="button"
      class="checkout-btn"
    >
      Checkout
    </button>

  `;
}


/* =========================================
   ADD TO CART
========================================= */

function addToCart(id) {

  const dish =
    state.dishes.find(
      dish => dish.id === id
    );


  if (!dish) {
    return;
  }


  const existing =
    state.cart.find(
      item => item.id === id
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

  render();
}


/* =========================================
   REMOVE FROM CART
========================================= */

function removeFromCart(id) {

  state.cart =
    state.cart.filter(
      item => item.id !== id
    );


  saveCart();

  render();
}


/* =========================================
   CHANGE QUANTITY
========================================= */

function changeQuantity(id, amount) {

  const item =
    state.cart.find(
      item => item.id === id
    );


  if (!item) {
    return;
  }


  item.qty += amount;


  if (item.qty <= 0) {

    state.cart =
      state.cart.filter(
        item => item.id !== id
      );

  }


  saveCart();

  render();
}


/* =========================================
   SAVE CART
========================================= */

function saveCart() {

  localStorage.setItem(
    "addisEatsCart",
    JSON.stringify(state.cart)
  );
}


/* =========================================
   LOAD CART
========================================= */

function loadCart() {

  const saved =
    localStorage.getItem(
      "addisEatsCart"
    );


  if (!saved) {
    return;
  }


  try {

    state.cart =
      JSON.parse(saved);

  } catch (error) {

    console.error(
      "Could not restore cart:",
      error
    );

    state.cart = [];

  }
}


/* =========================================
   SEARCH EVENT
========================================= */

searchEl.addEventListener(
  "input",
  event => {

    state.search =
      event.target.value;

    renderMenu();

  }
);


/* =========================================
   MENU EVENT DELEGATION
========================================= */

menuEl.addEventListener(
  "click",
  event => {

    const button =
      event.target.closest(".add");


    if (!button) {
      return;
    }


    const card =
      button.closest(".dish");


    const id =
      Number(card.dataset.id);


    addToCart(id);

  }
);


/* =========================================
   CART EVENT DELEGATION
========================================= */

cartEl.addEventListener(
  "click",
  event => {

    const item =
      event.target.closest(".cart-item");


    if (!item) {
      return;
    }


    const id =
      Number(item.dataset.id);


    if (
      event.target.closest(".increase")
    ) {

      changeQuantity(id, 1);

      return;
    }


    if (
      event.target.closest(".decrease")
    ) {

      changeQuantity(id, -1);

      return;
    }


    if (
      event.target.closest(".remove")
    ) {

      removeFromCart(id);

    }

  }
);


/* =========================================
   INITIALIZE APP
========================================= */

async function init() {

  loadCart();

  await loadMenu();

}


init();