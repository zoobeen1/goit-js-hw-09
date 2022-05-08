import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
//functions
function updateClock({ days, hours, mins, secs }) {
  refs.dataDays.textContent = days;
  refs.dataHours.textContent = hours;
  refs.dataMins.textContent = mins;
  refs.dataSecs.textContent = secs;
}
//classes
class Timer {
  constructor({ onTick }) {
    //нужен если нужно будет остановить таймер
    // this.intevalID = null;
    this.onTick = onTick;
  }
  start(toDate) {
    const targetTime = toDate;
    // this.intevalID =
    setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = targetTime - currentTime;
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
//variables
const dateNow = Date.now();
const refs = {
  input: document.querySelector('input'),
  btnStart: document.querySelector('button[data-start]'),
  dataDays: document.querySelector('[data-days]'),
  dataHours: document.querySelector('[data-hours]'),
  dataMins: document.querySelector('[data-minutes]'),
  dataSecs: document.querySelector('[data-seconds]'),
};
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selDate = selectedDates[0];
    if (selDate < dateNow) {
      alert('Please choose a date in the future');
    } else {
      refs.btnStart.disabled = false;
    }
  },
};
const timer = new Timer({ onTick: updateClock });
//main code
flatpickr('#datetime-picker', options);
refs.btnStart.disabled = true;
refs.btnStart.addEventListener('click', () => {
  refs.btnStart.disabled = true;
  timer.start(Date.parse(refs.input.value));
});
