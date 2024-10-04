const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

var myHeaders = new Headers();
myHeaders.append("apikey", "ssYBzcLC33inues8dFaV9uUpsuCPUeBw");

for (let select of dropdowns) {
  for (currCode in countryList) {
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
  select.addEventListener("change", (e) => {
    updateFlag(e.target);
  });
}
const updateFlag = (e) => {
  // console.log(e);
  let currCode = e.value;
  let countryCode = countryList[currCode];
  let newUrl = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = e.parentElement.querySelector("img");
  img.src = newUrl;
};
btn.addEventListener("click", async (e) => {
  e.preventDefault();
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = 1;
  }
  var requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: myHeaders,
  };

  const URL1 = `https://api.apilayer.com/fixer/convert?to=${toCurr.value.toLowerCase()}&from=${fromCurr.value.toLowerCase()}&amount=${amtVal}`;
  let response = await fetch(URL1, requestOptions);
  let data = await response.json();
  let rate = data.result;
  let finalAmt = amtVal * rate;
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value} `;
});
