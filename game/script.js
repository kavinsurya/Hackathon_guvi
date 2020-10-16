//header
var header = document.createElement("div");
header.className = "topnav";
header.id = "myTopnav";

var h1 = document.createElement("a");
h1.innerText = "SLIDING PUZZLE";
h1.className = "header1";
h1.setAttribute("style","cursor:default")

var a1 = document.createElement("a");
a1.className = "a";
a1.id = "newGame";
a1.innerText = "Restart";

var a2 = document.createElement("a");
a2.innerText = "Home";
a2.className = "a";
a2.id = "home";

var a3 = document.createElement("a");
a3.href = "javascript:void(0);";
a3.className = "icon";
a3.id = "nav";
var icon = document.createElement("i");
icon.className = "fa fa-bars";
a3.append(icon);

header.append(h1, a2, a1, a3);

//container
var container = document.createElement("div");
container.className = "container";
var table = document.createElement("table");
table.id = "table";

var div1 = document.createElement("div");

var a4 = document.createElement("p");
a4.innerText = "Time:";
a4.className = "para";
var span = document.createElement("span");
span.id = "time";
span.innerText = "01:00";
a4.append(span);

var a5 = document.createElement("p");
a5.innerText = "Moves:";
a5.className = "para";
var span1 = document.createElement("span");
span1.id = "moves";
a5.append(span1);

div1.append(a4, a5);

container.append(table, div1);
document.body.append(header, container);

document.getElementById("home").addEventListener("click", home);
document.getElementById("nav").addEventListener("click", myFunction);

function home() {
  window.location.href = "../index.html";
}

function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

function startTimer() {
  var timer = 0;
  var minutes;
  var seconds;
  var sec = 59;
  (timer = sec), minutes, seconds;
  setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    display = document.querySelector("#time");
    display.textContent = minutes + ":" + seconds;
    if (timer <= 0) {
      setTimeout(function () {
        alert("Time out!!!! Game over!!!! ");
        window.location.href = "../index.html";
      }, 100);
    }

    if (--timer < 0) {
      timer = sec;
    }
  }, 1000);
}

var moves = 0;
var table;
var rows;
var columns;
var textMoves;
var size;

function start() {
  var button = document.getElementById("newGame");
  button.addEventListener("click", startNewGame, false);
  textMoves = document.getElementById("moves");
  table = document.getElementById("table");
  startNewGame();
  startTimer();
}

function startNewGame() {
  var arrayNew = new Array();
  var unique;
  var randomNumber = 0;
  var count = 0;
  rows = localStorage.getItem("size");
  columns = localStorage.getItem("size");
  textMoves.innerHTML = moves;
  size = new Array(rows);
  for (var i = 0; i < rows; i++) {
    size[i] = new Array(columns);
  }

  unique = new Array(rows * columns);
  for (var i = 0; i < rows * columns; i++) {
    unique[i] = 0;
  }

  for (var i = 0; i < rows * columns; i++) {
    randomNumber = Math.floor(Math.random() * rows * columns);
    if (unique[randomNumber] == 0) {
      unique[randomNumber] = 1;
      arrayNew.push(randomNumber);
    } else {
      i--;
    }
  }
  count = 0;
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < columns; j++) {
      size[i][j] = arrayNew[count];

      count++;
    }
  }
  showTable();
}

function showTable() {
  var outputString = "";
  for (var i = 0; i < rows; i++) {
    outputString += "<tr>";
    for (var j = 0; j < columns; j++) {
      if (size[i][j] == 0) {
        outputString += '<td class="blank"> </td>';
      } else {
        outputString +=
          '<td class="tile" onclick="moveThisTile(' +
          i +
          ", " +
          j +
          ')">' +
          size[i][j] +
          "</td>";
      }
    }
    outputString += "</tr>";
  }

  table.innerHTML = outputString;
}

function moveThisTile(tableRow, tableColumn) {
  if (
    check(tableRow, tableColumn, "up") ||
    check(tableRow, tableColumn, "down") ||
    check(tableRow, tableColumn, "left") ||
    check(tableRow, tableColumn, "right")
  ) {
    incrementMoves();
  }

  if (winner()) {
    var score = 0;
    if (moves <= 5) {
      score = moves * 2;
    } else if (moves > 5 && moves <= 10) {
      score = moves * 0.5;
    } else if (moves > 10 && moves <= 20) {
      score = moves * 0.25;
    } else {
      score = moves * 0.1;
    }

    var result = score + seconds;

    console.log(score);
    console.log(seconds);

    setTimeout(function () {
      alert("You solved the puzzle and your score is" + result);
      window.location.href = "../index.html";
    }, 100);
  }
}

function check(row, column, direction) {
  row1 = 0;
  column1 = 0;
  if (direction == "up") {
    row1 = -1;
  } else if (direction == "down") {
    row1 = 1;
  } else if (direction == "left") {
    column1 = -1;
  } else if (direction == "right") {
    column1 = 1;
  }

  if (
    row + row1 >= 0 &&
    column + column1 >= 0 &&
    row + row1 < rows &&
    column + column1 < columns
  ) {
    if (size[row + row1][column + column1] == 0) {
      size[row + row1][column + column1] = size[row][column];
      size[row][column] = 0;
      showTable();
      return true;
    }
  }
  return false;
}

function winner() {
  var count = 1;
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < columns; j++) {
      if (size[i][j] != count) {
        if (!(count === rows * columns && size[i][j] === 0)) {
          return false;
        }
      }
      count++;
    }
  }

  return true;
}

function incrementMoves() {
  moves++;
  if (textMoves) {
    textMoves.innerHTML = moves;
  }
}

window.addEventListener("load", start, false);
