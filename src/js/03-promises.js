//variables
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const form = document.querySelector('form');
const firstDelay = form.elements['delay'];
const delayStep = form.elements['step'];
const amount = form.elements['amount'];
const button = document.querySelector('button');

//functions
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      shouldResolve
        ? resolve({ position: position, delay: delay })
        : reject({ position: position, delay: delay });
    }, delay);
  });
}
function onSubmit(e) {
  e.preventDefault();
  let setDelay = +firstDelay.value;
  for (let i = 1; i <= +amount.value; i++) {
    if (i > 1) {
      setDelay += +delayStep.value;
    }
    createPromise(i, setDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}
//main code
button.addEventListener('click', onSubmit);
