let plate = document.querySelector("#plate");
let maker = document.querySelector("#maker");
let model = document.querySelector("#model");
let owner = document.querySelector("#owner");
let price = document.querySelector("#price");
let color = document.querySelector("#color");
let form = document.querySelector("#car-form");
let tbody = document.querySelector("#table");

let search = document.querySelector("#search");
let ul2 = document.querySelector("#search-result");

class Car {
    constructor(plate, maker, model, owner, price, color, year, discountPrice) {
        this.plate = plate;
        this.maker = maker;
        this.model = model;
        this.owner = owner;
        this.price = price;
        this.color = color;
        this.year = year;
        this.discountPrice = discountPrice;
    }
}

let cars = [];

form.addEventListener("submit", event => {
    event.preventDefault();
    let discountPrice = Number.parseInt(price.value, 10) - (Number.parseInt(price.value, 10) * 0.15);
    if ((2024 - Number.parseInt(year.value, 10)) <= 10) {
        discountPrice = price.value;
    }
    try {
        if (plate.value === "" || maker.value === "" || model.value === "" || owner.value === "" || price.value === "" || color.value === "" || year.value === "" || Number.parseInt(price.value, 10) <= 0 || Number.parseInt(year.value, 10) < 1886 || Number.parseInt(year.value, 10) > 2024 || isNaN(Number.parseInt(year.value, 10)) || isNaN(Number.parseInt(price.value, 10))) {
            throw new Error('Insert correct values!');
        } else {
            tbody.innerHTML = "";
            let newCar = new Car(plate.value, maker.value, model.value, owner.value, price.value, color.value, year.value, discountPrice);
            let liCar = {plate: newCar.plate, maker: newCar.maker, model: newCar.model, owner: newCar.owner, price: newCar.price, color: newCar.color, year: newCar.year, discountPrice: newCar.discountPrice};
            cars.push(liCar);
            if ((2024 - Number.parseInt(year.value, 10)) > 10) {
                tbody.insertAdjacentHTML("beforeend", `<tr>
                    <td>${newCar.plate}</td>
                    <td>${newCar.maker}</td>
                    <td>${newCar.model}</td>
                    <td>${newCar.owner}</td>
                    <td>${newCar.price}</td>
                    <td>${newCar.color}</td>
                    <td>${newCar.year}</td>
                    <td>${discountPrice}</td>
                </tr>`);
            } else {
                tbody.insertAdjacentHTML("beforeend", `<tr>
                    <td>${newCar.plate}</td>
                    <td>${newCar.maker}</td>
                    <td>${newCar.model}</td>
                    <td>${newCar.owner}</td>
                    <td>${newCar.price}</td>
                    <td>${newCar.color}</td>
                    <td>${newCar.year}</td>
                    <td>${newCar.price}</td>
                </tr>`);
            }
        }
    } catch(error) {
        tbody.innerHTML = "";
        tbody.insertAdjacentHTML("beforeend", `<p>Please, insert correct values!</p>`);
    }
})

search.addEventListener("keyup", event => {
    tbody.innerHTML = "";
    cars.forEach(car => {
        if (car['plate'].includes(event.currentTarget.value)) {
            tbody.insertAdjacentHTML("beforeend", `<tr>
                    <td>${car['plate']}</td>
                    <td>${car['maker']}</td>
                    <td>${car['model']}</td>
                    <td>${car['owner']}</td>
                    <td>${car['price']}</td>
                    <td>${car['color']}</td>
                    <td>${car['year']}</td>
                    <td>${car['discountPrice']}</td>
                </tr>`);
        } else {
            tbody.insertAdjacentHTML("beforeend", `<p>Not found...</p>`);
        }
    })
})
