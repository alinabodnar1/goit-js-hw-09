import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputDelay = document.querySelector('input[name="delay"]');
const inputStep = document.querySelector('input[name="step"]');
const inputAmount = document.querySelector('input[name="amount"]');
const form = document.querySelector('form');
form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const { elements: { delay, step, amount } } = event.currentTarget;
  console.log(`Delay: ${delay.value}, Step: ${step.value}, Amount: ${amount.value}`);

  const delayPromise = Number(delay.value);
  const stepPromise = Number(step.value);
  const amountPromise = Number(amount.value);
  
  for (let position = 0; position <= amountPromise - 1; position += 1) {
    let s = stepPromise * position + delayPromise;
    
    console.log(s);

      createPromise(position, delayPromise)
        .then(({ position, delayPromise }) => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delayPromise} ms`);
        })
        .catch(({ position, delayPromise }) => {
          Notify.failure(`❌ Rejected promise ${position} in ${delayPromise} ms`);
        });
    }
  event.currentTarget.reset();
}
function createPromise(position, delay) {
    return new Promise((resolve, reject) => {
      const shouldResolve = Math.random() > 0.3;

      setTimeout(() => {  
        if (shouldResolve) {
          resolve({position, delay});
        } else {
          reject({position, delay});
        }
      }, delay);
  });
}
