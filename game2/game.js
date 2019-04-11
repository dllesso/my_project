var canvas = document.getElementById("game");
var context = canvas.getContext("2d");

var astero=[];/*переменная массив*/
var boll=[];/*массив для выстрелов*/
var musoro =[]; /*массив для космического мусора*/
var expl=[];
var timer=0;
var timer1=0;
var life=3;
var raketa={x:300, y:300};
var ornd = Math.random()*600;
var schet=0;
var mask = new Image();
var musor = new Image();
var musor1 = new Image();
var klats = new Audio();
var bah = new Audio();
var myz = new Audio();
var mask = new Image();
var serd = new Image();
var end = new Image();
mask.src = "mask.jpg";
musor.src ="musor.png"

var explimg = new Image();
explimg.src = "vzr.png";

musor1.src = "musor1.png"
serd.src = "serd.jpg"
var aster = new Image();
aster.src = 'aster.png';
end.src = "end.png"
var bollimg = new Image();
bollimg.src = 'boll.png';

var raketaimg = new Image();
raketaimg.src = 'kosmicheskaja-raketa.png';

var fonimg = new Image();
fonimg.src = 'fon.png';

 musoro.push({x:0,y:300,dx:10, dy:20});

 myz.src = "myz.mp3";

canvas.onmousedown = function (e) {
    // Код для нажатия мыши
	deyst (this)
};


//нажатие клавиши enter для перезагрузки

document.onkeypress = function(evt) {
    evt = evt || window.event;
    var charCode = evt.which || evt.keyCode;
    if (charCode == 13) {
       location.reload();
    }
};

function deyst (button){boll.push({x:raketa.x+10, y:raketa.y, dx:0, dy:-5.2});// выстрел при нажатии кнопки мыши


}
 
 
canvas.addEventListener("mousemove", function(event){
raketa.x=event.offsetX -25;
raketa.y=event.offsetY-50;

});

explimg.onload = function(){
game();
}



function game(){

update();/*обновление*/
render();/*фон*/
requestAnimationFrameForThisGame(game );/*вывод на экран ф-ции game c частотой 60 герц*/
}

function update(){  //update - обновление по умолчанию 60 гц
	
timer++;
if(timer%30==0) {astero.push({              /*генерация астероидов  push - команда на добавление элемента в массив*/
                              x:Math.random()*600,
                              y:-50,
                              dx:Math.random()*2-1, 
                              dy:Math.random()*2+1,/*элементы добавленные в массив отвечающие за позицию астероида, dx и dy - скорость изменения координат по ссответствующим осям*/
                               del:0});
							  
}






// двигаем файерболлы
for (i in boll){
     boll[i].x=boll[i].x+boll[i].dx;
     boll[i].y=boll[i].y+boll[i].dy
       if(boll[i].y<-30) boll.splice(i,1); // splice - команда на удаление массива
}


     musoro[0].x=musoro[0].x+musoro[0].dx*0.04;
     musoro[0].y=musoro[0].y+musoro[0].dy*0.04;
     if(musoro[0].x>=550 || musoro[0].x<0) musoro[0].dx=-musoro[0].dx; 
     if(musoro[0].y>=550 || musoro[0].y<0) musoro[0].dy=-musoro[0].dy; 
	 if(Math.abs(musoro[0].x+25-raketa.x-15)<70 && Math.abs(musoro[0].y-raketa.y)<35){/*location.reload();*/musoro[0].x=10;musoro[0].y=10; life--;}
for(i in astero){
astero[i].x=astero[i].x+astero[i].dx;
astero[i].y=astero[i].y+astero[i].dy;


//границы
if(astero[i].x>=550 || astero[i].x<0) astero[i].dx=-astero[i].dx;
if(astero[i].y>=600) astero.splice(i,1) ;/*удаление элементов массива splice - команда на удаление массива*/

//проверка астероида на столкновеие с файерболом КАЖДЫМ
for(j in boll) {
if(Math.abs(astero[i].x+25-boll[j].x-15)<50 && Math.abs(astero[i].y-boll[j].y)<25){/*произошло столкновение рисуем взрыв*/
expl.push({x:astero[i].x-25, y:astero[i].y-25, animx:0, animy:0});  // cпавн взрыва
//помечаем астероид на удаление
astero[i].del=1;
boll.splice(j,1);break;


}
}
// удаляем астероиды
if(astero[i].del==1) {astero.splice(i,1);
timer1++;
	
}
//анимация взрывов
for(q in expl){
	expl[q].animx=expl[q].animx+0.3;// 0,5 - crjhjcnm fybvwbb
	if(expl[q].animx>4){expl[q].animy++; expl[q].animx=0;}
	if(expl[q].animy>4)
		expl.splice(q,1);
}

}


}







function render(){
context.drawImage(fonimg, 0, 0, 600, 600);
context.drawImage(musor1, ornd, 50, 380,300);
context.drawImage(musor, musoro[0].x, musoro[0].y, 70,70);
context.drawImage(raketaimg, raketa.x, raketa.y,55 , 100);
for(i in boll) context.drawImage(bollimg, boll[i].x, boll[i].y, 30, 30);
for(i in astero){ context.drawImage(aster, astero[i].x, astero[i].y, 50, 50);/*два последних параметра отвечабют за размер*/
for(i in expl){context.drawImage(explimg,128*Math.floor(expl[i].animx),128*Math.floor(expl[i].animy), 128, 128, expl[i].x, expl[i].y, 100, 100);}

context.drawImage(serd, 35, 80);
context.fillText("  "+life, 40, 120);
if(life<=0){context.drawImage(end, 0, 0, 600, 600);} 
context.drawImage(mask, 18, 7);
context.font = "30px Verdana";
var gradient=context.createLinearGradient(0,0,canvas.width,0);//создаем градиент для текста счёт
gradient.addColorStop("0","magenta");
gradient.addColorStop("0.5","blue");
gradient.addColorStop("1.0","red");
context.fillStyle=gradient;//заполняет текс градиентом
context.fillText(" Счёт:"+timer1, 20, 47);
myz.play();
}

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


explimg.onload = draw;