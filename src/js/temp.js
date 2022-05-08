//classes
class Timer {
  constructor({ onTick }) {
    this.intevalID = null;
    this.onTick = onTick;
  }
  start(now) {
    const startTime = now;
    this.intevalID = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = currentTime - startTime;
      const timeComponents = this.getTimeComponents(deltaTime);
      this.onTick(timeComponents);
    }, 1000);
  }
  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
    return { days, hours, mins, secs };
  }
  pad(value) {
    return String(value).padStart(2, '0');
  }
}
//objects
const timer = new Timer({ onTick: updateClock });
const date = new Date();
const { year, month, day } = getDateComponents(date);
const localDate = `${year}-${month}-${day}`;

//functions
function getDateComponents(date) {
  const year = timer.pad(date.getFullYear());
  const month = timer.pad(date.getMonth() + 1);
  const day = timer.pad(date.getDate());
  return { year, month, day };
}
function updateClock({ days, hours, mins, secs }) {
  refs.dataDays.textContent = days;
  refs.dataHours.textContent = hours;
  refs.dataMins.textContent = mins;
  refs.dataSecs.textContent = secs;
}
//variables
const refs = {
  input: document.querySelector('input'),
  btnStart: document.querySelector('button[data-start]'),
  dataDays: document.querySelector('[data-days]'),
  dataHours: document.querySelector('[data-hours]'),
  dataMins: document.querySelector('[data-minutes]'),
  dataSecs: document.querySelector('[data-seconds]'),
};

//init input on start
refs.input.type = 'date';
refs.input.value = localDate;
//main code
refs.btnStart.addEventListener('click', () => {
  console.log('click');
  console.log(Date.parse(refs.input.value));
  const date = timer.start(Date.parse(refs.input.value));
});
