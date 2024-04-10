// let imgUrl = "https://flagsapi.com/US/flat/64.png"
const CURR_URL = "https://v6.exchangerate-api.com/v6/5840a1504758a7f7681f5568/latest" // and base currency


const dropDowns = document.querySelectorAll('select');
const convertBtn = document.querySelector('#convert-btn');
const appContainer = document.querySelector(".app-container")


for(let select of dropDowns) {
    for(let country in countryList) {
        let newOpt = document.createElement('option');
        if(select.name === "to" && country === "INR") {
            newOpt.selected = "selected";
        }
        if(select.name === "from" && country === "USD") {
            newOpt.selected = "selected";
        }
        newOpt.value = country;
        newOpt.innerText = countryList[country]

        select.append(newOpt);

        select.addEventListener('change' , (event) => {
            let countryCode = event.target.value;
            let currCountry = countryCode.substring(0 , countryCode.length-1);
            
            let countryImg = select.parentElement.querySelector("img");
            countryImg.src = `https://flagsapi.com/${currCountry}/flat/64.png`;
        })
    }
}

async function calcCurrency() {

    let loader = document.createElement('div');
    loader.classList.add('loader');
    appContainer.append(loader);

    let cover = document.createElement('div');
    cover.classList.add('cover');
    appContainer.append(cover);

    let fromCurr = document.querySelector('#from').value;
    let toCurr = document.querySelector("#to").value;
    let amount = document.querySelector('#amount-inp').value;

    const response = await fetch(`${CURR_URL}/${fromCurr}`);
    const data = await response.json();

    const conversionRates = data.conversion_rates
    let totalAmount = conversionRates[toCurr] * amount;
    totalAmount = totalAmount.toFixed(3);
    
    loader.remove();
    cover.remove()

    display(fromCurr , toCurr , amount , totalAmount );
}

function display(fromCurr , toCurr ,amount , totalAmount) {
    let displayBox = document.querySelector('.info-box p');
    let result = `${amount} ${fromCurr}  =  ${totalAmount} ${toCurr}`;
    displayBox.innerText = result;
}

convertBtn.addEventListener("click" , (event) => {
    event.preventDefault();
    calcCurrency();
});


// additional functionalites
let inputBox = document.querySelector('#amount-inp');
inputBox.addEventListener('input' , () => {
    let value = inputBox.value;
    
    let sanitisedValue = '';
    for(let i=0; i<value.length; i++) {
        if(!isNaN(value[i])) {
            sanitisedValue += value[i];
        }
    }

    inputBox.value = sanitisedValue;
})

