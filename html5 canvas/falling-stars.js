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

// utility
function randomIntFromRange(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

// objects
function Star(x, y, r, color) {
	this.x = x;
	this.y = y;
	this.r = r;
	this.color = color;
	this.velocity = {
		x: randomIntFromRange(-15, 15),
		y: 7,
	};
	this.gravity = 2;
	this.friction = 0.4;
}
Star.prototype.draw = function () {
	c.save();
	c.beginPath();
	c.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
	c.fillStyle = this.color;
	// c.shadowColor = "white"
	// c.shadowBlur = 10;
	c.fill();
	c.closePath();
	c.restore();
};
Star.prototype.update = function () {
	// collision with edges
	if (
		this.x + this.r + this.velocity.x >= W ||
		this.x - this.r + this.velocity.x <= 0
	){
		this.velocity.x = -this.velocity.x * this.friction;
		this.shatter();
	}
	//
	if (this.y + this.r + this.velocity.y >= H - groundHeight + 20) {
		this.velocity.y = -this.velocity.y * this.friction;
		this.shatter();
	} else this.velocity.y += this.gravity;

	this.y += this.velocity.y;
	this.x += this.velocity.x;

	this.draw();
};
Star.prototype.shatter = function () {
	this.r -= 0.5;
	for (let i = 0; i < 4; i++) {
		starFragments.push(new StarFragment(this.x, this.y, 2));
	}
};

//
function StarFragment(x, y, r, color) {
	Star.call(this, x, y, r, color);
	this.velocity = {
		x: randomIntFromRange(-5, 5),
		y: randomIntFromRange(-15, 15),
	};
	this.gravity = 0.8;
	this.friction = 0.4;
	this.lifespan = 60;
	this.opacity = 1;
}
StarFragment.prototype.draw = function () {
	c.save();
	c.beginPath();
	c.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
	c.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
	// c.shadowColor = "white"
	// c.shadowBlur = 10;
	c.fill();
	c.closePath();
	c.restore();
};
StarFragment.prototype.update = function () {
	// collision with edges
	if (this.x + this.r + this.velocity.x >= W)
		this.velocity.x = -this.velocity.x * this.friction;
	//
	if (this.y + this.r + this.velocity.y >= H - groundHeight + 20)
		this.velocity.y = -this.velocity.y * this.friction;
	else this.velocity.y += this.gravity;

	this.x += this.velocity.x;
	this.y += this.velocity.y;
	this.lifespan -= 1;
	this.opacity -= 1 / this.lifespan;

	this.draw();
};

//
function createMountains(n, height, color) {
	for (let i = 0; i < n; i++) {
		const width = W / n;
		c.beginPath();
		c.moveTo(i * width, H);
		c.lineTo(i * width + width + 325, H);
		c.lineTo(i * width + width / 2, H - height);
		c.lineTo(i * width - 325, H);
		c.fillStyle = color;
		c.fill();
		c.closePath();
	}
}

// animate
function animate() {
	c.fillStyle = backgroundGradient;
	c.fillRect(0, 0, W, H);

	bgStars.forEach((bgStar) => {
		bgStar.draw();
	});

	// render mountains
	createMountains(1, H - 500, "#010b13");
	// createMountains(2, H - 100, "#303d43");
	// createMountains(3, H - 300, "#1b2124");

	c.fillStyle = "#121429";
	c.fillRect(0, H-groundHeight, W, groundHeight)

	stars.forEach((star, index) => {
		star.update();
		if (star.r === 0) {
			stars.splice(index, 1);
		}
	});

	starFragments.forEach((starFragment, index) => {
		starFragment.update();
		if (starFragment.lifespan === 0) {
			starFragments.splice(index, 1);
		}
	});

	ticker++;
	if (ticker % spawnRate == 0) {
		const radius = 12;
		// const x = Math.max(radius, Math.random() * W - radius);
		const x = randomIntFromRange(W / 2, W - radius);
		stars.push(new Star(x, -100, radius, "white"));
		spawnRate = randomIntFromRange(200, 400);
	}
	requestAnimationFrame(animate);
}

// implementation
const backgroundGradient = c.createLinearGradient(0, 0, 0, H);
backgroundGradient.addColorStop(0, "#010b13 ");
backgroundGradient.addColorStop(1, "#744baa");

let ticker = 0;
let spawnRate = 200;
let stars, starFragments, bgStars;
let groundHeight = 50;
function init() {
	stars = [];
	starFragments = [];
	bgStars = [];
	//
	for (let i = 0; i < 100; i++) {
		const x = Math.random() * W;
		const y = Math.random() * H;
		const r = Math.random() * 3;
		bgStars.push(new Star(x, y, r, "white"));
	}
}

init();
animate();
