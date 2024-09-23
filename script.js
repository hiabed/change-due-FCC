const purchaseBtn = document.querySelector("#purchase-btn");
const input = document.querySelector("#cash");
const changeDue = document.querySelector("#change-due"); // serf.
const priceDiv = document.querySelector("#price");
const restCid = document.querySelector("#rest-cid");

let price = 19.5;
//cid = cash-in-drawer;
let cid = [
    ["PENNY", 0.5],
    ["NICKEL", 0],
    ["DIME", 0],
    ["QUARTER", 0],
    ["ONE", 0],
    ["FIVE", 0],
    ["TEN", 0],
    ["TWENTY", 0],
    ["ONE HUNDRED", 0]
];

let values = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100];

let fontNames = ["Pennies", "Nickels", "Dimes", "Quarters", "Ones", "Fives", "Tens", "Twenties", "Hundreds"];

let changes = [0, 0, 0, 0, 0, 0, 0, 0, 0];

let totalAmount = 0;
let j = 0;
cid.forEach(el => {
    const denomination = document.createElement("p");
    denomination.classList.add("denom");
    denomination.innerHTML = `${fontNames[j]}: ${el[1]}`;
    j++;
    restCid.append(denomination);
    totalAmount += el[1];
})

// console.log("Total amount: ", totalAmount);



priceDiv.innerHTML = `<span style="font-weight: bold">Total:</span> ${price}`;

let holder = 0;

const mainFunction = ()=> {
    changeDue.innerHTML = "";
    let totalAmount = 0;
    cid.forEach(el => {
        totalAmount += el[1];
    })
    const cashGiven = input.value;
    if (parseFloat(cashGiven) < price) {
        alert("Customer does not have enough money to purchase the item");
        return 0;
    }
    if (parseFloat(cashGiven) === price) {
        const elem = document.createElement("p");
        elem.innerHTML = `No change due - customer paid with exact cash`;
        changeDue.append(elem);
        return 0;
    }
    if (parseFloat(cashGiven) > price) {
        //handle the change due (serf);
        let theRest = parseFloat(cashGiven) - price;
        let theRestClone = theRest;
        // console.log(theRest);
        if (totalAmount < theRest) {
            const elem = document.createElement("p")
            elem.innerHTML = `Status: INSUFFICIENT_FUNDS`;
            changeDue.append(elem);
            return 0;
        }
        for (let i = (cid.length - 1); i >= 0; i--) {
            holder = 0;
            while (theRest >= values[i] && cid[i][1] > 0) {
                theRest -= values[i];
                theRest = parseFloat(theRest.toFixed(2));
                holder += values[i];
                cid[i][1] -= values[i];
            }
            changes[i] = holder;
        }        
        let l = 0;
        let totaleChanges = 0;
        while(l < changes.length) {
            totaleChanges += changes[l];
            l++;
        }
        const epsilon = 0.001;  // Tolerance for floating-point comparison

        if (Math.abs(parseFloat(cashGiven) - totaleChanges - price) > epsilon) {
            console.log(parseFloat(cashGiven), totaleChanges, price);
            const elem = document.createElement("p");
            elem.innerHTML = `Status: INSUFFICIENT_FUNDS`;
            changeDue.append(elem);
            return 0;
        }
        
        // display change due to the window;
        const status = document.createElement("p");
        // status.classList.add("status");
        // console.log(totalAmount, theRest);
        if (totalAmount === theRestClone) {
            status.innerHTML = `Status: CLOSED`;
        } else {
            alert("open")
            status.innerHTML = `Status: OPEN`;
        }
        changeDue.append(status);
        let k = 8;
        let checkChange = 0;
        cid.slice().reverse().forEach(element => {
            // display in reverse the change only if its greater than 0;
            if (changes[k] > 0) {
                const unitChange = document.createElement("p");
                // unitChange.classList.add("unit");
                unitChange.innerHTML += `${element[0]}: $${parseFloat(changes[k].toFixed(2))}`;
                changeDue.append(unitChange);
                checkChange = 1
            }
            k--;
        });
        // update the value in cid (cash in drawer);
        if (checkChange === 0) {
            status.innerHTML = "";
            const elem = document.createElement("p")
            elem.innerHTML = `Status: INSUFFICIENT_FUNDS`;
            changeDue.append(elem);
            return 0;
        }
        const arr = document.querySelectorAll(".denom");
        let j = 0;
        arr.forEach(el => {
            el.innerHTML = `${fontNames[j]}: ${cid[j][1]}`
            j++;
        })
    }
}

purchaseBtn.addEventListener("click", mainFunction);