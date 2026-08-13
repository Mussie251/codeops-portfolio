const form = document.querySelector("#item-form");
const input = document.querySelector("#item-input");
const itemList = document.querySelector("#item-list");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const item = input.value.trim();

    if (!item) {
        return;
    }

    const li = document.createElement("li");

    li.textContent = item;

    itemList.append(li);

    input.value = "";
});