async function fetch_data() {
  let request = await fetch('/js/munsell/munsell.json');
  let munsell = await request.json();
  request = await fetch('/js/munsell/nonRGB.json');
  let nonRGB = await request.json();
  return { data: munsell.concat(nonRGB), delimiter: munsell.length } ;
}

// delimiter indicates the index at which non-sRGB colors start
function draw_illo(data, delimiter) { 
  let minwidth = 800;
  let zoom = 1.8;
  if(window.innerWidth < minwidth) {
    zoom *= minwidth / window.innerWidth;
  }

  let spacing = 15;
  let stroke = 8;

  let TAU = Zdog.TAU;
  let theta = TAU/40;

  var element = document.getElementById('illo');

  let isSpinning = true;

  // create illo
  let illo = new Zdog.Illustration({
    element: element,
    rotate: {x : -TAU/12},
    zoom: zoom,
    resize: true,
    onResize: function(width) {
      this.zoom = zoom * width/minwidth;
    },
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
    let r = color.C * spacing / 2
    // convert to Cartesian coordinates
    let x = Math.cos(angle) * r;
    let z = Math.sin(angle) * r;
    colors[i] = new Zdog.Shape({
      addTo: illo,
      translate: { x: x, y: (5-color.V) * spacing, z: z },
      stroke: stroke,
      color: color.hex,
      visible: i < delimiter,
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

  window.updateSpacing = function(value) {
    for(var i = 0, len = colors.length; i < len; i++) {
      let r = colors[i].C * value / 2
      let angle = colors[i].hidx * theta
      colors[i].translate.x = Math.cos(angle) * r;
      colors[i].translate.y = (5 - colors[i].V) * value;
      colors[i].translate.z = Math.sin(angle) * r
    }
  }

  const toggleNonRgb = document.getElementById('nonRGB');
  const baseText = ' non sRGB colors';
  window.toggleNonRgb = function() {
    for(var i = delimiter, len = colors.length; i < len; i++) {
      colors[i].visible = !colors[i].visible;
    }
    if(colors[delimiter].visible) {
      toggleNonRgb.classList.add('shadow-inner', 'bg-darkBeige');
      toggleNonRgb.classList.remove('shadow', 'bg-white');
      toggleNonRgb.innerText = 'Hide' + baseText;
    }
    else {
      toggleNonRgb.classList.add('shadow', 'bg-white');
      toggleNonRgb.classList.remove('shadow-inner', 'bg-darkBeige');
      toggleNonRgb.innerText = 'Show' + baseText;
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

  element.onwheel = function(event) {
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


  function clickDistance(p1, p2) {
    return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
  }
  
  function clientToZdog(x, y) {
    const rect = element.getBoundingClientRect();
    const zdogX = (x - rect.left - element.offsetWidth / 2) / illo.zoom;
    const zdogY = (y - rect.top - element.offsetHeight / 2) / illo.zoom;
    console.log('ClientToZdog, x:', zdogX, ' y:', zdogY);
    return { x: zdogX, y: zdogY };
  }

  let selectedColor;
  const colorDisplay = document.getElementById('colorDisplay');
  const colorHex = document.getElementById('colorHex');
  element.onclick = function(event) {
    const click = clientToZdog(event.clientX, event.clientY);
    const candidates = colors.filter(shape =>
      shape.visible && 
      clickDistance(shape.pathCommands[0].endRenderPoint, click) < shape.stroke / illo.zoom);
    if(candidates.length > 0) {
      selectedColor = candidates[0];
      for(var i = 0; i < candidates.length; i++) {
        if(candidates[i].pathCommands[0].endRenderPoint.z > selectedColor.pathCommands[0].endRenderPoint.z) {
          selectedColor = candidates[i];
        }
      }
      console.log('Clicked on color ', selectedColor.color, ' out of', candidates.length, ' candidates');
      colorDisplay.style.setProperty('background-color', selectedColor.color);
      colorHex.innerText = selectedColor.color;
    }
    else {
      colorDisplay.style.setProperty('background-color', 'white');
      colorHex.innerText = 'none'
    }
  }


  animate();
}

fetch_data().then(
  result => draw_illo(result.data, result.delimiter))
