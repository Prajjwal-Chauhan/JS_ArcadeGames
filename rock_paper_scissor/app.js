let userChoice
let computerChoice
let result
const computerchoiceDisplay = document.getElementById('computer-choice')
const userchoiceDisplay = document.getElementById('your-choice')
const resultDisplay = document.getElementById('result')

const possibleChoices = document.querySelectorAll('button')

possibleChoices.forEach(possibleChoice => possibleChoice.addEventListener('click',(e) => {
    userChoice = e.target.id
    userchoiceDisplay.innerHTML = userChoice
    generatecomputerChoice()
    getResult()
}))

function generatecomputerChoice(){
    const rand = Math.floor(Math.random() * possibleChoices.length + 1)

    if(rand === 1){
        computerChoice = 'rock'
    }
    if(rand === 2){
        computerChoice = 'paper'
    }
    if(rand === 3){
        computerChoice = 'scissor'
    }

    computerchoiceDisplay.innerHTML = computerChoice
}

function getResult(){
    if(computerChoice === userChoice){
        result = 'DRAW'
    }
    if(computerChoice === 'rock' && userChoice === 'paper'){
        result = 'You win !'
    }
    if(computerChoice === 'rock' && userChoice === 'scissor'){
        result = 'You lose !'
    }
    if(computerChoice === 'paper' && userChoice === 'scissor'){
        result = 'You win !'
    }
    if(computerChoice === 'paper' && userChoice === 'rock'){
        result = 'You lose !'
    }
    if(computerChoice === 'scissor' && userChoice === 'rock'){
        result = 'You win !'
    }
    if(computerChoice === 'scissor' && userChoice === 'paper'){
        result = 'You lose !'
    }

    resultDisplay.innerHTML = result
}