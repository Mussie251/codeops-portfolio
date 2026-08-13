const container = document.querySelector("#container");
const button = document.querySelector("#my-button");

button.addEventListener("click", (event) => {
    console.log("Button clicked");
    console.log(event.target);
});

container.addEventListener("click", () => {
    console.log("Div clicked");
});