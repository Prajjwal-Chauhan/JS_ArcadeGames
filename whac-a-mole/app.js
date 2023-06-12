const squares = document.querySelectorAll('.square') 
const mole = document.querySelector('.mole') 
const score = document.querySelector('#score') 
const timeLeft = document.querySelector('#time') 
const button_s = document.querySelector('#button_s') 
const button_r = document.querySelector('#button_r') 

// button.addEventListener('mouseup',button.removeEventListener('mousedown',movemole))

let hitMole
let result = 0
let timelap = null
let currTime = 10
let countDownTimerId

function randomSquare() {
    squares.forEach(square => {
        square.classList.remove('mole')
    });
    
    let randomSquare = squares[Math.floor(Math.random() * 9)]
    randomSquare.classList.add('mole')
    // console.log(randomSquare)
    
    hitmole = randomSquare.id
}


squares.forEach(square => {
    square.addEventListener('click', () => {
        if(square.id == hitmole){
            result++
            score.textContent = result
        }
    })
});

// randomSquare()

function moveMole(){
    timelap = setInterval(randomSquare,1000) 
}



function countDown() {
    currTime--
    timeLeft.textContent = currTime
    if(currTime == 0){
        clearInterval(countDownTimerId)
        clearInterval(timelap)
        alert('Game Over ! Your score is ' + result)
    }
    
}

button_r.addEventListener('click',() => {

    button_s.addEventListener('mousedown', () =>{
        moveMole()
        countDownTimerId = setInterval(countDown,1000)
    })
    
    if(button_s.clicked){
        
        button_s.removeEventListener('mousedown', () =>{
            moveMole()
            countDownTimerId = setInterval(countDown,1000)
        })
    }
})