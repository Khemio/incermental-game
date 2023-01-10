import './style.css'

const star1Btn = document.querySelector('#star1');
const mineBtn = document.querySelector('#mine');
const visitBtn = document.querySelector('#visit');
const mainBtn = document.querySelector('#visitMain');

const buyAutoChopBtn = document.querySelector('#autoChopper');
const buyPickaxeBtn = document.querySelector('#buyPickaxe');

const menus = Array.from(document.querySelector('.menus').children);

let star1Power = 0;
let star1Limit = 100;
let star1Gain = 10;
let stones = 0;
let money = 0;
let pickaxes = 0;
let logsPlus = 1;
let stonePlus = 1;
let autoLogPlus = 0;
let autoLogPrice = 100;
let pickaxePrice = 50;
let star1Price = 1;
let stonePrice = 5;
let curMenu;

star1Btn.addEventListener('click', chop);
mineBtn.addEventListener('click', mine);
visitBtn.addEventListener('click', visitMarket);
mainBtn.addEventListener('click', visitMain);
buyAutoChopBtn.addEventListener('click', buyAutoChop);
buyPickaxeBtn.addEventListener('click', buyPickaxe);

setInterval(() => {
    star1Power += star1Gain;
    if (star1Power === star1Limit) {
        star1Power = 0;
        money += star1Price;
    }
    changeInventory();
    changeMarket();

    star1Btn.innerHTML = `${star1Power}/${star1Limit}`;
}, 500);


// function update() {
//     star1Btn.innerHTML = `${(star1Power + star1Gain)/60}/${star1Limit}`;
//     // console.log(star1Power);
//     requestAnimationFrame(update);
// } 

// update();

function chop() {
    logs += logsPlus;
    changeInventory();
    changeMarket();
}

function mine() {
    stones += stonePlus;
    changeInventory();
    changeMarket();
}

function changeInventory() {
    document.querySelector('#money').innerHTML = `Money: $${money}`;
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
        if (menu.classList.contains(curMenu)) menu.classList.remove('hidden');
    })
}

function changeMarket() {
    if (money >= 100) {
        buyAutoChopBtn.classList.remove('hidden');
    }
    else {
        buyAutoChopBtn.classList.add('hidden');
    }

    if (money >= 50) {
        buyPickaxeBtn.classList.remove('hidden');
    }
    else {
        buyPickaxeBtn.classList.add('hidden');
    }
}

// function sellLogs(logQt = logs) {
//     logs -= logQt;
//     money += logQt * logPrice;
//     changeInventory();
//     changeMarket();
// }

// function sellStones(stoneQt = stones) {
//     stones -= stoneQt;
//     money += stoneQt * stonePrice;
//     changeInventory();
//     changeMarket();
// }

function buyAutoChop() {
    autoLogPlus++;
    money -= autoLogPrice;
    changeInventory();
    changeMarket();
}

function buyPickaxe() {
    pickaxes++;
    money -= pickaxePrice;
    changeInventory();
    changeMarket();
    mineBtn.classList.remove('hidden');
}