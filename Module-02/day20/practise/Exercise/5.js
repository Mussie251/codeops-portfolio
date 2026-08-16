const loadBtn = document.querySelector("#loadBtn");
const status = document.querySelector("#status");
const dataContainer = document.querySelector("#data");

async function loadData() {
  status.textContent = "Loading...";
  dataContainer.textContent = "";

  try {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/posts/1"
    );

    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }

    const data = await res.json();
    status.textContent = "Success";

    dataContainer.innerHTML = `
         <h2>${data.title}</h2>
         <p>${data.body}</p>`;

  }catch (error) {
    status.textContent = "Error";
    dataContainer.textContent = `Something went wrong: ${error.message}`;
  }
}

loadBtn.addEventListener("click", loadBtn);











