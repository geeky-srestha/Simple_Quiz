console.log("JavaScript loaded!");
const questions = [
    {
        question:"Which planet is known as the Red Planet?",
        answers: [
            { text: "Venus", correct: false},
            { text: "Mars", correct: true},
            { text: "Jupiter", correct: false},
            { text: "Earth", correct: false},
        ]
    },
    {
        question:"What is the capital city of Japan?",
        answers: [
            { text: "Tokyo", correct: true},
            { text: "Osaka", correct: false},
            { text: "Hiroshima", correct: false},
            { text: "Kyoto", correct: false},
        ]
    },
    {
        question:"What is the square root of 144?",
        answers: [
            { text: "11", correct: false},
            { text: "12", correct: true},
            { text: "13", correct: false},
            { text: "10", correct: false},
        ]
    },
    {
        question:"Which continent is the Sahara Desert located in?",
        answers: [
            { text: "Asia", correct: false},
            { text: "Africa", correct: true},
            { text: "South America", correct: false},
            { text: "Australia", correct: false},

        ]
    },
    {
    question:"What is the freezing point of water in degrees Celsius?",
        answers: [
            { text: "32 Degree Celsius", correct: false},
            { text: "0 Degree Celsius", correct: true},
            { text: "100 Degree Celsius", correct: false},
            { text: "-10 Degree Celsius", correct: false},
            
        ]
    }

];
const questionElement = document.getElementById("question");
const answerButtons  = document.getElementById("answer-buttons");
const nextButton  = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
let userName = "";

function startQuiz() // function for quiz ( when started it should set score and question index to 0 )
{   
    // Get users name before starting.
    userName = prompt("Enter your name to begin your quiz:");
    
    if (!userName || userName.trim() === "") {
        alert("Please enter your name to start the quiz!");
        return;
    }


    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML = "Next";
    showQuestion();  // calling of function - showQuestion - it will display the questions

}
function showQuestion() // display the question and ans. with question number
{
    resetState();

    let currentQuestion= questions[currentQuestionIndex];
    let questionNo= currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {  // display the answers
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button); // appends the answers to answer btn in html file
        if(answer.correct)
        {
          button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);  


    });
}

function resetState()  // it will clear all the previous answers
{
  nextButton.style.display = 'none';
  while(answerButtons.firstChild)
  {
    answerButtons.removeChild(answerButtons.firstChild);
  }

}
function selectAnswer(e) // function to check whether the answer is correct or not
{
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect)
    {
        selectedBtn.classList.add("correct");
        score++;
    }
    else
    {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
  if (button.dataset.correct === "true") {
    button.classList.add("correct");
  }

  button.disabled = true;
});

nextButton.style.display = "block";
}
function showScore()
{
  resetState();
  //!!!!!questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
   questionElement.innerHTML = `${userName}, you scored ${score} out of ${questions.length}!`;



   // Create canvas for pie chart
    const canvas = document.createElement('canvas');
    canvas.id = 'scoreChart';
    canvas.width = 400;
    canvas.height = 400;
    answerButtons.appendChild(canvas);



  // Create pie chart
    new Chart(canvas, {
        type: 'pie',
        data: {
            labels: ['Correct', 'Incorrect'],
            datasets: [{
                data: [score, questions.length - score],
                backgroundColor: ['#9aeabc', '#ff9393']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
    
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";

}
function handleNextButton()  // For handling next button
{
    currentQuestionIndex++;  // increases the question index to +1.
    if(currentQuestionIndex < questions.length)
    {
        showQuestion();
    }
    else
    {
        showScore();
    }
}
nextButton.addEventListener("click",()=>{   
    if(currentQuestionIndex < questions.length)
    {
        handleNextButton();
    }
    else
    {
        startQuiz();
    }

})

startQuiz(); // calling of startQuiz function