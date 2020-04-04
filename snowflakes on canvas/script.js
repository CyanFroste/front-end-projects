window.onload = function () {
    let canvas = document.getElementById("sky");
    let ctx = canvas.getContext("2d");

    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let maxflakes = 100;
    let flakes = [];

    for (let i = 0; i < maxflakes; i++) {
        flakes.push({
            x: Math.random() * width,
            y: Math.random() * height,
            r: Math.random() * 5 + 2,
            d: Math.random() + 1
        });
    }

    function drawFlakes() {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = "white";
        ctx.beginPath();
        for (let i = 0; i < maxflakes; i++) {
            let flake = flakes[i];
            ctx.moveTo(flake.x, flake.y);
            ctx.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2, true);
        }
        ctx.fill()
        moveFlakes();
    }

    let angle = 0;

    function moveFlakes() {
        angle += 0.01;
        for (let i = 0; i < maxflakes; i++) {
            let flake = flakes[i];
            flake.y += Math.pow(flake.d, 2) + 1;
            flake.x += Math.sin(angle) * 2;

            if (flake.y > height) {
                flakes[i] = {
                    x: Math.random() * width,
                    y: 0,
                    r: flake.r,
                    d: flake.d
                };
            }
        }
    }

    this.setInterval(drawFlakes, 25);

};