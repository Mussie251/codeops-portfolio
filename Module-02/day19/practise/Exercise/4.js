const itemList = document.querySelector("#item-list");

itemList.addEventListener("click", (event) => {
    if (event.target.matches(".delete")) {
        event.target.closest("li").remove();
    }
});