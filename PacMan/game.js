class Game {
    constructor() {

        this.canvas = document.querySelector("canvas")
        this.scoreBorad = document.querySelector("#score")

        this.map = new Map(this.canvas, 480, 480)
        this.pacman = null
        this.pinky = null
        this.inky = null
    }

    init() {
        for (let y = 0; y < this.map.grid.length; y++) {
            for (let x = 0; x < this.map.grid[y].length; x++) {
                if (this.map.grid[y][x] == 3) {
                    continue;
                }
                if (this.map.grid[y][x] == 4) {
                    continue;
                }
                if (this.map.grid[y][x] == 5) {
                    let c = this.map.getCoordinates(y, x)
                    this.inky = new Inky(this.map, c[0]+1, c[1]+1)
                }
                if (this.map.grid[y][x] == 6) {
                    let c = this.map.getCoordinates(y, x)
                    this.pinky = new Pinky(this.map, c[0]+1, c[1]+1)
                }
                if (this.map.grid[y][x] == 7) {
                    let c = this.map.getCoordinates(y, x)
                    this.pacman = new PacMan(this.map, c[0]+1, c[1]+1)
                }
            }
        }
        //this.pinky.findPathToNode(4, 5)
        this.loop()
    }

    loop() {
        this.map.drawMap()
        this.pacman.update()
        this.pinky.update()
        this.inky.update()
        if (this.pacman.eat()) {
            let c = this.pacman.getCurrentTile()
            this.map.updateGrid(c[0], c[1], 0)
            let score = this.pacman.currentScore()
            this.scoreBorad.innerHTML = "Score: " + score
        }
        setTimeout(this.loop.bind(this), 1000/20)
    }
}