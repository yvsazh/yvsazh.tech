const canvas = $("#main-canvas")[0];
canvas.width = window.innerWidth;

canvas.height = 600;
const ctx = canvas.getContext("2d");
var fps = 60;

class Ball {
    constructor(x, y, speed, endRadius) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.color;
        this.radius = 0;
        this.finished = false;
        this.endRadius = endRadius;
        this.maxOpacity;
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
        ctx.fill();
    }

    update(ctx) {
        this.draw(ctx);
        if (this.radius <= this.endRadius/2) {
            this.color = `rgba(255, 255, 255, ${this.radius/50}`
            this.maxOpacity = this.radius/50;
            this.radius += this.speed;
        } else if (this.radius >= this.endRadius/2 && this.radius <= this.endRadius) {
            this.maxOpacity -= 0.1;
            this.color = `rgba(255, 255, 255, ${this.maxOpacity}`
            this.radius += this.speed;
        } else if (this.radius >= this.endRadius){
            this.finished = true;
        }
    }
}

var balls = [];

function generateBalls() {
    for (var i = 0; i < 30; i++) {
        balls.push(new Ball(Math.random()*canvas.width - 30, Math.random()*canvas.height - 30, Math.random()*1, Math.random()*60 + 10));
    }
}

generateBalls();

function update() {
    ctx.fillStyle="black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (var ball of balls) {
        if (ball.finished) {
            ball.x = Math.random()*canvas.width - 30;
            ball.y = Math.random()*canvas.height - 30;
            ball.speed = Math.random();
            ball.radius = 0;
            ball.endRadius =  Math.random()*60 + 10;
            ball.finished = false;
        }
        ball.update(ctx);
    }
}

setInterval(update, fps);

