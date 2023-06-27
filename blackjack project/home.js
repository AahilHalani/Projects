let first = 10
let second = 8
let sum = first + second

let hasblackjack = false
let isAlive = true
let message = ""

let messageEl = document.getElementById("message-el")
console.log(messageEl)

let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")

function startgame(){
    rendergame()
}

function rendergame(){
    cardsEl.textContent = "Cards: " + first + " " + second
    sumEl.textContent = "Sum: " + sum
    if(sum <= 20){
        message = "do you want to draw a new card?"
    } else if(sum === 21){
        message = "You got Blackjack!"
        hasblackjack = true
    } else{
        message = "You're out!"
        isAlive = false
    }
    messageEl.textContent = message

}

function newcard(){
    message = "New Card Drawn"
    messageEl.textContent = message

    new_card = 5
    sum += new_card

    rendergame()
}