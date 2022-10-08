// commonjs
const flatpickr = require('flatpickr');
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

const refs = {
  btnTimerStart: document.querySelector('[data-start]'),
  timerFieldDays: document.querySelector('[data-days]'),
  timerFielHours: document.querySelector('[data-hours]'),
  timerFieldMinutes: document.querySelector('[data-minutes]'),
  timerFieldSeconds: document.querySelector('[data-seconds]'),
};

let timerId = null;
refs.btnTimerStart.disabled = true;

/////////////////////// Flatpickr Settings /////////////

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = new Date();

    if (selectedDates[0] < currentDate) {
      refs.btnTimerStart.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');
      //   window.alert('Please choose a date in the future');
    } else {
      refs.btnTimerStart.disabled = false;
    }
  },
};

const flat = flatpickr('#datetime-picker', options);

///////////////////// Convert Time ///////////////////

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

////////////////////// XX : XX : XX /////////////////

function addZero(value) {
  return String(value).padStart(2, 0);
}

///////////////////// Timer Start ////////////////////

refs.btnTimerStart.addEventListener('click', onTimerStart);

function onTimerStart() {
  const selectedDate = flat.selectedDates[0];

  timerId = setInterval(() => {
    const startTime = new Date();
    const timeDown = selectedDate - startTime;

    refs.btnTimerStart.disabled = true;

    if (timeDown < 0) {
      clearInterval(timerId);
      return;
    }
    updateTimer(convertMs(timeDown));
  }, 1000);
}

//////////////////////// Update Timer ///////////////

function updateTimer({ days, hours, minutes, seconds }) {
  refs.timerFieldDays.textContent = addZero(days);
  refs.timerFielHours.textContent = addZero(hours);
  refs.timerFieldMinutes.textContent = addZero(minutes);
  refs.timerFieldSeconds.textContent = addZero(seconds);
}
