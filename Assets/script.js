
// calling on elements by their IDs to initiate their respective functions
const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

// mouse event that starts the quick when the start button is clicked
startButton.addEventListener('click', startQuiz)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

// function to start the quiz
function startQuiz() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

// function to move onto the next question once the current question is answered
function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

// function to display the question ,answer selection, and function call based on use input
function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

// function to reset/clear the quiz to start over
function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}
function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}
// function to set the status of each element based on input
function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

// function to clear the statuses that were applied to them based on user input
function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}


// questions and answer banks
const questions = [
  {
    question: 'True or False: In the Star Wars Univers, Jango & Boba Fett are not considered REAL Mandalorians.',
    answers: [
      { text: 'True', correct: true },
      { text: 'False', correct: false }
    ]
  },
  {
    question: 'Which former American physicist claimed to who have work on projects reverse engineering extraterrestrial space craft?',
    answers: [
      { text: 'Bob Barker', correct: false },
      { text: 'Ricky Bobby', correct: false },
      { text: 'Bob Lazar', correct: true },
      { text: 'Robert Pin', correct: false }
    ]
  },
  {
    question: 'What year was the first programmable drum machine invented?',
    answers: [
      { text: '1992', correct: false },
      { text: '1206', correct: true },
      { text: '1313', correct: false },
      { text: '1975', correct: false }
    ]
  },
  {
    question: "Is pimpin', EZ?",
    answers: [
      { text: 'Nah', correct: true },
      { text: 'Yeah BoI', correct: true }
    ]
  }
]