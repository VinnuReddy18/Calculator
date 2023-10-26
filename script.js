//------------------------------------------------------------- Calculator Starts Here -------------------------------------------------------------//

const input = document.getElementById("inputBox");
let string = "";

const operators = document.querySelectorAll(".oper");
operators.forEach((operator) => {
  operator.addEventListener("click", (e) => {
    const lastChar = string.charAt(string.length - 1);
    if (
      lastChar !== "/" &&
      lastChar !== "%" &&
      lastChar !== "*" &&
      lastChar !== "+" &&
      lastChar !== "-"
    ) {
      string += e.target.innerHTML;
      input.value = string;
    }
  });
});

const numbers = document.querySelectorAll(".numbers");
numbers.forEach((number) => {
  number.addEventListener("click", (e) => {
    if (e.target.innerHTML !== "0" || string !== "") {
      string += e.target.innerHTML;
      input.value = string;
    }
  });
});

document.getElementById("equalButn").addEventListener("click", () => {
  string = eval(string);
  input.value = string;
});

document.getElementById("clear").addEventListener("click", () => {
  string = "";
  input.value = "";
});

document.getElementById("del").addEventListener("click", () => {
  string = string.slice(0, -1);
  input.value = string;
});

//------------------------------------------------------------- Calculator Ends Here -------------------------------------------------------------//

// Toggle between the calculator and currency converter
const tabButtons = document.querySelectorAll(".tab-button");
const tabContents = document.querySelectorAll(".tab-content");

function showTab(tabIndex) {
  tabContents.forEach((tabContent) => {
    tabContent.classList.remove("active");
  });
  tabContents[tabIndex].classList.add("active");
}

tabButtons.forEach((tabButton, index) => {
  tabButton.addEventListener("click", () => {
    showTab(index);
  });
});

//------------------------------------------------------------- Currency Converter Starts Here -------------------------------------------------------------//

// Fetch currency data and populate select options
(function () {
  fetch(
    "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_R4wt6y6yWPY1IiDH8xVieHyykdIf6prVghSqJFTy"
  )
    .then((response) => response.json())
    .then((data) => {
      const currencyData = Object.entries(data.data);
      const targetCurrencySelect = document.getElementById("targetCurrency");
      const baseCurrencySelect = document.getElementById("baseCurrency");
      currencyData.forEach((currency) => {
        const newOption = new Option(currency[0], currency[1]);
        targetCurrencySelect.add(newOption);
        baseCurrencySelect.add(newOption.cloneNode(true));
      });
    })
    .catch((error) => console.error(error));
})();

showTab(0); // Show the Calculator tab by default

function convertCurrency() {
  const inputAmount = document.getElementById("currencyAmount").value;
  const baseCurrency = document.getElementById("baseCurrency").value;
  const targetCurrency = document.getElementById("targetCurrency").value;
  const result = document.getElementById("result");
  const currencyAmount = (targetCurrency / baseCurrency) * inputAmount;
  result.innerHTML = `Converted Amount: ${currencyAmount}`;
}

document
  .getElementById("convertCurrency")
  .addEventListener("click", convertCurrency);

document.getElementById("clearCurrency").addEventListener("click", () => {
  document.getElementById("currencyAmount").value = "";
  document.getElementById("baseCurrency").value = "USD";
  document.getElementById("targetCurrency").value = "USD";
  document.getElementById("result").innerHTML = "";
  input.value = "";
});

//------------------------------------------------------------- Currency Converter Ends Here -------------------------------------------------------------//

//------------------------------------------------------------- Nuber System Converter Starts Here -------------------------------------------------------------//

function convertNumberSystem() {
  const inputNumber = document.getElementById("NumberInputSystem").value;
  const base = document.getElementById("CurrentSystem").value;
  const target = document.getElementById("TargetSystem").value;
  const result = document.getElementById("resultSystem");
  const convertedNumber = parseInt(inputNumber, base).toString(target);
  result.innerHTML = `Converted Number: ${convertedNumber}`;
}

document
  .getElementById("convertNumberSystem")
  .addEventListener("click", convertNumberSystem);

document.getElementById("ClearSystem").addEventListener("click", () => {
  document.getElementById("NumberInputSystem").value = "";
  document.getElementById("CurrentSystem").options[0].selected = true;
  document.getElementById("TargetSystem").options[0].selected = true;
  const result = document.getElementById("resultSystem");
  result.innerHTML = ``;
});
