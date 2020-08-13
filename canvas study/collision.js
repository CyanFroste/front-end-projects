const canvas = document.querySelector("canvas");
let W = window.innerWidth;
let H = window.innerHeight;
canvas.width = W;
canvas.height = H;
const c = canvas.getContext("2d");

const mouse = {
	x: undefined,
	y: undefined,
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

function distance(x1, x2, y1, y2) {
	// using pythagoras theorm
	const distX = x2 - x1;
	const distY = y2 - y1;
	return Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));
}
// THE MATH
/**
 * Rotates coordinate system for velocities
 *
 * Takes velocities and alters them as if the coordinate system they're on was rotated
 *
 * @param  Object | velocity | The velocity of an individual particle
 * @param  Float  | angle    | The angle of collision between two objects in radians
 * @return Object | The altered x and y velocities after the coordinate system has been rotated
 */

function rotate(velocity, angle) {
	const rotatedVelocities = {
		x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
		y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle),
	};

	return rotatedVelocities;
}

/**
 * Swaps out two colliding particles' x and y velocities after running through
 * an elastic collision reaction equation
 *
 * @param  Object | particle      | A particle object with x and y coordinates, plus velocity
 * @param  Object | otherParticle | A particle object with x and y coordinates, plus velocity
 * @return Null | Does not return a value
 */

function resolveCollision(particle, otherParticle) {
	const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
	const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

	const xDist = otherParticle.x - particle.x;
	const yDist = otherParticle.y - particle.y;

	// Prevent accidental overlap of particles
	if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
		// Grab angle between the two colliding particles
		const angle = -Math.atan2(
			otherParticle.y - particle.y,
			otherParticle.x - particle.x
		);

		// Store mass in var for better readability in collision equation
		const m1 = particle.mass;
		const m2 = otherParticle.mass;

		// Velocity before equation
		const u1 = rotate(particle.velocity, angle);
		const u2 = rotate(otherParticle.velocity, angle);

		// Velocity after 1d collision equation
		const v1 = {
			x: (u1.x * (m1 - m2)) / (m1 + m2) + (u2.x * 2 * m2) / (m1 + m2),
			y: u1.y,
		};
		const v2 = {
			x: (u2.x * (m1 - m2)) / (m1 + m2) + (u1.x * 2 * m2) / (m1 + m2),
			y: u2.y,
		};

		// Final velocity after rotating axis back to original location
		const vFinal1 = rotate(v1, -angle);
		const vFinal2 = rotate(v2, -angle);

		// Swap particle velocities for realistic bounce effect
		particle.velocity.x = vFinal1.x;
		particle.velocity.y = vFinal1.y;

		otherParticle.velocity.x = vFinal2.x;
		otherParticle.velocity.y = vFinal2.y;
	}
}

// source : https://gist.github.com/christopher4lis/f9ccb589ee8ecf751481f05a8e59b1dc

// objects
class Particle {
	constructor(x, y, r, color) {
		this.x = x;
		this.y = y;
		this.r = r;
		this.mass = 1;
		this.velocity = {
			x: (Math.random() - 0.5) * 5,
			y: (Math.random() - 0.5) * 5,
		};
		this.color = color;
		this.opacity = 0;
	}
	draw() {
		c.beginPath();
		c.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
		// global code written b/w save and restore will only affect those inside
		c.save();
		c.globalAlpha = this.opacity;
		c.fillStyle = this.color;		
		c.fill();
		c.restore();
		c.strokeStyle = this.color;
		c.stroke();
		c.closePath();
	}
	update(particles) {
		this.draw();

		this.collide(particles);

		// updating velocity
		this.x += this.velocity.x;
		this.y += this.velocity.y;
	}
	collide() {
		// detect collision
		for (let i = 0; i < particles.length; i++) {
			if (this === particles[i]) continue;
			if (
				distance(this.x, particles[i].x, this.y, particles[i].y) - this.r * 2 <
				0
			) {
				// when colliding with other particles
				resolveCollision(this, particles[i]);
			}
		}
		// reverse direction when colliding with the edges
		if (this.x - this.r <= 0 || this.x + this.r >= W)
			this.velocity.x = -this.velocity.x;
		if (this.y - this.r <= 0 || this.y + this.r >= H)
			this.velocity.y = -this.velocity.y;

		// mouse collision
		if (distance(mouse.x, this.x, mouse.y, this.y) < 140 && this.opacity  < 0.8) {
			this.opacity += 0.1;
		} else if (this.opacity > 0) {
			this.opacity -= 0.1;
			this.opacity = Math.max(0, this.opacity);
		}
	}
}

// particle generator
function generateParticles(n, radius = 10) {
	for (let i = 0; i < n; i++) {
		let r = radius;
		let x = randomIntFromRange(r, W - r);
		let y = randomIntFromRange(r, H - r);
		let color = getRandomColor();

		if (i !== 0) {
			for (let j = 0; j < particles.length; j++) {
				if (distance(x, particles[j].x, y, particles[j].y) - r * 2 < 0) {
					x = randomIntFromRange(r, W - r);
					y = randomIntFromRange(r, H - r);
					// restart the loop
					j = -1;
				}
			}
		}

		particles.push(new Particle(x, y, r, color));
	}
}

// animate
function animate() {
	c.clearRect(0, 0, W, H);

	particles.forEach((particle) => {
		particle.update(particles);
	});

	requestAnimationFrame(animate);
}

// implementation
let particles = [];
function init() {
	particles = [];
	// generating particles
	const nos = 140;
	const radius = 20;
	generateParticles(nos, radius);
}

init();
animate();
