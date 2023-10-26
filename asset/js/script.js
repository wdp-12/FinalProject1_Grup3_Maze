function Random(max) {
  return Math.floor(Math.random() * max);
}
function Shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    [a[i], a[j]] = [a[i], a[j]];
  }
  return a;
}
  
  function changeBrightness(factor, sprite) {
    var virtCanvas = document.createElement("canvas");
    virtCanvas.width = 500;
    virtCanvas.height = 500;
    var context = virtCanvas.getContext("2d");
    context.drawImage(sprite, 0, 0, 500, 500);
  
    var imgData = context.getImageData(0, 0, 500, 500);
  
    for (let i = 0; i < imgData.data.length; i += 4) {
      imgData.data[i] = imgData.data[i] * factor;
      imgData.data[i + 1] = imgData.data[i + 1] * factor;
      imgData.data[i + 2] = imgData.data[i + 2] * factor;
    }
    context.putImageData(imgData, 0, 0);
  
    var spriteOutput = new Image();
    spriteOutput.src = virtCanvas.toDataURL();
    virtCanvas.remove();
    return spriteOutput;
  }
  
  function displayVictoryMess(moves) {
    document.getElementById("moves").innerHTML = "You Moved " + moves + " Steps.";
    toggleVisablity("Message-Container");  
  }
  
  function toggleVisablity(id) {
    if (document.getElementById(id).style.visibility == "visible") {
      document.getElementById(id).style.visibility = "hidden";
    } else {
      document.getElementById(id).style.visibility = "visible";
    }
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
    function defineMaze() {
      var isComp = false;
      var move = false;
      var cellsVisited = 1;
      var numLoops = 0;
      var maxLoops = 0;
      var pos = {
        x: 0,
        y: 0
      };
      var numCells = width * height;
      while (!isComp) {
        move = false;
        mazeMap[pos.x][pos.y].visited = true;
  
        if (numLoops >= maxLoops) {
          shuffle(dirs);
          maxLoops = Math.round(rand(height / 8));
          numLoops = 0;
        }
        numLoops++;
        for (index = 0; index < dirs.length; index++) {
          var direction = dirs[index];
          var nx = pos.x + modDir[direction].x;
          var ny = pos.y + modDir[direction].y;
  
          if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
            //Check if the tile is already visited
            if (!mazeMap[nx][ny].visited) {
              //Carve through walls from this tile to next
              mazeMap[pos.x][pos.y][direction] = true;
              mazeMap[nx][ny][modDir[direction].o] = true;
  
              //Set Currentcell as next cells Prior visited
              mazeMap[nx][ny].priorPos = pos;
              //Update Cell position to newly visited location
              pos = {
                x: nx,
                y: ny
              };
              cellsVisited++;
              //Recursively call this method on the next tile
              move = true;
              break;
            }
          }
        }
  
        if (!move) {
          //  If it failed to find a direction,
          //  move the current position back to the prior cell and Recall the method.
          pos = mazeMap[pos.x][pos.y].priorPos;
        }
        if (numCells == cellsVisited) {
          isComp = true;
        }
      }
    }
  
    function defineStartEnd() {
      switch (rand(4)) {
        case 0:
          startCoord = {
            x: 0,
            y: 0
          };
          endCoord = {
            x: height - 1,
            y: width - 1
          };
          break;
        case 1:
          startCoord = {
            x: 0,
            y: width - 1
          };
          endCoord = {
            x: height - 1,
            y: 0
          };
          break;
        case 2:
          startCoord = {
            x: height - 1,
            y: 0
          };
          endCoord = {
            x: 0,
            y: width - 1
          };
          break;
        case 3:
          startCoord = {
            x: height - 1,
            y: width - 1
          };
          endCoord = {
            x: 0,
            y: 0
          };
          break;
      }
    }
  
    genMap();
    defineStartEnd();
    defineMaze();
  }
  
  
=======
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
