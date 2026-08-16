const input = document.querySelector("#countryInput");
const facts = document.querySelector("#facts");
const form = document.querySelector("#searchForm");
function renderFact(container, label, value) {
  const div = document.createElement("div");
  div.classList.add("fact");

  const strong = document.createElement("strong");
  strong.textContent = `${label}:`;

  const span = document.createElement("span");
  span.textContent = value;

  div.appendChild(strong);
  div.appendChild(span);

  container.appendChild(div);
}

async function showCountry(name) {
  facts.textContent = "Loading...";

  try {
    const res =await fetch(
       `https://restcountries.com/v3.1/name/${encodeURIComponent(name)}`
    );

    if (!res.ok) {
      throw new Error("Country not found");
    }

    const countries = await res.json();
    const country = countries[0];

    facts.innerHTML = "";

    const flag = document.createElement("img");

    flag.src = country.flags.svg;
    flag.alt = `Flag of ${country.name.common}`;
    flag.classList.add("flag");

    facts.appendChild(heading);

    const capital = country.capital ? country.capital[0]: "N/A";

    renderFact(
      facts, "Capital", capital
    );

    renderFact(
      facts, "Region", country.region
    );

    const currencies = country.currencies ? Object.values  (country.currencies).map(currency => {
      return `${currency.name} (${currency.symbol || "N/A"})`;
    })
    .join(", ")
    : "N/A";
   
    renderFact(
      facts, "Currencies", currencies
    );

  } catch (error) {
      facts.textContent = error.message;

      facts.classList.add("error");
    }
  }


form.addEventListener("submit", function (event) {
    event.preventDefault();

    const countryName = input.value.trim();

    if (countryName === "") {
        facts.textContent = "Please enter a country name.";
        return;
    }

    facts.classList.remove("error");

    showCountry(countryName);
});


showCountry("Ethiopia");
