class PacMan {
    constructor (map, x, y) {
        this.map = map

        this.pacman_up = new Image()
        this.pacman_up.src = "assets/pacman-up.png"

        this.pacman_down = new Image()
        this.pacman_down.src = "assets/pacman-down.png"

        this.pacman_left = new Image()
        this.pacman_left.src = "assets/pacman-left.png"

        this.pacman_right = new Image()
        this.pacman_right.src = "assets/pacman-right.png"
        this.currentImage = this.pacman_left

        this.position_x = x 
        this.position_y = y 

        this.velocity_x = 0
        this.velocity_y = 0

        this.direction = 0

        document.addEventListener("keydown", this.changeDirection.bind(this))
    }

    draw() {
        //this.map.ctx.clearRect(0, 0, this.map.canvas.width, this.map.canvas.height)
        this.map.ctx.drawImage(this.currentImage, this.position_x, this.position_y, this.map.rectWidth, this.map.rectHeight)
    }

    update() {
        this.position_x += this.velocity_x
        this.position_y += this.velocity_y
    }

    changeDirection(event) {
        if (event.key == "w") {
            this.velocity_y = -5
            this.velocity_x = 0
            this.currentImage = this.pacman_up
        }
        if (event.key == "a") {
            this.velocity_x = -5
            this.velocity_y = 0
            this.currentImage = this.pacman_left
        }
        if (event.key == "s") {
            this.velocity_y = 5
            this.velocity_x = 0
            this.currentImage = this.pacman_down
        }
        if (event.key == "d") {
            this.velocity_x = 5
            this.velocity_y = 0
            this.currentImage = this.pacman_right
        }
    }
}