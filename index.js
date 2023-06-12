var currentQuestion = 0;
var score = 0;
var timeLeft = 60;
var quizContainer = document.getElementById("quiz-container");
var startButton = document.getElementById("start-btn");
var questionElement = document.getElementById("question");
var optionsElement = document.getElementById("options");
var submitButton = document.getElementById("submit-btn");
var resultContainer = document.getElementById("result-container");
var scoreElement = document.getElementById("score");
var timerElement = document.getElementById("time");
var initialsElement = document.getElementById("initials");
var saveButton = document.getElementById("save-btn");
var timerInterval;

function startQuiz() {
  document.getElementById("start-container").style.display = "none";
  quizContainer.style.display = "block";
  startTimer();
  loadQuestion();
}

function startTimer() {
  timerInterval = setInterval(function() {
    timerElement.textContent = --timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      gameOver();
    }
  }, 1000);
}

function loadQuestion() {
  var currentQuiz = quizData[currentQuestion];
  questionElement.textContent = currentQuiz.question;
  optionsElement.innerHTML = "";

  currentQuiz.options.forEach(function(option, index) {
    var li = document.createElement("li");
    li.innerHTML = `<input type="radio" name="option" value="${index}">${option}`;
    optionsElement.appendChild(li);
  });
}

function calculateScore() {
  var selectedOption = document.querySelector("input[name='option']:checked");

  if (selectedOption) {
    var answer = parseInt(selectedOption.value);

    if (answer === quizData[currentQuestion].answer) {
      score++;
    } else {
      timeLeft = Math.max(timeLeft - 10, 0);
    }

    selectedOption.checked = false;
    currentQuestion++;

    if (currentQuestion < quizData.length) {
      loadQuestion();
    } else {
      gameOver();
    }
  }
}

function gameOver() {
  clearInterval(timerInterval);
  quizContainer.style.display = "none";
  resultContainer.style.display = "block";
  scoreElement.textContent = `Your score: ${score}/${quizData.length}`;
}

function saveScore() {
  var initials = initialsElement.value.trim();
  if (initials) {
    // Save the initials and score to storage or perform any other desired action
    alert("Score saved!");
  }
}

startButton.addEventListener("click", startQuiz);
submitButton.addEventListener("click", calculateScore);
saveButton.addEventListener("click", saveScore);
loadQuestion();
