const baseURL = "https://api.frankfurter.app/latest?";
let msg = document.querySelector(".msg");

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");

for (let select of dropdowns){
    for (curCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = curCode;
        newOption.value = curCode;
        if (select.name === "from" && curCode === "USD"){
            newOption.selected = "selected";
        }
        if (select.name === "to" && curCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt) =>{
        updateFlag(evt.target);
    })
}

let fromCurr = document.querySelector(".from select")
let toCurr = document.querySelector(".to select")


const updateFlag = (element) =>{
    let curCode = element.value;
    let countryCode = countryList[curCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}


btn.addEventListener("click", async (evt)=>{
    evt.preventDefault();

    let input = document.querySelector(".amount input");
    let amt = input.value;
    if (amt < 1 || amt == ""){
        amt = 1;
        input.value = "1";
    }
    
    const URL = `${baseURL}from=${fromCurr.value}&to=${toCurr.value}`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data.rates[toCurr.value];
    let finalAmt = rate * amt;
    msg.innerText = `${amt} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
    
})



