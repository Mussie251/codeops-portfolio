

const API_URL =
    "https://open.er-api.com/v6/latest/ETB";




const amountInput =
    document.querySelector("#amount");

const currencySelect =
    document.querySelector("#currency");

const conversionResult =
    document.querySelector("#conversion-result");

const rateResult =
    document.querySelector("#rate-result");

const addWatchlistButton =
    document.querySelector("#add-watchlist");

const statusElement =
    document.querySelector("#status");

const watchlistElement =
    document.querySelector("#watchlist");

const clearWatchlistButton =
    document.querySelector("#clear-watchlist");




const state = {

    rates: {},

    currencies: {},

    selectedCurrency: "USD",

    amount: 100,

    watchlist: [],

    loading: false,

    error: null
};




const currencyNames = {

    USD: "US Dollar",

    EUR: "Euro",

    GBP: "British Pound",

    CAD: "Canadian Dollar",

    AUD: "Australian Dollar",

    JPY: "Japanese Yen",

    CNY: "Chinese Yuan",

    INR: "Indian Rupee",

    CHF: "Swiss Franc",

    ZAR: "South African Rand",

    KES: "Kenyan Shilling",

    UGX: "Ugandan Shilling",

    AED: "UAE Dirham",

    SAR: "Saudi Riyal",

    TRY: "Turkish Lira",

    RUB: "Russian Ruble",

    SEK: "Swedish Krona",

    NOK: "Norwegian Krone",

    DKK: "Danish Krone",

    BRL: "Brazilian Real"
};




function loadWatchlist() {

    try {

        const saved =
            localStorage.getItem("birrWatchlist");

        if (!saved) {

            state.watchlist = [];

            return;
        }

        const parsed =
            JSON.parse(saved);

        if (Array.isArray(parsed)) {

            state.watchlist = parsed;

        } else {

            state.watchlist = [];
        }

    } catch (error) {

        console.error(
            "Could not load watchlist:",
            error
        );

        state.watchlist = [];
    }
}




function saveWatchlist() {

    localStorage.setItem(
        "birrWatchlist",
        JSON.stringify(state.watchlist)
    );
}




async function fetchRates() {

    state.loading = true;

    state.error = null;

    statusElement.textContent =
        "Loading rates...";

    try {

        const response =
            await fetch(API_URL);


        

        if (!response.ok) {

            throw new Error(
                `HTTP error: ${response.status}`
            );
        }


        

        const data =
            await response.json();


        

        if (
            data.result !== "success"
        ) {

            throw new Error(
                "API returned an error."
            );
        }


       

        state.rates =
            data.rates;


        

        buildCurrencyList();


        

        renderConversion();


        state.loading = false;

        statusElement.textContent =
            `Rates updated: ${formatDate(data.time_last_update_utc)}`;

    } catch (error) {

        console.error(error);

        state.loading = false;

        state.error = error.message;

        statusElement.textContent =
            "Unable to load exchange rates.";

        conversionResult.textContent =
            "Something went wrong.";

        rateResult.textContent =
            "Please check your internet connection.";
    }
}




function formatDate(dateText) {

    if (!dateText) {
        return "";
    }

    const date =
        new Date(dateText);

    if (Number.isNaN(date.getTime())) {
        return "";
    }

    return date.toLocaleDateString();
}




function buildCurrencyList() {

    currencySelect.innerHTML = "";


    

    const currencies =
        Object.keys(state.rates)
            .filter(
                code => code !== "ETB"
            )
            .sort();


    currencies.forEach(code => {

        const option =
            document.createElement("option");

        option.value = code;


        const name =
            currencyNames[code] ||
            code;


        option.textContent =
            `${code} - ${name}`;


        currencySelect.appendChild(option);
    });


    

    if (
        currencies.includes(
            state.selectedCurrency
        )
    ) {

        currencySelect.value =
            state.selectedCurrency;

    } else {

        state.selectedCurrency =
            currencies[0];

        currencySelect.value =
            state.selectedCurrency;
    }
}




function convertAmount() {

    const amount =
        Number(amountInput.value);

    const currency =
        state.selectedCurrency;


    

    if (
        !Number.isFinite(amount) ||
        amount < 0
    ) {

        return null;
    }


   

    const rate =
        state.rates[currency];


    if (!rate) {

        return null;
    }


    const converted =
        amount * rate;


    return {

        amount,

        currency,

        rate,

        converted
    };
}


function renderConversion() {

    const result =
        convertAmount();


    if (!result) {

        conversionResult.textContent =
            "Enter a valid amount.";

        rateResult.textContent =
            "";

        return;
    }


    conversionResult.textContent =
        `${formatNumber(result.amount)} ETB = ${formatNumber(result.converted)} ${result.currency}`;


    rateResult.textContent =
        `1 ETB = ${formatNumber(result.rate)} ${result.currency}`;
}




function formatNumber(number) {

    return Number(number).toLocaleString(
        undefined,
        {
            minimumFractionDigits: 2,
            maximumFractionDigits: 4
        }
    );
}




function addToWatchlist() {

    const currency =
        state.selectedCurrency;


    if (!currency) {

        return;
    }


   

    if (
        state.watchlist.includes(currency)
    ) {

        statusElement.textContent =
            `${currency} is already in your watchlist.`;

        return;
    }


    state.watchlist.push(currency);


    saveWatchlist();

    renderWatchlist();


    statusElement.textContent =
        `${currency} added to watchlist.`;
}




function removeFromWatchlist(currency) {

    state.watchlist =
        state.watchlist.filter(
            item => item !== currency
        );


    saveWatchlist();

    renderWatchlist();
}



function renderWatchlist() {

    watchlistElement.innerHTML = "";


    if (
        state.watchlist.length === 0
    ) {

        watchlistElement.innerHTML = `
            <p class="empty-message">
                Your watchlist is empty.
                Select a currency and add it above.
            </p>
        `;

        return;
    }


    state.watchlist.forEach(currency => {

        const rate =
            state.rates[currency];


        const name =
            currencyNames[currency] ||
            currency;


        const item =
            document.createElement("div");

        item.className =
            "watch-item";


        item.innerHTML = `

            <div class="watch-info">

                <span class="watch-code">
                    ${currency}
                </span>

                <span class="watch-name">
                    ${name}
                </span>

                <span>
                    1 ETB = ${rate
                        ? formatNumber(rate)
                        : "..."}
                    ${currency}
                </span>

            </div>


            <button
                class="remove-btn"
                data-currency="${currency}"
                aria-label="Remove ${currency}"
            >
                ×
            </button>

        `;


        watchlistElement.appendChild(item);
    });
}




function clearWatchlist() {

    state.watchlist = [];

    saveWatchlist();

    renderWatchlist();

    statusElement.textContent =
        "Watchlist cleared.";
}




amountInput.addEventListener(
    "input",
    () => {

        state.amount =
            Number(amountInput.value);

        renderConversion();
    }
);




currencySelect.addEventListener(
    "change",
    () => {

        state.selectedCurrency =
            currencySelect.value;

        renderConversion();
    }
);




addWatchlistButton.addEventListener(
    "click",
    addToWatchlist
);




clearWatchlistButton.addEventListener(
    "click",
    clearWatchlist
);




watchlistElement.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                ".remove-btn"
            );


        if (!button) {
            return;
        }


        const currency =
            button.dataset.currency;


        removeFromWatchlist(currency);
    }
);




function init() {

    loadWatchlist();

    renderWatchlist();

    fetchRates();
}


init();