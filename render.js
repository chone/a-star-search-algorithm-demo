function render(elem, data) {
  var cells = [];
  data.forEach(function(row) {
    var $row = document.createElement('div');
    var c = [];
    row.forEach(function(item) {
      var $cell = document.createElement('div');
      $cell.className = 'grid';

      var y = cells.length;
      var x = c.length; 
      
      var html = '<div class="btn btn1" onclick="setStarting(this,' + 
        x + ',' + y + ')">设为起点</div>' +
        '<div class="btn btn3" onclick="setDest(this,' + 
        x + ',' + y + ')">设为终点</div>' +
        '<div class="btn btn2" onclick="setBloc(this,' + 
        x + ',' + y + ')">设为障碍</div>';

      $cell.innerHTML = html;

      if (item > 0) {
        $cell.classList.add('bloc');
      }
      c.push($cell);
      $row.appendChild($cell);
    });
    cells.push(c);
    elem.appendChild($row);
  });
  return cells;
}

function clear(elem) {
  elem.innerHTML = '';
}

function start(point, cells) {
  cells[point[1]][point[0]].classList.add('starting');
}

function end(point, cells) {
  cells[point[1]][point[0]].classList.add('destination');
}

var current;

function updateCurrent(point, cells) {
  var n = cells[point.y][point.x];

  if (current) {
    current.classList.remove('current');
  }

  current = n;
  current.classList.add('current');
}

var head;

function updateHead(point, cells) {
  var n = cells[point.y][point.x];
  
  if (head) {
    head.classList.remove('head');
  }

  head = n;
  head.classList.add('head');
}


function update(point, cells, type) {
  var n = cells[point.y][point.x];

  var html = '<div class="g">' + (point.g || '') + '</div>' +
    '<div class="h">' + (point.h || '') + '</div>' +
    '<div class="f">' + (point.f || '') + '</div>';

  if (point.p) {
    html += '<div class="arrow">';  
    //↑↖↗↙↘
    //↑↖↗↙↘
    //↑↓←→↖↗↙↘↕
    if (point.p.x > point.x) {
      if (point.p.y > point.y) {
        html += '↘';
      } else if (point.p.y < point.y) {
        html += '↗';
      } else {
        html += '→';
      }
    } else if (point.p.x < point.x) {
      if (point.p.y > point.y) {
        html += '↙';
      } else if (point.p.y < point.y) {
        html += '↖';
      } else {
        html += '←';
      }
    } else {
      if (point.p.y > point.y) {
        html += '↓';
      } else if (point.p.y < point.y) {
        html += '↑';
      }
    }
    html += '</div>';  
  }

  var x = point.x;
  var y = point.y;
  html += '<div class="btn btn1" onclick="setStarting(this,' + 
        x + ',' + y + ')">设为起点</div>' +
        '<div class="btn btn3" onclick="setDest(this,' + 
        x + ',' + y + ')">设为终点</div>' +
        '<div class="btn btn2" onclick="setBloc(this,' + 
        x + ',' + y + ')">设为障碍</div>';



  n.innerHTML = html;

  n.classList.remove('open');
  n.classList.remove('close');
  n.classList.remove('path');

  if (type == 'open') {
    n.classList.add('open');
  } else if (type == 'close') {
    n.classList.add('close');
  } else if (type == 'path') {
    n.classList.add('path');
    n.classList.add('close');
    if (head) {
      head.classList.remove('head');
    }
    if (current) {
      current.classList.remove('current');
    }
  }
}


