const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
const resetBtn = document.querySelector("#ResetBtn")
const startBtn = document.querySelector("#StartBtn")
const editBtn = document.querySelector("#EditBtn")
const popupDiv = document.querySelector("#popup")

const rows = 30 
const columns = 30 


const cellWidth = canvas.width / rows
const cellHeight = canvas.height / columns

let grid = createGrid(rows, columns)
let running = false 
let editing = false 

popupDiv.addEventListener("click", () => {
    console.log("Clicked")
    popupDiv.classList.add("hidden")
})

startBtn.addEventListener("click", () => {
    running = !running;
    if (running === true) {
        startBtn.innerHTML = '<i class="fa-solid fa-pause"></i>Stop'
    } else {
        startBtn.innerHTML = '<i class="fa-solid fa-play"></i>Start'
    }
})

resetBtn.addEventListener("click", () => {
    reset()
})

editBtn.addEventListener("click", () => {
    editing = !editing
    if (editing === true) {
        editBtn.innerHTML = '<i class="fa-solid fa-pause"></i>Stop Editing'
    } else {
        editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>Edit'
    }
})

drawGrid()
gameLoop()

function createGrid(rows, columns) {
    let g = new Array(rows)
    for (let i = 0; i < g.length; i++) {
        g[i] = new Array(columns).fill(0)
    }
    return g
}

function reset() {
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            grid[y][x] = 0
        }
    }
}

function drawGrid() {
    ctx.moveTo(0, 0)
    ctx.fillStyle = "green"
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] === 1) {
                ctx.fillRect(x*cellWidth, y*cellHeight, cellWidth, cellHeight)
            }
        }
    }
}

function getAliveCells(row, column)
{
    let alive = 0
    for (let c = column-1; c < column+2; c++) {
        for (let r = row-1; r < row+2; r++) {
            if (c === columns || r === rows) {
                continue
            }

            if (c === column && r === row) {
                continue
            }
            if (r < 0 || r >= rows) {
                continue
            }
            if (c < 0 || c >= columns) {
                continue
            }
            if (grid[c][r] === 1) {
                alive += 1
            }
        }
    }
    return alive
}
function newState() {
    n = createGrid(rows, columns)

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            alive = getAliveCells(x, y)
            if (grid[y][x] === 1) {
                if (alive > 3 || alive < 2) {
                    n[y][x] = 0
                } else {
                    n[y][x] = 1
                }
            } else {
                if (alive === 3) {
                    n[y][x] = 1
                } else {
                    n[y][x] = 0
                }
            }
        }
    }
    grid = n
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    if (running === true) {
        newState()
    }
    drawGrid()
    setTimeout(gameLoop, 100);
}

canvas.addEventListener("click", addCell)

function addCell(event) {
    if (editing === false) {
        return
    }
    let rect = canvas.getBoundingClientRect()
    let scaleX = canvas.width / canvas.getBoundingClientRect().width;
    let scaleY = canvas.height / canvas.getBoundingClientRect().height;
    
    let x = (event.clientX - rect.left) * scaleX;
    let y = (event.clientY - rect.top) * scaleY;
    grid_x = Math.floor(x/cellWidth)
    grid_y = Math.floor(y/cellHeight)
    if (grid[grid_y][grid_x] === 1)
        grid[grid_y][grid_x] = 0
    else {
        grid[grid_y][grid_x] = 1
    }
     
    drawGrid()
}