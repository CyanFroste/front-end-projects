const buttons = document.querySelectorAll(".btn");
const cards = document.querySelectorAll('.card');

buttons.forEach((button) => {
	button.addEventListener("click", createRipple);
});

cards.forEach((card) => {
	card.addEventListener("click", createRipple);
});

function createRipple(e) {
	const olderRipples = this.querySelectorAll(".ripple");
	olderRipples.forEach((ripple) => {
		this.removeChild(ripple);
	});

	const circle = document.createElement("div");
	this.appendChild(circle);

	// dimens of the circle
	const d = Math.max(this.clientWidth, this.clientHeight);
	circle.style.width = circle.style.height = `${d}px`;
	// position of circle
	circle.style.left = `${e.pageX - this.offsetLeft - d / 2}px`;
	circle.style.top = `${e.pageY - this.offsetTop - d / 2}px`;

	circle.classList.add("ripple");
}
