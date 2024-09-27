let plate = document.querySelector("#plate");
let maker = document.querySelector("#maker");
let model = document.querySelector("#model");
let owner = document.querySelector("#owner");
let price = document.querySelector("#price");
let color = document.querySelector("#color");
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

let cars = [];
let discountPrice;

form.addEventListener("submit", event => {
    event.preventDefault();

    discountPrice = setDiscount(price.value);

    try {
        if (plate.value === "" || maker.value === "" || model.value === "" || owner.value === "" || price.value === "" || color.value === "" || year.value === "" || Number.parseInt(price.value, 10) <= 0 || Number.parseInt(year.value, 10) < 1886 || Number.parseInt(year.value, 10) > 2024 || isNaN(Number.parseInt(year.value, 10)) || isNaN(Number.parseInt(price.value, 10))) {
            throw new Error('Insert correct values!');
        } else {
            let newCar = new Car(plate.value, maker.value, model.value, owner.value, price.value, color.value, year.value);
            let liCar = {plate: newCar.plate, maker: newCar.maker, model: newCar.model, owner: newCar.owner, price: newCar.price, color: newCar.color, year: newCar.year, discountPrice: discountPrice};
            cars.push(liCar);
            if ((2024 - Number.parseInt(year.value, 10)) > 10) {
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
})

search.addEventListener("keyup", event => {
    tblBody.innerHTML = "";
    notFound.textContent = "";
    cars.forEach(car => {
        if (car['plate'].includes(event.currentTarget.value)) {
            let input = [car['plate'], car['maker'], car['model'], car['owner'], car['price'], car['color'], car['year'], discountPrice];
            generateTable(input);
        } else {
            notFound.textContent = "Not found...";
        }
    })
})
