import './style.css'

const star1Btn = document.querySelector('#star1');
const star2Btn = document.querySelector('#star2');
const star3Btn = document.querySelector('#star3');

// const menus = Array.from(document.querySelector('.menus').children);
const upgardeMenus = Array.from(document.querySelector('.upgrades').children);
const upgradeBtns = upgardeMenus.flatMap(menu => Array.from(menu.children));

upgradeBtns.forEach(btn => btn.addEventListener('click', (e) => buyUpgrade(e.target.id)))


let focusStar = "star1"

let star1Limit = 100;
let star1Power = 0;
let star1GainBase = 1;
let star1GainModifier = 1;
let star1Gain;

let star2Limit = star1Limit * 10;
let star2Power = star2Limit;
let star2GainBase = 1;
let star2GainModifier = 1;
let star2Gain;
let star2Time = 1000;

let star3Limit = 1;
let star3Power = 0;

let star1Upgrade1Qt = 0;
let star1Upgrade1Power = 1;
let star1Upgrade1Price = 10;

let star1Upgrade2Qt = 0;
let star1Upgrade2Power = 1;
let star1Upgrade2Price = 30;

let star1Upgrade3Qt = 0;
let star1Upgrade3Power = 1;
let star1Upgrade3Price = 60;

let star2Upgrade1Qt = 0;
let star2Upgrade1Power = 1;
let star2Upgrade1Price = 10;

let star2Upgrade2Qt = 0;
let star2Upgrade2Power = 1;
let star2Upgrade2Price = 30;

let star2Upgrade3Qt = 0;
let star2Upgrade3Power = 1;
let star2Upgrade3Price = 60;

let prestigePrice = 1;
let prestige4Power = 1;
let prestiges = {
    prestige1 : false,
    prestige2 : false,
    prestige3 : false,
    prestige4 : false,
    prestige5 : false,
    prestige6 : false,
    prestige7 : false,
    prestige8 : false,
    prestige9 : false,
    prestige10 : false,
    // prestige11 = false,
}

let curMenuId = null;
let curIntervalId = null;

star1Btn.querySelector('span').innerHTML = `${star1Power}/${star1Limit}`;

star1Btn.addEventListener('click', powerStar1);
// star1Boost1Btn.addEventListener('click', buyUpgrade)

star1Btn.addEventListener('click', (e) => showUpgrades(e));
star2Btn.addEventListener('click', (e) => showUpgrades(e));
star3Btn.addEventListener('click', (e) => showUpgrades(e));


function showUpgrades(e) {
    let id = e.target.id ? e.target.id : e.target.parentElement.id
    console.log(id);
    if (curMenuId === id) return
    else upgardeMenus.forEach(menu => {
            if (menu.getAttribute('data-upgrades') === id) menu.classList.remove('hidden')
            else menu.classList.add('hidden')
        
            curMenuId = id;
        })
}

function powerStar1() {
    if (prestiges.prestige4) star1GainModifier *= 1 + (star1Upgrade1Qt + star1Upgrade2Qt + star1Upgrade3Qt) * 0.01;
    star1Gain = star1GainBase * star1GainModifier
    star1Power += star1Gain;
    if (star1Power >= star1Limit) {
        star1Power = star1Power - star1Limit;
        if (!curIntervalId) {
            star2Btn.querySelector('span').innerHTML = `${star2Power}/${star2Limit}`;
            powerStar2();
        }
        // else star2Gain *= 2;
        else {
            star2Gain = (star2Gain + star2Upgrade1Power) * 2;
            star2Power -= star2Upgrade2Qt * star2Gain;
        };
    }

    // star1Btn.innerHTML = `${star1Power}/${star1Limit}`;
    updateUi();
}

function powerStar2() {
    if (prestiges.prestige5) star2GainModifier *= 1 + (star2Upgrade1Qt + star2Upgrade2Qt + star2Upgrade3Qt) * 0.01;
    star2Gain = star2GainBase * star2GainModifier
    curIntervalId = setInterval(() => {
        // star2Power -= star2Gain + star2BoostPower * star2Boosts;
        star2Power -= star2Gain;

        if (star2Power <= 0) {
            star2Power = 0;
            clearInterval(curIntervalId);
            curIntervalId = null;

            star3Power = 1;
            star3Btn.querySelector('span').innerHTML = `${star3Power}/${star3Limit}`;
        }
        // changeInventory();
        // changeMarket();

        // star2Btn.innerHTML = `${star2Power}/${star2Limit}`;
        updateUi();
    }, star2Time);
}

function buyUpgrade(id) {
    if (id[4] === '1') {
        if (id === 'star1Upgrade1') {
            star1Power -= star1Upgrade1Price;
            star1Upgrade1Qt++;
            // star1Gain += star1Upgrade1Power;
            star1GainBase += star1Upgrade1Power;
        }
    
        if (id === 'star1Upgrade2') {
            star1Power -= star1Upgrade2Price;
            star1Upgrade2Qt++;
            star1Upgrade1Power += star1Upgrade2Power;
        }
    
        if (id === 'star1Upgrade3') {
            star1Power -= star1Upgrade3Price;
            star1Upgrade3Qt++;
            // star1Gain *= 2;
            star1GainBase *= 2;
        }
    }

    if (id[4] === '2') {
        if (id === 'star2Upgrade1') {
            star2Power += star2Upgrade1Price;
            star2Upgrade1Qt++;
            star2Gain += star2Upgrade1Power;
        }
    
        if (id === 'star2Upgrade2') {
            star2Power += star2Upgrade2Price;
            star2Upgrade2Qt++;
            // star1Upgrade1Power += star1Upgrade2Power;
        }
    
        if (id === 'star2Upgrade3') {
            star2Power += star2Upgrade3Price;
            star2Upgrade1Price /= 2;
            star2Upgrade2Price /= 2;
            star2Upgrade3Qt++;
        }
    }

    if (id[4] === '3') prestige(id);

    updateUi();
}

