import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';
//functions
function updateClock({ days, hours, minutes, seconds }) {
  refs.dataDays.textContent = days;
  refs.dataHours.textContent = hours;
  refs.dataMins.textContent = minutes;
  refs.dataSecs.textContent = seconds;
}
//classes
class Timer {
  constructor({ onTick }) {
    //нужен если нужно будет остановить таймер
    this.intevalID = null;
    this.onTick = onTick;
  }
  start(toDate) {
    const targetTime = toDate;
    this.intevalID = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = targetTime - currentTime;
      if (deltaTime < 0) {
        clearInterval(this.intevalID);
        return;
      }
      const timeComponents = this.convertMs(deltaTime);
      this.onTick(timeComponents);
    }, 1000);
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
      Notify.failure('Please choose a date in the future');
      // alert('Please choose a date in the future');
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
