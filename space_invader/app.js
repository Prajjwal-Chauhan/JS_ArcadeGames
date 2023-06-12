// document.addEventListener('DOMContentLoaded',()=>{
const grid = document.querySelector('.grid')
let currentShooterIndex = 315
let width = 30
let direction = 1
let invaderId
let goingRight = true
const resultDisplay= document.querySelector('#result')
const aliensRemoved = []
let score = 0

for (let i = 0; i < 360; i++) {
    const square = document.createElement('div')
    grid.appendChild(square)
}

const squares = Array.from(document.querySelectorAll('.grid div'))

const alienInvaders = [
    0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20,
    31, 33, 35, 37, 39, 41, 43, 45, 47, 49,
    60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80
]

function drawInvader() {
    for (let i = 0; i < alienInvaders.length; i++) {
        if(!aliensRemoved.includes(i)){

            squares[alienInvaders[i]].classList.add('invader')
        }
        if(alienInvaders[i] >= 360){
            alert('Game Over !!!')
            clearInterval(invaderId)
            break;
        }
    }
}
// drawInvader()


function removeInvader() {
    for (let i = 0; i < alienInvaders.length; i++) {
        squares[alienInvaders[i]].classList.remove('invader')
    }
}

squares[currentShooterIndex].classList.add('shooter')

function moveShooter(e) {
    squares[currentShooterIndex].classList.remove('shooter')
    switch (e.key) {
        case 'ArrowLeft':
            if (currentShooterIndex % width != 0) currentShooterIndex -= 1
            break;

        case 'ArrowRight':
            if (currentShooterIndex % width != width - 1) currentShooterIndex += 1
            break;

            default:
                break;
            }
            squares[currentShooterIndex].classList.add('shooter')

}

document.addEventListener('keydown',moveShooter) 

function moveInvaders() {
    const LeftEdge = alienInvaders[0] % width === 0
    const RightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1 
    removeInvader()
    if (RightEdge && goingRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += width
            // if(alienInvaders[i] >= 360){
            //         alert('Game Over !!!')
            //         clearInterval(invaderId)
            //         break;
            //     }

            direction = -1;
            goingRight = false;
            // alienInvaders[i] += direction
        }
        
    }
    if (LeftEdge && !goingRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += width
            // if(alienInvaders[i] >= 360){
            //     alert('Game Over !!!')
            //     clearInterval(invaderId)
            //     break;
            // }
            direction = 1;
            goingRight = true;
            // alienInvaders[i] += direction
        }
    }
        
    // }
    
    for (let i = 0; i < alienInvaders.length; i++) {
        // alienInvaders[i] += width+1
        // direction = -1;
        alienInvaders[i] += direction
    }
    drawInvader()
    
    if(squares[currentShooterIndex].classList.contains('invader','shooter')) {
            alert('Game Over !!!')
            clearInterval(invaderId)
        }
    
    // for (let i = 0; i < alienInvaders.length; i++) {
    //     if(alienInvaders[i].classList.contains('invader','taken')) {
    //         alert('Game Over !!!')
    //         clearInterval(invaderId)
    //     }
    // }
    
    if(alienInvaders.length == aliensRemoved.length) {
        alert('Game won !!!')
        clearInterval(invaderId)
    }
}

invaderId = setInterval(moveInvaders,150)

function shoot(e) {
    let laserId
    let currentLaserIndex = currentShooterIndex
    
    function moveLaser(e) {
        squares[currentLaserIndex].classList.remove('laser')
        currentLaserIndex -= width
        squares[currentLaserIndex].classList.add('laser')
        
        if(squares[currentLaserIndex].classList.contains('invader')){
            squares[currentLaserIndex].classList.remove('laser')
            squares[currentLaserIndex].classList.remove('invader')
            squares[currentLaserIndex].classList.add('boom')
            // drawInvader()
            
            setTimeout(() => squares[currentLaserIndex].classList.remove('boom'),150)
            clearInterval(laserId)
            
            aliensRemoved.push(alienInvaders.indexOf(currentLaserIndex))
            score++;
            resultDisplay.innerHTML = score
        }
        
    }

    if (e.altKey) {
        laserId = setInterval(moveLaser,20)
    }
}

document.addEventListener('keydown',shoot)

// })