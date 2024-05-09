let quizData = [
  {
    question: 'What does HTML stand for?',
    answers: [
      { text: 'Hyper Text Markup Language', correct: true },
      { text: 'High Text Markup Language', correct: false },
      { text: 'Hyper Tabular Markup Language', correct: false },
      { text: 'None of these', correct: false },
    ],
  },
  {
    question: 'Which language runs in a web browser?',
    answers: [
      { text: 'Java', correct: false },
      { text: 'C', correct: false },
      { text: 'Python', correct: false },
      { text: 'JavaScript', correct: true },
    ],
  },
  {
    question: 'What does CSS stand for?',
    answers: [
      { text: 'Central Style Sheets', correct: false },
      { text: 'Cascading Style Sheets', correct: true },
      { text: 'Cascading Simple Sheets', correct: false },
      { text: 'Cars SUVs Sailboats', correct: false },
    ],
  },
  {
    question: 'What year was JavaScript launched?',
    answers: [
      { text: '1996', correct: false },
      { text: '1995', correct: true },
      { text: '1994', correct: false },
      { text: 'none of the above', correct: false },
    ],
  },
  {
    question: 'Which tool can you use to ensure code quality?',
    answers: [
      { text: 'Angular', correct: false },
      { text: 'jQuery', correct: false },
      { text: 'RequireJS', correct: false },
      { text: 'ESLint', correct: true },
    ],
  },
];

//For video referening --> myNames = videoNames
//quizData = questions
//questionElement = questionElement
//answerButtons = answerButtons
//nextButton = nextButton

// Selecting the question, question number, answer buttons, and next button
let questionElement = document.querySelector('[data-component="question"]');
let questionNumber = document.querySelector(
  '[data-component="questionNumber"]'
);
let answerButtons = document.querySelector('[data-component="answers"]');
let nextButton = document.querySelector('[data-component="next"]');

// Setting some index for this medthod?
let currentQuestionIndex = 0;
let score = 0;

//Im guessing a function when starting the page, also adds "NeXT" into nextButton
function startQuiz() {
  currentQuestionIndex = 0;
  nextButton.innerHTML = 'Next';
  score = 0;
  showQuestion();
}

//Creating some function that would load corresponding question number and question
function showQuestion() {
  resetState();

  let currentQuestion = quizData[currentQuestionIndex];
  let questionNumber = currentQuestionIndex + 1;

  questionElement.innerHTML = `Question ${questionNumber}. ${currentQuestion.question}`;

  //Adding the answers as buttons
  currentQuestion.answers.forEach((answer) => {
    let button = document.createElement('button');
    button.innerHTML = answer.text;
    button.classList.add('btn', 'btn-outline-secondary', 'd-block');

    answerButtons.appendChild(button);
    //Adding click event when click an answer (also don't understand what "dataset" is)
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
  });
}

//Adding a reset function - when moving to new question it moves previous asnwers
function resetState() {
  nextButton.classList.add('d-none');
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

//Adding function when selecting an answer - display correct/incorrect answers
function selectAnswer(e) {
  //is there a difference between e.target and event.target?
  let selectBtn = e.target;
  let isCorrect = selectBtn.dataset.correct;
  if (isCorrect === 'true') {
    selectBtn.classList.add('btn-success');
    //Increase the score by one when correct
    score++;
  } else {
    selectBtn.classList.add('btn-danger');
  }
  //Not sure what it's adding here - need to revisit!!!
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === 'true') {
      button.classList.add('btn-success');
    }
    button.classList.remove('btn-outline-secondary');
    button.disabled = true;
  });

  nextButton.classList.remove('d-none');
}

//Function for scoring? - When finished it will show score and button to start again
function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${quizData.length} !`;
  nextButton.innerHTML = 'Play Again?';
  nextButton.style.display = 'block';
}
//Creating function on what happens when you press NEXT
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizData.length) {
    showQuestion();
  } else {
    showScore();
  }
}
//Need to revisit
nextButton.addEventListener('click', () => {
  if (currentQuestionIndex < quizData.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();

//NOTE!!!!
//Make sure to fix CSS/Bootstrap of the HTML
//Also some functions didn't work - need to check for JS and possiblly if it's CSS issue
