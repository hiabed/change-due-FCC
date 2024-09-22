const purchaseBtn = document.querySelector("#purchase-btn");
const input = document.querySelector("#cash");
const changeDue = document.querySelector("#change-due"); // serf.
const priceDiv = document.querySelector("#price");

let price = 3.26;
//cid = cash-in-drawer;
let cid = [
    {"pennies": 0.87},
    {"nickels": 2},
    {"dimes": 2.7},
    {"quarters": 3.25},
    {"ones": 88},
    {"fives": 55},
    {"tens": 20},
    {"twenties": 60},
    {"hundreds": 100}
]

// console.log(Object.keys(cid[0])[0]);

// Pennies(1cent): $0.87
// Nickels(5cents): $2
// Dimes(10cents): $2.7
// Quarters(25cents): $3.25
// Ones(100 cents): $88
// Fives(500cents): $55
// Tens(1000cents): $20
// Twenties(2000cents): $60
// Hundreds(10000): $100

priceDiv.innerHTML = `<span style="font-weight: bold">Total:</span> ${price}`;

let resultsArr = [];
let holder = 0;
let j = 0;

const mainFunction = ()=> {
    changeDue.innerHTML = "";
    if (parseFloat(input.value) < price) {
        alert("Customer does not have enough money to purchase the item");
        return 0;
    }
    if (parseFloat(input.value) === price) {
        changeDue.innerHTML = "No change due - customer paid with exact cash";
        return 0;
    }
    if (parseFloat(input.value) > price) {
        //handle the change due (serf);
        let result = parseFloat(input.value) - price;
        for (let i = (cid.length - 1); i >= 0; i--) {
            holder = 0;
            let key = Object.keys(cid[i])[0];
            while (result > cid[i][key]) {
                result -= cid[i][key];
                holder += cid[i][key];
            }
            resultsArr[j] = holder;
            j++;
        }
        console.log(resultsArr);
        console.log(result);
    }
}

purchaseBtn.addEventListener("click", mainFunction);