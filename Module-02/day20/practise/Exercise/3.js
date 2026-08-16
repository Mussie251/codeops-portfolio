async function testWrongUrl() {
  const output = document.querySelector("#output");

  try {
    const res = await fetch("https://this-domain-does-not-exist-12345.com"
    );

    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }

    const data = await res.json();

    output.textContent = JSON.stringify(data, null, 2);
  } catch (error) {
      output.textContent = `Catch block ran:\n${error.    message}`;

      console.log("Catch block ran:", error.message);
      
  }
}

testWrongUrl();


//Real URL that returns 404

async function test404() {
  const output = document.querySelector("#output");

  try {
    const res = await fetch(
       "https://jsonplaceholder.typicode.com/posts/999999"
    );

    console.log("res.ok:", res.ok);
    console.log("status:", res.status);

    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }

    const data = await res.json();

    output.textContent = JSON.stringify(data, null, 2);

  } catch (error) {
    output.textContent = `Catch block ran:\n${error.message}`;
  }
}

test404();