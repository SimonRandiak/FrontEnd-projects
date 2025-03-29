class PacMan {
    constructor (map, x, y) {
        this.map = map

        this.pacmanUp = new Image()
        this.pacmanUp.src = "assets/pacman-up.png"

        this.pacmanDown = new Image()
        this.pacmanDown.src = "assets/pacman-down.png"

        this.pacmanLeft = new Image()
        this.pacmanLeft.src = "assets/pacman-left.png"

        this.pacmanRight = new Image()
        this.pacmanRight.src = "assets/pacman-right.png"
        this.currentImage = this.pacmanLeft

        this.positionX = x 
        this.positionY = y 

        this.velocityX = 0
        this.velocityY = 0

        this.width = this.map.rectWidth - 3 
        this.height = this.map.rectHeight - 3

        this.currentScore = 20

        this.direction = ""
        this.previousDirection = ""

        this.previousImage = this.currentImage

        document.addEventListener("keydown", this.updateDirection.bind(this))

        this.lifes = 3
    }

    update() {
        this.updateVelocity()

        this.positionX += this.velocityX
        this.positionY += this.velocityY
        if (this.collideWithMap()) {
            this.positionX -= this.velocityX
            this.positionY -= this.velocityY
            this.direction = this.previousDirection
            this.currentImage = this.previousImage
            this.updateVelocity()
        }
        this.previousDirection = this.direction
        this.map.ctx.drawImage(this.currentImage, this.positionX, this.positionY, this.width, this.height)
        this.eat()
    }


    updateDirection(event) {
        this.previousDirection = this.direction
        this.direction = event.key
        /*
        this.updateVelocity()

        this.positionX += this.velocityX
        this.positionY += this.velocityY
        if (this.collideWithMap()) {
            this.positionX -= this.velocityX
            this.positionY -= this.velocityY
            this.direction = this.previousDirection
            this.updateVelocity()
        }
        */
   }

    updateVelocity() {
        this.previousImage = this.currentImage
        switch (this.direction) {
            case "w":
                this.velocityX = 0
                this.velocityY = -(this.map.rectHeight/4)
                this.currentImage = this.pacmanUp
                break
            case "a":
                this.velocityX = -(this.map.rectWidth/4) 
                this.velocityY = 0 
                this.currentImage = this.pacmanLeft
                break
            case "s":
                this.velocityX = 0
                this.velocityY = (this.map.rectHeight/4)
                this.currentImage = this.pacmanDown
                break
            case "d":
                this.velocityX = (this.map.rectWidth/4) 
                this.velocityY = 0 
                this.currentImage = this.pacmanRight
                break
        }
    }
    eat() {
        let position = this.getCurrentTile()

        if (this.map.grid[position[0]][position[1]] == 2) {
            return true

        }
    }
    collideWithMap() {
            for (let y = 0; y < this.map.grid.length; y++) {
                for (let x = 0; x < this.map.grid[y].length; x++) {
                    if (this.map.grid[y][x] == 1) {
                        let rectY = y*this.map.rectHeight;
                        let rectX = x*this.map.rectWidth;
                        if (this.positionX+this.width > rectX && this.positionX <= rectX+this.map.rectWidth && this.positionY+this.height > rectY && this.positionY <= rectY+this.map.rectHeight) {
                            return true
                        }
                    }
                }
            }
            return false
        }
        getCurrentTile() {
            let tileY = Math.floor((this.positionY+(this.height/2)) / this.map.rectHeight)
            let tileX = Math.floor((this.positionX+(this.width/2)) / this.map.rectWidth)
            if (tileY < 0 || tileY >= this.map.grid.length) {
                return [0, 0]
            }
            if (tileX < 0 || tileX >= this.map.grid[tileY].length) {
                return [0, 0]
            }
            return [tileY, tileX]
        }

        snapTo(y, x) {
            this.positionY = (y*this.map.rectHeight) + 1 
            this.positionX = (x*this.map.rectWidth) + 1 
        }

        checkValidMove(y, x) {
            if (y >= this.map.grid.length || y < 0) {
                return false
            }
            if (x >= this.map.grid[y].length || x < 0) {
                return false
            }
            if (this.map.grid[y][x] == 0 || this.map.grid[y][x] == 2) {
                return true
            }
            return false

        }
}