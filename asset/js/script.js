function Random(max) {
  return Math.floor(Math.random() * max);
}
function Shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
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
  let Width = width;
  let Height = height;
  let startcoord, endcoord;
  let direc = ["n", "w", "s", "e"];

  var moddirec = {
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
    e: {
      y: 0,
      x: 1,
      o: "w",
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
    mazemap = new Array(Height);
    for (y = 0; y < Height; y++) {
      mazemap[y] = new Array(Width);
      for (x = 0; x < Width; ++x) {
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
  function defineMaze() {
    let iscomp = false;
    let move = false;
    let cellvisited = 1;
    let numloops = 0;
    let maxloops = 0;
    let pos = {
      x: 0,
      y: 0,
    };

    var numCells = Width * Height;
    while (!iscomp) {
      move = false;
      mazemap[pos.x][pos.y].visited = true;

      if (numloops >= maxloops) {
        Shuffle(direc);
        maxloops = Math.round(Random(height / 8));
        numloops = 0;
      }
      numloops++;

      for (index = 0; index < direc.length; index++) {
        var directions = direc[index];
        var nx = pos.x + moddirec[directions].x;
        var ny = pos.y + moddirec[directions].y;
        if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
          //Check if the tile is already visited

          if (!mazemap[nx][ny].visited) {
            //Carve through walls from this tile to next
            mazemap[pos.x][pos.y][directions] = true;
            mazemap[nx][ny][moddirec[directions].o] = true;
            //Set Currentcell as next cells Prior visited
            mazemap[nx][ny].priorpos = pos;
            //Update Cell position to newly visited location
            pos = {
              x: nx,
              y: ny,
            };
            cellvisited++;
            //Recursively call this method on the next tile
            move = true;
            break;
          }
        }
      }
      if (!move) {
        //  If it failed to find a direction,
        //  move the current position back to the prior cell and Recall the method.
        pos = mazemap[pos.x][pos.y].priorpos;
      }
      if (numCells == cellvisited) {
        iscomp = true;
      }
    }
  }

  function defineStartEnd() {
    switch (Random(4)) {
      case 0:
        startcoord = {
          x: 0,
          y: 0,
        };
        endcoord = {
          x: height - 1,
          y: width - 1,
        };
        break;
      case 1:
        startcoord = {
          x: 0,
          y: width - 1,
        };
        endcoord = {
          x: height - 1,
          y: 0,
        };
        break;
      case 2:
        startcoord = {
          x: height - 1,
          y: 0,
        };
        endcoord = {
          x: 0,
          y: width - 1,
        };
        break;
      case 3:
        startcoord = {
          x: height - 1,
          y: width - 1,
        };
        endcoord = {
          x: 0,
          y: 0,
        };
        break;
    }
  }

  GeneradMap();
  defineStartEnd();
  defineMaze();
}

function DrawtheMaze(maze, ctx, cellSize, endSprite = null) {
  let map = maze.map();
  let CellSize = cellSize;
  let Drawendmethod;
  ctx.linewidth = CellSize / 40;

  this.redDrawMAze = function (size) {
    CellSize = size;
    ctx.linewidth = CellSize / 50;
    DrawMap();
    Drawendmethod();
  };

  function DrawCell(xcoord, ycoord, cell) {
    var x = xcoord * CellSize;
    var y = ycoord * CellSize;

    if (cell.n == false) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + CellSize, y);
      ctx.stroke();
    }
    if (cell.s === false) {
      ctx.beginPath();
      ctx.moveTo(x, y + CellSize);
      ctx.lineTo(x + CellSize, y + CellSize);
      ctx.stroke();
    }
    if (cell.e === false) {
      ctx.beginPath();
      ctx.moveTo(x + CellSize, y);
      ctx.lineTo(x + CellSize, y + CellSize);
      ctx.stroke();
    }
    if (cell.w == false) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + CellSize);
      ctx.stroke();
    }
  }

  function DrawMap() {
    for (x = 0; x < map.length; x++) {
      for (y = 0; y < map[x].length; y++) {
        DrawCell(x, y, map[x][y]);
      }
    }
  }
}

var mazeCanvas = document.getElementById("mazeCanvas");
var ctx = mazeCanvas.getContext("2d");
var sprite;
var finishSprite;
var Maze, draw;
var cellSize;
var difficulty;

function makeMaze() {
  var e = document.getElementById("diffSelect");
  difficulty = e.options[e.selectedIndex].value;
  cellSize = mazeCanvas.width / difficulty;
  Maze = new maze(difficulty, difficulty);
  draw = new DrawtheMaze(Maze, ctx, cellSize, finishSprite);
  if (document.getElementById("mazeContainer").style.opacity < "100") {
    document.getElementById("mazeContainer").style.opacity = "100";
  }
}
