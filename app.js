const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
const cardsLength = 12;
let choice1;
let choice2;


//Create & Fill the board with cards
createCards();
function createCards() {
    let divCounter = [];
    for (var i = 0; i < cardsLength; i++) {
        divCounter[i] = 0;
        var card = document.createElement('div');
        card.classList.add('cards');
        document.getElementById('gameBoard').appendChild(card);
    }
    for (var j = 0; j < 2; j++) {
        for (var i = 0; i < colors.length; i++) {
            var divNum = Math.floor(Math.random() * cardsLength);
            while (divCounter[divNum] === 1) {
                var divNum = Math.floor(Math.random() * cardsLength);
            }
            divCounter[divNum] = 1;
            var card = document.getElementsByClassName('cards')[divNum];
            card.style.backgroundColor = colors[i];
            card.classList.add('hidden');
            card.onclick = showCard;
        }
    }
}


//Reveal the card
function showCard(e) {
    e.target.classList.remove('hidden');
    checkIfMatch(e);
}


// Check if this was the first choice or the second. In the second situation check if choices match.
function checkIfMatch(e) {
    if (choice1 === undefined) {
        choice1 = e.target;
    } else if (choice1 !== e.target) {
        choice2 = e.target;
        blockOnclick();
        if (choice1.style.backgroundColor === choice2.style.backgroundColor) {
            setTimeout(function () {
                choice1.classList.add('success');
                choice1 = undefined;
            }, 1000);
            setTimeout(function () {
                choice2.classList.add('success');
                choice2 = undefined;
                allowOnclick();
            }, 1000);
        } else {
            setTimeout(function () {
                choice1.classList.add('hidden');
                choice1 = undefined;
            }, 1000);
            setTimeout(function () {
                choice2.classList.add('hidden');
                choice2 = undefined;
                allowOnclick();
            }, 1000);
        }
    }
    setTimeout(endGame, 1000);
}

//block onclick after two choices
function blockOnclick() {
    for (var i = 0; i < cardsLength; i++) {
        document.getElementsByClassName('cards')[i].setAttribute('onclick', function () { return false });
    }
}

//Allow onclick events after the results
function allowOnclick() {
    for (var i = 0; i < cardsLength; i++) {
        document.getElementsByClassName('cards')[i].onclick = showCard;
    }
}

//Check and alert if needed - end of the game
function endGame() {
    var success = document.getElementsByClassName('success');
    if (success.length === 12) {
        document.getElementById('endOfGame').style.visibility = 'visible';
    }
}