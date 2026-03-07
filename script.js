let score = 0
let combo = 0
let level = 1
let correctAnswer = 0
let maxTime = 5
let time = maxTime
let timer
let playing = false

const scoreEl = document.getElementById("score")
const comboEl = document.getElementById("combo")
const levelEl = document.getElementById("level")
const questionEl = document.getElementById("question")
const answerEl = document.getElementById("answer")
const feedbackEl = document.getElementById("feedback")
const startBtn = document.getElementById("startBtn")
const timeBar = document.getElementById("timeBar")

startBtn.onclick = startGame

function startGame(){

score = 0
combo = 0
level = 1
playing = true

updateStats()
nextQuestion()

answerEl.focus()

}

function nextQuestion(){

clearInterval(timer)

let max = 10 + level * 5

let a = Math.floor(Math.random()*max)+1
let b = Math.floor(Math.random()*max)+1

let ops = ["+","-","*"]
let op = ops[Math.floor(Math.random()*ops.length)]

if(op === "+") correctAnswer = a+b
if(op === "-") correctAnswer = a-b
if(op === "*") correctAnswer = a*b

questionEl.innerText = `${a} ${op} ${b}`

answerEl.value = ""

startTimer()

}

function startTimer(){

maxTime = Math.max(2,5 - level*0.3)
time = maxTime

timeBar.style.width = "100%"

timer = setInterval(()=>{

time -= 0.1

let percent = (time/maxTime)*100
timeBar.style.width = percent + "%"

if(time <= 0){
gameOver()
}

},100)

}

answerEl.addEventListener("keydown",(e)=>{

if(!playing) return

if(e.key === "Enter"){

let value = answerEl.value.trim()

if(value === "") return

let userAnswer = Number(value)

clearInterval(timer)

checkAnswer(userAnswer)

}

})

function checkAnswer(userAnswer){

if(userAnswer === correctAnswer){

score += 10 + combo*2
combo++

feedbackEl.innerText = "✅ Correct!"
feedbackEl.style.color = "green"

explode()

}else{

combo = 0
feedbackEl.innerText = "❌ Wrong!"
feedbackEl.style.color = "red"

}

if(score >= level * 60){
level++
}

updateStats()

setTimeout(()=>{
nextQuestion()
},300)

}

function explode(){

questionEl.classList.add("explode")

setTimeout(()=>{
questionEl.classList.remove("explode")
},200)

}

function updateStats(){

scoreEl.innerText = score
comboEl.innerText = combo
levelEl.innerText = level

}

function gameOver(){

playing = false

clearInterval(timer)

questionEl.innerText = "Game Over"
feedbackEl.innerText = "Final Score: " + score

saveScore(score)
loadLeaderboard()

}

function saveScore(newScore){

let scores = JSON.parse(localStorage.getItem("mathScores")) || []

scores.push(newScore)

scores.sort((a,b)=>b-a)

scores = scores.slice(0,5)

localStorage.setItem("mathScores",JSON.stringify(scores))

}

function loadLeaderboard(){

let scores = JSON.parse(localStorage.getItem("mathScores")) || []

let board = document.getElementById("leaderboard")

board.innerHTML=""

scores.forEach(s=>{
let li=document.createElement("li")
li.innerText=s
board.appendChild(li)
})

}

loadLeaderboard()