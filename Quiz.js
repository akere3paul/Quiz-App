// --------- Here I set the questions --------//

const questions =[
    {
        questions: "which is the largest animal in the world",
        answer:[
            {text: "A. Shark", correct: false},
            {text: "B. Blue whale", correct: true},
            {text: "C. Elephant", correct: false},
            {text: "D. Giraffe", correct: false},

        ]
    },
    {
        questions: "which is the smallest continent in the world",
        answer:[
            {text: "A. Africa", correct: false},
            {text: "B. Asia", correct: false},
            {text: "C. Europe", correct: false},
            {text: "D. Australia", correct: true},

        ]
    },
    {
        questions: "which year did Nigeria got independence",
        answer:[
            {text: "A. 1960", correct: true},
            {text: "B. 1962", correct: false},
            {text: "C. 1918", correct: false},
            {text: "D. 1860", correct: false},

        ]
    },
    {
        questions: "which is the capital of Egypt",
        answer:[
            {text: "A. Abuja", correct: false},
            {text: "B. Adis Ababa", correct: false},
            {text: "C. Accra", correct: false},
            {text: "D. Cairo", correct: true},

        ]
    },
    {
        questions: "which of these is not a type of website",
        answer:[
            {text: "A. E-Commerce", correct: false},
            {text: "B. Blogs", correct: false},
            {text: "C. Amazon website", correct: true},
            {text: "D. Portfolio websites", correct: false},

        ]
    }
];

// -------------- 
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score =0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex +1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.questions;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn = e.target;
    const iscorrect = selectedBtn.dataset.correct === "true";
    if(iscorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();