const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let colorId = null;

stopBtn.disabled = true;

///////////////// Function Random Color ////////////////////

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

//////////////// Start Change ////////////////////////////

startBtn.addEventListener('click', onChangeColor);

function onChangeColor() {
  colorId = setInterval(() => {
    startBtn.disabled = true;
    stopBtn.disabled = false;

    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

/////////////////// Stop change //////////////////////////

stopBtn.addEventListener('click', () => {
  startBtn.disabled = false;
  stopBtn.disabled = true;

  clearInterval(colorId);
});
