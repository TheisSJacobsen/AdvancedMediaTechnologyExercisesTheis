

var canvas, ctx, ball, fps = 90, force=100, bounceFactor = 0.7, start_step_in_time = 0, progress = 0; up = false, down = false, left = false, right = false, collected_time = 0, img = null;
var W = 350, H = 450;

var Ball = function(){
	this.radius = 10;
	this.x = canvas.width/2;
	this.y = canvas.height/2;
	this.vx = 200;
	this.vy = 300;

};
Ball.prototype.render = function(){
	ctx.fillStyle = 'green';
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
	ctx.fill();
};

var load = function(){
	canvas = document.getElementById('myCanvas');
	canvas.height = H; canvas.width = W;  
	ctx = canvas.getContext('2d');
	ball = new Ball();
	img = new Image();
	img.src = 'imgs/The-MatrixReloaded-HD-Wallpapers1.jpg';
	window.addEventListener('keydown', doKey);
	window.addEventListener('keyup', doKey);
};

function doKey(e){
	console.log(e);
	if (e.keyCode == 87) //w
		up=((e.type=="keydown") ? true : false);
	if (e.keyCode == 83) //s
		down=((e.type=="keydown") ? true : false);
	if (e.keyCode == 65) //a
		left=((e.type=="keydown") ? true : false);
	if (e.keyCode == 68)//d
		right=((e.type=="keydown") ? true : false);
}

Ball.prototype.update = function(){
	if (up)//w
		ball.vy-=force;
	if (down)//s
		ball.vy+=force;
	if (left)//a
		ball.vx-=force;
	if (right)//d
		ball.vx+=force;
};

function clearCanvas() {
	ctx.clearRect(0, 0, W, H);
};

function globalMove(){
	ball.y += ball.vy*(progress/1000);
	ball.x += ball.vx*(progress/1000);
	if(ball.y + ball.radius > H) {
		ball.y = H - ball.radius;
		ball.vy *= -bounceFactor;
	}
	if(ball.x + ball.radius > W) {
		ball.x = W - ball.radius;
		ball.vx *= -bounceFactor;
	}
	if(ball.y - ball.radius < 0) {
		ball.y = ball.radius;
		ball.vy *= -bounceFactor;
	}
	if(ball.x - ball.radius < 0) {
		ball.x = ball.radius;
		ball.vx *= -bounceFactor;
	}
}

function staticDrawings(){
	ctx.drawImage(img, 0, 0);
	//text
	ctx.fillStyle = 'green';
	ctx.font = '30px Verdana, sans-serif';
	ctx.textBaseline = 'top';
	ctx.textAlign = 'right';
	ctx.fillText('Time passed: '+Math.floor(collected_time/1000), 300, 20);
	
	
}

function update(){
	if(canvas!=null){
		clearCanvas();
		staticDrawings();
		ball.render();
		ball.update();
		globalMove();
		
	}
}

window.addEventListener('load', load, false);

function step(step_in_time){
  	progress = step_in_time - start_step_in_time;
  	collected_time += progress;
  	// if(progress>0)
	  	update(progress);
	start_step_in_time = step_in_time;
  	window.requestAnimationFrame(step);
}
window.requestAnimationFrame(step);
// setInterval(update, 1000/60);
