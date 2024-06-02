const BASE_URL =
  "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_JrmGRtQAx1IrcpTGfSazQLALkvssVRyv9jv8eJ0M";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
let i=0;
for(let select of dropdowns){
    for(currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value= currCode;
        if(select.name==="from" && currCode=="USD"){
            newOption.selected="selected";
        }
        else if(select.name=== "to" && currCode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })

}

const updateFlag =(element)=>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src= newSrc;

}
btn.addEventListener("click", async(evt) =>{
    evt.preventDefault(); // Prevent form submission
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal<1){
        amtVal =1;
        amount.value= 1;
    }

    // Construct the URL for currency conversion
    const URL = `${BASE_URL}`;
    
    // Fetch data from the API
    let response = await fetch(URL);
    let data = await response.json();
    
    // Extract currency rates from the response
    let rates = data.data;

    // Calculate the converted amount
    let fromRate = rates[fromCurr.value];
    let toRate = rates[toCurr.value];
    let convertedAmount = (amtVal * toRate) / fromRate;

    // Display the converted amount
    msg.innerText = `${amtVal} ${fromCurr.value} = ${convertedAmount.toFixed(2)} ${toCurr.value}`;
});
