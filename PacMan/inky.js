class Inky {
    constructor (map, y, x) {
        this.map = map

        this.currentImage = new Image()
        this.currentImage.src = "assets/inky.png"

        this.positionX = x 
        this.positionY = y 

        this.velocityX = 0
        this.velocityY = 0

        this.width = this.map.rectWidth - 3 
        this.height = this.map.rectHeight - 3

        this.score = 0

        this.direction = ""
        this.previousDirection = ""

        this.previousImage = this.currentImage
    }
    update() {
        this.map.ctx.drawImage(this.currentImage, this.positionX, this.positionY, this.width, this.height)
    }

    findPathToNode(_y,_x) {
        let visited = new Set()
        let table = this.createNodes(this.map.grid)
        console.log(table)
        visited.add([_y, _x])

        for (let y = 0; y < this.map.grid.length; y++) {
            for (let x = 0; x < this.map.grid[y].length; x++) {
                continue;
            }
        }

   }
    getValidNodes(currentY, currentX) {
        let valids = []
        for (let y = -1; y < 2; y++) {
            for (let x = -1; x < 2; x++) {
                if ((currentY+y) >= this.map.grid.length || (currentY+y) < 0) {
                    continue
                }
                if ((currentX+x) >= this.map.grid[currentY].length || (currentX+x) < 0) {
                    continue
                }
                if ((currentX+x) == currentX && (currentY+y) == currentY) {
                    continue
                }
                if (this.map.grid[currentY+y][currentX+x] == 2)
                {
                    continue;
                }
                valids.push([currentY+y, currentX+x])
            }
        }
        return valids
    }

    createNodes() {
        let n = new Map()
        for (let y = 0; y < this.map.grid.length; y++) {
            for (let x = 0; x < this.map.grid[y].length; x++) {
                if (this.map.grid[y][x] != 2) {
                    n.set([y, x], 999)
                }
            }
        }
        return n
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
}