import flatpickr from "flatpickr";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "flatpickr/dist/flatpickr.min.css";

const pickerRef = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');

let chosenDate = null;

btnStart.setAttribute("disabled", "");

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,

    onClose(selectedDates) {
        const currentDate = Date.now();
        chosenDate = selectedDates[0].getTime();

        if (chosenDate < currentDate) {
            btnStart.setAttribute("disabled", "");
            Notify.failure('Please choose a date in the future');

        } else {
            btnStart.removeAttribute("disabled", "");
            btnStart.style.color = "blueviolet";
        }    
    },
};

pickerRef.addEventListener('click', flatpickr(pickerRef, options));
btnStart.addEventListener('click', countdownTimer);

function countdownTimer() {
    setInterval(() => {
        let currentTime = Date.now();

        let deltaTime = chosenDate - currentTime;
       
        if (deltaTime <= 0) {
            
            return;
        } 
        const { days, hours, minutes, seconds } = convertMs(deltaTime);

        remainingTime(convertMs(deltaTime));
        
    }, 1000);
}
    
function remainingTime({days,hours, minutes, seconds}) {
    daysRef.textContent = `${addLeadingZero(days)}`;
    hoursRef.textContent = `${addLeadingZero(hours)}`;
    minutesRef.textContent = `${addLeadingZero(minutes)}`;
    secondsRef.textContent = `${addLeadingZero(seconds)}`;
}

function addLeadingZero(value) {
    let numberLength = String(value).length;

    if (numberLength <= 2) {
        return value.toString().padStart(2, '0');
    } else {
        return value.toString().padStart(numberLength, '0');
    }   
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}