function main() {
 window.map = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]; 

  window.starting = [2, 3];
  window.dest = [6, 3];

  run();
}

function create() {
  var width = document.getElementById('width').value;
  var height = document.getElementById('height').value;

  var map = createMap(width, height);
  window.map = map;

  window.starting = null;
  window.dest = null;

  paint(); 
}

function paint() {
  var $map = document.getElementById('map');
  clear($map);
  var cells = render($map, map);

  if (window.starting) {
    start(window.starting, cells);
  }

  if (window.dest) {
    end(window.dest, cells);
  }

  return cells;
}

function run() {
  var $checkbox = document.getElementById('with-step');
  var step = -1;
  if ($checkbox.checked) {
    step = parseInt(document.getElementById('step').value, 10);
  }

  var cells = paint();

  var path = search(window.starting, window.dest, window.map, cells, step);

  path.forEach(function(node) {
    update(node, cells, 'path');
  });
}

function prevStep() {
  var $step = document.getElementById('step');
  var step = parseInt($step.value, 10);
  step--;
  if (step > 0) {
    $step.value = step;
    run();
  }
}

function nextStep() {
  var $step = document.getElementById('step');
  var step = parseInt($step.value, 10);
  step++;
  if (step > 0) {
    $step.value = step;
    run();
  }
}

function createMap(w, h) {
  var map = [];
  for (var i = 0; i < h; i++) {
    var row = [];
    for (var j = 0; j < w; j++) {
      row.push(0);
    }
    map.push(row);
  }
  return map;
}


function setStarting(elem, x, y) {
  window.starting = [x, y];
  paint();
}

function setBloc(elem, x, y) {
  window.map[y][x] = 1;
  paint();
}

function setDest(elem, x, y) {
  window.dest = [x, y];
  paint();
}

main();
