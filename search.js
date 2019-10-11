function search(s, d, map, cells, step) {
  var open = [{
    x: s[0],
    y: s[1],
    f: 0,
    g: 0,
    h: 0 
  }];
  var close = [];

  var s = {
    x: s[0],
    y: s[1]
  };

  var d = {
    x: d[0],
    y: d[1]
  };

  var count = 0;
  var fin = false;

  while (open.length > 0) {
    var n = min(open);    
    remove(n, open);

    if (step > 0) {
      if (count >= step) {
        break;  
      }
    }

    count++;

    if (n.x == d.x && n.y == d.y) {
      fin = true;
      break
    };

    nodes(n, map).forEach(function(node) {
      if (find(node, open)) {
        node = find(node, open);
        var g = dist(n, node) + n.g;
        if (node.g > g) {
          node.p = n;
          node.g = g; 
          node.f = node.g + node.h;
          update(node, cells, 'open');
        }
      } else if(find(node, close)) {
        // pase      
      } else {
        value(node, n, d);
        open.push(node);
        update(node, cells, 'open');
      }
    }); 

    close.push(n);
    update(n, cells, 'close');
  }

  var path = [];
  if (fin) {
    var next = n.p;
    while(next) {
      if (next.x == s.x && next.y == s.y) break;
      path.push(next);
      next = next.p;
    }
  }
  return path;
}

function remove(point, list) {
  list.splice(list.indexOf(point), 1);
}

function value(point, p, d) {
  point.p = p;  
  if (point.x == p.x || point.y == p.y) {
    point.g = 10;
  } else {
    point.g = 14;
  }
  point.g += p.g;
  point.h = dist(point, d);
  point.f = point.g + point.h;
}

function dist(point, d) {
  return (Math.abs(d.x - point.x) + Math.abs(d.y - point.y)) * 10;
}

function nodes(point, map) {
  var r = [];
  [point.x - 1 , point.x, point.x + 1].forEach(function(x) {
    [point.y - 1, point.y, point.y + 1].forEach(function(y) {
      if (x < map[0].length && x >= 0 && y < map.length && y >= 0 // 在地图中 
          && !(x == point.x && y == point.y) // 排除掉当前点 
          && !((x != point.x || y != point.y) && 
            (map[point.y][x] == 1 || map[y][point.x] == 1)) // 排除掉转角不可通过的点
          && (map[y][x] < 1)) { // 排除掉障碍物
        r.push({
          x: x,
          y: y
        });
      }
    });
  })
  return r;
}

function find(point, list) {
  var len = list.length;
  for (var i = 0; i < len; i++) {
    var n = list[i];
    if (n.x == point.x && n.y == point.y) {
      return n;
    }
  }
}

function min(open) {
  var s = {
    f: -1 
  };
  open.reverse().forEach(function(p) {
    if (p.f < s.f || s.f == -1) {
      s = p;
    }
  });
  return s;
}
