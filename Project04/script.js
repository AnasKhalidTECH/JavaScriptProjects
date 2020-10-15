// Getting elements from DOM
const currOnePicker = document.getElementById('currency-one');
const currTwoPicker = document.getElementById('currency-two');
const currOneAmount = document.getElementById('amount-one');
const currTwoAmount = document.getElementById('amount-two');
const flipButton = document.getElementById('flip');
const rate = document.getElementById('rate');


// Function to Fetch exchange rate third party API and update DOM
// https://app.exchangerate-api.com
function calculate() {
    const currencyOneCode = currOnePicker.value;
    const currencyTwoCode = currTwoPicker.value;

    fetch(`https://v6.exchangerate-api.com/v6/58bda8e047f46145d6c73517/latest/${currencyOneCode}`)
        .then( res => res.json() )
        .then( data => {
            // Get the exchange rate from API data
            const exchangeRate = data.conversion_rates[currencyTwoCode];
            // Display the conversion rate
            rate.innerHTML = `1 ${currencyOneCode} = ${exchangeRate} ${currencyTwoCode}`;

            // Apply conversion rate and update amount of curreny
            currTwoAmount.value = (currOneAmount.value * exchangeRate).toFixed(2);

    });
}

// Flip function for the flip button to reverse curreny
function flip() {
    const temp = currOnePicker.value;
    currOnePicker.value = currTwoPicker.value;
    currTwoPicker.value = temp;
    calculate();
};

// Event Listeners
currOnePicker.addEventListener('change', calculate);
currTwoPicker.addEventListener('change', calculate);
currOneAmount.addEventListener('input', calculate);
currTwoAmount.addEventListener('input', calculate);
flipButton.addEventListener('click', flip);

calculate();