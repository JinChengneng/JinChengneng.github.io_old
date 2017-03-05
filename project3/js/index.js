var WINDOWHEIGHT = $(window).height()*0.85;
var WINDOWWIDTH = $(window).width()*0.97;

var RADIUS = Math.min(WINDOWHEIGHT,WINDOWWIDTH)*0.3;
var MARGIN_LEFT = (WINDOWWIDTH-2*RADIUS)/2;
var MARGIN_TOP = (WINDOWHEIGHT-2*RADIUS)/2;

var canvas = document.getElementById("canvas");
var content = canvas.getContext('2d');

function draw(){
	content.canvas.height = WINDOWHEIGHT;
	content.canvas.width = WINDOWWIDTH;

	content.beginPath();
	content.lineWidth = 10/210*RADIUS;
	content.arc( MARGIN_LEFT+RADIUS, MARGIN_TOP+RADIUS, RADIUS,0, 2*Math.PI);
	content.stroke();

	content.font = 30/210*RADIUS + "px Arial";
	content.textAlign = "center";
	content.textBaseline = "middle";
	var clockNumber = [3,4,5,6,7,8,9,10,11,12,1,2];
	for(var i = 0; i<clockNumber.length; i++){
		var rad = i/6 *Math.PI;
		var x = MARGIN_LEFT + RADIUS + Math.cos(rad) * (RADIUS-35/210*RADIUS);
		var y = MARGIN_TOP + RADIUS + Math.sin(rad) * (RADIUS -35/210*RADIUS);

		content.fillText(clockNumber[i], x, y);
	}

	for(var i = 0; i<60; i++){
		var rad = i/30 * Math.PI;
		var x = MARGIN_LEFT + RADIUS + Math.cos(rad) * (RADIUS - 10/210*RADIUS);
		var y = MARGIN_TOP + RADIUS + Math.sin(rad) * (RADIUS - 10/120*RADIUS);
		content.beginPath();
		if(i % 5 === 0){
			content.fillStyle = "#000";
		}
		else{
			content.fillStyle = "#aaa";
		}
		content.arc(x,y,3/210*RADIUS,0,2*Math.PI);
		content.fill();
	}

	content.translate(MARGIN_LEFT+RADIUS, MARGIN_TOP+RADIUS);

	var date = new Date();
	var hour = date.getHours();
	var minute = date.getMinutes();
	var second = date.getSeconds();

	drawHour(hour+minute/60+second/3600,content);
	drawMinute(minute+second/60,content);
	drawSecond(second,content);

	content.beginPath();
	content.arc(MARGIN_LEFT + RADIUS, MARGIN_TOP + RADIUS, 10/210*RADIUS, 0, 2*Math.PI);
	content.fillStyle = "#000";
	content.fill();

	setInterval(draw,100);
}

function drawHour(hour,content){
	content.beginPath();
	content.rotate(hour/6*Math.PI);
	content.moveTo(0, RADIUS*0.1);
	content.lineTo(0, -RADIUS*0.5);
	content.lineWidth = 8/210*RADIUS;
	content.stroke();

	content.rotate(-hour/6*Math.PI);
}

function drawMinute(minute, content){
	content.beginPath();
	content.rotate(minute/30*Math.PI);
	content.moveTo(0,RADIUS*0.15);
	content.lineTo(0,-RADIUS*0.7);
	content.lineWidth = 5/210*RADIUS;
	content.stroke();
	content.rotate(-minute/30*Math.PI);
}

function drawSecond(second, content){
	content.beginPath();
	content.rotate(second/30*Math.PI);
	content.moveTo(0,RADIUS*0.2);
	content.lineTo(0,-RADIUS*0.9);
	content.lineWidth = 3/210*RADIUS;
	content.stroke();
	content.rotate(-second/30*Math.PI);
}

draw();