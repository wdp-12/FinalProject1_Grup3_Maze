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
  document.getElementById('congrats').play();
  document.getElementById('music').pause(); // Menghentikan musik
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

          if (!mazemap[nx][ny].visited) {
            mazemap[pos.x][pos.y][directions] = true;
            mazemap[nx][ny][moddirec[directions].o] = true;
            mazemap[nx][ny].priorpos = pos;
            pos = {
              x: nx,
              y: ny,
            };
            cellvisited++;
            move = true;
            break;
          }
        }
      }
      if (!move) {
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

  function DrawEndFlag() {
    var coord = maze.endcoord();
    var gridsize = 4;
    var franctions = CellSize / gridsize - 2;
    var colorSwap = true;

    for (let y = 0; y < gridsize; y++) {
      if (gridsize % 2 == 0) {
        colorSwap = !colorSwap;
      }
      for (let x = 0; x < gridsize; x++) {
        ctx.beginPath();
        ctx.rect(
          coord.x * CellSize + x * franctions + 4.5,
          coord.y * CellSize + y * franctions + 4.5,
          franctions,
          franctions
        );
        if (colorSwap) {
          ctx.fillStyle = "rgba(0,0,0,0.8)";
        } else {
          ctx.fillStyle = "rgba(255,255,255,0.8 )";
        }
        ctx.fill();
        colorSwap = !colorSwap;
      }
    }
  }

  function DrawEndSprite() {
    var offsetright = CellSize / 50;
    var offsetleft = CellSize / 25;
    var coord = maze.endcoord();
    ctx.drawImage(
      endSprite,
      2,
      2,
      endSprite.width,
      endSprite.height,
      coord.x * CellSize + offsetleft,
      coord.y * CellSize + offsetleft,
      CellSize - offsetright,
      CellSize - offsetright
    );
  }
  function clear() {
    let canvasSize = CellSize * map.length;
    ctx.clearRect(0, 0, canvasSize, canvasSize);
  }
  if (endSprite != null) {
    Drawendmethod = DrawEndSprite;
  } else {
    Drawendmethod = DrawEndFlag;
  }
  clear();
  DrawMap();
  Drawendmethod();
}

function Players(maze, c, _cellsize, onComplete, sprite = null) {
  let ctx = c.getContext("2d");
  let DrawSprite;
  let moves = 0;

  DrawSprite = DrawSpriteCircle;
  if (sprite != null) {
    DrawSprite = DrawSpriteImg;
  }
  let player = this;
  let map = maze.map();
  let cellCoords = {
    x: maze.startcoord().x,
    y: maze.startcoord().y,
  };
  let cellSize = _cellsize;
  let halfCellSize = cellSize / 2;

  this.redDrawPlayer = function (_cellsize) {
    cellSize = _cellsize;
    DrawSpriteImg(cellCoords);
  };

  function DrawSpriteCircle(coord) {
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.arc(
      (coord.x + 1) * cellSize - halfCellSize,
      (coord.y + 1) * cellSize - halfCellSize,
      halfCellSize - 2,
      0,
      2 * Math.PI
    );
    ctx.fill();
    if (coord.x === maze.endcoord().x && coord.y === maze.endcoord().y) {
      onComplete(moves);
      player.unbindkeyDown();
    }
  }

  function DrawSpriteImg(coord) {
    let offsetleft = cellSize / 50;
    let offsetright = cellSize / 25;
    ctx.drawImage(
      sprite,
      0,
      0,
      sprite.width,
      sprite.height,
      coord.x * cellSize + offsetleft,
      coord.y * cellSize + offsetleft,
      cellSize - offsetright,
      cellSize - offsetright
    );
    if (coord.x === maze.endcoord().x && coord.y === maze.endcoord().y) {
      onComplete(moves);
      player.unbindkeyDown();
    }
  }

  function removeSprite(coord) {
    let offsetLeft = cellSize / 50;
    let offsetRight = cellSize / 25;
    ctx.clearRect(
      coord.x * cellSize + offsetLeft,
      coord.y * cellSize + offsetLeft,
      cellSize - offsetRight,
      cellSize - offsetRight
    );
  }

  function check(e) {
    var cell = map[cellCoords.x][cellCoords.y];
    moves++;
    switch (e.keyCode) {
      case 1:
      case 37: 
        if (cell.w == true) {
          removeSprite(cellCoords);
          cellCoords = {
            x: cellCoords.x - 1,
            y: cellCoords.y,
          };
          DrawSprite(cellCoords);
        }
        break;
      case 2:
      case 38:
        if (cell.n == true) {
          removeSprite(cellCoords);
          cellCoords = {
            x: cellCoords.x,
            y: cellCoords.y - 1,
          };
          DrawSprite(cellCoords);
        }
        break;
      case 3:
      case 39:
        if (cell.e == true) {
          removeSprite(cellCoords);
          cellCoords = {
            x: cellCoords.x + 1,
            y: cellCoords.y,
          };
          DrawSprite(cellCoords);
        }
        break;
      case 4:
      case 40:
        if (cell.s == true) {
          removeSprite(cellCoords);
          cellCoords = {
            x: cellCoords.x,
            y: cellCoords.y + 1,
          };
          DrawSprite(cellCoords);
        }
        break;
    }
  }
  this.bindKeyDown = function () {
    window.addEventListener("keydown", check, false);
    $("#view").swipe({
      swipe: function (direction) {
        console.log(direction);
        switch (direction) {
          case "up":
            check({
              keyCode: 38,
            });
            break;
          case "down":
            check({
              keyCode: 40,
            });
            break;
          case "left":
            check({
              keyCode: 37,
            });
            break;
          case "right":
            check({
              keyCode: 39,
            });
            break;
        }
      },
      threshold: 0,
    });
  };
  this.unbindkeyDown = function () {
    window.removeEventListener("keydown", check, false);
    $("#view").swipe("destroy");
  };
  DrawSprite(maze.startcoord());
  this.bindKeyDown();
}
var mazeCanvas = document.getElementById("mazeCanvas");
var ctx = mazeCanvas.getContext("2d");
var sprite;
var finishSprite;
var Maze, draw, player;
var cellSize;
var difficulty;

