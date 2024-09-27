let type = document.querySelector('#type');
let prices = document.querySelectorAll('#totalPrice');
let inputs = document.querySelectorAll('.input');
let formName = document.querySelector('#name')
let button = document.querySelector('#order-button');
const parentElement = document.querySelector('.price-display');
const newElement = document.createElement('p');
// divide the prices into two categories
let basePrice = +type.value;
let additionalPrice = 0;
let sum = 0;

function totalPrice() {
    basePrice = +type.value;    
    sum = basePrice + additionalPrice;
    // display the prices
    for (price of prices) {
        price.textContent = `$${sum}`;
    }
}

function orderButton() {

    const selectedDelivery = document.querySelector('input[name="delivery"]:checked');
    let deliveryText = "";

    if (selectedDelivery) {
        const label = document.querySelector(`label[for=${selectedDelivery.id}`).textContent;
        deliveryText = label;
    } else {
        deliveryText = "None";
    }

    let selection = `${type.options[type.selectedIndex].textContent} `;
    inputs.forEach(function(input) {
        let label = document.querySelector(`label[for=${input.id}]`);
        if (input.checked) {
        selection += `${label.textContent} `;
        }
    });

    let html = "";
    html += `Name: ${formName.value} |
    Selection: ${selection}|
    Delivery: ${deliveryText} |
    Total: $${basePrice + additionalPrice}`

    let arr = [];
    arr.push(html);

    newElement.textContent = html;
    parentElement.appendChild(newElement);
}


button.addEventListener('click', orderButton);
type.addEventListener('change', totalPrice);
inputs.forEach(function(input) {
    input.addEventListener('change', function() {
        // add or subtract the price depending on checkbox
        if (input.checked) {
            additionalPrice += +input.value;
        } else {
            additionalPrice -= +input.value;
        }
        sum = basePrice + additionalPrice;
        // display the prices
        for (price of prices) {
            price.textContent = `$${sum}`;
        }
    })
})