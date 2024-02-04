let $ = document

const startBtn = $.querySelector('.start')
const resetBtn = $.querySelector('.reset')
const startbreakBtn = $.querySelector('.break')
const breakResetBtn = $.querySelector('.break-reset')
const timer = $.querySelector('.time')
const switchElement = $.querySelector('.switch')

const loader = $.querySelector('.loader')


let interval
let breakInterval
let sec = 0
let min = 25


// for start 25 minuts
function startTime() {
    if (sec === 0) {
        min--
        sec = 60
    }
    sec--

    let m = min < 10 ? '0' + min : min;
    let s = sec < 10 ? '0' + sec : sec;

    timer.innerHTML = m + ':' + s

    if (sec === 0 && min === 0) {
        clearInterval(interval)
        startBtn.style.display = 'none'
        resetBtn.style.display = 'none'
        startbreakBtn.style.display = 'block'

        timer.innerHTML = '0' + breakMin + ':' + '0' + breakSec

        startbreakBtn.addEventListener('click', function () {
            startbreakBtn.style.display = 'none'
            resetBtn.style.display = 'none'
            breakResetBtn.style.display = 'block'
            breakInterval = setInterval(startBreak, 1000)
        })
    }
}

// for 5 minuts break
let breakSec = 0
let breakMin = 5
function startBreak() {
    if (breakSec === 0) {
        breakMin--
        breakSec = 60
    }
    breakSec--

    let breakS = breakSec < 10 ? '0' + breakSec : breakSec;

    timer.innerHTML = '0' + breakMin + ':' + breakS

    if (breakSec === 0 && breakMin === 0) {
        min = 25
        sec = 0
        timer.innerHTML = min + ':' + '0' + sec
        clearInterval(breakInterval)
        breakResetBtn.style.display = 'none'
        startBtn.style.display = 'block'
    }

}

// events set
startBtn.addEventListener('click', function () {
    startBtn.style.display = 'none'
    resetBtn.style.display = 'block'
    interval = setInterval(startTime, 1000)
})

resetBtn.addEventListener('click', function () {
    clearInterval(interval)
    clearInterval(breakInterval)
    sec = 0
    min = 25
    resetBtn.style.display = 'none'
    startBtn.style.display = 'block'
    timer.innerHTML = min + ':' + '0' + sec
})

breakResetBtn.addEventListener('click', function () {
    clearInterval(breakInterval)
    breakSec = 0
    breakMin = 5
    breakResetBtn.style.display = 'none'
    startbreakBtn.style.display = 'block'
    timer.innerHTML = '0' + breakMin + ':' + '0' + breakSec
})

// for Dark or Light Mode
switchElement.addEventListener('click', function () {
    document.body.classList.toggle('dark')
    if (document.body.className.includes('dark') === true) {
        localStorage.setItem('theme', 'dark')
    } else {
        localStorage.setItem('theme', 'light')
    }
})

window.onload = function () {
    let themeStatus = localStorage.getItem('theme')
    if (themeStatus === 'dark') {
        document.body.classList.add('dark')
    }
}