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
    var sec =60,
        display = document.querySelector('#time');
       
    startTimer(sec, display);
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
  rows =3;
  columns =3;
//   rows = localStorage.getItem('size');
//   columns =localStorage.getItem('size');
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
  showTable();
}

function showTable()
{
  var outputString = "";
  for (var i = 0; i < rows; i++)
  {
    outputString += "<tr>";
    for (var j = 0; j < columns; j++)
    {
      if (size[i][j] == 0)
      {
	outputString += "<td class=\"blank\"> </td>";
      }
      else
      {
	outputString += "<td class=\"tile\" onclick=\"moveThisTile(" + i + ", " + j + ")\">" + size[i][j] + "</td>";
      }
    } 
    outputString += "</tr>";
  } 
  
  table.innerHTML = outputString;
}

function moveThisTile( tableRow, tableColumn)
{
  if (check(tableRow, tableColumn, "up") ||
      check(tableRow, tableColumn, "down") ||
      check(tableRow, tableColumn, "left") ||
      check(tableRow, tableColumn, "right") )
  {
    incrementMoves();
  }
  
  if (winner())
  {
    
   
   
  }
}

function check(row, column, direction)
{

  row1 = 0;
  column1 = 0;
  if (direction == "up")
  {
    row1 = -1;
  }
  else if (direction == "down")
  {
    row1 = 1;
  }
  else if (direction == "left")
  {
    column1 = -1;
  }
  else if (direction == "right")
  {
    column1 = 1;
  }  

  if (row + row1 >= 0 && column + column1 >= 0 &&
    row + row1 < rows && column + column1 < columns
  )
  {
    if ( size[row + row1][column + column1] == 0)
    {
      size[row + row1][column + column1] = size[row][column];
      size[row][column] = 0;
      showTable();
      return true;
    }
  }
  return false; 
}

function winner()
{
  var count = 1;
  for (var i = 0; i < rows; i++)
  {
    for (var j = 0; j < columns; j++)
    {
      if (size[i][j] != count)
      {
	if ( !(count === rows * columns && size[i][j] === 0 ))
	{
	  return false;
	}
      }
      count++;
    }
  }
  
  return true;
}

function incrementMoves()
{
  moves++;
  if (textMoves) 
    {
    textMoves.innerHTML = moves;
  }
}


window.addEventListener( "load", start, false ); 