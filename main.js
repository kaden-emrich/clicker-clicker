// Kaden Emrich

var totalClicks = 0;

var last = 0;
var current = 0;

var clicks = 0;

/* Settings Start */

var ShowRealClicks = false; // If true, the clicks display will not round the number of clicks to a whole number

/* Settings End */

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
        this.baseCost = cost;
        this.cps = cps;
        this.img = img;

    }

    show() {

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

        this.cost = this.baseCost;

        for(let i = 1; i <= this.amount; i++) {
            
            this.cost = Math.round(this.cost * 1.2);

        }

        this.costEl.innerHTML = "Cost: " + this.cost;
        this.amountEl.innerHTML = "(" + this.amount + ")";
        
        while(this.buddyDiv.firstChild) {

            this.buddyDiv.removeChild(this.buddyDiv.firstChild);

        }

        this.buddies = [];

        for(let i = 0; i < this.amount; i++) {

            let next = document.createElement("img");
            next.className = "buddy";
            next.src = this.img;
            this.buddies.push(this.buddyDiv.appendChild(next));

        }

    }

    buy() {

        if(clicks >= this.cost) {

            clicks -= this.cost;

            this.amount++;
            this.cost = Math.round(this.cost * 1.2);

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

function getCPS() {

    let temp = 0;
    
    if(upgrades != null) {
        for(let i =0; i < upgrades.length; i++) {

            temp += Math.round(10*upgrades[i].amount * upgrades[i].cps) / 10;

        }
    }

    return temp;
}


function clickit() {

    clicker.activate();
    clicks++;
    totalClicks++;
    current++;

    update();

}

function update() {

    clicks = (Math.round(clicks * 10)) / 10;

    if(ShowRealClicks)
        counter.innerHTML = clicks;
    else
        counter.innerHTML = Math.round(clicks);

    if(clicks >= 10 && upgrades.length == 0) {

        let newUpgrade = new upgrade("Broken Mouse", 15, 0.1, "broken-mouse.PNG");
        newUpgrade.show();
        newUpgrade.button.addEventListener("click", function() {newUpgrade.buy();});
        
        upgrades.push(newUpgrade);

    }
    if(clicks >= 20 && upgrades.length == 1) {

        let newUpgrade = new upgrade("The World's Worst Auto-Clicker", 100, 1, "Auto-Clicker.png");
        newUpgrade.show();
        newUpgrade.button.addEventListener("click", function() {newUpgrade.buy();});
        
        upgrades.push(newUpgrade);

    }
    if(clicks >= 120 && upgrades.length == 2) {

        let newUpgrade = new upgrade("V's Mouse", 1000, 8, "placeholder.png");
        newUpgrade.show();
        newUpgrade.button.addEventListener("click", function() {newUpgrade.buy();});
        
        upgrades.push(newUpgrade);

    }
    if(clicks >= 200 && upgrades.length == 3) {

        let newUpgrade = new upgrade("McLogemer", 5000, 16, "McLogemer.JPG");
        newUpgrade.show();
        newUpgrade.button.addEventListener("click", function() {newUpgrade.buy();});
       
        upgrades.push(newUpgrade);

    }
    if(clicks >= 5000 && upgrades.length == 4) {

        let newUpgrade = new upgrade("Logatec G503", 10000, 64, "logatec-G503.png");
        newUpgrade.show();
        newUpgrade.button.addEventListener("click", function() {newUpgrade.buy();});
        
        upgrades.push(newUpgrade);

    }

    cpsEl.innerHTML = getCPS();

}

function giveClicks(num) {
    
    for(let i = 0; i < num; i++) {

        clickit();
    }
}


/* Other Functions Start */

function setCookie(cname, cvalue) {

    document.cookie = cname + "=" + cvalue + ";path=/" + ";";

} // setCookie()

function getCookie(cname) {

    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');

    for(let i = 0; i <ca.length; i++) {

        let c = ca[i];

        while (c.charAt(0) == ' ') {

            c = c.substring(1);
        }

        if (c.indexOf(name) == 0) {

            return c.substring(name.length, c.length);
        }
    }

    return "";
} // getCookie()

function getAllCookies() {

    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');

    return ca;
} // getAllCookies()

/* Other Functions End */

/* Save/Load Functions Start */

function saveGame() {

    // Save the total clicks
    setCookie("clicks", clicks);

    // Save upgrades
    if(upgrades != null){
        for(let i = 0; i < upgrades.length; i++) {

            setCookie("upgrade"+i, upgrades[i].amount);

        }
    }

    setCookie("amountUpgrades", upgrades.length);
}

function loadGame() {

    var numUpgrades = getCookie("amountUpgrades");

    for(let i = 0; i < numUpgrades; i++) {
        
        if(getCookie("upgrade"+i) != '') {

            while(upgrades[i] == null) {

                clickit();
            }
        }

        upgrades[i].amount = parseInt(getCookie("upgrade"+i));
        upgrades[i].update();

    }

    clicks = parseInt(getCookie("clicks")) - 1;

    clickit();

    update();
}

/* Save/Load Functions End */

function tick() {

    let currentCPS = getCPS();

    clicks += currentCPS
    clicks = (Math.round(clicks * 10)) / 10;

    update();

} 
ticker = setInterval(tick, 1000);