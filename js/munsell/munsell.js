import { munsell, neutrals } from './real.js'


let level_height = 12;
let h_spacing = 15;
let center_radius = 10;
let stroke = 10;

let TAU = Zdog.TAU;
let theta = TAU/40;

var element = document.querySelector('#illo');

let isSpinning = true;

// create illo
let illo = new Zdog.Illustration({
  element: element,
  zoom: 2,
  resize: true,
  rotate: {x : -TAU/10},
  dragRotate: true,
  onDragStart: function() {
    isSpinning = false;
  }
});

for(var i = 0; i < neutrals.length; i++) {
  new Zdog.Shape({
    addTo: illo,
    translate: {y : (5-i) * level_height },
    stroke: stroke,
    color: neutrals[i]
  })
}

for(var i = 0, len = munsell.length; i < len; i++) {
  let color = munsell[i]
  let angle = theta * color.h_idx
  let r = center_radius + h_spacing * (color.C / 2 - 1)
  let x = Math.cos(angle) * r;
  let z = Math.sin(angle) * r;
  new Zdog.Shape({
    addTo: illo,
    translate: { x: x, y: (5-color.V) * level_height, z: z },
    stroke: stroke,
    color: color.hex,
  })
}

// setup animation and render
function animate() {
  if(isSpinning) {
    illo.rotate.y += 0.005
  }
  illo.updateRenderGraph()
  requestAnimationFrame(animate);
}

animate();