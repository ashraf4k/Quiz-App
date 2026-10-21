
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startBtn = document.getElementById("start-btn");
const questionText = document.getElementById("question-text")
const answersContainer = document.getElementById("answers-container")
const currentQuestionSpan = document.getElementById("current-question")
const totalQuestionsSpan = document.getElementById("total-questions")
const scoreSpan = document.getElementById("score")
const finalScoreSpan = document.getElementById("final-score")
const maxScoreSpan = document.getElementById("maximum-score")
const resultMessage = document.getElementById("result-message")
const restartButton = document.getElementById("restart-btn")
const progressBar = document.getElementById("progress")
const timeSpan = document.getElementById("time-span")
const timeLeftSpan = document.getElementById("time-left");

const quizQuestions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyper Text Markup Language", correct: true },
            { text: "High Tech Modern Language", correct: false },
            { text: "Hyper Transfer Markup Language", correct: false },
            { text: "Home Tool Markup Language", correct: false }
        ]
    },
    {
        question: "Which language is used to style web pages?",
        answers: [
            { text: "HTML", correct: false },
            { text: "CSS", correct: true },
            { text: "JavaScript", correct: false },
            { text: "Python", correct: false }
        ]
    },
    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        answers: [
            { text: "define", correct: false },
            { text: "variable", correct: false },
            { text: "let", correct: true },
            { text: "int", correct: false }
        ]
    },
    {
        question: "Which method is used to select an element by its ID in JavaScript?",
        answers: [
            { text: "document.querySelectorAll()", correct: false },
            { text: "document.getElementById()", correct: true },
            { text: "document.getElementsByClass()", correct: false },
            { text: "document.selectById()", correct: false }
        ]
    },
    {
        question: "Which HTML tag is used to link an external JavaScript file?",
        answers: [
            { text: "<css>", correct: false },
            { text: "<javascript>", correct: false },
            { text: "<script>", correct: true },
            { text: "<link>", correct: false }
        ]
    }
];

let timeLeft = 15;
let timerInterval;

let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

startBtn.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz () {
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = 0;

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");
    
    showQuestion();
}

function startTimer() {
    clearInterval(timerInterval);

    timeLeft = 15;
    timeLeftSpan.textContent = timeLeft;

    timerInterval = setInterval(()=>{
        timeLeft--;
        timeLeftSpan.textContent = timeLeft;

        if(timeLeft <= 5){
            timeLeftSpan.style.color = "red";
        }
        if(timeLeft <= 0){
            stopTimer();
            handleTimeOut();
        }
    }, 1000);
    timeLeftSpan.style.color = "black";
}

function stopTimer() {
    clearInterval(timerInterval);
}

function showQuestion(){

    answersDisabled= false;
    
    const currentQuestion = quizQuestions[currentQuestionIndex];

    currentQuestionSpan.textContent = currentQuestionIndex + 1;

    const progressPresent = (currentQuestionIndex / quizQuestions.length) * 100;
    progressBar.style.width = progressPresent + "%";

    questionText.textContent = currentQuestion.question;
    
    answersContainer.innerHTML = "";
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn")

        button.dataset.correct = answer.correct;

        button.addEventListener("click", selectAnswer);
        

        answersContainer.appendChild(button);
    })
    startTimer();
}

function handleTimeOut() {
    if (answersDisabled) return;

    answersDisabled = true;

    Array.from(answersContainer.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
    });

    setTimeout(goToNextQuestion, 1000);
}



function selectAnswer(event) {
    if (answersDisabled) return
    stopTimer();

    answersDisabled = true;
    const selectedButton = event.target;
    const isCorrct = selectedButton.dataset.correct === "true";

    Array.from(answersContainer.children).forEach(button => {
    if (button.dataset.correct === "true") {
        button.classList.add("correct");
    } else if (button === selectedButton) {
        button.classList.add("incorrect");
    }
});
if (isCorrct){
        score++;
        scoreSpan.textContent = score;
    }
    setTimeout(goToNextQuestion, 1000);
}

function goToNextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {
        showQuestion();
    } else {
        showResults();
    }
}


function showResults(){
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScoreSpan.textContent = score;
    const presentage = (score/quizQuestions.length) * 100;
    if(presentage === 100){
        resultMessage.textContent = "Perfect You're a genius!";
    } else if (presentage >= 80) {
        resultMessage.textContent = "great job, you know your stuff!";
    } else if (presentage >= 60) {
        resultMessage.textContent = "Good effort, keep learning!";
    } else if (presentage >= 40) {
        resultMessage.textContent = "Not bad, Try again to improve!";
    } else {
        resultMessage.textContent = "Keep studying You'll get better!";
    }
}

function restartQuiz(){
    resultScreen.classList.remove("active");
    
    startQuiz();

}

