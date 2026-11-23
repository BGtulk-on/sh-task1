const quizBox = document.getElementById("quiz");
const progressEl = document.getElementById("progress");
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextButton = document.getElementById("next");
const scoreBox = document.getElementById("score");

const questions = [
  {
    question: "Кой е правилният синтаксис за променлива в JavaScript?",
    answers: ["var x = 10;", "v x = 10;", "variable x = 10;", "let = x 10;"],
    correct: 0,
  },
  {
    question: "Кой метод намира HTML елемент по неговото id?",
    answers: [
      "document.getElementById()",
      "document.getElementByClass()",
      "document.findId()",
      "document.selectId()",
    ],
    correct: 0,
  },
  {
    question: "Кое събитие се задейства при натискане на бутон?",
    answers: ["hover", "click", "load", "input"],
    correct: 1,
  },
];

let currentIndex = 0;
let points = 0;
let selectedIndex = null;

function setNextEnabled(enabled) {
  nextButton.disabled = !enabled;
  nextButton.style.opacity = enabled ? "1" : "0.5";
}

function renderQuestion() {
  quizBox.style.display = "";
  scoreBox.style.display = "none";
  selectedIndex = null;
  setNextEnabled(false);

  const current = questions[currentIndex];
  progressEl.textContent = "Въпрос " + (currentIndex + 1) + " от " + questions.length;
  questionEl.textContent = current.question;
  nextButton.textContent = currentIndex === questions.length - 1 ? "Завърши" : "Следващ";

  answersEl.innerHTML = "";
  current.answers.forEach((answerText, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = answerText;
    button.addEventListener("click", () => {
      selectedIndex = index;
      const allButtons = answersEl.querySelectorAll("button");
      for (const btn of allButtons) {
        btn.style.background = "";
      }
      button.style.background = "#1b8a5a";
      setNextEnabled(true);
    });
    answersEl.appendChild(button);
  });
}

function showResult() {
  quizBox.style.display = "none";
  scoreBox.style.display = "block";
  scoreBox.innerHTML = "";

  const summary = document.createElement("p");
  summary.textContent = "Твоят резултат: " + points + " от " + questions.length;

  const restartButton = document.createElement("button");
  restartButton.type = "button";
  restartButton.textContent = "Започни отначало";
  restartButton.addEventListener("click", () => {
    currentIndex = 0;
    points = 0;
    selectedIndex = null;
    renderQuestion();
  });

  scoreBox.appendChild(summary);
  scoreBox.appendChild(restartButton);
}

nextButton.addEventListener("click", () => {
  if (selectedIndex === null) {
    return;
  }
  if (selectedIndex === questions[currentIndex].correct) {
    points += 1;
  }
  currentIndex += 1;
  if (currentIndex < questions.length) {
    renderQuestion();
  } else {
    showResult();
  }
});

renderQuestion();