function setupAudio() {
  const music = document.getElementById("music");
  music.loop = true;
  music.play();
}


function makeMaze() {
  if (player != undefined) {
    player.unbindkeyDown();
    player = null;
  }
  var e = document.getElementById("diffSelect");
  difficulty = e.options[e.selectedIndex].value;
  cellSize = mazeCanvas.width / difficulty;
  Maze = new maze(difficulty, difficulty);
  draw = new DrawtheMaze(Maze, ctx, cellSize, finishSprite);
  player = new Players(Maze, mazeCanvas, cellSize, displayVictoryMess, sprite);

  if (document.getElementById("mazeContainer").style.opacity < "100") {
    document.getElementById("mazeContainer").style.opacity = "100";
  }
  setupAudio(); // Memanggil fungsi untuk memulai musik
}


window.onload = function () {
  let viewWidth = $("#view").width();
  let viewHeight = $("#view").height();
  if (viewHeight < viewWidth) {
    ctx.canvas.width = viewHeight - viewHeight / 100;
    ctx.canvas.height = viewHeight - viewHeight / 100;
  } else {
    ctx.canvas.width = viewWidth - viewWidth / 100;
    ctx.canvas.height = viewWidth - viewWidth / 100;
  }

  //Load and edit sprites
  var completeOne = false;
  var completeTwo = false;
  var isComplete = () => {
    if (completeOne === true && completeTwo === true) {
      console.log("Runs");
      setTimeout(function () {
        makeMaze();
      }, 500);
      setupAudio(); 
    }
  };
  sprite = new Image();
  sprite.src = "./asset/img/key.png" + "?" + new Date().getTime();
  sprite.setAttribute("crossOrigin", " ");
  sprite.onload = function () {
    sprite = changeBrightness(1.2, sprite);
    completeOne = true;
    console.log(completeOne);
    isComplete();
  };

  finishSprite = new Image();
  finishSprite.src = "./asset/img/home.png" + "?" + new Date().getTime();
  finishSprite.setAttribute("crossOrigin", " ");
  finishSprite.onload = function () {
    finishSprite = changeBrightness(1.1, finishSprite);
    completeTwo = true;
    console.log(completeTwo);
    isComplete();
  };
};

window.onresize = function () {
  let viewWidth = $("#view").width();
  let viewHeight = $("#view").height();
  if (viewHeight < viewWidth) {
    ctx.canvas.width = viewHeight - viewHeight / 100;
    ctx.canvas.height = viewHeight - viewHeight / 100;
  } else {
    ctx.canvas.width = viewWidth - viewWidth / 100;
    ctx.canvas.height = viewWidth - viewWidth / 100;
  }
  cellSize = mazeCanvas.width / difficulty;
  if (player != null) {
    draw.redDrawMAze(cellSize);
    player.redDrawPlayer(cellSize);
  }
};
