class CanvasSky {
    constructor() {
        this.canvas = document.getElementById('canvasSky');
        this.ctx = this.canvas.getContext('2d');
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.run();
    }

    initCanvas() {
        this.canvas.width = this.width;
        this.canvas.height = this.height;

        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

    drawOverlayer() {
        const gradient = this.ctx.createRadialGradient(this.width / 2, this.height / 2, 250, this.width / 2, this.height / 2, this.width / 2);

        gradient.addColorStop(0, 'rgba(0,0,0,0)');
        gradient.addColorStop(1, 'rgba(0,0,0,.8)');

        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

    drawFloor() {
        this.ctx.save();

        this.ctx.fillStyle = '#004500';

        this.ctx.beginPath();
        this.ctx.moveTo(-100, this.height);
        this.ctx.bezierCurveTo(this.width * .2, 800, this.width * .8, 800, this.width + 100, this.height);
        this.ctx.fill();


        this.ctx.restore();
    }

    drawSun() {
        this.ctx.save();

        const gradient = this.ctx.createRadialGradient(this.width / 2, 90, 10, this.width / 2, 90, 80);
        gradient.addColorStop(0, 'yellow');
        gradient.addColorStop(1, '#ff3535');

        this.ctx.fillStyle = gradient;

        this.ctx.beginPath();
        this.ctx.arc(this.width / 2, 90, 80, 0, 2 * Math.PI);
        this.ctx.fill();

        this.ctx.restore();
    }

    generateStars(count) {
        let stars = [];

        for (let i = 0; i < count; i++) {
            const x = Math.random() * this.width;
            const y = Math.random() * this.height;
            const radius = Math.random() * 4 + 1;
            const startRadius = radius;
            const color = '#fff';
            const speed = Math.random() + .25;

            stars.push({
                x,
                y,
                radius,
                startRadius,
                color,
                speed,
            })
        }

        this.stars = stars;
    }

    drawStar(star) {
        this.ctx.save();

        this.ctx.fillStyle = '#fff';

        this.ctx.beginPath();
        this.ctx.translate(star.x, star.y);
        this.ctx.moveTo(0, 0 - star.radius);
        for (let i = 0; i < 5; i++) {
            this.ctx.rotate((Math.PI / 180) * 36);
            this.ctx.lineTo(0, 0 - star.radius * .5);
            this.ctx.rotate((Math.PI / 180) * 36);
            this.ctx.lineTo(0, 0 - star.radius);
        }
        this.ctx.fill();

        this.ctx.restore();
    }

    drawStars() {
        this.stars.forEach(star => {
            this.drawStar(star);
        })
    }

    updateStars() {
        this.stars.forEach(star => {
            star.x += star.speed;
            star.y -= star.speed * ((this.width / 2) - star.x) / 2000;
            star.radius = star.startRadius * (Math.random() / 4 + .7);

            if (star.x > this.width + star.radius * 2) {
                star.x = -2 * star.radius;
            }
        })
    }

    clearCanvas() {
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

    draw() {
        this.clearCanvas();
        this.drawSun();
        this.drawStars();
        this.updateStars();
        this.drawFloor();
        this.drawOverlayer();

        requestAnimationFrame(() => this.draw());
    }

    run() {
        this.initCanvas();
        this.generateStars(500);
        this.draw();
    }
}

export default CanvasSky;