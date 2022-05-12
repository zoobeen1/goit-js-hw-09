import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';
//classes
class Timer {
  constructor({ onTick }) {
    this.intevalID = null;
    this.onTick = onTick;
  }
  start(toDate) {
    const targetTime = toDate;
    this.intevalID = setInterval(() => {
      const deltaTime = targetTime - Date.now();
      if (deltaTime < 0) {
        this.stop();
        return;
      }
      this.onTick(this.convertMs(deltaTime));
    }, 1000);
  }
  stop() {
    if (this.intevalID) clearInterval(this.intevalID);
  }
  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const days = this.addLeadingZero(Math.floor(ms / day));
    const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = this.addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    const seconds = this.addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
    return { days, hours, minutes, seconds };
  }
  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }
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
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selDate = selectedDates[0];
    if (selDate < Date.now()) {
      Notify.failure('Please choose a date in the future');
    } else {
      refs.btnStart.disabled = false;
    }
  },
};
const timer = new Timer({ onTick: updateClock });
//functions - this function will refresh the clock on html
function updateClock({ days, hours, minutes, seconds }) {
  refs.dataDays.textContent = days;
  refs.dataHours.textContent = hours;
  refs.dataMins.textContent = minutes;
  refs.dataSecs.textContent = seconds;
}

//main code
flatpickr('#datetime-picker', options);
refs.btnStart.disabled = true;
refs.btnStart.addEventListener('click', () => {
  refs.btnStart.disabled = true;
  timer.stop();
  timer.start(Date.parse(refs.input.value));
});
