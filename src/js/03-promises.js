import { number } from 'joi';
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
  
  for (let i = 0; i <= amountPromise - 1; i += 1) {
      let s =  stepPromise * i + delayPromise;

      createPromise(i, s)
        .then(({ i, s }) => {
          Notify.success(`✅ Fulfilled promise ${i} in ${s}ms`);
        })
        .catch(({ i, s }) => {
          Notify.failure(`❌ Rejected promise ${i} in ${s}ms`);
        });
    }
  event.currentTarget.reset();
}

function createPromise(position, delay) {
    return new Promise((resolve, reject) => {
      const shouldResolve = Math.random() > 0.3;

      setTimeout(() => {  
        if (shouldResolve) {
          resolve(Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`));
        } else {
          reject(Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`));
        }
      }, delay);
  });
}
