// 
// Variables for Starting Page/ initial page
var startingPageEl = document.querySelector("#startingPage");
var startButton = document.querySelector(".startButton");
var countDownTime = 20;
var questionCounter = 0;
var userPointsScored = 0;
var individualScoreList = [];

// 
// Variables for Summary Page
var summaryPageEl = document.querySelector("#summaryPage");
var initialForm = document.querySelector("#initialForm");
var userInitialInput = document.querySelector("#initialsText");
var userScoreDisplay = document.querySelector(".scorePointsDisplay");

// 
// Variables for Question Deck
var cardDeckEl = document.querySelector("#cardDeck");
var timeRemaining = document.querySelector(".timeLeft");
var currentQuestionText = document.querySelector(".currentQuestion");
var answerButtons = document.querySelectorAll(".list-group-item-action");
var currentQuestion = questionArray[questionCounter];
var questionArray = [
    {
        question: 'What color is the sky?', 
        correctAnswer: 'blue',
        answers: ['red','blue', 'green', 'purple']
    },
    {
        question: 'Where do fish live?',
        correctAnswer: 'water',
        answers: ['land', 'sky', 'water','space']
    },
    {
        question: 'What connects all trees?',
        correctAnswer: 'mycelium',
        answers: ['mycelium','roots','water','air']
    }

];

// 
// Calls init() so that it fires when page opened
init();

// Attach event listener to start button to call the sendToCardDeck Section on click
startButton.addEventListener("click", sendToCardDeck);

for( var i=0; i< answerButtons.length; i++){
    var button= answerButtons[i];
    button.addEventListener("click",submitAnswer);
}

function init() {
    sendToStartingPage();
    
    var storedScores= JSON.parse(localStorage.getItem("individualScoreList"));
        // If individualScoreList were retrieved from localStorage, update the individualScoreList to it
    if (storedScores !== null) {
        individualScoreList = storedScores;
    }
        // This is a helper function that will render List to the DOM
    renderPreviousScoreList();
}

function sendToStartingPage(){
    
}

// 
// Functions Relating to the Card Deck
// 
function sendToCardDeck(){
    startingPageEl.setAttribute("class", "hide");
    cardDeckEl.removeAttribute("class");
    setTime();
    getQuestion();
}

// Replaced text in the question and the choices section of the page
function getQuestion(){
    currentQuestion = questionArray[questionCounter];
    currentQuestionText.textContent= currentQuestion.question;
    console.log("I want to see the questionCounter: " + questionCounter);

    for( var i=0; i< currentQuestion.answers.length; i++){
        var button= answerButtons[i];
        var answer = currentQuestion.answers[i];
        button.textContent= answer;
    }
}

// evaluates the user's choice and performs events accordingly
function submitAnswer(event) {
    questionCounter++;
    let decrement=2;
    var userPick = event.target.textContent.trim();
    console.log("this is the user's pick: " + userPick);
        if(userPick===currentQuestion.correctAnswer){
        userPointsScored++;
        console.log("Has the user's point score changed: "+ userPointsScored)
        }
        else{
            countDownTime-=decrement;
        }
        if(questionCounter>2){
            sendToSummary();
            console.log("User reached end of question deck");
        }
        else{
            getQuestion(); 
        }
}

function sendToSummary() {
    cardDeckEl.setAttribute("class", "hide");
    summaryPageEl.removeAttribute("class");
    userScoreDisplay.textContent = userPointsScored;
}

// 
// Score Card Section Functions
// 
function storingScores() {
    // Stringify and set key in localStorage to individualScoreList array
    localStorage.setItem("individualScoreList", JSON.stringify(individualScoreList));
}

function renderPreviousScoreList(){
    var highScoreList = document.querySelector("#highScoreList");
    highScoreList.textContent = " ";

     // Render a new li for each todo
     for (var i = 0; i < individualScoreList.length; i++) {
        var name= individualScoreList[i];
    
        var li = document.createElement("li");
        li.textContent = name;
        li.setAttribute("data-index", i);
    
        highScoreList.appendChild(li);
      }
}

// Add submit event to Initials form
initialForm.addEventListener("submit", function(event) {
    event.preventDefault();
  
    var textForInitialsList = userInitialInput.value.trim();
  
    // Return from function early if submitted textForInitialsList is blank
    if (textForInitialsList === "") {
      return;
    }
  
    // Add new textForInitialsList and score to score board list array, clear the input
    individualScoreList.push(textForInitialsList);
    userInitialInput.value = " ";
  
    // Store updated scores in localStorage, re-render the list
    storingScores();
    renderPreviousScoreList();
});


// 
// Timer Function
// 
function setTime() {
    var timerInterval = setInterval(function(){
        countDownTime--;
        timeRemaining.textContent = "Time Remaining:"+ countDownTime;
        
        if(countDownTime<0){
            clearInterval(timerInterval);
            sendToSummary();
            console.log("User has run out of time.")
        }
    },1000);
}