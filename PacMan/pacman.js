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

        this.direction = ""
        this.previousDirection = ""

        this.previousImage = this.currentImage

        document.addEventListener("keydown", this.updateDirection.bind(this))
    }

    update() {
        this.updateVelocity()

        this.positionX += this.velocityX
        this.positionY += this.velocityY
        if (this.collideWithMap()) {
            this.positionX -= this.velocityX
            this.positionY -= this.velocityY
            this.direction = this.previousDirection
            this.updateVelocity()
        }
        this.previousDirection = this.direction
        this.map.ctx.drawImage(this.currentImage, this.positionX, this.positionY, this.width, this.height)
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
        switch (this.direction) {
            case "w":
                this.velocityX = 0
                this.velocityY = -(this.map.rectHeight/4)
                break
            case "a":
                this.velocityX = -(this.map.rectWidth/4) 
                this.velocityY = 0 
                break
            case "s":
                this.velocityX = 0
                this.velocityY = (this.map.rectHeight/4)
                break
            case "d":
                this.velocityX = (this.map.rectWidth/4) 
                this.velocityY = 0 
                break
        }
    }

    collideWithMap() {
            for (let y = 0; y < this.map.map.length; y++) {
                for (let x = 0; x < this.map.map[y].length; x++) {
                    if (this.map.map[y][x] == 1) {
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
            if (tileY < 0 || tileY >= this.map.map.length) {
                return [0, 0]
            }
            if (tileX < 0 || tileX >= this.map.map[tileY].length) {
                return [0, 0]
            }
            return [tileY, tileX]
        }

        snapTo(y, x) {
            this.positionY = (y*this.map.rectHeight) + 1 
            this.positionX = (x*this.map.rectWidth) + 1 
        }

        checkValidMove(y, x) {
            if (y >= this.map.map.length || y < 0) {
                return false
            }
            if (x >= this.map.map[y].length || x < 0) {
                return false
            }
            if (this.map.map[y][x] == 0 || this.map.map[y][x] == 2) {
                return true
            }
            return false

        }
}