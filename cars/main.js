let form = document.querySelector("#car-form");
let tblBody = document.querySelector("#table");
let notFound = document.querySelector("#notFound");

let search = document.querySelector("#search");
let ul2 = document.querySelector("#search-result");

class Car {
    constructor(plate, maker, model, owner, price, color, year) {
        this.plate = plate;
        this.maker = maker;
        this.model = model;
        this.owner = owner;
        this.price = price;
        this.color = color;
        this.year = year;
    }
}

function setDiscount(price) {
    let discountPrice = Number.parseInt(price, 10) - (Number.parseInt(price, 10) * 0.15);
    return discountPrice;
}

function generateTable(arr) {
  
    for (let i = 0; i < 1; i++) {
      
      const row = document.createElement("tr");
  
      for (let j = 0; j < 8; j++) {
        
        const cell = document.createElement("td");
        const cellText = document.createTextNode(arr[j]);
        cell.appendChild(cellText);
        row.appendChild(cell);
      }
  
      
      tblBody.appendChild(row);
    }
    
}

let discountPrice;

function generateInfo(event) {
    event.preventDefault();

    let plate = document.querySelector("#plate").value.trim();
    let maker = document.querySelector("#maker").value.trim();
    let model = document.querySelector("#model").value.trim();
    let owner = document.querySelector("#owner").value.trim();
    let price = Number.parseInt(document.querySelector("#price").value.trim(), 10);
    let color = document.querySelector("#color").value.trim();
    let year = Number.parseInt(document.querySelector("#year").value.trim(), 10);

    discountPrice = setDiscount(price);

    try {
        if (plate === "" || maker === "" || model === "" || owner === "" || price === "" || color === "" || year === "" || price <= 0 || year < 1886 || year > 2024 || isNaN(year) || isNaN(price)) {
            throw new Error('Insert correct values!');
        } else {
            let newCar = new Car(plate, maker, model, owner, price, color, year);
            let liCar = {plate: newCar.plate, maker: newCar.maker, model: newCar.model, owner: newCar.owner, price: newCar.price, color: newCar.color, year: newCar.year, discountPrice: discountPrice};
            cars.push(liCar);
            if ((2024 - year) > 10) {
                let input = [newCar.plate, newCar.maker, newCar.model, newCar.owner, newCar.price, newCar.color, newCar.year, discountPrice];
                generateTable(input);
            } else {
                let input = [newCar.plate, newCar.maker, newCar.model, newCar.owner, newCar.price, newCar.color, newCar.year, newCar.price];
                generateTable(input);
            }
        }
        form.reset();
    } catch(error) {
        alert('Please, insert correct values!');
    }
}

let cars = [];

form.addEventListener("submit", event => {
    generateInfo(event);
})

search.addEventListener("keyup", event => {
    tblBody.innerHTML = "";
    notFound.textContent = "";
    let found = false;
    cars.forEach(car => {
        if (car['plate'].includes(event.currentTarget.value)) {
            let input = [car['plate'], car['maker'], car['model'], car['owner'], car['price'], car['color'], car['year'], discountPrice];
            generateTable(input);
            found = true;
        }
    })
    if (!found) {
        notFound.textContent = "Not found...";
    }
})
