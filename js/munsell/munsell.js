import { munsell, neutrals } from './real.js'


let level_height = 15;
let h_spacing = 15;
let stroke = 8;

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

let neutrals_obj = new Array(neutrals.length);
for(var i = 0; i < neutrals.length; i++) {
  neutrals_obj[i] = new Zdog.Shape({
    addTo: illo,
    translate: {y : (5-i) * level_height },
    stroke: stroke,
    color: neutrals[i]
  });
}

let colors_obj = new Array(munsell.length)
for(var i = 0, len = munsell.length; i < len; i++) {
  let color = munsell[i]
  let angle = theta * color.h_idx
  let r = h_spacing * (color.C / 2)
  let x = Math.cos(angle) * r;
  let z = Math.sin(angle) * r;
  colors_obj[i] = new Zdog.Shape({
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

// interaction functions
window.updateStroke = function(value) {
  for(var i = 0, len = neutrals_obj.length; i < len; i++) {
    neutrals_obj[i].stroke = value;
  }
  for(var i = 0, len = colors_obj.length; i < len; i++) {
    colors_obj[i].stroke = value;
  }
}
window.updateVSpacing = function(value) {
  for(var i = 0, len = neutrals_obj.length; i < len; i++) {
    neutrals_obj[i].translate.y = (5 - i) * value;
  }
  for(var i = 0, len = colors_obj.length; i < len; i++) {
    colors_obj[i].translate.y = (5 - munsell[i].V) * value;
  }
}
let prev_h_spacing = h_spacing;
window.updateHSpacing = function(value) {
  for(var i =0, len = colors_obj.length; i < len; i++) {
    colors_obj[i].translate.x *= value / prev_h_spacing;
    colors_obj[i].translate.z *= value / prev_h_spacing;
  }
  prev_h_spacing = value;
}
