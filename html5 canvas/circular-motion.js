const canvas = document.querySelector("canvas");
let W = window.innerWidth;
let H = window.innerHeight;
canvas.width = W;
canvas.height = H;
const c = canvas.getContext("2d");

const mouse = {
	x: W / 2,
	y: H / 2,
};
// event listeners
window.addEventListener("mousemove", (e) => {
	mouse.x = e.clientX;
	mouse.y = e.clientY;
});

window.addEventListener("resize", (_) => {
	W = innerWidth;
	H = innerHeight;
	canvas.width = W;
	canvas.height = H;
	init();
});

// utility
function randomIntFromRange(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

// random color generator
function getRandomColor() {
	let letters = "0123456789ABCDEF";
	let colorcode = "#FF";
	for (let i = 0; i < 4; i++) {
		colorcode += letters[Math.floor(Math.random() * 16)];
	}
	return colorcode;
}

// objects
class Particle {
	constructor(x, y, r, color) {
		this.X = x; // initial X position
		this.Y = y; // initial Y position

		this.x = x;
		this.y = y;
		this.r = r;
		this.velocity = 0.1;
		this.color = "#FF4343";
		this.radians = 0;
		this.distanceFromCenter = 200;
		this.lastMousePos = { x, y };
	}
	draw(prevPoint) {
		c.beginPath();
		c.strokeStyle = this.color;
		c.lineWidth = this.r;
		if (prevPoint.x === this.X && prevPoint.y === this.Y) {
			c.moveTo(this.x, this.y);
		} else {
			c.moveTo(prevPoint.x, prevPoint.y);
		}
		c.lineTo(this.x, this.y);
		c.stroke();
		c.closePath();
	}
	update() {
		const prevPoint = {
			x: this.x,
			y: this.y,
		};

		// drag fx
		this.lastMousePos.x += (mouse.x - this.lastMousePos.x) * 0.05;
		this.lastMousePos.y += (mouse.y - this.lastMousePos.y) * 0.05;

		// moving the particle
		this.radians += this.velocity;
		this.x =
			this.lastMousePos.x + Math.cos(this.radians) * this.distanceFromCenter;
		this.y =
			this.lastMousePos.y + Math.sin(this.radians) * this.distanceFromCenter;
		this.draw(prevPoint);
	}
}

// particle generator
function generateParticles(n, radius = 10) {
	for (let i = 0; i < n; i++) {
		let r = radius;
		let x = W / 2;
		let y = H / 2;
		let color = getRandomColor();
		particles.push(new Particle(x, y, r, color));
	}
}

// animate
function animate() {
	c.fillStyle = "rgba(255, 255, 255, 0.1";
	c.fillRect(0, 0, W, H);
	// c.clearRect(0, 0, W, H)
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
	const radius = 5;
	generateParticles(nos, radius);
}

init();
animate();
