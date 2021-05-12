async function fetch_data() {
  let request = await fetch('/js/munsell/munsell.json');
  let munsell = await request.json();
  request = await fetch('/js/munsell/nonRGB.json');
  let nonRGB = await request.json();
  return { data: munsell.concat(nonRGB), delimiter: munsell.length } ;
}

// delimiter indicates the index at which non-sRGB colors start
function draw_illo(data, delimiter) { 
  let vspacing = 15;
  let hspacing = 15;
  let stroke = 8;

  let TAU = Zdog.TAU;
  let theta = TAU/40;

  var element = document.querySelector('#illo');

  let isSpinning = true;

  // create illo
  let illo = new Zdog.Illustration({
    element: element,
    rotate: {x : -TAU/12},
    zoom: 2,
    dragRotate: true,
    onDragStart: function() {
      isSpinning = false;
    }
  });

  let colors = new Array(data.length);
  for(var i = 0, len = data.length; i < len; i++) {
    let color = data[i]
    // (r, theta) cylindrical coordinates
    let angle = color.hidx * theta
    let r = color.C * hspacing / 2
    // convert to Cartesian coordinates
    let x = Math.cos(angle) * r;
    let z = Math.sin(angle) * r;
    colors[i] = new Zdog.Shape({
      addTo: illo,
      translate: { x: x, y: (5-color.V) * vspacing, z: z },
      stroke: stroke,
      color: color.hex,
      visible: i < delimiter
    });
    // for interactivity functions
    colors[i].V = color.V;
    colors[i].C = color.C;
    colors[i].hidx = color.hidx;
  }

  window.updateStroke = function(value) {
    for(var i = 0, len = colors.length; i < len; i++) {
     colors[i].stroke = value;
    }
  }

  window.updateVSpacing = function(value) {
    for(var i = 0, len = colors.length; i < len; i++) {
      colors[i].translate.y = (5 - colors[i].V) * value;
    }
  }

  window.updateHSpacing = function(value) {
    for(var i = 0, len = colors.length; i < len; i++) {
      let r = colors[i].C * value / 2
      let angle = colors[i].hidx * theta
      colors[i].translate.x = Math.cos(angle) * r;
      colors[i].translate.z = Math.sin(angle) * r
    }
  }

  window.toggleNonRgb = function() {
    for(var i = delimiter, len = colors.length; i < len; i++) {
      colors[i].visible = !colors[i].visible;
    }
  }

  // setup animation and render
  function animate() {
    if(isSpinning) {
      illo.rotate.y += 0.02
    }
    illo.updateRenderGraph()
    requestAnimationFrame(animate);
  }

  function onWheel(event) {
    const min_zoom = 1;
    const max_zoom = 4;
    event.preventDefault();
    // zoom out
    if(event.deltaY > 0 && illo.zoom > min_zoom) {
      illo.zoom -= 2 * event.deltaY / element.height;
    }
    // zooom in
    else if (event.deltaY < 0 && illo.zoom < max_zoom) {
      illo.zoom -= 2 * event.deltaY / element.height;
    }
  }

  element.onwheel = onWheel;

  animate();
}

fetch_data().then(
  result => draw_illo(result.data, result.delimiter))