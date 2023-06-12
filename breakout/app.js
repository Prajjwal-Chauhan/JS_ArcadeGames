const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score')
const gridactualHeight = 600
const gridactualWidth = 1500
const blockHeight = 20
const blockWidth = 100
const stackHeight = 300
const stackWidth = 1400
const ballDiameter = 20
const tc = 4
let timerId
let score = 0

class Block {
    constructor(x_Axis, y_Axis) {
        this.bottomLeft = [x_Axis, y_Axis]
        this.bottomRight = [x_Axis + blockWidth, y_Axis]
        this.topLeft = [x_Axis, y_Axis + blockHeight]
        this.topRight = [x_Axis + blockWidth, y_Axis + blockHeight]
    }
}

const blocks = []
const userStart = [700, 100]
const usercurrPosition = userStart
const ballStart = [740, 120]
// const ballStart = [140, 120]
const ballcurrPosition = ballStart

let x = 100
let y = 500
while (y > stackHeight) {
    while (x < stackWidth) {
        blocks.push(new Block(x, y))
        x += 150
    }
    y -= 50
    x = 100
}
console.log(blocks + " " + blocks.length)

function add_blocks() {


    for (let index = 0; index < blocks.length; index++) {

        const block = document.createElement('div')
        block.classList.add('block')
        block.style.left = blocks[index].bottomLeft[0] + 'px'
        block.style.bottom = blocks[index].bottomLeft[1] + 'px'
        grid.appendChild(block)

    }

}

add_blocks()

// add user
const user = document.createElement('div')
user.classList.add('user')
draw_user()
grid.appendChild(user)
// draw user
function draw_user(params) {
    user.style.left = usercurrPosition[0] + 'px'
    user.style.bottom = usercurrPosition[1] + 'px'
}

// add ball
const ball = document.createElement('ball')
ball.classList.add('ball')
draw_ball()
grid.appendChild(ball)
// draw ball
function draw_ball(params) {
    ball.style.left = ballcurrPosition[0] + 'px'
    ball.style.bottom = ballcurrPosition[1] + 'px'
}

// move user
function move_user(e) {
    switch (e.key) {
        case 'ArrowLeft':
            if (usercurrPosition[0] < 1) break;
            usercurrPosition[0] -= 20
            draw_user()
            break;

        case 'ArrowRight':
            if (usercurrPosition[0] > stackWidth - 10) break;
            usercurrPosition[0] += 20
            draw_user()
            break;

        default:
            break;
    }
}
document.addEventListener('keydown', move_user)

// move ball
let x_direction = -2
let y_direction = 2
function move_ball() {
    ballcurrPosition[0] += x_direction
    ballcurrPosition[1] += y_direction
    draw_ball()
    check_collisions()
}
timerId = setInterval(move_ball, 15)

// check collisions
function check_collisions() {

    if (blocks.length == 0) {
        score.Display.innerHTML = 'You Win !, total score : ' + score
        alert('Game complete !')
        clearInterval(timerId)
        document.removeEventListener('keydown', move_user)
        if (confirm('Do you want to restart the game ?')) {
            location.reload()
        }
        else console.log('Game Ended')
    }

    for (let i = 0; i < blocks.length; i++) {

        
        if (((ballcurrPosition[0] + ballDiameter) > blocks[i].bottomLeft[0] && ballcurrPosition[0] < blocks[i].bottomRight[0]) && ((ballcurrPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballcurrPosition[1] < blocks[i].topLeft[1])) {
            const allBlocks = Array.from(document.querySelectorAll('.block'))
            console.log(allBlocks)
            allBlocks[i].classList.remove('block')
            blocks.splice(i, 1)
            changeDirection_wall()
            score++
            scoreDisplay.innerHTML = score
        }

    }


    if (((ballcurrPosition[0] + ballDiameter) > usercurrPosition[0] && ballcurrPosition[0] < usercurrPosition[0] + blockWidth) && ((ballcurrPosition[1] + ballDiameter) > usercurrPosition[1] && ballcurrPosition[1] < usercurrPosition[1] + blockHeight)) {
        changeDirection_wall()
    }

    if (ballcurrPosition[1] > (gridactualHeight - ballDiameter)) {
        // y_direction = -2
        changeDirection_wall()
        // changeDirection()
    }
    if (ballcurrPosition[0] > (gridactualWidth - ballDiameter) || ballcurrPosition[0] <= 0) {
        // x_direction  = -2 
        changeDirection_wall()
    }

    if (ballcurrPosition[1] < 0) {
        scoreDisplay.textContent = 'You Lose !' + score
        clearInterval(timerId)
        document.removeEventListener('keydown', move_user)

    }
}

// change direction
function changeDirection_wall() {
    if (x_direction === 2 && y_direction === 2) {
        y_direction = -2
        return
    }

    if (x_direction === 2 && y_direction === -2) {
        x_direction = -2
        return
    }

    if (x_direction === -2 && y_direction === 2) {
        x_direction = 2
        return
    }

    if (x_direction === -2 && y_direction === -2) {
        y_direction = 2
        return
    }
}