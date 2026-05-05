let startTime;
let elapsedTime = 0;
let timerInterval;
let lapCounter = 0;

const displayHrs = document.getElementById("hrs");
const displayMin = document.getElementById("min");
const displaySec = document.getElementById("sec");
const displayMs = document.getElementById("ms");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapsList = document.getElementById("lapsList");

// Convert time to formatted string
function formatTime(time) {
    let hh = Math.floor(time / 3600000);
    let mm = Math.floor((time % 3600000) / 60000);
    let ss = Math.floor((time % 60000) / 1000);
    let ms = Math.floor((time % 1000) / 10);

    return {
        h: hh.toString().padStart(2, "0"),
        m: mm.toString().padStart(2, "0"),
        s: ss.toString().padStart(2, "0"),
        ms: ms.toString().padStart(2, "0")
    };
}

function updateDisplay() {
    elapsedTime = Date.now() - startTime;
    const time = formatTime(elapsedTime);
    displayHrs.textContent = time.h;
    displayMin.textContent = time.m;
    displaySec.textContent = time.s;
    displayMs.textContent = time.ms;
}

startBtn.addEventListener("click", () => {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateDisplay, 10);
    startBtn.style.display = "none";
    pauseBtn.style.display = "block";
});

pauseBtn.addEventListener("click", () => {
    clearInterval(timerInterval);
    startBtn.style.display = "block";
    pauseBtn.style.display = "none";
});

resetBtn.addEventListener("click", () => {
    clearInterval(timerInterval);
    elapsedTime = 0;
    lapCounter = 0;
    displayHrs.textContent = "00";
    displayMin.textContent = "00";
    displaySec.textContent = "00";
    displayMs.textContent = "00";
    lapsList.innerHTML = "";
    startBtn.style.display = "block";
    pauseBtn.style.display = "none";
});

lapBtn.addEventListener("click", () => {
    if (elapsedTime === 0) return;
    lapCounter++;
    const time = formatTime(elapsedTime);
    const lapString = `${time.h}:${time.m}:${time.s}:${time.ms}`;
    
    // UI update for laps
    const li = document.createElement("li");
    li.classList.add("lap-item", "latest");
    
    // Remove "latest" highlight from previous laps
    const oldLatest = document.querySelector(".latest");
    if (oldLatest) oldLatest.classList.remove("latest");

    li.innerHTML = `<span>Lap ${lapCounter}</span> <span>${lapString}</span>`;
    lapsList.prepend(li);
});