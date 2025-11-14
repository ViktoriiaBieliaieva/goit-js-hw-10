import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const btn = document.querySelector('[data-start]');
btn.setAttribute('disabled', '');

const inpEl = document.querySelector('#datetime-picker');

let userSelectedDate;
let intervalId = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0].getTime() <= Date.now()) {
            iziToast.error({
                iconUrl: 'img/close.svg',
                iconColor: '#fff',
                message: 'Please choose a date in the future',
                messageColor: '#fff',
                messageSize: '16px',
                color: '#ef4040',
                close: false,
                position: 'topRight',
                progressBar: false,
                animateInside: false,
                transitionIn: 'fadeIn',
                transitionOut: 'fadeOut'
            });
            btn.setAttribute('disabled', '');
            // console.log(selectedDates[0])
        } else {
            btn.removeAttribute('disabled');
            userSelectedDate = selectedDates[0];

        }
    },
};

const fp = flatpickr("#datetime-picker", options);


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
};

const refs = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
}

btn.addEventListener('click', () => {
    intervalId = setInterval(() => {
    const ms = userSelectedDate.getTime() - Date.now();
    const { days, hours, minutes, seconds } = convertMs(ms);

    refs.days.textContent = addLeadingZero(days);
    refs.hours.textContent = addLeadingZero(hours);
    refs.minutes.textContent = addLeadingZero(minutes);
    refs.seconds.textContent = addLeadingZero(seconds);

        if (ms <= 0) {
            clearInterval(intervalId);
            refs.days.textContent = "00";
            refs.hours.textContent = "00";
            refs.minutes.textContent = "00";
            refs.seconds.textContent = "00";
            inpEl.removeAttribute('disabled');
        }
  }, 1000);
    btn.setAttribute('disabled', '');
    inpEl.setAttribute('disabled', '');
});









