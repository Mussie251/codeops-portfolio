async function fetchPosts() {
  const output = document.querySelector("#output");

  try {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/posts"
    );

    if (!res.ok) {
      throw new Error("Failed to fetch posts");
    }

    const posts = await res.json();
    const firstTwo = posts.slice(0, 2);
    const details = await Promise.all(
      firstTwo.map(async (post) => {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${post.id}`
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch post ${post.id}`
          );
        }

        return response.json();
      })
    );

    output.textContent = JSON.stringify(
      details,
      null,
      2
    );
  } catch (error) {
    output.textContent = `Error: ${error.message}`;
  }
  
}

fetchPosts();