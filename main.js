// import Decimal from 'break_eternity.js';
// import Decimal from 'break_infinity.js';
import './style.css'

const star1Btn = document.querySelector('#star1');
const star2Btn = document.querySelector('#star2');
const star3Btn = document.querySelector('#star3');
const winBtn = document.querySelector('#win');

// const menus = Array.from(document.querySelector('.menus').children);
const upgardeMenus = Array.from(document.querySelector('.upgrades').children);
const upgradeBtns = upgardeMenus.flatMap(menu => Array.from(menu.children));

upgradeBtns.forEach(btn => btn.addEventListener('click', (e) => buyUpgrade(e.target.id)))

let star1Limit = 1;
let star1Power = 0;
let star1GainBase = 0.0001;
let star1GainModifier = 1;
let star1Gain;

let star2Limit = star1Limit;
let star2Power = star2Limit;
let star2GainBase = 0.1;
let star2GainModifier = 1;
let star2Gain;
let star2Time = 1000;

let star3Limit = 1;
let star3Power = 0;
let isReady = false;

let star1Upgrade1Qt = 0;
let star1Upgrade1Power = 0.0001;
let star1Upgrade1Price = 0.001;
let star1Upgrade1PriceMod = 1.3;

let star1Upgrade2Qt = 0;
let star1Upgrade2Power = 0.0001;
let star1Upgrade2Price = 0.01;
let star1Upgrade2PriceMod = 2;

let star1Upgrade3Qt = 0;
let star1Upgrade3Power = 1;
let star1Upgrade3Price = 0.5;
let star1Upgrade3PriceMod = 100000;

let star1Upgrade4Qt = 0;
let star1Upgrade4Power = 0.01;
let star1Upgrade4Price = 0.01;
let star1Upgrade4PriceMod = 1.3;

let star2Upgrade1Qt = 0;
let star2Upgrade1Power = 0.001;
let star2Upgrade1Price = 0.005;
let star2Upgrade1PriceMod = 1.3;

let star2Upgrade2Qt = 0;
let star2Upgrade2Power = 1;
let star2Upgrade2Price = 0.1;
let star2Upgrade2PriceMod = 2;

let star2Upgrade3Qt = 0;
let star2Upgrade3Power = 1;
let star2Upgrade3Price = 0.05;
let star2Upgrade3PriceMod = 3;

let star2Upgrade4Qt = 0;
let star2Upgrade4Power = 0.01;
let star2Upgrade4Price = 0.01;
let star2Upgrade4PriceMod = 1.3;

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

// star1Btn.querySelector('span').innerHTML = `${star1Power}/${star1Limit}`;
updateUi();

star1Btn.addEventListener('click', powerStar1);
// star1Boost1Btn.addEventListener('click', buyUpgrade)

star1Btn.addEventListener('click', (e) => showUpgrades(e));
star2Btn.addEventListener('click', (e) => showUpgrades(e));
star3Btn.addEventListener('click', (e) => showUpgrades(e));

winBtn.addEventListener('click', () => alert('You Win!!!'));


function showUpgrades(e) {
    let id = e.target.id ? e.target.id : e.target.parentElement.id

    if (curMenuId === id) return
    else upgardeMenus.forEach(menu => {
            if (menu.getAttribute('data-upgrades') === id) menu.classList.remove('hidden')
            else menu.classList.add('hidden')
        
            curMenuId = id;
        })
}

function powerStar1() {
    if (prestiges.prestige4) star1GainModifier *= 1 + (star1Upgrade1Qt + star1Upgrade2Qt + star1Upgrade3Qt) * 0.05;
    
    star1Gain = star1GainBase * star1GainModifier;
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

            if (prestiges.prestige9) {
                star2Gain = (star2Gain + star2Upgrade1Power) * 2;
                star2Power -= star2Upgrade2Qt * star2Gain;
            }
        };
    }

    updateUi();
}

