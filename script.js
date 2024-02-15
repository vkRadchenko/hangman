document.querySelector('body').innerHTML =
  '<div class="container__image"></div><div class="container__game"><div class="game__question"></div><div class="container__description"><div class="description"></div></div><div class="virtualKeyboard"></div></div><div id="myModal" class="modal"><div class="modal-content"></div></div>'

const virtualKeyboard = document.querySelector('.virtualKeyboard')

const containerImage = document.querySelector('.container__image')
const gameQuest = document.querySelector('.game__question')
const descriptionGame = document.querySelector('.description')
const incorrectDescription = document.querySelector('.container__description')
const cont = document.querySelector('.incorrectQuestions')

const modalContent = document.querySelector('.modal-content')
const containerModal = document.querySelector('#myModal')

const containerIncorrect = document.createElement('div')
const incorrectTitle = document.createElement('h4')
const incorrectCount = document.createElement('span')

incorrectCount.className = 'incorrectCount'
containerIncorrect.className = 'conteiner__incorrect'

incorrectTitle.textContent = `Неправильные ответы:`
incorrectCount.textContent = '0 / 6'

incorrectDescription.append(containerIncorrect)
containerIncorrect.append(incorrectTitle, incorrectCount)

//// IMG
const content__img_wrapper = document.createElement('div')
const gallows = document.createElement('img')
const gallowsTitle = document.createElement('h2')
const content__human = document.createElement('div')

content__img_wrapper.className = 'content__img_wrapper'
gallows.className = 'gallows__img'
content__human.className = 'content__human'

gallowsTitle.textContent = 'Hangman game'
gallows.src = './assets/gallows.png'

containerImage.append(content__img_wrapper, gallowsTitle)
content__img_wrapper.append(gallows, content__human)

//////////////
const gameAnswers = [
  {
    qest: 'лестница',
    help: 'Подсказка: Лежит на спине - никому не нужна. Прислони к стене - пригодится она',
  },
  { qest: 'зарплата', help: 'Подсказка: Не лёд, а тает, не лодка, а уплывает' },
  {
    qest: 'огонь',
    help: 'Подсказка: Что не жует, но все пожирает',
  },
  {
    qest: 'часы',
    help: 'Подсказка: Что может в одно и то же время: стоять и ходить, висеть и стоять, ходить и лежать?',
  },
  {
    qest: 'зубы',
    help: 'Подсказка: Это дается нам трижды. Первые два раза бесплатно. А вот за третий придется заплатить',
  },
  { qest: 'собака', help: 'Подсказка: Это животное лает' },
  { qest: 'кошка', help: 'Подсказка: Это животное мурчит' },
  { qest: 'змея', help: 'Подсказка: Это животное шипит' },
  { qest: 'петух', help: 'Подсказка: Будит по утрам' },
  { qest: 'рыба', help: 'Подсказка: Обитает в водоемах' },
]

let roundCount = 0
let mistakeCount = 0
let restartLogic = false

//////////////

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    let t = array[i]
    array[i] = array[j]
    array[j] = t
  }
}
shuffleArray(gameAnswers)
function generateGameField(str, help) {
  for (let i = 0; i < str.length; i++) {
    const elemenQest = document.createElement('div')
    elemenQest.className = 'item__gameQuest'
    elemenQest.id = i
    const underLine = document.createElement('div')
    underLine.className = 'underLine'
    elemenQest.appendChild(underLine)
    gameQuest.appendChild(elemenQest)
  }

  const descriptionContentQuestion = document.createElement('p')
  descriptionContentQuestion.className = 'description__content_question'
  descriptionContentQuestion.textContent = help
  descriptionGame.append(descriptionContentQuestion)
}

function game(arr, roundCount) {
  const currentQestion = arr[roundCount].qest
  console.log(currentQestion)
  const currentQuestionHelp = arr[roundCount].help
  generateGameField(currentQestion, currentQuestionHelp)
}

game(gameAnswers, roundCount)

const newStr = document.createElement('div')
newStr.textContent = ''

function renderSymbol(key, i) {
  const itemFieldQuestion = document.querySelectorAll('.item__gameQuest')
  itemFieldQuestion.forEach((el) => {
    if (el.id === String(i)) {
      el.textContent = key
    }
  })
}

function renderHuman(path, className) {
  const iter = document.createElement('img')
  iter.src = `./assets/${path}.svg`
  iter.className = className
  content__human.append(iter)
}

function userMistake(mistakeCount) {
  if (mistakeCount === 1) {
    renderHuman('head', 'personHead')
  }
  if (mistakeCount === 2) {
    renderHuman('hand_left', 'person__leftHand')
  }
  if (mistakeCount === 3) {
    renderHuman('hand_right', 'person__rightHand')
  }
  if (mistakeCount === 4) {
    renderHuman('body', 'person__body')
  }
  if (mistakeCount === 5) {
    renderHuman('hand_left', 'person__leftLeg')
  }
  if (mistakeCount === 6) {
    renderHuman('hand_right', 'person__rightLeg')
  }
}

