// Kaden Emrich

var clicks = 0;

/* Objects Start */

var counter = document.getElementById("counter");

var upgradeDiv = document.getElementById("upgrades");
var upgradeEnd = document.getElementById("endUpgrades");

var clicker = {

    element: document.getElementById("cursor"),
    img: document.getElementById("cursorImg"),

    hover: function() {
            this.img.style.top = "0px";
            this.img.style.left = "0px";
            this.img.style.width = "260px";
            this.img.style.height = "400px";
    },

    activate: function() {
        clicker.reset();

        setTimeout(function() {
            clicker.hover();
        }, 100);
    },
    
    reset: function() {
        this.img.style.top = "20px";
        this.img.style.left = "20px";
        this.img.style.width = "240px";
        this.img.style.height = "380px";
    }
}

class upgrade {

    constructor(name, cost, cps) {

        // Set inst vars
        this.name = name;
        this.cost = cost;
        this.cps = cps;

        // create upgrade div
        this.div = document.createElement("div");
        this.div.className = "upgrade";
        upgradeEnd.parentNode.insertBefore(this.div, upgradeEnd);

        // create title element
        this.titleEl = document.createElement("h2");
        this.titleEl.className = "upgrade";
        this.titleEl.innerHTML = this.name;
        this.div.appendChild(this.titleEl);

        // create amount element and val
        this.amount = 0;
        this.amountEl = document.createElement("h2");
        this.amountEl.className = "upgrade";
        this.amountEl.innerHTML = "(" + this.amount + ")";
        this.div.appendChild(this.amountEl);

        // create button element
        this.button = document.createElement("button");
        this.button.className = "upgrade";
        this.button.type = "button";
        this.button.innerHTML = "BUY";
        this.button.onclick = this.buy;
        this.div.appendChild(this.button);

        // create cost element
        this.costEl = document.createElement("p");
        this.costEl.className = "upgrade";
        this.costEl.innerHTML = "Cost: " + this.cost;
        this.div.appendChild(this.costEl);

    }

    update() {

        this.costEl.innerHTML = this.cost;
        this.amountEl.innerHTML = this.amount;

    }

    buy() {

        this.amount++;
        this.cost *= 1.1;

        this.costEl.innerHTML = this.cost;
        this.amountEl.innerHTML = this.amount;

    }
}

/* Objects End */


function clickit() {

    clicker.activate();
    clicks++;

    update();

}

function update() {

    counter.innerHTML = clicks;
}