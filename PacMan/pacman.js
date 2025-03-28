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

        this.width = this.map.rectWidth - 2 
        this.height = this.map.rectHeight - 2 

        this.direction = ""
        this.previousDirection = ""

        document.addEventListener("keydown", this.changeDirection.bind(this))
        this.snapped = false
    }

    draw() {
        //this.map.ctx.clearRect(0, 0, this.map.canvas.width, this.map.canvas.height)
        this.map.ctx.drawImage(this.currentImage, this.position_x, this.position_y, this.map.rectWidth-5, this.map.rectHeight-5)
    }

    update() {
        let position = this.getCurrentTile()
        
        if (this.previousDirection == this.direction) {
            this.position_x += this.velocity_x
            this.position_y += this.velocity_y
            console.log("Skipping")
            return;
        }

        this.previousDirection = this.direction
        if (this.direction == "w") {
            if (this.checkValidMove(position[0]-1, position[1])) {
                console.log("Snapping up")
                this.snapTo(position[0], position[1])
            }
        }
        if (this.direction == "a") {
            if (this.checkValidMove(position[0], position[1]-1)) {
                this.snapTo(position[0], position[1])
                console.log("Snapping left")
            }
        }
        if (this.direction == "s") {
            if (this.checkValidMove(position[0]+1, position[1])) {
                this.snapTo(position[0], position[1])
                console.log("Snapping down")
            }
        }
        if (this.direction == "d") {
            if (this.checkValidMove(position[0], position[1]+1)) {
                this.snapTo(position[0], position[1])
                console.log("Snapping right")
            }
        }
        
        this.position_x += this.velocity_x
        this.position_y += this.velocity_y
    }

    changeDirection(event) {
        this.previousDirection = this.direction
        this.direction = event.key
        if (event.key == "w") {
            this.velocity_y = -2 
            this.velocity_x = 0
            this.currentImage = this.pacman_up
        }
        if (event.key == "a") {
            this.velocity_x = -2 
            this.velocity_y = 0
            this.currentImage = this.pacman_left
        }
        if (event.key == "s") {
            this.velocity_y = 2 
            this.velocity_x = 0
            this.currentImage = this.pacman_down
        }
        if (event.key == "d") {
            this.velocity_x = 2 
            this.velocity_y = 0
            this.currentImage = this.pacman_right
        }
   }

    collideWithMap() {
            for (let y = 0; y < this.map.map.length; y++) {
                for (let x = 0; x < this.map.map[y].length; x++) {
                    if (this.map.map[y][x] == 1) {
                        let rectY = y*this.map.rectHeight;
                        let rectX = x*this.map.rectWidth;
                        if (this.position_x+this.width+this.velocity_x > rectX && this.position_x+this.velocity_x <= rectX+this.map.rectWidth && this.position_y+this.height+this.velocity_y > rectY && this.position_y+this.velocity_y <= rectY+this.map.rectHeight) {
                            return true
                        }
                    }
                }
            }
            return false
        }
        getCurrentTile() {
            let tileY = Math.floor((this.position_y+(this.height/2)) / this.map.rectHeight)
            let tileX = Math.floor((this.position_x+(this.width/2)) / this.map.rectWidth)
            console.log(tileY, tileX)
            if (tileY < 0 || tileY >= this.map.map.length) {
                return [0, 0]
            }
            if (tileX < 0 || tileX >= this.map.map[tileY].length) {
                return [0, 0]
            }
            return [tileY, tileX]
        }

        snapTo(y, x) {
            this.position_y = (y*this.map.rectHeight) + 2
            this.position_x = (x*this.map.rectWidth) + 2
        }

        checkValidMove(y, x) {
            if (y >= this.map.map.length || y < 0) {
                return false
            }
            if (x > this.map.map[y].length || x < 0) {
                return false
            }
            if (this.map.map[y][x] == 0 || this.map.map[y][x] == 2) {
                return true
            }
            return false

        }
}