async function getPost() {
  try {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/posts/1"
    );
    
    if (!res.ok) {
      throw new error("Failed to fetch post");
    }
    const data = await res.json();
    document.querySelector("#output").textContent = data.title;
  } catch (error) {
    document.querySelector("#output").textContent = `Error: ${error.message}`;
  }
}

getPost();