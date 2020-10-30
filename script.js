const currencyEl_one = document.getElementById("currency-one");
const currencyAmount_one = document.getElementById("amount-one");
const currencyEl_two = document.getElementById("currency-two");
const currencyAmount_two = document.getElementById("amount-two");
const swap = document.getElementById("swap");
const rate = document.getElementById("rate");

const calculateRate = () => {
  fetch(`https://api.exchangerate-api.com/v4/latest/${currencyEl_one.value}`)
    .then((res) => res.json())
    .then((data) => {
      const currencyRate = data.rates[currencyEl_two.value];
      rate.innerText = `1 ${currencyEl_one.value} = ${currencyRate} ${currencyEl_two.value}`;

      currencyAmount_two.value = (
        currencyAmount_one.value * currencyRate
      ).toFixed(2);
    })
    .catch((err) => console.log(err));
};

currencyEl_one.addEventListener("change", calculateRate);
currencyAmount_one.addEventListener("input", calculateRate);
currencyEl_two.addEventListener("change", calculateRate);
currencyAmount_two.addEventListener("input", calculateRate);

swap.addEventListener("click", () => {
  const temp = currencyEl_one.value;

  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  calculateRate();
});

calculateRate();
