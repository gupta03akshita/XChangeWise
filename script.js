// IMPORTING API_KEY FORM FILE
import {API_KEY} from "./config.js";

// CURRENCY CONVERTER API URL
const BASE_URL =
    "https://v6.exchangerate-api.com/v6";
const apiKey = API_KEY;
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const rateMsg = document.querySelector(".rate-msg");

// ADDING OPTION TO DROPDOWN LIST
for (let select of dropdowns) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

// CONVERTING THE AMOUNT TO REQUIRED FORMAT
const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }
    const URL = `${BASE_URL}/${apiKey}/pair/${fromCurr.value.toUpperCase()}/${toCurr.value.toUpperCase()}`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data.conversion_rate;
    rateMsg.innerText = `CONVERSION RATE: ${rate}`;
    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

// IMAGE UPDATION
const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

// ADDING EVENT LISTENERS
btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();
});