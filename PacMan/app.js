const canvas = document.querySelector("canvas")

let map = new Map(canvas, 480, 480)
let pacman = new PacMan(map, 23, 23)
map.drawMap()

function loop() {
    map.drawMap()
    pacman.draw()
    pacman.update()
    setTimeout(loop, 100);
}

loop()