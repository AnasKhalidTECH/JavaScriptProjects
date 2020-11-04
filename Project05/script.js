// Getting DOM elements
const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleMoneyBtn = document.getElementById('double');
const showMillionaireBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const totalBtn = document.getElementById('calculate-total');

// Intializing data Array
let data = [];

// Create Initial Users
generateRandomUser();
generateRandomUser();
generateRandomUser();

// Function to fetch random user from API
// API : randomuser.me/api
async function generateRandomUser() {
   const res = await fetch('https://randomuser.me/api');
   const data = await res.json();

   const user = data.results[0];

   const newUser = {
       name: `${user.name.first} ${user.name.last}` ,
       worth: Math.round(Math.random()*1000000)
   };
   
   addData(newUser);
}

// Function to double the networth of each user
function doubleWorth() {
    data = data.map( item =>{
        return { ...item, worth: item.worth * 2 }
    });

    updateDOM();
}

// Function to sort users by richest
function sortRichest() {
    data.sort( (a, b) => b.worth - a.worth );

    updateDOM();
}

// Function to sort the users and only show millionaires
function showMillionaires() {
    data = data.filter(
        item => item.worth > 1000000
    );

    updateDOM();
}

// Function to calculate total net worth
function calculateTotal() {
    const totalWorth = data.reduce(
        (acc, item) => (acc += item.worth), 0
    );

    const totalNetWorthElement = document.createElement('div');
    totalNetWorthElement.innerHTML = `<h3>Total Net Worth: <strong>${formatCurrency(totalWorth)}</strong></h3>`;
    main.appendChild(totalNetWorthElement);
}

// Add newly generated user into the data Array
function addData(newUser) {
    data.push(newUser);

    updateDOM();
}

// Function to update the ui with dom
function updateDOM(inputData = data) {
    main.innerHTML = '<h2><strong>Name</strong> Net Worth</h2>'

    inputData.forEach( item => {
        const element = document.createElement('div');
        element.classList.add('name');
        element.innerHTML = `<strong>${item.name}</strong> ${formatCurrency(item.worth)}`;
        main.appendChild(element);
    });
}

// Function to format a number as a currency
function formatCurrency(num) {
    return 'PKR' + (num).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Event listeners
// 1. Add user event listener
addUserBtn.addEventListener('click', generateRandomUser);

// 2. Add double money event listener
doubleMoneyBtn.addEventListener('click', doubleWorth);

// 3. Add sort event listener
sortBtn.addEventListener('click', sortRichest);

// 4. Add show millionaires event listener
showMillionaireBtn.addEventListener('click', showMillionaires);

// 5. Add calculate total wealth
totalBtn.addEventListener('click', calculateTotal);