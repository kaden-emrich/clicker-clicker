// Kaden Emrich

var totalClicks = 0;

var last = 0;
var current = 0;

var clicks = 0;

/* Objects Start */

var counter = document.getElementById("counter");
var cpsEl = document.getElementById("CPS");

var upgradeDiv = document.getElementById("upgrades");
var upgradeEnd = document.getElementById("endUpgrades");
var upgrades = [];

var buddies = document.getElementById("buddies");

var ticker;

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

    constructor(name, cost, cps, img) {

        // Set inst vars
        this.name = name;
        this.cost = cost;
        this.cps = cps;
        this.img = img;

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
        //this.button.addEventListener("click", this.buy);
        this.div.appendChild(this.button);

        // create cost element
        this.costEl = document.createElement("p");
        this.costEl.className = "upgrade";
        this.costEl.innerHTML = "Cost: " + this.cost;
        this.div.appendChild(this.costEl);

        // create buddy div
        this.buddyDiv = document.createElement("div");
        this.buddyDiv.className = "buddy";
        buddies.appendChild(this.buddyDiv);

        this.buddies = [];

    }

    update() {

        this.costEl.innerHTML = this.cost;
        this.amountEl.innerHTML = this.amount;

    }

    buy() {

        if(clicks >= this.cost) {

            clicks -= this.cost;

            this.amount++;
            this.cost = Math.round(this.cost * 1.1);

            this.costEl.innerHTML = "Cost: " + this.cost;
            this.amountEl.innerHTML = "(" + this.amount + ")";

            let next = document.createElement("img");
            next.className = "buddy";
            next.src = this.img;
            this.buddies.push(this.buddyDiv.appendChild(next));

            update();

            console.log("buying a " + this.name + ".");
        }
    }

    tick() {

        clicks += this.amount * this.cps;
        current += this.amount * this.cps;
        
    }
}

/* Objects End */


function clickit() {

    clicker.activate();
    clicks++;
    totalClicks++;
    current++;

    update();

}

function update() {

    counter.innerHTML = clicks;

    if(clicks >= 10 && upgrades.length == 0) {

        var newUpgrade = new upgrade("Broken Mouse", 20, 0.5, "broken-mouse.PNG");
        newUpgrade.button.addEventListener("click", function() {newUpgrade.buy();});
        upgrades.push(newUpgrade);

    }
    if(clicks >= 30 && upgrades.length == 1) {

        var newUpgrade = new upgrade("The World's Worst Auto-Clicker", 50, 1, "Auto-Clicker.png");
        newUpgrade.button.addEventListener("click", function() {newUpgrade.buy();});
        upgrades.push(newUpgrade);

    }
    if(clicks >= 50 && upgrades.length == 2) {

        var newUpgrade = new upgrade("V's Mouse", 100, 2, "placeholder.png");
        newUpgrade.button.addEventListener("click", function() {newUpgrade.buy();});
        upgrades.push(newUpgrade);

    }
    if(clicks >= 100 && upgrades.length == 3) {

        var newUpgrade = new upgrade("McLogemer", 200, 5, "McLogemer.JPG");
        newUpgrade.button.addEventListener("click", function() {newUpgrade.buy();});
        upgrades.push(newUpgrade);

    }
    if(clicks >= 500 && upgrades.length == 4) {

        var newUpgrade = new upgrade("Logatec G503", 1000, 15, "logatec-G503.png");
        newUpgrade.button.addEventListener("click", function() {newUpgrade.buy();});
        upgrades.push(newUpgrade);

    }

}

function giveClicks(num) {
    
    for(let i = 0; i < num; i++) {

        clickit();
    }
}

function tick() {

    if(upgrades != null) {
        for(let i = 0; i < upgrades.length; i++) {

            upgrades[i].tick();
        }
    }

    cpsEl.innerHTML = current - last;
    last = current;

    update();

} 
ticker = setInterval(tick, 1000);