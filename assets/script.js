var startingPageEl = document.querySelector("#startingPage");
var cardDeckEl = document.querySelector("#cardDeck");
var summaryPageEl = document.querySelector("#summaryPage");
setTime();

function setTime() {
    let countDownTime = 4;

    let timerInterval = setInterval(function(){
        countDownTime--;
        cardDeckEl.textContent = countDownTime + " Time Remaining";

        if(countDownTime===0){
            clearInterval(timerInterval);
            sendMessage();
        }
    },1000);
}

function sendMessage() {
    cardDeckEl.textContent= " ";

    summaryPageEl.textContent = "GameEnd"
}