const canvas = document.querySelector("canvas")

let map = new Map(canvas, 480, 480)
let pacman = new PacMan(map, 24, 23)
map.drawMap()

function loop() {
    map.drawMap()
    pacman.update()
    pacman.draw()
    setTimeout(loop, 20);
}

loop()