function prestige(id) {
    star1Power = 0;
    star1GainBase = 1;
    // star1GainModifier = 1;

    star2Power = star2Limit;
    star2GainBase = 1;
    star2GainModifier = 1;
    star2Time = 1000;

    star3Power = 0;

    star1Upgrade1Qt = 0;
    star1Upgrade1Power = 1;
    star1Upgrade1Price = 10;

    star1Upgrade2Qt = 0;
    star1Upgrade2Power = 1;
    star1Upgrade2Price = 30;

    star1Upgrade3Qt = 0;
    star1Upgrade3Power = 1;
    star1Upgrade3Price = 60;

    star2Upgrade1Qt = 0;
    star2Upgrade1Power = 1;
    star2Upgrade1Price = 10;

    star2Upgrade2Qt = 0;
    star2Upgrade2Power = 1;
    star2Upgrade2Price = 30;

    star2Upgrade3Qt = 0;
    star2Upgrade3Power = 1;
    star2Upgrade3Price = 60;

    // curMenuId = null;
    clearInterval(curIntervalId);
    curIntervalId = null;

    // console.log(curIntervalId);
    
    if (id === 'star3Upgrade1' || prestiges.prestige1 === true) {
        star3Power -= prestigePrice;
        prestiges.prestige1 = true;
        star1GainModifier *= 2;
        star1Upgrade1Power *= 2;
        star1Upgrade2Power *= 2;
        star1Upgrade3Power *= 2;
    }

    if (id === 'star3Upgrade2' || prestiges.prestige2 === true) {
        star3Power -= prestigePrice;
        prestiges.prestige2 = true;
        star2Time /= 2;
        // Implement "Each fill burns double energy"
    }

    if (id === 'star3Upgrade3' || prestiges.prestige3 === true) {
        star3Power -= prestigePrice;
        prestiges.prestige3 = true;
        powerStar2();
    }

    if (id === 'star3Upgrade4' || prestiges.prestige4 === true) {
        star3Power -= prestigePrice;
        prestiges.prestige4 = true;
        // star1GainModifier *= 1 + (star1Upgrade1Qt + star1Upgrade2Qt + star1Upgrade3Qt) * 0.01;
    }

    if (id === 'star3Upgrade5' || prestiges.prestige5 === true) {
        star3Power -= prestigePrice;
        prestiges.prestige5 = true;
        // star1GainModifier *= 1 + (star1Upgrade1Qt + star1Upgrade2Qt + star1Upgrade3Qt) * 0.01;
    }
}

// function switchMenu(curMenu) {
//     menus.forEach(menu => {
//         if (!menu.classList.contains('hidden')) menu.classList.add('hidden');
//         if (menu.classList.contains(curMenu) || menu.classList.contains('inventory')) menu.classList.remove('hidden');
//     })
// }

function updateUi() {
    star1Btn.querySelector('span').innerHTML = `${star1Power}/${star1Limit}`;
    star2Btn.querySelector('span').innerHTML = star2Power < star2Limit ? `${star2Power}/${star2Limit}` : 'Inactive';
    star3Btn.querySelector('span').innerHTML = star3Power === star3Limit ? `${star3Power}/${star3Limit}` : 'Inactive';

    if (star1Power < star1Upgrade1Price) upgradeBtns[0].classList.add('hidden')
    else upgradeBtns[0].classList.remove('hidden')
    upgradeBtns[0].querySelector('span').innerHTML = star1Upgrade1Price;

    if (star1Power < star1Upgrade2Price) upgradeBtns[1].classList.add('hidden')
    else upgradeBtns[1].classList.remove('hidden')
    upgradeBtns[1].querySelector('span').innerHTML = star1Upgrade2Price;

    if (star1Power < star1Upgrade3Price) upgradeBtns[2].classList.add('hidden')
    else upgradeBtns[2].classList.remove('hidden')
    upgradeBtns[2].querySelector('span').innerHTML = star1Upgrade3Price;

    if (star2Power > star2Limit - star2Upgrade1Price) upgradeBtns[3].classList.add('hidden')
    else upgradeBtns[3].classList.remove('hidden')
    upgradeBtns[3].querySelector('span').innerHTML = star2Upgrade1Price;

    if (star2Power > star2Limit - star2Upgrade2Price) upgradeBtns[4].classList.add('hidden')
    else upgradeBtns[4].classList.remove('hidden')
    upgradeBtns[4].querySelector('span').innerHTML = star2Upgrade2Price;

    if (star2Power > star2Limit - star2Upgrade3Price) upgradeBtns[5].classList.add('hidden')
    else upgradeBtns[5].classList.remove('hidden')
    upgradeBtns[5].querySelector('span').innerHTML = star2Upgrade3Price;
}
