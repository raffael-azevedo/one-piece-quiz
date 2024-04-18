const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let questions = [
  {
    question: "Who is Condoriano??",
    choice1: "Actually Con D. Oriano, the real Joy Boy",
    choice2: "Isn't that Robin?",
    choice3: "Former Marine, now former Strawhat",
    choice4: "Who?",
    answer: 1,
  },
  {
    question: "Who has the biggest bust among all One Piece characters?",
    choice1: "Nami",
    choice2: "Zoro",
    choice3: "Boa Hancock",
    choice4: "Big Mom",
    answer: 3,
  },
  {
    question: "How many swords Zoro had in total?",
    choice1: "4",
    choice2: "5",
    choice3: "7",
    choice4: "9",
    answer: 4,
  },
];

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = questions.length;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (questionCounter >= MAX_QUESTIONS || availableQuestions.length === 0) {
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign("/end.html");
  }
  questionCounter++;
  progressText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
  console.log(availableQuestions.length);
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;
    acceptingAnswers = false;
    let selectedChoice = e.target;
    let selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
    selectedChoice.parentElement.classList.add(classToApply);

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 750);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
