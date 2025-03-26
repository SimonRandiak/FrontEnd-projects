class PacMan {
    constructor (map, x, y) {
        this.map = map
        this.x = x
        this.y = y

        this.pacman_up = new Image()
        this.pacman_up.src = "assets/pacman-up.png"

        this.pacman_down = new Image()
        this.pacman_down.src = "assets/pacman-down.png"

        this.pacman_left = new Image()
        this.pacman_left.src = "assets/pacman-left.png"

        this.pacman_right = new Image()
        this.pacman_right.src = "assets/pacman-right.png"
        this.currentImage = this.pacman_left

        this.direction = 0

        document.addEventListener("keydown", this.changeDirection.bind(this))
    }

    draw() {
        //this.map.ctx.clearRect(0, 0, this.map.canvas.width, this.map.canvas.height)
        this.map.ctx.drawImage(this.currentImage, this.x, this.y, this.map.rectWidth, this.map.rectHeight)
    }

    changeDirection(event) {
        if (event.key == "w") {
            this.currentImage = this.pacman_up
        }
        if (event.key == "a") {
            this.currentImage = this.pacman_left
        }
        if (event.key == "s") {
            this.currentImage = this.pacman_down
        }
        if (event.key == "d") {
            this.currentImage = this.pacman_right
        }
    }
}