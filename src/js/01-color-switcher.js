const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const bodyRef = document.querySelector('body');

btnStart.addEventListener('click', chandeBodyColor);
btnStop.addEventListener('click', stopChangeColor);

let timerId = null;

function chandeBodyColor() {
    btnStart.setAttribute("disabled", "");
    btnStop.removeAttribute("disabled", "");

        timerId = setInterval(() => {
            bodyRef.style.background = getRandomHexColor();
        
        }, 1000);
}

function stopChangeColor () {
    btnStop.setAttribute("disabled", "");
    btnStart.removeAttribute("disabled", "");

    clearInterval(timerId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

