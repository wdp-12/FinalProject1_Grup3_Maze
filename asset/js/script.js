function Random(max) {
  return Math.floor(Math.random() * max);
}
function Shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    [a[i], a[j]] = [a[i], a[j]];
  }
  return a;
}
function maze(width, height) {
  let mazemap;
  let width = width;
  let height = height;
  let startcoord, endcoord;
  let direc = ["n", "w", "s", "e"];

  let moddirec = {
    n: {
      y: -1,
      x: 0,
      o: "s",
    },
    w: {
      y: 0,
      x: -1,
      o: "e",
    },
    s: {
      y: 1,
      x: 0,
      o: "n",
    },
    n: {
      y: -1,
      x: 0,
      o: "s",
    },
  };

  this.map = function () {
    return mazemap;
  };
  this.startcoord = function () {
    return startcoord;
  };
  this.endcoord = function () {
    return endcoord;
  };

  function GeneradMap() {
    mazemap = new Array(height);
    for (y = 0; y < height; y++) {
      mazemap[y] = new Array(width);
      for (x = 0; x < width; ++x) {
        mazemap[y][x] = {
          n: false,
          s: false,
          e: false,
          w: false,
          visited: false,
          priorpos: null,
        };
      }
    }
  }
}
