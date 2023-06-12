const cardArray = [
    {
        name : '1',
        img : 'images/1.png'
    },
    {
        name : '2',
        img : 'images/2.png'
    },
    {
        name : '3',
        img : 'images/3.png'
    },
    {
        name : '4',
        img : 'images/4.png'
    },
    {
        name : '5',
        img : 'images/5.png'
    },
    {
        name : '6',
        img : 'images/6.png'
    },
    {
        name : '1',
        img : 'images/1.png'
    },
    {
        name : '2',
        img : 'images/2.png'
    },
    {
        name : '3',
        img : 'images/3.png'
    },
    {
        name : '4',
        img : 'images/4.png'
    },
    {
        name : '5',
        img : 'images/5.png'
    },
    {
        name : '6',
        img : 'images/6.png'
    }
]

cardArray.sort(() => 0.5 - Math.random())

const gridDisplay = document.querySelector('#grid')
const resultDisplay = document.querySelector('#result')
const negativeDisplay = document.querySelector('#negative')

let cardChosen = []
let cardchosenIds = []
const cardsWon = []

let t = 0
let count = 0

function createBoard(){
    cardArray.forEach(i => {
        const card = document.createElement('img')
        card.setAttribute('src','images/blank.png')
        card.setAttribute('data-id',t)
        t++
        card.addEventListener('click',flip)
        gridDisplay.appendChild(card)
    });
}

createBoard()

function checkmatch(){
    const optionId1 = cardchosenIds[0]
    const optionId2 = cardchosenIds[1]
    const cards = document.querySelectorAll('#grid img')
    console.log('check for match !')
    console.log(cards)

    if(optionId1 == optionId2){
        cards[optionId1].setAttribute('src','images/blank.png')
        cards[optionId2].setAttribute('src','images/blank.png')
        alert('Chose the same card !')
        count++
        
    }

    if(cardChosen[0] == cardChosen[1] && optionId1 != optionId2){
        // alert('Match found !')
        cards[optionId1].setAttribute('src','images/white.png')
        cards[optionId2].setAttribute('src','images/white.png')
        cards[optionId1].removeEventListener('click',flip)
        cards[optionId2].removeEventListener('click',flip)
        cardsWon.push(cardChosen)
    }
    
    else{
        cards[optionId1].setAttribute('src','images/blank.png')
        cards[optionId2].setAttribute('src','images/blank.png')

    }

    resultDisplay.textContent = cardsWon.length
    negativeDisplay.textContent = count

    cardChosen = []
    cardchosenIds = []

    if(cardsWon.length == cardArray.length/2){
        resultDisplay.textContent = 'Congratulations, You found all !!'
    }

}

function flip(){
    // if(this.item === undefined) {return}
    const cardId = this.getAttribute('data-id')
    console.log(cardArray)
    cardChosen.push(cardArray[cardId].name)
    cardchosenIds.push(cardId)
    this.setAttribute('src' , cardArray[cardId].img)
    if(cardChosen.length === 2){
        setTimeout(checkmatch,500)
    }
    // console.log('clicked',cardId)
}
// console.log(gridDisplay)