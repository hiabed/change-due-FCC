const purchaseBtn = document.querySelector("#purchase-btn");
const input = document.querySelector("#cash");
const changeDue = document.querySelector("#change-due"); // serf.
const priceDiv = document.querySelector("#price");
const restCid = document.querySelector("#rest-cid");

let price = 19.5;
//cid = cash-in-drawer;
let cid = [
    {name: "PENNY", value: 0.01, amount: 0.87, change: 0},
    {name: "NICKEL", value: 0.05, amount: 2, change: 0},
    {name: "DIME", value: 0.1, amount: 2.7, change: 0},
    {name: "QUARTER", value: 0.25, amount: 3.25, change: 0},
    {name: "ONE", value: 1, amount: 88, change: 0},
    {name: "FIVE", value: 5, amount: 55, change: 0},
    {name: "TEN", value: 10, amount: 20, change: 0},
    {name: "TWENTY", value: 20, amount: 60, change: 0},
    {name: "ONE HUNDRED", value: 100, amount: 100, change: 0}
]

let fontNames = ["Pennies", "Nickels", "Dimes", "Quarters", "Ones", "Fives", "Tens", "Twenties", "Hundreds"];

let totalAmount = 0;
let j = 0;
cid.forEach(el => {
    const denomination = document.createElement("p");
    denomination.classList.add("denom");
    denomination.innerHTML = `${fontNames[j]}: ${el.amount}`
    j++;
    restCid.append(denomination);
    totalAmount += el.amount;
})

console.log(totalAmount);



priceDiv.innerHTML = `<span style="font-weight: bold">Total:</span> ${price}`;

let holder = 0;

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
        let theRest = parseFloat(input.value) - price;
        if (totalAmount < theRest) {
            changeDue.innerHTML = `Status: INSUFFICIENT_FUNDS`;
            return 0;
        }
        else if (totalAmount === theRest) {
            changeDue.innerHTML = `Status: CLOSED`;
            return 0;
        }
        for (let i = (cid.length - 1); i >= 0; i--) {
            holder = 0;
            while (theRest >= cid[i].value && cid[i].amount > 0) {
                theRest -= cid[i].value;
                theRest = parseFloat(theRest.toFixed(2));
                holder += cid[i].value;
                cid[i].amount -= cid[i].value;
            }
            cid[i].change = holder;
        }
        console.log(cid);
        const status = document.createElement("div");
        status.classList.add("status");
        status.innerHTML = "Status: OPEN";
        changeDue.append(status);
        cid.slice().reverse().forEach(element => {
            if (element.change > 0) {
                const unitChange = document.createElement("div");
                unitChange.classList.add("unit");
                unitChange.innerHTML += `${element.name}: $${element.change} `;
                changeDue.append(unitChange);
            }
        });
        const arr = document.querySelectorAll(".denom");
        let j = 0;
        arr.forEach(el => {
            el.innerHTML = `${fontNames[j]}: ${cid[j].amount}`
            j++;
        })
    }
}

purchaseBtn.addEventListener("click", mainFunction);