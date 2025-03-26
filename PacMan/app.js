const canvas = document.querySelector("canvas")

let map = new Map(canvas, 480, 480)
let pacman = new PacMan(map, 0, 0)
map.drawMap()

function loop() {
    map.drawMap()
    pacman.draw()
    setTimeout(loop, 200);
}

loop()