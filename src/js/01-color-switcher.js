//vars
const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let intervalId = null;
//functions
function onStartClick() {
  intervalId = setInterval(() => {
    body.style.backgroundColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }, 1000);
  btnStart.disabled = true;
  btnStop.disabled = false;
}
function onStopClick() {
  btnStart.disabled = false;
  btnStop.disabled = true;
  clearInterval(intervalId);
}
//events
btnStart.addEventListener('click', onStartClick);
btnStop.addEventListener('click', onStopClick);
