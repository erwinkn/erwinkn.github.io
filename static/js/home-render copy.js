// --- VARIABLES ---
let isSpinning = true;
let TAU = Zdog.TAU;
let layerSpace = 56;

let isDay = this.hour < 17;

// Confirmed colors
let sky = isDay ? "#C5E7EA" : "#936";
let amber = isDay ? "#FFF" : "#D65";
let gold = isDay ? "#FFF" : "#FA6";
let white = "#F4F5F6";

let midnight = isDay ? "#172A54" : "#313";
let darkGreen = isDay ? "#198749" : "#525";
let lightGreen = isDay ? "#80C341" : "#D65";

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
    // onDragEnd: function () {
    //     isSpinning = true
    // }
});

// 2.b. Background
// Q: do we need to use Shape here or Anchor would be better?
let background = new Zdog.Shape({
    translate: { z: layerSpace * (-2) },
    visible: false,
    addTo: illo
});

// We have 3 background groups, randomly translated
let backgroundGroups = new Array(3);
// original: -24, 0, 24
// let zArray = [-randomInt(10, 50), 0, randomInt(10, 50)];
let zArray = [-24, 0, 24];
zArray.forEach((v, i) =>
    backgroundGroups[i] = new Zdog.Group({
        addTo: background,
        translate: { z: zArray[i] }
    }));

let diameter = randomInt(90, 170);

// Sky layer
const bgStripe = new Zdog.Rect({
    width: 180,
    height: 44,
    addTo: backgroundGroups[0],
    translate: { y: -40 },
    color: sky,
    stroke: 12,
    fill: true
})
let bgCircle = new Zdog.Ellipse({
    // Original: 96
    diameter: diameter,
    addTo: backgroundGroups[0],
    translate: { y: randomInt(-35, -10) },
    color: sky,
    // original: 24
    stroke: randomInt(20, 30),
    fill: true
});

// Amber layer
bgStripe.copy({
    addTo: backgroundGroups[1],
    translate: { y: -8 },
    color: amber
});
bgCircle.copy({
    addTo: backgroundGroups[1],
    // original: 64
    diameter: diameter * randomFloat(0.4, 0.85),
    // original: -16
    translate: { y: randomInt(-25, -10) },
    color: amber
});

// Gold (or ?) layer
bgStripe.copy({
    addTo: backgroundGroups[2],
    height: 60,
    translate: { y: 32 },
    color: gold,
})
bgCircle.copy({
    addTo: backgroundGroups[2],
    // original: width=32, height=32
    width: 32,
    height: 32,
    translate: { y: -16 },
    color: gold
    // diameter: diameter * randomFloat(0.4, 0.85),
})

// Sun, right in front of the golden layer
// TODO: position it relatively to previous layer
new Zdog.Shape({
    addTo: background,
    translate: { y: -16, z: 48 },
    stroke: 24,
    color: white
})

// 2.c. Mid-background
const midBackground = new Zdog.Group({
    addTo: illo,
    translate: { z: layerSpace * -1 },
});
// Cloud
const midBGDot = new Zdog.Shape({
    addTo: midBackground,
    translate: { x: -36, y: 18 },
    stroke: 24,
    color: amber,
});
midBGDot.copy({
    translate: { x: -24, y: 24 },
});
midBGDot.copy({
    translate: { x: -6, y: 26 },
});
midBGDot.copy({
    translate: { x: 12, y: 16 },
});
midBGDot.copy({
    translate: { x: 28, y: 12 },
});
midBGDot.copy({
    translate: { x: 48, y: 20 },
});

const midBGBigDot = midBGDot.copy({
    stroke: 48,
    translate: { x: -52, y: 40 },
});
midBGBigDot.copy({
    translate: { x: 20, y: 40 },
});
midBGBigDot.copy({
    stroke: 40,
    translate: { x: 56, y: 40 },
});
midBGBigDot.copy({
    stroke: 40,
    translate: { x: -16, y: 48 },
});


// 2.d. Midground
const midground = new Zdog.Anchor({
    addTo: illo
});

// Land shape
const midgroundGroundA = new Zdog.Shape({
    path: [
        { x: -96, y: 10 },
        { x: -86, y: 10 },
        { arc: [
            { x: -60, y: 42 },
            { x: -26, y: 42 }
        ]},
        { x: -26, y: 74 },
        { x: -96, y: 74 }
    ],
    addTo: midground,
    color: sky,
    stroke: 48,
    fill: true
});

midgroundGroundA.copy({
    path: [
        { x: -26, y: 42 },
        { arc: [
            { x: -8, y: 74 }, 
            { x: 36, y: 74 }
        ]},
        { x: 96, y: 74 },
        { x: -26, y: 74 }
    ]
});

// Trees
function tree(groupOptions, options) {
    options = Zdog.extend(options, groupOptions);
    let treeW = options.width / 2;
    let treeH = options.height / 2;

    var pointA = { x: 0, y: -treeH };
    var pointB = { x: treeW, y: treeH };
    var pointC = { x: -treeW, y: treeH };

    var treeOptions = Zdog.extend({
        path: [
        pointA,
        { bezier: [
            pointA,
            { x: treeW, y: treeH*1/3 },
            pointB,
        ]},
        pointC,
        { bezier: [
            { x: -treeW, y: treeH*1/3 },
            pointA,
            pointA,
        ]},
        ],
        fill: true,
    }, options );

    var treePlane = new Zdog.Shape( treeOptions );
    treePlane.copy({
        rotate: { y: TAU/4 },
    });
}

var midgroundTree = {
    addTo: midground,
    color: sky,
    stroke: 2,
};

tree(midgroundTree, {
    width: 10,
    height: 24,
    translate: { x: -86, y: -14, z: -8 },
});

tree(midgroundTree, {
    width: 10,
    height: 24,
    translate: { x: -86, y: -14, z: -8 },
});

tree(midgroundTree, {
    width: 16,
    height: 36,
    translate: { x: -70, y: -12, z: 14 },
});

tree(midgroundTree, {
    width: 10,
    height: 24,
    translate: { x: -60, y: -4 },
});

tree(midgroundTree, {
    width: 10,
    height: 24,
    translate: { x: -26, y: 12, z: -8 },
});

tree(midgroundTree, {
    width: 10,
    height: 24,
    translate: { x: -18, y: 18, z: 2 },
});

var lonelyTranslate = { x: 32, y: 24 };

tree(midgroundTree, {
    width: 16,
    height: 36,
    translate: lonelyTranslate,
});
// lonely tree stump
new Zdog.Shape({
    path: [
        { y: 18 },
        { y: 28 },
    ],
    addTo: midground,
    translate: lonelyTranslate,
    color: sky,
    stroke: 4,
});


tree(midgroundTree, {
    width: 10,
    height: 24,
    translate: { x: 64, y: 40, z: 6 },
});
tree(midgroundTree, {
    width: 10,
    height: 24,
    translate: { x: 72, y: 44, z: -2 },
});

// --- Animation setup ---
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