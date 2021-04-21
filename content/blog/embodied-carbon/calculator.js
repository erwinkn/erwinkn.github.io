// Assuming start year is 2021
let lifetime = 80;
let discount = 0.1;
let energy_use = 50;
let operational = 72 * energy_use / 100;
let embodied = 100 - operational;
let carbon_neutrality = 2050;

let operational_e = operational;
let embodied_e = embodied;
actualize();

function actualize() {
    let operational_act = 0;
    let step = operational / lifetime;
    let rate = 1 + discount / 100
    for(var t=1; t <= lifetime; t++) {
        console.log(Math.pow(rate, t), t)
        operational_act += step / Math.pow(rate,t)
    }
    console.log("Operational act", operational_act);
    operational_e = operational_act / (operational_act + embodied);
    console.log("Operational equivalent emissions:", operational_e);
    embodied_e = 1 - operational_e;
}

function update_lifetime(e) {
    lifetime = e.target.value;
    updateDisplay();
}

function update_discount(e) {
    discount = +e.target.value;
    updateDisplay();
}

function update_energy_use(e) {
    energy_use = +e.target.value;
    operational = 72 * energy_use / 100;
    embodied = 100 - operational;
    updateDisplay();
}

function updateDisplay() {
    actualize();
    let operationalElem = document.querySelector('.operational');
    operationalElem.innerText = operational.toFixed(0) + '%';
    let energy_useAll = document.querySelectorAll('.energy-use');
    energy_useAll.forEach(elem =>
        elem.innerText = energy_use.toFixed(0) + '%' )
    let discountAll = document.querySelectorAll('.discount');
    discountAll.forEach(elem =>
        elem.innerText = discount.toFixed(2) + '%');
    let co2multElem = document.querySelector('.co2mult');
    co2multElem.innerText = Math.pow(1 + discount / 100, 29).toFixed(2) + 'x';
    let lifetimeElem = document.querySelector('.lifetime');
    lifetimeElem.innerText = lifetime + ' years';
    let embodiedElem = document.querySelector('.embodied-e');
    embodiedElem.innerText = (embodied_e * 100) + '%';
    // let carbonneutralityElem = document.querySelector('carbon-neutrality');
    // carbonneutralityElem.innerText = 'in ' + carbon_neutrality;
}

document.querySelector('#lifetime_input')
        .addEventListener('input', update_lifetime);
document.querySelector('#discount_input')
        .addEventListener('input', update_discount);
document.querySelector('#energy_use_input')
        .addEventListener('input', update_energy_use);
updateDisplay();

