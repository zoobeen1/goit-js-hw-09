import 'flatpickr/dist/flatpickr.min.css';
// const flatpickr = require('flatpickr');
import flatpickr from 'flatpickr';
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};
flatpickr('#datetime-picker', options);