function powerStar2() {
    if (prestiges.prestige5) star2GainModifier *= 1 + (star2Upgrade1Qt + star2Upgrade2Qt + star2Upgrade3Qt) * 0.05;
    star2Gain = star2GainBase * star2GainModifier
    curIntervalId = setInterval(() => {
        // star2Power -= star2Gain + star2BoostPower * star2Boosts;
        star2Power -= star2Gain;

        if ( prestiges.prestige8) powerStar1();

        if (star2Power <= 0) {
            star2Power = 0;
            // clearInterval(curIntervalId);
            // curIntervalId = null;

            isReady = true;
            star3Btn.querySelector('span').innerHTML = `${star3Power}/${star3Limit}`;
        }

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
            star1Upgrade1Price *= star1Upgrade1PriceMod;
        }
    
        if (id === 'star1Upgrade2') {
            star1Power -= star1Upgrade2Price;
            star1Upgrade2Qt++;
            star1Upgrade1Power += star1Upgrade2Power;
            star1Upgrade2Price *= star1Upgrade2PriceMod;
        }
    
        if (id === 'star1Upgrade3') {
            star1Power -= star1Upgrade3Price;
            star1Upgrade3Qt++;
            star1Gain *= 2;
            star1GainBase *= 2;
            star1Upgrade3Price *= star1Upgrade3PriceMod;
        }

        if (id === 'star1Upgrade4') {
            star1Power -= star1Upgrade4Price;
            star1Upgrade4Qt++;
            // star1Gain += star1Upgrade1Power;
            star1GainBase += star1Upgrade4Power;
            star1Upgrade4Price *= star1Upgrade4PriceMod;
        }
    }

    if (id[4] === '2') {
        if (id === 'star2Upgrade1') {
            star2Power += star2Upgrade1Price;
            star2Upgrade1Qt++;
            star2Upgrade1Price *= star2Upgrade1PriceMod;
        }
    
        if (id === 'star2Upgrade2') {
            star2Power += star2Upgrade2Price;
            star2Upgrade2Qt++;
            // star1Upgrade1Power += star1Upgrade2Power;
            star2Upgrade2Price *= star2Upgrade2PriceMod;
        }
    
        if (id === 'star2Upgrade3') {
            star2Power += star2Upgrade3Price;
            star2Upgrade1Price /= 2;
            star2Upgrade2Price /= 2;
            star2Upgrade3Qt++;
            star2Upgrade3Price *= star2Upgrade3PriceMod;

            if(prestiges.prestige6) {
                star1Upgrade1Price /= 2;
                star1Upgrade2Price /= 2;
            }
        }

        if (id === 'star2Upgrade4') {
            star2Power += star2Upgrade4Price;
            star2Upgrade4Qt++;
            star2Gain += star2Upgrade4Power;
            star2Upgrade4Price *= star2Upgrade4PriceMod;
        }
    }

    if (id[4] === '3') prestige(id);

    updateUi();
}

function prestige(id) {
    star1Power = 0;
    star1GainBase = 0.0001;
    // star1GainModifier = 1;

    star2Power = star2Limit;
    star2GainBase = 0.001;
    star2GainModifier = 1;
    star2Time = 1000;

    star3Power += 0.1;

    star1Upgrade1Qt = 0;
    star1Upgrade1Power = 0.0001;
    let tempStar1Upgrade1Price = star1Upgrade1Price
    star1Upgrade1Price = 0.001;

    star1Upgrade2Qt = 0;
    star1Upgrade2Power = 0.0001;
    let tempStar1Upgrade2Price = star1Upgrade2Price
    star1Upgrade2Price = 0.01;

    star1Upgrade3Qt = 0;
    star1Upgrade3Price = 0.5;

    star1Upgrade4Qt = 0;
    star1Upgrade4Power = 0.01;
    star1Upgrade4Price = 0.01;

    star2Upgrade1Qt = 0;
    star2Upgrade1Power = 0.001;
    let tempStar2Upgrade1Price = star2Upgrade1Price;
    star2Upgrade1Price = 0.005;

    star2Upgrade2Qt = 0;
    // star2Upgrade2Power = 0.001;
    let tempStar2Upgrade2Price = star2Upgrade2Price;
    star2Upgrade2Price = 0.1;

    star2Upgrade3Qt = 0;
    star2Upgrade3Price = 0.05;

    star2Upgrade4Qt = 0;
    star2Upgrade4Power = 0.003;
    star2Upgrade4Price = 0.01;

    // curMenuId = null;
    clearInterval(curIntervalId);
    curIntervalId = null;

    // console.log(curIntervalId);
    
    if (id === 'star3Upgrade1' || prestiges.prestige1 === true) {
        // star3Power -= prestigePrice;
        prestiges.prestige1 = true;
        star1GainModifier *= 2;
        star1Upgrade1Power *= 2;
        star1Upgrade2Power *= 2;
        star1Upgrade3Power *= 2;
    }

    if (id === 'star3Upgrade2' || prestiges.prestige2 === true) {
        // star3Power -= prestigePrice;
        prestiges.prestige2 = true;
        star2Time /= 2;
        // Implement "Each fill burns double energy"
    }

    if (id === 'star3Upgrade3' || prestiges.prestige3 === true) {
        // star3Power -= prestigePrice;
        prestiges.prestige3 = true;
        powerStar2();
    }

    if (id === 'star3Upgrade4' || prestiges.prestige4 === true) {
        // star3Power -= prestigePrice;
        prestiges.prestige4 = true;
    }

    if (id === 'star3Upgrade5' || prestiges.prestige5 === true) {
        // star3Power -= prestigePrice;
        prestiges.prestige5 = true;
    }

    if (id === 'star3Upgrade6' || prestiges.prestige6 === true) {
        // star3Power -= prestigePrice;
        prestiges.prestige6 = true;
        buyUpgrade('star2Upgrade3');
    }

    if (id === 'star3Upgrade7' || prestiges.prestige7 === true) {
        // star3Power -= prestigePrice;
        prestiges.prestige7 = true;
    }

    if (id === 'star3Upgrade8' || prestiges.prestige8 === true) {
        // star3Power -= prestigePrice;
        prestiges.prestige8 = true;
    }

    if (id === 'star3Upgrade9' || prestiges.prestige9 === true) {
        // star3Power -= prestigePrice;
        prestiges.prestige9 = true;
    }

    if (id === 'star3Upgrade10' || prestiges.prestige10 === true) {
        // star3Power -= prestigePrice;
        prestiges.prestige10 = true;
        star2Upgrade1Price = tempStar2Upgrade1Price;
        star2Upgrade2Price = tempStar2Upgrade2Price;

        if (prestiges.prestige6 === true) {
            star1Upgrade1Price = tempStar1Upgrade1Price;
            star1Upgrade2Price = tempStar1Upgrade2Price;
        }
    }
}

