const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));

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
const MAX_QUESTIONS = 4;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  questionCounter++;
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;

  if (questionCounter >= MAX_QUESTIONS || availableQuestions.length === 0) {
    // return window.location.assign("/end.html");
    setTimeout(() => {
      return window.location.assign("http://127.0.0.1:5500/");
    }, 800);
  }
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

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 750);
  });
});

startGame();
