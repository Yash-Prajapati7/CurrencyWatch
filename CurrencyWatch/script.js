import 'dotenv/config'
const dropList = document.getElementsByClassName("countries");
fromCurrency = document.querySelector(".from select");
toCurrency = document.querySelector(".to select");
submitButton = document.querySelector("form button"); 
let exchangeRateTxt = document.querySelector(".exchangeRateTxt");

for(let i = 0; i < dropList.length; i++) {
    for(currencyCode in country_list) {
        // selecting default countries for From and To
        let selected;
        if(i == 0) {
            selected = currencyCode == "INR" ? "selected" : "";
        }
        else if(i == 1) {
            selected = currencyCode == "USD" ? "selected" : "";
        }
        // creating option tags for selecting the country
        let optionTag = `<option value="${currencyCode}" ${selected}>${currencyCode}</option>`;
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
    dropList[i].addEventListener("change", e => {
        loadFlag(e.target);
    })
}

function loadFlag(element) {
    for(countryCode in country_list) {
        if(countryCode == element.value) {
            let imgTag = element.parentElement.querySelector("img");
            imgTag.src = `https://flagsapi.com/${country_list[countryCode]}/flat/64.png`
        }
    } 
}
const exchnageIcon = document.querySelector(".icon");
exchnageIcon.addEventListener("click", () => {
    let temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
    loadFlag(fromCurrency);
    loadFlag(toCurrency);
    getExchangeRate;
})
submitButton.addEventListener("click", e => {
    e.preventDefault();
    getExchangeRate();
});

// writing a function that will provide the exchange rate
function getExchangeRate(){
    const amount = document.querySelector(".amount");
    let amountVal = amount.value;
    if(amountVal == "" || amountVal == "0") {
        amount.value = "1";
        amountVal = 1;
    }
    let url = `https://v6.exchangerate-api.com/v6/${process.env.ApiKey}/latest/${fromCurrency.value}`
    fetch(url).then(response => response.json()).then(response => {
        let exchangeRate = response.conversion_rates[toCurrency.value];
        let totalExchangeRate = (amountVal * exchangeRate).toFixed(2);
        console.log(totalExchangeRate);
        exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
    }).catch(() => {
        exchangeRateTxt.innerText = "Something went wrong";
    })
}
