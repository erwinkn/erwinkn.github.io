// --- VARIABLES ---
let isSpinning = false;
let TAU = Zdog.TAU;
let layerStroke = 24;
let layerSpace = layerStroke * 1.5;

let isDay = this.hour < 17;

// Confirmed colors
let gold = "#ffd54f";
let paleGold = "#ffe082";
let beige = "#ffecb3";

let darkPurple = "#6a1b9a";
let purple = "#8d2ea0";

let darkGreen = "#47430b";
let shadedGreen = "#908a1d";
let shadedOlive = "#7c7414";
let olive = "#a89431";
let green = "#b5a337";
let brown = "#7a553c";


// 2. Shapes

// 2.a. Main illustration
const illoElem = document.querySelector('.illo');
const illoSize = 360;
// TODO: setup this to match general content width
const minWindowSize = Math.min(window.innerWidth - 20, window.innerHeight - 60);
const zoom = Math.min(3, Math.floor(minWindowSize / illoSize));
illoElem.setAttribute('width', illoSize * zoom);
illoElem.setAttribute('height', illoSize * zoom);

let illo = new Zdog.Illustration({
    element: illoElem,
    zoom: zoom,
    dragRotate: true,
    onDragStart: function () {
        isSpinning = false
    },
});

// 2.b. Sky and sun
let background = new Zdog.Group({
    addTo: illo,
    translate: { z: layerSpace * -3 - 12},
})

let dim = 100;
let sky = new Zdog.Rect({
    addTo: background,
    width: dim*2,
    height: dim*2,
    stroke: layerStroke,
    fill: true,
    color: gold
});

let paleGoldStripe = new Zdog.Shape({
    path: [
        { x: -100, y: -70 },
        { bezier: [
            {x: -50, y: -20},
            {x: -12, y: -50},
            {x: 10, y: -60}
        ]},
        { bezier:[
            { x: 25, y: -65},
            { x: 50, y: -30 },
            { x : 100, y: -60 }
        ]},
        { x: 100, y: 120},
        { x: -100, y: 120}
    ],
    stroke: layerStroke,
    fill: true,
    addTo: background,
    translate: {z: layerSpace},
    color: paleGold
});

let beigeStripe = new Zdog.Shape({
    path: [
        { x: -100, y: -20 },
        { bezier: [
            {x: -75, y: 0},
            {x: -60, y: -20},
            {x: -45, y: -24}
        ]},
        { bezier: [
            {x: -15, y: -30},
            {x: -15, y: 10},
            {x: 45, y: -25}
        ]},
        { bezier:[
            { x: 50, y: -15},
            { x: 75, y: 10 },
            { x : 100, y: -20 }
        ]},
        { x: 100, y: 140},
        { x: -100, y: 140}
    ],
    stroke: layerStroke,
    fill: true,
    addTo: paleGoldStripe,
    translate: {z: layerSpace},
    color: beige
});

let sun = new Zdog.Ellipse({
    translate: {x: 30, y: -30},
    addTo: illo,
    stroke: 48,
    fill: true,
    color: '#fff'
})

// Hills
let hills = new Array(3);
for(var i=1; i<4; i++) {
    hills[i-1] = new Zdog.Group({
        addTo:illo,
        translate: {z: layerSpace*i}
    })
}

// Golden hill
new Zdog.Shape({
    path:[
        {x:-25, y:140},
        {x: dim, y:140},
        {x: dim, y:40},
        {arc:[
            {x: 100, y:15},
            {x: 80, y:25},
        ]},
        {arc:[
            {x: 45, y: 55},
            {x: 20, y: 40}
        ]},
        {arc: [
            {x:-10, y:27 },
            {x: -20, y: 100}
        ]}
        
    ],
    addTo: hills[0],
    fill: true,
    close: false,
    stroke: layerStroke,
    color: gold
});

// Lighted hill

new Zdog.Shape({
    path:[
        {x: 60, y:140},
        {x: -dim, y: 140},
        {x: -dim, y: 20},
        {arc:[
            {x:60, y:20},
            {x:60, y:140}
        ]}
    ],
    color: green,
    fill: true,
    stroke: layerStroke,
    addTo: hills[1]
})
// // stripes
// function stripe_left(start_x, start_y, length){
//     let sqrt2 = Math.sqrt(2);
//     new Zdog.Shape({
//         path:[
//             {x: start_x, y: start_y},
//             {x: start_x + sqrt2 * length, y: start_y - sqrt2*length }
//         ],
//         color: olive,
//         stroke: 14,
//         addTo: hills[1]
//     })
// }
// stripe_left(-105, 40, 17);
// stripe_left(-105, 75, 38);
// stripe_left(-105, 110, 57);
// stripe_left(-103, 145, 50);


// 3. Animation setup
let t = 0;
const tSpeed = 1 / 240
function animate() {
    if (isSpinning) {
        t = (t + tSpeed) % 1;
        const theta = Zdog.easeInOut(t) * TAU;
        const delta = (TAU * -3) / 64;
        illo.rotate.y = Math.sin(theta) * delta;
        illo.rotate.x = (Math.cos(theta) * -0.5 + 0.5) * delta;
    }
    illo.updateRenderGraph();
    requestAnimationFrame(animate);
}

animate();

// --- Utilities ---
function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomFloat(min, max) {
    return +(Math.random() * (max - min) + min).toFixed(3);
}


// === Graveyard ===

// Assumes the two points lie on the circle
// see: https://pomax.github.io/bezierinfo/#circles_cubic
function traceArc(x1, y1, angle) {
    let start = new Zdog.Vector({x: x1, y: y1});
    let radius = start.magnitude();
    let phi = Math.acos(x1 / radius);
    // counterclockwise rotation
    if(y1 < 0){
        phi = -phi;
    }
    // we first compute the result assuming:
    // - starting point of (1,0)
    // - end point of (cos(angle), sin(angle))
    let f = 4/3 * Math.tan(angle / 4);
    c1x = 1;
    c1y = f;
    c2x = Math.cos(angle) + f * Math.sin(angle);
    c2y = Math.sin(angle) - f * Math.cos(angle);
    let c1 = new Zdog.Vector({ x: c1x, y: c1y});
    let c2 = new Zdog.Vector({ x: c2x, y: c2y});
    let end = new Zdog.Vector({ x: Math.cos(angle), y: Math.sin(angle)});
    c1.rotate({ z: phi }).multiply(radius);
    c2.rotate({ z: phi }).multiply(radius);
    end.rotate({ z: phi }).multiply(radius);
    let path = {
        bezier: [
            c1,
            c2,
            end
        ]
    };
    return path;
}

// Relies on diameter and stroke
function onCircle(coord, strokeOffset) {
    radius = (diameter + stroke - strokeOffset) / 2;
    if(Math.abs(coord) > radius) {
        return 0;
    }
    return Math.sqrt(radius*radius - coord*coord)
}