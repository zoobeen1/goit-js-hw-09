//functions
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
function setColor() {
  body.style.backgroundColor = getRandomHexColor();
}
function onStartClick() {
  intervalId = setInterval(setColor, 1000);
  btnStart.disabled = true;
}
function onStopClick() {
  btnStart.disabled = false;
  clearInterval(intervalId);
}

//vars
const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let intervalId = 0;
//events
btnStart.addEventListener('click', onStartClick);
btnStop.addEventListener('click', onStopClick);
