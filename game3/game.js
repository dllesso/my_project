var canvas = document.getElementById("game");
var context = canvas.getContext("2d");
//переменная-структурная отвечющая за позицию шарика по оси х и y 
//--> названа соответственно sharXY
var sharXY = [];//массив для размещения подвижных объектов кучи этих самых структурных переменных
var colXY = [];

var timer = 0;// переменная необх для размножения шариков
var timer1=0;//для колючек
//задаем подвижные графические объекты
var sharikiimg = new Image();//отображается в рендере с координатами заданными и меняющимися в упдэйте
sharikiimg.src = 'shariki.png';

var colimg = new Image();//отображается в рендере с координатами заданными и меняющимися в упдэйте
colimg.src = 'col.png';

// задаем фон
var fonimg = new Image();
fonimg.src = 'fon.png';
//задаем игрока всевидящий глаз
var glaz = new Image();
glaz.src = 'glaz.png';

var glazXY={x:300, y:300};
var sch=0;


document.addEventListener("keydown", moveUp);//задаем с помощью метода addEventListener
//функцию moveUp() в котрой описываем нажатие клавиш
function moveUp()
	{if(event.keyCode == 37) {
		glazXY.x=glazXY.x-100;
	}
	if(event.keyCode == 39) {
		glazXY.x=glazXY.x+100;
	}
	if(event.keyCode == 40) {
		glazXY.y=glazXY.y+100;
	}
	if(event.keyCode == 38) {
		glazXY.y=glazXY.y-100;
	}
	if(glazXY.x>=600)glazXY.x=500;
	if(glazXY.x<=0)glazXY.x=0;
	if(glazXY.y>=600)glazXY.y=500;
	if(glazXY.y<=0)glazXY.y=0;
	}

fonimg.onload = function(){ 
/*по событию onload, когда будет загружен фон
вызывается функция game*/
game();	
}

function game(){  //-->основной игровой цикл
update();
render() ;	
requestAnimationFrame(game);//примочка  браузера - бесконечный цикл
//вызывается 60 раз в секунду
}


function update(){  //--> обновление
timer++;
timer1++;
if(timer%180==0){//добавляем элементы в массив sharXY по условию %180, что обновляет формирование объекта через 180 тактов - 3 секунды
sharXY.push({x:100*Math.floor(Math.random()*6),
             y:-50, 
			 dx:0/*Math.random()*2-1*/,
			 dy:Math.abs(Math.random()*3-1)}); //push - команда добавления элементов в массив 
}

for (i in sharXY)//задаем цикл перебирающий все элементы массива sharXY
 {
	sharXY[i].y = sharXY[i].y+sharXY[i].dy; // меняем значение переменой в обновлении с частой 60раз/секунду
//делаем границы немного за пределами канвас
if(sharXY[i].y>=650) {sharXY.splice(i,1);}
if(glazXY.x-sharXY[i].x>=-20 && glazXY.x-sharXY[i].x<=20 && glazXY.y-sharXY[i].y<=30 && glazXY.y-sharXY[i].y>=-30){sharXY.splice(i,1);sch++;}
 }//закр цикл

if(timer1%300==0){//добавляем элементы в массив sharXY по условию %180, что обновляет формирование объекта через 180 тактов - 3 секунды
colXY.push({x:100*Math.floor(Math.random()*6),
             y:-10, 
			 dx1:0/*Math.random()*2-1*/,
			 dy1:Math.abs(Math.random()*3-1)}); //push - команда добавления элементов в массив 
}

 for (j in colXY)//задаем цикл перебирающий все элементы массива colXY
 {
	colXY[j].y = colXY[j].y+colXY[j].dy1; // меняем значение переменой в обновлении с частой 60раз/секунду
//делаем границы немного за пределами канвас
if(colXY[j].y>=650) {colXY.splice(j,1);}
if(glazXY.x-colXY[j].x>=-20&& glazXY.x-colXY[j].x<=20 && glazXY.y-colXY[j].y<=30 && glazXY.y-colXY[j].y>=-30){colXY.splice(j,1);sch--;}
 }
	}


function render() {                //-->вывод изображеия
context.drawImage(fonimg, 0, 0, 600, 600);//первая команда, которая рисует фон в координатах 0 0 600 на 600
for (i in sharXY) {context.drawImage(sharikiimg, sharXY[i].x+20, sharXY[i].y, 60, 90);}//объект на холсте 100, 150 - это размер объекта
for (j in colXY) {context.drawImage(colimg, colXY[j].x, colXY[j].y, 80, 80);}
context.drawImage(glaz, glazXY.x, glazXY.y, 100, 100);
context.font = "30px Verdana";
context.fillText(" Счёт:"+sch, 20, 47);
}	


var requestAnimationFrameForThisGame = (function(){
     return window.requestAnimationFrame        ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          window.oRequestAnimationFrame      ||
          window.msRequestAnimationFrame     ||
function(callback){
      window.setTimeout(callback, 1000 / 20);};
})(); /*чтоб игра выводилась несмотря на браузер*/
