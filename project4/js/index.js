var WINDOW_HEIGHT = window.screen.height;
var WINDOW_WIDTH  = window.screen.width;

var SIDE_LENGTH = WINDOW_WIDTH*0.8/57; 

var MARGIN_LEFT = WINDOW_WIDTH*0.1;
var MARGIN_TOP  = (WINDOW_HEIGHT - 30*SIDE_LENGTH)/2;  

var canvas = document.getElementById("canvas");
var content = canvas.getContext('2d');

var currentDate = new Date();

var balls = [];

const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"]

function drawTime(){
	content.canvas.height = WINDOW_HEIGHT;
	content.canvas.width = WINDOW_WIDTH;

	var hour = currentDate.getHours();
	var minute = currentDate.getMinutes();
	var second = currentDate.getSeconds();

	content.fillStyle = "rgb(0,102,153)";
	drawDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hour/10),content);
	drawDigit(MARGIN_LEFT+SIDE_LENGTH*8, MARGIN_TOP, hour%10, content);
	drawDigit(MARGIN_LEFT+SIDE_LENGTH*16, MARGIN_TOP, 10, content);	
	drawDigit(MARGIN_LEFT+SIDE_LENGTH*21, MARGIN_TOP, parseInt(minute/10), content);	
	drawDigit(MARGIN_LEFT+SIDE_LENGTH*29, MARGIN_TOP, minute%10, content);
	drawDigit(MARGIN_LEFT+SIDE_LENGTH*37, MARGIN_TOP, 10, content);	
	drawDigit(MARGIN_LEFT+SIDE_LENGTH*42, MARGIN_TOP, parseInt(second/10), content);
	drawDigit(MARGIN_LEFT+SIDE_LENGTH*50, MARGIN_TOP, second%10, content);

	for(var i = 0; i < balls.length; i++){
		content.fillStyle = balls[i].color;
		content.beginPath();
        content.arc( balls[i].x , balls[i].y , SIDE_LENGTH*0.45 , 0 , 2*Math.PI , true );
        content.closePath();
        content.fill();

	}
}

function drawDigit(x, y, num, content){
	for(var i = 0; i < digit[num].length; i++){
		for(var j = 0; j < digit[num][i].length; j++){
			if(digit[num][i][j] === 1){
				content.beginPath();
				content.arc(x+SIDE_LENGTH*j, y+SIDE_LENGTH*i, SIDE_LENGTH*0.45, 0, 2*Math.PI);
				content.fill();
			}
		}
	}
}

function addBalls(x,y,num,content){
	for(var i = 0; i < digit[num].length; i++){
		for(var j = 0; j < digit[num][i].length; j++){
			if(digit[num][i][j] === 1){
				var ball = {
					x : x+SIDE_LENGTH*j,
					y : y+SIDE_LENGTH*i,
					g : 1.5 + Math.random(),
					vx : Math.pow(-1,Math.ceil(Math.random()*1000)) * 4,
					vy : -5,
					color: colors[Math.floor(Math.random()*colors.length)]
				}
				if(balls.length<1000){
					balls.push(ball);
				}
				else{
					balls.shift();
					balls.push(ball);
				}
			}
		}
	}
}

function updateBalls(){
	for(var i = 0; i<balls.length; i++){
		balls[i].x += balls[i].vx;
		balls[i].y += balls[i].vy;
		balls[i].vy += balls[i].g;

		if(balls[i].y+SIDE_LENGTH > content.canvas.height){
			balls[i].vy = -balls[i].vy * 0.75;
		}
	}
}

function initial(){
	drawTime();

	setInterval(
		function(){
			var nextDate = new Date();
			if (currentDate != nextDate) {
				if(currentDate.getHours() != nextDate.getHours()){
					if(currentDate.getHours()%10 != nextDate.getHours()%10){
						addBalls(MARGIN_LEFT+SIDE_LENGTH*8, MARGIN_TOP, currentDate.getHours()%10, content);
					}
					if(parseInt(currentDate.getHours()/10) != parseInt(nextDate.getHours()%10)){
						addBalls(MARGIN_LEFT,MARGIN_TOP,parseInt(currentDate.getHours()/10),content);
					}
				}
				if(currentDate.getMinutes() != nextDate.getMinutes()){
					if(parseInt(currentDate.getMinutes()/10) != parseInt(nextDate.getMinutes()/10) ){
						addBalls(MARGIN_LEFT+SIDE_LENGTH*21, MARGIN_TOP, parseInt(currentDate.getMinutes())/10, content);
					}
					if(currentDate.getMinutes()%10 != nextDate.getMinutes()%10){
						addBalls(MARGIN_LEFT+SIDE_LENGTH*29, MARGIN_TOP, currentDate.getMinutes()%10, content);
					}
				}
				if(currentDate.getSeconds() != nextDate.getSeconds()){
					if(parseInt(currentDate.getSeconds()/10) != parseInt(nextDate.getSeconds()/10)){
						addBalls(MARGIN_LEFT+SIDE_LENGTH*42, MARGIN_TOP, parseInt(currentDate.getSeconds()/10), content);
					}
					if(currentDate.getSeconds()%10 != nextDate.getSeconds()%10){
						addBalls(MARGIN_LEFT+SIDE_LENGTH*50, MARGIN_TOP, currentDate.getSeconds()%10, content);
					}
				}

				currentDate = nextDate;
				updateBalls();

				drawTime();	
			}
		}
	,50);
}

initial();
