import './style.css'

const star1Btn = document.querySelector('#star1');
const star2Btn = document.querySelector('#star2');
const visitBtn = document.querySelector('#visit');
const mainBtn = document.querySelector('#visitMain');

const star1BoostBtn = document.querySelector('#star1Boost');
const star2BoostBtn = document.querySelector('#star2Boost');

const menus = Array.from(document.querySelector('.menus').children);

let star1Power = 0;
let star1Limit = 100;
let star1Gain = 10;
let star2Power = 0;
let star2Limit = 1000;
let star2Gain = 150;

let money = 1000;
let star1Boosts = 0;
let star1BoostPower = 300;
let star1BoostPrice = 50;

let star2Boosts = 0;
let star2BoostPower = 50;
let star2BoostPrice = 100;
let star1Price = 1;
let star2Price = 5;

let curMenu;
let curIntervalId;

// star1Btn.addEventListener('click', chop);
star2Btn.addEventListener('click', powerStar2);
visitBtn.addEventListener('click', visitMarket);
mainBtn.addEventListener('click', visitMain);
star1BoostBtn.addEventListener('click', buyStar1Boost);
star2BoostBtn.addEventListener('click', buyStar2Boost);

curIntervalId = startInterval();

function startInterval(time = 1000) {
    setInterval(() => {
        star1Power += star1Gain;
        if (star1Power >= star1Limit) {
            star1Power = star1Power - star1Limit;
            money += star1Price;
        }
        changeInventory();
        changeMarket();
    
        star1Btn.innerHTML = `${star1Power}/${star1Limit}`;
    }, time);
}

function powerStar1() {
    star1Power += star1Gain;
        if (star1Power >= star1Limit) {
            star1Power = star1Power - star1Limit;
            money += star1Price;
        }
        changeInventory();
        changeMarket();
}

function powerStar2() {
    star2Power += star2Gain + star2BoostPower * star2Boosts;
    if (star2Power >= star2Limit) {
        star2Power = star2Power - star2Limit;
        money += star2Price;
    }
    changeInventory();
    changeMarket();

    star2Btn.innerHTML = `${star2Power}/${star2Limit}`;
}

function changeInventory() {
    document.querySelector('#money').innerHTML = `Money: $${money}`;
    console.log('inventory')
}

function visitMarket() {
    curMenu = switchMenu('marketplace');
    changeMarket();
}
function visitMain() {
    curMenu = switchMenu('main');
}

function switchMenu(curMenu) {
    menus.forEach(menu => {
        if (!menu.classList.contains('hidden')) menu.classList.add('hidden');
        if (menu.classList.contains(curMenu) || menu.classList.contains('inventory')) menu.classList.remove('hidden');
    })
}

function changeMarket() {
    if (money >= 50) {
        star1BoostBtn.classList.remove('hidden');
    }
    else {
        star1BoostBtn.classList.add('hidden');
    }

    if (money >= 100) {
        star2BoostBtn.classList.remove('hidden');
    }
    else {
        star2BoostBtn.classList.add('hidden');
    }
}

function buyStar1Boost() {
    star1Boosts++;
    money -= star1BoostPrice;
    changeInventory();
    changeMarket();

    curIntervalId = null;
    curIntervalId = startInterval(1000 - star1BoostPower * star1Boosts);
}

function buyStar2Boost() {
    star2Boosts++;
    money -= star2BoostPrice;
    changeInventory();
    changeMarket();
}