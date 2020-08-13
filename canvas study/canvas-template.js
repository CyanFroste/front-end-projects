const canvas = document.querySelector("canvas");
let W = window.innerWidth;
let H = window.innerHeight;
canvas.width = W;
canvas.height = H;
const c = canvas.getContext("2d");

// event listeners
window.addEventListener("resize", (_) => {
	W = innerWidth;
	H = innerHeight;
	canvas.width = W;
	canvas.height = H;
	init();
});

// objects
function Particle(x, y, r, color) {
	this.x = x;
	this.y = y;
	this.r = r;
	this.color = color;
}
Particle.prototype.draw = function() {
	c.beginPath();
	c.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);		
	c.fillStyle = this.color;		
	c.fill();
	c.closePath();
}
Particle.prototype.update = function() {
	this.draw();
}

// particle generator
function generateParticles(n, radius = 10) {
	for (let i = 0; i < n; i++) {
		let r = radius;
		let x = W/2;
		let y = H/2;
		let color = "#FF4343";	
		particles.push(new Particle(x, y, r, color));
	}
}

// animate
function animate() {
	c.clearRect(0, 0, W, H);

	particles.forEach((particle) => {
		particle.update();
	});

	requestAnimationFrame(animate);
}

// implementation
let particles;
function init() {
	particles = [];
	// generating particles
	const nos = 1;
	const radius = 20;
	generateParticles(nos, radius);
}

init();
animate();
