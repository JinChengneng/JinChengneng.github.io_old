var board = new Array;

var position = new Array;

var lastBoard = new Array;

function initial(){

	initialBoard();
	initialLastBoard();
	initialPosition();
	initialGridCell();

	generateRandomDigit();
	generateRandomDigit();
}

function initialBoard(){
	for( var i = 0; i < 4; i++){
		board[i] = new Array;
		for( var j = 0; j< 4; j++){
			board[i][j] = 0;
		}
	}
}

function initialPosition(){
	for( var i = 0; i < 4; i++){
		position[i] = new Array;
		for( var j = 0; j< 4; j++){
			position[i][j] = [i,j];
		}
	}
}

function initialLastBoard(){
	for( var i = 0; i < 4; i++){
		lastBoard[i] = new Array;
		for( var j = 0; j< 4; j++){
			lastBoard[i][j] = 0;
		}
	}
}

function initialGridCell(){
	for(var i = 0; i< 4; i++){
		for (var j = 0; j <4; j++){
			var id = "#grid-cell-" + i + j;
			$(id).css("left",parseInt(j*120 + 20)+"px");
			$(id).css("top", parseInt(i*120 + 20)+"px");
		}
	}
}

function generateDigitCell(){
	for(var i = 0; i< 4; i++){
		for (var j = 0; j <4; j++){
			var id = "#digit-cell-" + i + j;
			$(id).css("left",parseInt(j*120 + 20)+"px");
			$(id).css("top", parseInt(i*120 + 20)+"px");
			
			if(board[i][j] != 0){
				$(id).css("background-color", getColor(board[i][j]));
				$(id).text(board[i][j]);
			} 
			else{
				$(id).css("background-color", getColor(board[i][j]));
				$(id).text('');
			}
		}
	}
}

function generateRandomDigit(){
	var i = 0;
	var x, y;
	var value = Math.random()>0.5? 2 : 4;
	while(i<50){
		i++;
		x = Math.floor(Math.random()*4);
		y = Math.floor(Math.random()*4);
		if(board[x][y] === 0){
		board[x][y] = value;
		generateDigitCell();
			break;
		}
	}

	if(i === 50){
		for(var m = 0; m<4; m++){
			for(var n = 0; n<4; n++){
				if(board[m][n] === 0){
					x = m;
					y = n;
					board[x][y] = value;
					generateDigitCell();
				}
			}
		}
	}
}

function getColor(num){
	switch (num){
		/*case 0:
			return '#CCC0B3';*/
		case 2:
			return '#EEE4DA';
		case 4: 
			return '#EDE0C8';
		case 8:
			return '#F2B179';
		case 16:
			return '#F49563';
		case 32:
			return '#F5794D';
		case 64:
			return '#F55D37';
		case 128:
			return '#EEE863';
		case 256:
			return '#EDB04D';
		case 512:
			return '#ECB04D';
		case 1024:
			return '#EB9437';
		case 2048:
			return '#EA7821';
		default:
			return 'transparent';
	}
}

$("#btn_newGame").click(function(){
	initial();
});

$("#btn-restart").click(function(){
	$(".gameOver").css("display","none");
	initial();
});

$("body").keydown(function(event){

	switch (event.keyCode){
		case 37:
			moveLeft();
			break;
		case 39:
			moveRight();
			break;
		case 38:
			moveTop();
			break;
		case 40:
			moveBottom();
			break;
	}
});

