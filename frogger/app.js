const timeDisplay = document.querySelector('#time-left')
const resultDisplay = document.querySelector('#result')
const startPauseButton = document.querySelector('#start-pause-button')
// const restartButton = document.querySelector('#restart-button')
const squares = document.querySelectorAll('.grid div')
const logsLeft = document.querySelectorAll('.log-left')
const logsRight = document.querySelectorAll('.log-right')
const carsLeft = document.querySelectorAll('.car-left')
const carsRight = document.querySelectorAll('.car-right')
let timerid
let outcometimerid

let currIndex = 76
let currTime = 20
const width = 9

function movefrog(e) {
    // console.log('clicked')

    squares[currIndex].classList.remove('frog')
    switch (e.key) {
        case 'ArrowLeft':
                if(currIndex % width != 0) currIndex -= 1
            break;
            case 'ArrowRight':
                if(currIndex % width != width-1) currIndex += 1
            break;
            case 'ArrowUp':
                if(currIndex - width > 0) currIndex -= width
            break;
            case 'ArrowDown':
                if(currIndex + width < width*width) currIndex += width
            break;

        default:
            break;
    }

    squares[currIndex].classList.add('frog')
}

// document.addEventListener('keyup', movefrog)

function automoveElements() {
    currTime--
    timeDisplay.textContent = currTime
    logsLeft.forEach(logLeft => movelogLeft(logLeft));
    logsRight.forEach(logRight => movelogRight(logRight));
    carsLeft.forEach(carLeft => movecarLeft(carLeft));
    carsRight.forEach(carRight => movecarRight(carRight));
}

function outcome(){
    lose()
    win()
}

function movelogLeft(logLeft) {
    switch (true) {
        case logLeft.classList.contains('l1'):
            logLeft.classList.remove('l1')
            logLeft.classList.add('l2')
            break;

        case logLeft.classList.contains('l2'):
            logLeft.classList.remove('l2')
            logLeft.classList.add('l3')
            break;

        case logLeft.classList.contains('l3'):
            logLeft.classList.remove('l3')
            logLeft.classList.add('l4')
            break;

        case logLeft.classList.contains('l4'):
            logLeft.classList.remove('l4')
            logLeft.classList.add('l5')
            break;

        case logLeft.classList.contains('l5'):
            logLeft.classList.remove('l5')
            logLeft.classList.add('l1')
            break;
    
        default:
            break;
    }
}

function movelogRight(logRight) {
    switch (true) {
        case logRight.classList.contains('l1'):
            logRight.classList.remove('l1')
            logRight.classList.add('l5')
            break;

        case logRight.classList.contains('l2'):
            logRight.classList.remove('l2')
            logRight.classList.add('l1')
            break;

        case logRight.classList.contains('l3'):
            logRight.classList.remove('l3')
            logRight.classList.add('l2')
            break;

        case logRight.classList.contains('l4'):
            logRight.classList.remove('l4')
            logRight.classList.add('l3')
            break;

        case logRight.classList.contains('l5'):
            logRight.classList.remove('l5')
            logRight.classList.add('l4')
            break;
    
        default:
            break;
    }
}

function movecarLeft(carLeft) {
    switch (true) {
        case carLeft.classList.contains('c1'):
            carLeft.classList.remove('c1')
            carLeft.classList.add('c2')
            break;

        case carLeft.classList.contains('c2'):
            carLeft.classList.remove('c2')
            carLeft.classList.add('c3')
            break;

        case carLeft.classList.contains('c3'):
            carLeft.classList.remove('c3')
            carLeft.classList.add('c1')
            break;
    
        default:
            break;
    }
}

function movecarRight(carRight) {
    switch (true) {
        case carRight.classList.contains('c1'):
            carRight.classList.remove('c1')
            carRight.classList.add('c3')
            break;

        case carRight.classList.contains('c3'):
            carRight.classList.remove('c3')
            carRight.classList.add('c2')
            break;

        case carRight.classList.contains('c2'):
            carRight.classList.remove('c2')
            carRight.classList.add('c1')
            break;
    
        default:
            break;
    }
}

function lose() {
    if(
        squares[currIndex].classList.contains('c1') || 
        squares[currIndex].classList.contains('l4') || 
        squares[currIndex].classList.contains('l5') ||
        currTime == 0
        ){
            resultDisplay.textContent = 'You lose !'
            clearInterval(timerid)
            clearInterval(outcometimerid)
            squares[currIndex].classList.remove('frog')
            document.removeEventListener('keyup',movefrog)
        }
    }
    
    function win(){
        if(squares[currIndex].classList.contains('ending-block')){
            resultDisplay.textContent = 'You win !'
            clearInterval(timerid)
            clearInterval(outcometimerid)
        squares[currIndex].classList.remove('frog')
        document.removeEventListener('keyup',movefrog)
    }
}

startPauseButton.addEventListener('click', () => {
    if(timerid){
        clearInterval(timerid)
        clearInterval(outcometimerid)
        timerid = null
        outcometimerid = null
        document.removeEventListener('keyup',movefrog)
    }

    else{
        timerid = setInterval(automoveElements,1000)
        outcometimerid = setInterval(outcome,50)
        document.addEventListener('keyup', movefrog)
    }
})



