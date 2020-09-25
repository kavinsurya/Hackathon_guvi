//header
var header = document.createElement('div');
header.className = 'topnav';
header.id = 'myTopnav';

var h1 = document.createElement('a');
h1.innerText = 'SLIDING PUZZLE';
h1.className = 'header1';



var a1 = document.createElement('a');
a1.className = 'a';
a1.id = 'newGame';
a1.innerText = 'Restart';

var a2 = document.createElement('a');
a2.innerText = 'Home';
a2.className = 'a';
a2.id = 'home';

var a3 = document.createElement('a');
a3.href = 'javascript:void(0);'
a3.className = 'icon';
a3.id = 'nav';
var icon = document.createElement('i');
icon.className = 'fa fa-bars';
a3.append(icon)


var a4 = document.createElement('p');
a4.setAttribute('style', 'float:right')
var span = document.createElement('span');
span.id = 'time';
a4.append(span)


header.append(h1, a2, a1, a3, a4);

//container
var container =document.createElement('div');
var table =document.createElement('table');
table.id ='table';


var moves =document.createElement('span');
moves.id ='moves';
moves.innerText ='Moves:'



container.append(table,moves)
document.body.append(header,container)

document.getElementById('home').addEventListener('click', home);
document.getElementById('nav').addEventListener('click', myFunction);



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



function startTimer(duration, display) {
    var timer = duration,
        minutes, seconds;
    setInterval(function() {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

window.onload = function() {
    var min = 60,
        display = document.querySelector('#time');
    startTimer(min, display);
};




var moves = 0;
var table; 
var rows; 
var columns;
var textMoves;
var size;

function start()
{
  var button = document.getElementById("newGame");
  button.addEventListener( "click", startNewGame, false );
  textMoves = document.getElementById("moves");
  table = document.getElementById("table");
  startNewGame();
}

function startNewGame()
{
  var arrayNew = new Array();
  var unique;
  var randomNumber = 0;
  var count = 0;
  moves = 0;
  rows = localStorage.getItem('size');
  columns =localStorage.getItem('size');
  textMoves.innerHTML = moves;
  size = new Array(rows);
  for (var i = 0; i < rows; i++)
  {
    size[i] = new Array(columns);
  }

  unique = new Array( rows * columns );
  for (var i = 0; i < rows * columns; i++)
  {
    unique[i] = 0;
  }
 
  for (var i = 0; i < rows * columns; i++)
  {
    randomNumber = Math.floor(Math.random()*rows * columns);
    
    if (unique[randomNumber] == 0) 
    {
      unique[randomNumber] = 1;
      arrayNew.push(randomNumber);
    }
    else 
    {
      i--;
    }
  }

  count = 0;
  for (var i = 0; i < rows; i++)
  {
    for (var j = 0; j < columns; j++)
    {
      size[i][j] = arrayNew[count];
      
      count++;
    }
  }
}

// function incrementMoves()
// {
//   moves++;
  
// }