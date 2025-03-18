const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
let grid = createGrid(rows, columns)

const width = canvas.width
const height = canvas.height

const rows = 50
const columns = 50

const rowsSize = width/rows
const columnsSize = height/rows

function createGrid(rows, columns) {
    let grid = new Array(rows)
    for (let i = 0; i < grid.length; i++) {
        grid[i] = new Array(columns)
    }
    return grid
}