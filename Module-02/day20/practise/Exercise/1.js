async function getUsdToEtbRate() {
  const res = await fetch(
    "https://api.frankfurter.app/latest?from=USD&to=ETB"
  );
  if (!res.ok) {
    throw new Error("Failed to fetch echange rate");

  }

  const datav = await res.json();
  return datav.rates.ETB;
}

getUsdToEtbRate()
  .then((rate) => {
      console.log(`1 USD = ${rate} ETB`);
  })
  .catch((error) => {
    console.error(error.message);
  });
  
  
