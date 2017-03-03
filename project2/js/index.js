function initial(){
	$("#btn-signIn").click(function(event) {
		$(".mask").css("height",$(window).height());
		$(".mask").css("display","block");
		$(".login-block").css("display","block");
		var left = ($(window).width() - 360)/2;
		$(".login-block").css("left",left);
		var top = ($(window).height() - 240)/2;
		$(".login-block").css("top",top);

		$(".mask").click(function(){
			$(".mask").css("display","none");
			$(".login-block").css("display","none");
		});
	});

	$("#btn-close").click(function(){
		$(".mask").css("display","none");
		$(".login-block").css("display","none");
	});

	var dragging = false;
	var mouseX, mouseY, loginBlockX, loginBlockY;

	$(".login-block").mousedown(function(event){
		event = event || window.event;
		dragging = true;
		mouseX = event.clientX;
		mouseY = event.clientY;
		loginBlockX = parseFloat($(".login-block").css("left"));
		loginBlockY = parseFloat($(".login-block").css("top"));
	});

	$(".login-block").mousemove (function(event){
		event = event || window.event;
		if(dragging){
			console.log(event.clientX +" " +mouseX +" " +loginBlockX);
			$(".login-block").css("left",parseFloat(event.clientX - mouseX + loginBlockX)+"px");
			$(".login-block").css("top",parseFloat(event.clientY - mouseY + loginBlockY)+"px");
		}
	});

	$(".login-block").mouseup(function(event){
		event = event || window.event;
		dragging = false;
		console.log("mouseUp");
	});
}

initial();
