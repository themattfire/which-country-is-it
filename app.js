const start = document.getElementById('start')
const quiz = document.getElementById('quiz')
const question = document.getElementById('question')
const qImg = document.getElementById('qImg')
const choiceA = document.getElementById('A')
const choiceB = document.getElementById('B')
const choiceC = document.getElementById('C')
const choiceD = document.getElementById('D')
const counter = document.getElementById('counter')
const timeGauge = document.getElementById('timeGauge')
const progress = document.getElementById('progress')
const scoreDiv = document.getElementById('scoreContainer')

let questions = [
  {
    question: '¿Dónde se localiza la estatua del "Cristo redentor"?',
    imgSrc: './imgs/q1.jpg',
    choiceA: 'En Brasil',
    choiceB: 'En México',
    choiceC: 'En Argentina',
    choiceD: 'En Puerto Rico',
    correct: 'A'
  },
  {
    question: '¿En dónde están estas ruinas?',
    imgSrc: './imgs/q2.jpg',
    choiceA: 'En Chile',
    choiceB: 'En Perú',
    choiceC: 'En México',
    choiceD: 'En Guatemala',
    correct: 'B'
  },
  {
    question: 'Estas cascadas están en la frontera de Brasil y ¿qué otro país?',
    imgSrc: './imgs/q3.jpg',
    choiceA: 'Bolivia',
    choiceB: 'Chile',
    choiceC: 'Argentina',
    choiceD: 'Colombia',
    correct: 'C'
  },
  {
    question: '¿Dónde se localiza esta pirámide escalonada?',
    imgSrc: './imgs/q4.jpg',
    choiceA: 'En Haití',
    choiceB: 'En México',
    choiceC: 'En República Dominicana',
    choiceD: 'En Bolivia',
    correct: 'B'
  },
  {
    question: 'Esta estatua de una mano al lado de la playa se localiza ¿en qué país?',
    imgSrc: './imgs/q5.jpg',
    choiceA: 'En Paraguay',
    choiceB: 'En República Dominicana',
    choiceC: 'En Colombia',
    choiceD: 'En Uruguay',
    correct: 'D'
  },
  {
    question: '¿En qué país se localiza esta pintoresca escena?',
    imgSrc: './imgs/q6.jpg',
    choiceA: 'En Cuba',
    choiceB: 'En Bolivia',
    choiceC: 'En Ecuador',
    choiceD: 'En Honduras',
    correct: 'B'
  },
  {
    question: '¿Dónde está esta citadela?',
    imgSrc: './imgs/q7.jpg',
    choiceA: 'En República Dominicana',
    choiceB: 'En Panamá',
    choiceC: 'En Puerto Rico',
    choiceD: 'En Ecuador',
    correct: 'C'
  },
  {
    question: 'Rapa Nui, también conocida como la Isla de Pascua, es territorio ¿de qué país?',
    imgSrc: './imgs/q8.jpg',
    choiceA: 'De Chile',
    choiceB: 'De Colombia',
    choiceC: 'De Honduras',
    choiceD: 'De Panamá',
    correct: 'A'
  },
  {
    question: '¿En qué país está este edificio con forma de tornillo?',
    imgSrc: './imgs/q9.jpg',
    choiceA: 'En Guatemala',
    choiceB: 'En Haití',
    choiceC: 'En Colombia',
    choiceD: 'En Panamá',
    correct: 'D'
  },
  {
    question: 'Finalmente, ¿dónde se encuentra esta cascada increíblemente alta?',
    imgSrc: './imgs/q10.jpg',
    choiceA: 'En Honduras',
    choiceB: 'En Costa Rica',
    choiceC: 'En Venezuela',
    choiceD: 'En Cuba',
    correct: 'C'
  }
]

const lastQuestion = questions.length - 1
let runningQuestion = 0
let count = 0
const questionTime = 10
const gaugeWidth = 150
const gaugeUnit = gaugeWidth / questionTime
let TIMER
let score = 0

window.addEventListener('load', (e) => {
  quiz.style.display = 'none'
  scoreDiv.style.display = 'none'
})

// render a question
function renderQuestion() {
  let q = questions[runningQuestion]

  question.innerHTML = '<p>' + q.question + '</p>'
  qImg.innerHTML = '<img src=' + q.imgSrc + '>'
  choiceA.innerHTML = q.choiceA
  choiceB.innerHTML = q.choiceB
  choiceC.innerHTML = q.choiceC
  choiceD.innerHTML = q.choiceD
}
start.addEventListener('click', startQuiz)

// start quiz
function startQuiz() {
  start.style.display = 'none'
  renderQuestion()
  quiz.style.display = 'flex'
  renderProgress()
  renderCounter()
  TIMER = setInterval(renderCounter, 1000)
}

// render progress
function renderProgress() {
  for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
    progress.innerHTML += "<div class='prog' id=" + qIndex + '></div>'
  }
}

// checkAnwer
function checkAnswer(answer) {
  if (answer == questions[runningQuestion].correct) {
    score++
    answerIsCorrect()
  } else {
    answerIsWrong()
  }
  count = 0
  if (runningQuestion < lastQuestion) {
    runningQuestion++
    renderQuestion()
  } else {
    // end the quiz and show the score
    clearInterval(TIMER)
    scoreRender()
  }
}

// answer is correct
function answerIsCorrect() {
  document.getElementById(runningQuestion).classList.add('correct')
}

// answer is Wrong
function answerIsWrong() {
  document.getElementById(runningQuestion).classList.add('wrong')
}

// counter render
function renderCounter() {
  if (count <= questionTime) {
    counter.innerHTML = count
    timeGauge.style.width = count * gaugeUnit
    count++
  } else {
    count = 0
    answerIsWrong()
    if (runningQuestion < lastQuestion) {
      runningQuestion++
      renderQuestion()
    } else {
      clearInterval(TIMER)
      scoreRender()
    }
  }
}

// score render
function scoreRender() {
  scoreDiv.style.display = 'block'

  const scorePerCent = Math.round((100 * score) / questions.length)

  let img =
    scorePerCent >= 80
      ? 'imgs/5.png'
      : scorePerCent >= 60
      ? 'imgs/4.png'
      : scorePerCent >= 40
      ? 'imgs/3.png'
      : scorePerCent >= 20
      ? 'imgs/2.png'
      : 'imgs/1.png'

  scoreDiv.innerHTML = '<img src=' + img + '>'
  scoreDiv.innerHTML += '<p>' + scorePerCent + '%</p>'
}
