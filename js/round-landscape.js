// Made with Zdog


// colors
let darkPurple = "#6a1b9a";
let purple = "#8d2ea0";

let darkGreen = "#47430b";
let shadedGreen = "#908a1d";
let shadedOlive = "#7c7414";
let olive = "#a89431";
let green = "#b5a337";
let brown = "#7a553c";

var white = 'white';

let gold = "#ffd54f";
let paleGold = "#ffe082";
let beige = "#ffecb3";

// --- Base illustration --- 

var illoElem = document.querySelector('.illo');
var w = 160;
var h = 160;
var minWindowSize = Math.min( window.innerWidth, window.innerHeight );
var zoom = Math.min( 6, Math.floor( minWindowSize / w ) );
illoElem.setAttribute( 'width', w * zoom );
illoElem.setAttribute( 'height', h * zoom );

var isSpinning = true;
var TAU = Zdog.TAU;

var illo = new Zdog.Illustration({
  element: illoElem,
  zoom: zoom,
  rotate: { y: TAU/8 },
  dragRotate: true,
  onDragStart: function() {
    isSpinning = false;
  },
});

// default to flat, filled shapes
[ Zdog.Shape, Zdog.Rect, Zdog.Ellipse ].forEach( function( ItemClass ) {
  ItemClass.defaults.fill = true;
  ItemClass.defaults.stroke = false;
});

// --- Base ---
// TODO: why is this useful?
let quarterView = 1/Math.sin(TAU/8);
let plateau = new Zdog.Group({
    addTo: illo,
    translate: { y: 36 },
    // scale: { x: quarterView, z: quarterView },
    updateSort: true
})



function add_hill(x, y, d, h, color) {
    let stroke=20;
    // Due to how quarters work, height and diameter are inversed for our purpose
    let circle = new Zdog.Ellipse({
        diameter: h,
        height: d,
        addTo: plateau,
        translate: {x: x, y: -stroke+14, z: y},
        rotate: {y: TAU/8, z: -TAU/4},
        color: color,
        stroke: stroke,
        fill: true,
        close: true,
        quarters: 2,
    });
    new Zdog.Shape({
        path:[
            {x: x-d/2 + stroke/2, z:y-d/2 + stroke/2},
            {x: x+d/2 - stroke/2, z:y+d/2 - stroke/2}
        ],
        stroke: stroke,
        color:color,
        translate: circle.translate,
        addTo: plateau,
    })
}

add_hill(0, 0, 20, 25, olive);

    
// ----- Flat earth -----
var flatEarth = new Zdog.Ellipse({
    diameter: 128,
    addTo: illo,
    translate: plateau.translate,
    rotate: { x: TAU / 4 },
    stroke: 8,
    color: shadedGreen,
});

// ----- Sky ----- //

var sky = new Zdog.Group({
  addTo: illo,
  translate: plateau.translate,
});

function build_skyline(bottomYs, topYs, color) {
  var radius = 64;
  var skyPanelCount = topYs.length;
  var angle = TAU / skyPanelCount;
  var panelWidth = Math.tan( angle/2 ) * radius * 2;
  for ( var i=0; i < skyPanelCount; i++ ) {
    var nextI = (i + 1) % skyPanelCount;
    var topYA = topYs[ i ];
    var topYB = topYs[ nextI ];
    var bottomYA = bottomYs[ i ];
    var bottomYB = bottomYs[ nextI ];
    var panelAnchor = new Zdog.Anchor({
      addTo: sky,
      rotate: { y: angle * i  - TAU/4 },
      translate: { y: 1 },
    });
    new Zdog.Shape({
      path: [
        { x: -panelWidth/2, y: topYA },
        { bezier: [
          { x: 0, y: topYA },
          { x: 0, y: topYB },
          { x:  panelWidth/2, y: topYB },
        ]},
        { x:  panelWidth/2, y: bottomYB },
        { bezier: [
          { x: 0, y: bottomYB },
          { x: 0, y: bottomYA },
          { x: -panelWidth/2, y: bottomYA },
        ]},
      ],
      addTo: panelAnchor,
      translate: { z: -radius },
      color: color,
      stroke: 1,
      backface: false,
    });
  }
}

let groundLine = [
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
];
let firstLine = [
    -14, -14, -10, -10,
    -6, -6, -0, -0,
    -6, -6, -10, -10,
    -14, -14, -18, -18,
];
let secondLine = [
    -36, -36, -30, -30,
    -26, -26, -22, -22,
    -26, -26, -26, -26,
    -32, -32, -34, -34,
];
let thirdLine = [
    -48, -48, -50, -50,
    -44, -44, -40, -40,
    -42, -42, -46, -46,
    -46, -46, -50, -50,
]

build_skyline(groundLine, firstLine, beige);
build_skyline(firstLine, secondLine, paleGold);
build_skyline(secondLine, thirdLine, gold);

// -- animate --- //

var t = 0;
var tSpeed = 1/120;
var then = new Date() - 1/60;

function animate() {
  update();
  render();
  requestAnimationFrame( animate );
}

animate();

// -- update -- //

function update() {
  var now = new Date();
  var delta = now - then;

  if ( isSpinning ) {
    t += tSpeed * delta/60;
    var theta = Zdog.easeInOut( t % 1 ) * TAU;
    var rev = 1;
    var spin = -theta * rev + TAU/8;
    var extraRotation = TAU * rev * Math.floor( ( t % 4 ) );
    illo.rotate.y = spin - extraRotation;
    var everyOtherCycle = t % 2 < 1;
    illo.rotate.x = everyOtherCycle ? 0 : ( Math.cos( theta ) * -0.5 + 0.5 ) * TAU * -1/8;
  }
  illo.normalizeRotate();

  // rotate
  illo.updateGraph();

  then = now;
}

// -- render -- //

function render() {
  var ctx = illo.ctx;
  illo.prerenderCanvas();

  // render shapes
  var isCameraXUp = illo.rotate.x < 0 || illo.rotate.x > TAU/2;

  sky.renderGraphCanvas( ctx );

  // HACK: if camera is below ground, render earth second
  // to avoid seeing through it
  if ( isCameraXUp ) {
    flatEarth.renderGraphCanvas( ctx );
  }
  plateau.renderGraphCanvas( ctx );
  if ( !isCameraXUp ) {
    flatEarth.renderGraphCanvas( ctx );
  }

  illo.postrenderCanvas();
  ctx.restore();
}

// // ----- inputs ----- //

// document.querySelector('.reset-button').onclick = function() {
//   isSpinning = false;
//   illo.rotate.set({ x: 0, y: TAU/8 });
// };
