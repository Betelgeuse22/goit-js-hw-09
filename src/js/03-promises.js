import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
};

////////////////////////// Creat Promice ///////////////////////////

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

//////////////////////////////  Submit //////////////////////////

refs.form.addEventListener('submit', onCreatePromises);

function onCreatePromises(evt) {
  evt.preventDefault();
  const formData = new FormData(evt.currentTarget);
  const dataParams = {};

  for (const [key, value] of formData.entries()) {
    dataParams[key] = Number(value);
  }

  let { delay, step, amount } = dataParams;

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay).then(onSuccess).catch(onError);
    delay += step;

    refs.form.reset();
  }
}

function onError({ position, delay }) {
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}

function onSuccess({ position, delay }) {
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}