function restartGame() {
  roundCount = 0
  mistakeCount = 0
  gameQuest.innerHTML = ''
  descriptionGame.innerHTML = ''
  content__human.innerHTML = ''
  incorrectCount.textContent = `${mistakeCount} / 6`
  shuffleArray(gameAnswers)
  arrStrQuest = gameAnswers[0].qest.split('')
  generateHideQuestion = arrStrQuest.map((el) => (el = ''))
  game(gameAnswers, roundCount)
  restartLogic = false
}

function modal(gameQest, win) {
  restartLogic = true
  containerModal.style.display = 'flex'
  const textGameOver = document.createElement('h3')
  textGameOver.textContent = `${win ? 'Вы выйграли!' : 'Вы проиграли!'}`

  const buttonRestartGame = document.createElement('button')
  buttonRestartGame.id = 'restartButton'
  buttonRestartGame.textContent = 'Рестарт'

  const finalQustion = document.createElement('p')
  finalQustion.className = 'modal__finalQuest'
  finalQustion.textContent = `Правильный ответ: ${gameQest
    .join('')
    .toUpperCase()}`

  modalContent.append(textGameOver, finalQustion, buttonRestartGame)
  buttonRestartGame.addEventListener('click', (e) => {
    restartGame()
    containerModal.style.display = 'none'
    modalContent.innerHTML = ''
  })
}

/// Массив с ответом разбитый побуквенно
let arrStrQuest = gameAnswers[0].qest.split('')

/// Каждая буква заменяется на пустую строку
let generateHideQuestion = arrStrQuest.map((el) => (el = ''))

document.addEventListener('DOMContentLoaded', function () {
  ///Keyboard
  const keys = 'йцукенгшщзхъфывапролджэячсмитьбю'.split('')
  keys.forEach((key) => {
    const keyElement = document.createElement('div')
    keyElement.classList.add('key')
    keyElement.textContent = key

    keyElement.addEventListener('click', (event) => handleKeyPress(event, key))
    document.addEventListener('keydown', (event) => handleKeyDown(event, key))

    virtualKeyboard.appendChild(keyElement)
  })
  ///
  const virtualKeyboardAllKey = document.querySelectorAll('.key')

  function handleKeyPress(event, key) {
    if (key === arrStrQuest.find((el) => el === key)) {
      event.target.style.backgroundColor = '#366'
      event.target.style.pointerEvents = 'none'

      arrStrQuest.map((el, i) => {
        if (el === key) {
          generateHideQuestion[i] = el
          renderSymbol(key, i)
        }
      })

      if (generateHideQuestion.every((el) => el !== '')) {
        modal(arrStrQuest, true)

        virtualKeyboardAllKey.forEach((el) => {
          el.style.backgroundColor = ''
          el.style.pointerEvents = ''
        })
      }
    } else {
      mistakeCount++
      userMistake(mistakeCount)
      incorrectCount.textContent = `${mistakeCount} / 6`
      event.target.style.backgroundColor = '#366'
      event.target.style.pointerEvents = 'none'

      if (mistakeCount === 6) {
        modal(arrStrQuest, false)
        virtualKeyboardAllKey.forEach((el) => {
          el.style.backgroundColor = ''
          el.style.pointerEvents = ''
        })
      }
    }
  }

  function handleKeyDown(event, key) {
    if (event.key.toLowerCase() === key && !restartLogic) {
      if (key === arrStrQuest.find((el) => el === key)) {
        virtualKeyboardAllKey.forEach((el) => {
          if (el.textContent === key) {
            el.style.backgroundColor = '#366'
            el.style.pointerEvents = 'none'
          }
        })

        arrStrQuest.map((el, i) => {
          if (el === key) {
            generateHideQuestion[i] = el
            renderSymbol(key, i)
          }
        })

        if (generateHideQuestion.every((el) => el !== '')) {
          modal(arrStrQuest, true)

          virtualKeyboardAllKey.forEach((el) => {
            el.style.backgroundColor = ''
            el.style.pointerEvents = ''
          })
        }
      } else {
        mistakeCount++
        userMistake(mistakeCount)
        incorrectCount.textContent = `${mistakeCount} / 6`

        virtualKeyboardAllKey.forEach((el) => {
          if (el.textContent === key) {
            el.style.backgroundColor = '#366'
            el.style.pointerEvents = 'none'
          }
        })

        if (mistakeCount === 6) {
          modal(arrStrQuest, false)
          virtualKeyboardAllKey.forEach((el) => {
            el.style.backgroundColor = ''
            el.style.pointerEvents = ''
          })
        }
      }
    }
  }
})
