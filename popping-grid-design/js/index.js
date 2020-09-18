"use strict";
const grid = document.querySelector(".grid");
const gridItems = grid.children;
const DURATION = 200;

animateCSSGrid.wrapGrid(grid, { duration: DURATION });

Array.prototype.forEach.call(gridItems, (item) => {
	item.onclick = (e) => {
		const target = e.target;
		grid.style.pointerEvents = "none";
		target.remove();
		setTimeout(() => {
			grid.style.pointerEvents = "all";
		}, DURATION)
	};
});
