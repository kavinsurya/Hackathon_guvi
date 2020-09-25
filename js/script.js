var container = document.createElement('div');
container.id = 'container';

var div = document.createElement('div');

var header = document.createElement('p');
header.className = 'header1';
header.innerText = "SLIDING PUZZLE";
div.append(header);


var card_div = document.createElement('div');
card_div.className = 'card';
var header1 = document.createElement('p');
header1.className = 'header2';
header1.innerText = "Select the difficulty level";



card_div.appendChild(header1);
var card_content = document.createElement('div');
card_content.className = 'content-1';



var div1 = document.createElement('div');
var button1 = document.createElement('button');
button1.id = 'button1';
button1.className = 'button';


var span1 = document.createElement('span');
span1.innerText = 'Easy';


button1.append(span1);
div1.append(button1);
card_content.appendChild(div1);


var div2 = document.createElement('div');
var button2 = document.createElement('button');
button2.id = 'button2';
button2.className = 'button hover1';
var span2 = document.createElement('span');
span2.innerText = 'Medium';

button2.append(span2);
div2.append(button2);
card_content.appendChild(div2);


var div3 = document.createElement('div');
var button3 = document.createElement('button');
button3.id = 'button3';
button3.className = 'button hover2';
var span3 = document.createElement('span');
span3.innerText = 'Hard';


button3.append(span3);
div3.append(button3);
card_content.appendChild(div3);


var div4 = document.createElement('div');
var button4 = document.createElement('button')
button4.id = 'button4';
button4.className = 'button hover3';
var span4 = document.createElement('span')
span4.innerText = 'Advanced'

button4.append(span4)
div4.append(button4)
card_content.appendChild(div4);




card_div.append(card_content);
container.append(div, card_div);
document.body.append(container);

document.getElementById('button1').addEventListener('click', game1);
document.getElementById('button2').addEventListener('click', game2);
document.getElementById('button3').addEventListener('click', game3);
document.getElementById('button4').addEventListener('click', game4);



function game1() {
    window.location.href = "/game/index.html";
    localStorage.setItem("size", "3")
}

function game2() {
    window.location.href = "/game/index.html";
    localStorage.setItem("size", "4")
}

function game3() {
    window.location.href = "/game/index.html";
    localStorage.setItem("size", "5")
}

function game4() {
    window.location.href = "/game/index.html";
    localStorage.setItem("size", "6")
}