/*
 * Create a list that holds all of your cards
 */
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
//array of the shapes that will be appered to the cards
let crdsObject = ['diamond', 'diamond', 'paper-plane-o', 'paper-plane-o', 'anchor', 'anchor', 'bolt', 'bolt', 'cube', 'cube', 'leaf', 'leaf', 'bicycle', 'bicycle', 'bomb', 'bomb'],
    $deck = $('.deck'),
    Moves,
    rating = "3 stars";
var presentTime;
var timeArray;
var m;
var s;
var perviousOpen = [];
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


function onPageLoad() {
    let allCards = shuffle(crdsObject);
    winner = (allCards.length / 2);
    $deck.empty();

    for (var i = 0; i < allCards.length; i++) {
        $deck.append($('<li class="card"><i class="fa fa-' + allCards[i] + '"></i></li>'));
    }

    cardListener();
}

//call the onLoad function that add the cards to the game page
onPageLoad();




//add user interaction when user click on the card

function cardListener() {
    let totalMatches = 0;
    Moves = 0;
    let numOfMoves = 0;

    document.getElementById('moves').innerHTML = numOfMoves + ' Moves';
    console.log('moves' + numOfMoves);
    var cardClass = document.getElementsByClassName("card");
    console.log(event);
    for (var i = 0; i < cardClass.length; i++) {
        (function(index) {

            cardClass[index].addEventListener("click", function() {
                let $this = $(this);
                if ($this.hasClass('show') || $this.hasClass('match')) {
                    return true;
                }
                console.log("Clicked index: " + index);
                console.log(this.getElementsByTagName('i'));
                let card = $this.context.innerHTML;
                $this.addClass('open show');
                perviousOpen.push(card);

                if (perviousOpen.length > 1) {
                    if (card === perviousOpen[0]) {
                        $deck.find('.open').addClass('match');
                        setTimeout(function() {
                            $deck.find('.open').removeClass('open show nomatch')
                        }, 400);
                        totalMatches++;
                        console.log(totalMatches + 'totalMatches');
                        if (totalMatches === (crdsObject.length / 2)) {
                            console.log(timeArray[1]);
                            var remainingTime = 60 - timeArray[1];
                            console.log(remainingTime);
                            // Setting the session 
                            sessionStorage.rating = ' you have Complete the game in ' + remainingTime + ' seconds ,' + " Your Rating is " + rating;
                            window.location = "win.html?rating=" + encodeURIComponent(rating);

                        }
                    } else {
                        $deck.find('.open').addClass('nomatch');
                        setTimeout(function() {
                            $deck.find('.open').removeClass('open show nomatch')
                        }, 400);
                    }
                    perviousOpen = [];
                    numOfMoves++;
                    document.getElementById('moves').innerHTML = numOfMoves + ' Moves';

                    if (numOfMoves > 15) {
                        document.getElementById('star3').classList.remove('fa-star');
                        document.getElementById('star3').classList.add('fa-star-o');
                        rating = "2 stars";


                    } else if (numOfMoves > 20) {
                        document.getElementById('star2').classList.remove('fa-star');
                        document.getElementById('star2').classList.add('fa-star-o');
                        rating = "1 star";

                    } else if (numOfMoves > 30) {
                        document.getElementById('star1').classList.remove('fa-star');
                        document.getElementById('star1').classList.add('fa-star-o');
                        rating = "0 star";
                    }
                }


            })

        })(i);
    }

}



document.getElementById("restart").addEventListener("click", function() {
    clearTimeout;
    document.getElementById('timer').innerHTML =
        01 + ":" + 00;
    onPageLoad();
    resetRate();
});


document.getElementById('timer').innerHTML =
    01 + ":" + 00;
startTimer();

//this function to start the timer 
function startTimer() {
    presentTime = document.getElementById('timer').innerHTML;
    timeArray = presentTime.split(/[:]+/);
    m = timeArray[0];
    s = checkSecond((timeArray[1] - 1));
    if (s == 59) {
        m = m - 1
    }

    document.getElementById('timer').innerHTML =
        m + ":" + s;
    setTimeout(startTimer, 1000);
    if (s == 'Timeout') {
        alert("Timeout \n Click OK to Retry");
        location.reload();
    }

}

function checkSecond(sec) {
    if (sec == 0) {
        clearTimeout;
        return 'Timeout';

    }
    if (sec < 0) {
        sec = "59"
    };
    return sec;
}

function resetRate() {
    document.getElementById('star1').classList.remove('fa-star-o');
    document.getElementById('star1').classList.add('fa-star');
    document.getElementById('star2').classList.remove('fa-star-o');
    document.getElementById('star2').classList.add('fa-star');
    document.getElementById('star3').classList.remove('fa-star-o');
    document.getElementById('star3').classList.add('fa-star');
}