function moveLeft(){

	var changedLine = [];
	for(var i = 0; i < 4; i++){
		changedLine[i] = [];
		for(var j = 0; j < 4; j++){
			if(board[i][j] !== 0){
				changedLine[i].push(board[i][j]);
				position[i][j] = [i,changedLine[i].length-1];
			}
		}

		if(changedLine[i].length >= 2){
			if(changedLine[i][0] == changedLine[i][1]){
				changedLine[i].shift();
				changedLine[i][0] = changedLine[i][0] * 2;
				for(var x = 1; x < 4; x++){
					if(position[i][x][1]>0)
						position[i][x][1] --;
				}
			}
		}

		if(changedLine[i].length >= 3){
			if(changedLine[i][1] == changedLine[i][2]){
				changedLine[i][1] *= 2;
				if(changedLine[i].length === 3){
					changedLine[i][2] = 0;
				}
				if(changedLine[i].length === 4){
					changedLine[i][2] = changedLine[i][3];
					changedLine[i][3] = 0;
				}

				for(var x = 2; x < 4; x++){
					if(position[i][x][1]>0)
						position[i][x][1] --;
				}
			}
		}
		if (changedLine[i].length === 4){
			if(changedLine[i][2] == changedLine[i][3]){
				changedLine[i][2] *= 2;
				changedLine[i][3] = 0;

				if(position[i][3][1]>0)
					position[i][3][1]--;
			}
		}
		
	}

	initialBoard();

	for(var i = 0; i<4; i++){
		for(var j = 0; j<changedLine[i].length; j++){
			board[i][j] = changedLine[i][j];
		}
	}

	for(var i = 0; i<4; i++){
		for(var j = 0; j< 4; j++){
			if(position[i][j][1] != j){
				showAnimation(i,j,position[i][j][0],position[i][j][1]);
			}
		}
	}
	setTimeout("generateDigitCell();",220);
	setTimeout("generateRandomDigit();",220);
	initialPosition();

	if(isGameOver() == true){
		$(".gameOver").css("display","block");
	}
}

function moveRight(){
	var changedLine = [];
	for(var i = 0; i<4; i++){
		changedLine[i] = [];
		for(var j = 3; j>=0; j--){
			if( board[i][j] !== 0){
				changedLine[i].push(board[i][j]);
				position[i][j] = [i,4-changedLine[i].length];
			}
		}

		if(changedLine[i].length >= 2){
			if(changedLine[i][0] == changedLine[i][1]){
				changedLine[i].shift();
				changedLine[i][0] *= 2;
				for(var x = 2; x >= 0; x--){
					if(position[i][x][1]<3)
						position[i][x][1] ++;
				}
			}
		}

		if(changedLine[i].length >= 3){
			if(changedLine[i][1] == changedLine[i][2]){
				changedLine[i][1] *= 2;
				if(changedLine[i].length === 3){
					changedLine[i][2] = 0;
				}
				if(changedLine[i].length === 4){
					changedLine[i][2] = changedLine[i][3];
					changedLine[i][3] = 0;
				}

				if(position[i][1][1]<3)
					position[i][1][1] ++;
				if(position[i][0][1]<3)
					position[i][0][1] ++;
			}
		}

		if (changedLine[i].length === 4){
			if(changedLine[i][2] == changedLine[i][3]){
				changedLine[i][2] *= 2;
				changedLine[i][3] = 0;

				if(position[i][0][1]<3)
					position[i][0][1] ++;
			}
		}
	}

	initialBoard();

	for(var i = 0; i<4; i++){
		for(var j = 0; j<changedLine[i].length; j++){
			board[i][3-j] = changedLine[i][j];
		}
	}

	for(var i = 0; i<4; i++){
		for(var j = 0; j< 4; j++){
			if(position[i][j][1] != j){
				showAnimation(i,j,position[i][j][0],position[i][j][1]);
			}
		}
	}

	setTimeout("generateDigitCell();",220);
	setTimeout("generateRandomDigit();",220);
	initialPosition();

	if(isGameOver() == true){
		$(".gameOver").css("display","block");
	}
}

