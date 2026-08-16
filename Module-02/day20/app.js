const API_URL = "https://jsonplaceholder.typicode.com/posts";

const list = document.querySelector("#list");
const loading = document.querySelector("#loading");
const error = document.querySelector("#error");
const refreshBtn = document.querySelector("#refreshBtn");

async function load() {
  loading.textContent = "Loading...";
  error.textContent = "";
  list.innerHTML = "";

  try {
    const res = await fetch(API_URL);
    if (!res.ok) {
      throw new Error("Failed to fetch data");

    }
    const data = await res.json();

    data.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item.title;
      list.appendChild(li);
    });
  } catch (err) {
    error.textContent = "Sorry, something went wrong. Please try again.";
    console.error(err);
  } finally {
    loading.textContent = "";
  }
}

refreshBtn.addEventListener("click", load);

load();