function updateUi() {
    star1Btn.querySelector('span').innerHTML = `${star1Power.toFixed(4)}/${star1Limit}`;
    star2Btn.querySelector('span').innerHTML = star2Power < star2Limit ? `${star2Power.toFixed(3)}/${star2Limit}` : 'Inactive';
    star3Btn.querySelector('span').innerHTML = isReady ? `${star3Power}/${star3Limit}` : 'Inactive';

    if (star1Power < star1Upgrade1Price) upgradeBtns[0].classList.add('hidden')
    else upgradeBtns[0].classList.remove('hidden')
    upgradeBtns[0].querySelector('.upgInfo').innerHTML = `(${star1Upgrade1Price.toFixed(4)}) [${star1Upgrade1Qt}]`;

    if (star1Power < star1Upgrade2Price) upgradeBtns[1].classList.add('hidden')
    else upgradeBtns[1].classList.remove('hidden')
    upgradeBtns[1].querySelector('.upgInfo').innerHTML = `(${star1Upgrade2Price.toFixed(4)}) [${star1Upgrade2Qt}]`;

    if (star1Power < star1Upgrade3Price) upgradeBtns[2].classList.add('hidden')
    else upgradeBtns[2].classList.remove('hidden')
    upgradeBtns[2].querySelector('.upgInfo').innerHTML = `(${star1Upgrade3Price.toFixed(4)}) [${star1Upgrade3Qt}]`;

    if (star1Power >= star1Upgrade4Price && prestiges.prestige7) upgradeBtns[3].classList.remove('hidden')
    else upgradeBtns[3].classList.add('hidden')
    upgradeBtns[3].querySelector('.upgInfo').innerHTML = `(${star1Upgrade4Price.toFixed(4)}) [${star1Upgrade4Qt}]`;

    if (star2Power > star2Limit - star2Upgrade1Price) upgradeBtns[4].classList.add('hidden')
    else upgradeBtns[4].classList.remove('hidden')
    upgradeBtns[4].querySelector('.upgInfo').innerHTML = `(${star2Upgrade1Price.toFixed(4)}) [${star2Upgrade1Qt}]`;

    if (star2Power > star2Limit - star2Upgrade2Price) upgradeBtns[5].classList.add('hidden')
    else upgradeBtns[5].classList.remove('hidden')
    upgradeBtns[5].querySelector('span').innerHTML = star2Upgrade2Qt;
    upgradeBtns[5].querySelector('.upgInfo').innerHTML = `(${star2Upgrade2Price.toFixed(4)}) [${star2Upgrade2Qt}]`;

    if (star2Power > star2Limit - star2Upgrade3Price) upgradeBtns[6].classList.add('hidden')
    else upgradeBtns[6].classList.remove('hidden')
    upgradeBtns[6].querySelector('.upgInfo').innerHTML = `(${star2Upgrade3Price.toFixed(4)}) [${star2Upgrade3Qt}]`;

    if (star2Power <= star2Limit - star2Upgrade4Price && prestiges.prestige7) upgradeBtns[7].classList.remove('hidden')
    else upgradeBtns[7].classList.add('hidden')
    upgradeBtns[7].querySelector('.upgInfo').innerHTML = `(${star2Upgrade4Price.toFixed(4)}) [${star2Upgrade4Qt}]`;

    Object.keys(prestiges).forEach((key, index) => {
        if (isReady && !prestiges[key])  upgradeBtns[8 + index].classList.remove('hidden')
        else upgradeBtns[8 + index].classList.add('hidden')

        if (!Object.values(prestiges).includes(false)) winBtn.classList.remove('hidden');
    })
}