function moveTop(){
	var changedLine = [];
	for(var column = 0; column < 4; column++){
		changedLine[column] = [];
		for(var line = 0; line < 4; line++){
			if(board[line][column] !== 0){
				changedLine[column].push(board[line][column]);
				position[line][column] = [changedLine[column].length -1,column];
			}
		}

		if(changedLine[column].length>=2){
			if(changedLine[column][0] == changedLine[column][1]){
				changedLine[column].shift();
				changedLine[column][0] = changedLine[column][0] * 2;
				for(var x = 1; x < 4; x++){
					if(position[x][column][0]>0)
						position[x][column][0]--;
				}
			}
		}

		if(changedLine[column].length >= 3){
			if(changedLine[column][1] == changedLine[column][2]){
				changedLine[column][1] *= 2;
				if(changedLine[column].length === 3){
					changedLine[column][2] = 0;
				}
				if(changedLine[column].length ===4){
					changedLine[column][2] = changedLine[column][3];
					changedLine[column][3] = 0;
				}

				for(var x = 2; x < 4; x++){
					if(position[x][column][0]>0)
						position[x][column][0]--;
				}
			}
		}

		if(changedLine[column].length == 4){
			if(changedLine[column][2] == changedLine[column][3]){
				changedLine[column][2] *= 2;
				changedLine[column][3] = 0;
				position[3][column][0] --;
			}
		}
	}

	initialBoard();

	for(var i = 0; i<4; i++){
		for(var j = 0; j<changedLine[i].length; j++){
			board[j][i] = changedLine[i][j];
		}
	}

	for(var i = 0; i<4; i++){
		for(var j = 0; j< 4; j++){
			if(position[i][j][0] != i){
				showAnimation(i,j,position[i][j][0],position[i][j][1]);
			}
		}
	}
	setTimeout("generateDigitCell();",220);
	setTimeout("generateRandomDigit();",220);
	initialPosition();

	if(isGameOver() == true){
		$(".gameOver").css("display","block");
	}
}

function moveBottom(){
	var changedLine = [];
	for(var column = 0; column < 4; column++){
		changedLine[column] = [];
		for(var line = 3; line >= 0; line--){
			if(board[line][column] !== 0){
				changedLine[column].push(board[line][column]);
				position[line][column] = [4-changedLine[column].length,column];
			}
		}

		if(changedLine[column].length>=2){
			if(changedLine[column][0] == changedLine[column][1]){
				changedLine[column].shift();
				changedLine[column][0] *= 2;
				for(var x = 2; x >= 0; x--){
					if(position[x][column][0] < 3)
						position[x][column][0] ++;
				}
			}
		}

		if(changedLine[column].length >= 3){
			if(changedLine[column][1] == changedLine[column][2]){
				changedLine[column][1] *= 2;
				if(changedLine[column].length === 3){
					changedLine[column][2] = 0;
				}
				if(changedLine[column].length === 4){
					changedLine[column][2] = changedLine[column][3];
					changedLine[column][3] = 0;
				}

				if(position[1][column][0] < 3)
					position[1][column][0] ++;
				if(position[0][column][0] < 3)
				position[0][column][0] ++;
			}
		}

		if (changedLine[column].length === 4){
			if(changedLine[column][2] == changedLine[column][3]){
				changedLine[column][2] *= 2;
				changedLine[column][3] = 0;

				if(position[0][column][0] < 3)
					position[0][column][0] ++;
			}
		}
	}

	initialBoard();

	for(var i = 0; i<4; i++){
		for(var j = 0; j<changedLine[i].length; j++){
			board[3-j][i] = changedLine[i][j];
		}
	}

	for(var i = 0; i<4; i++){
		for(var j = 0; j< 4; j++){
			if(position[i][j][0] != i){
				showAnimation(i,j,position[i][j][0],position[i][j][1]);
			}
		}
	}

	setTimeout("generateDigitCell();",220);
	setTimeout("generateRandomDigit();",220);
	initialPosition();

	if(isGameOver() == true){
		$(".gameOver").css("display","block");
	}
}

function showAnimation(fromX, fromY, toX, toY){
	var digitCell = $("#digit-cell-"+fromX+fromY);
	digitCell.animate({
		top: parseInt(toX*120 + 20)+"px",
		left: parseInt(toY*120 + 20)+"px"
	},200);
}

function isGameOver(){

	/*for(var i = 0; i < 4; i++){
		for(var j = 0; j < 4; j++){
			if(board[i][j] == 0)
				return false;
		}
	}

	for(var i = 0; i < 3; i++){
		for(var j = 0; j < 3; j++){
			if(board[i][j] == board[i+1][j] || board[i][j] == board[i][j+1])
				return false;
		}
	}

	for(var i = 0; i < 3; i++){
		if(board[i][3] == board[i+1][3])
			return false;
	}

	for(var j = 0; j< 3; j++){
		if(board[3][j] == board[3][j+1])
			return false;
	}

	console.log(board);
	return true;*/
	return false;

}

initial();