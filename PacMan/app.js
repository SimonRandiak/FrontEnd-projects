const canvas = document.querySelector("canvas")

let map = new Map(canvas, 480, 480)
let pacman = new PacMan(map, 24, 23)
map.drawMap()

function loop() {
    map.drawMap()
    pacman.update()
    if (pacman.eat()) {
        pos = pacman.getCurrentTile()
        map.updateGrid(pos[0], pos[1], 0)
    }
    setTimeout(loop, 1000/20);
}

loop()