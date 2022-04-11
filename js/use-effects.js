const effectsList = document.querySelector('.effects__list');
const effectsItems = effectsList.querySelectorAll('.effects__item');
const picrurePreviev = document.querySelector('.img-upload__preview img');
const effectValue= document.querySelector('.effect-level__value');
const effectSlider = document.querySelector('.effect-level__slider');

const addCheckHandler = function (effectItem) {
  const effectsRadio = effectItem.querySelector('.effects__radio');

  effectsRadio.addEventListener('click', () =>{
    picrurePreviev.className = '';
    picrurePreviev.classList.add(`effects__preview--${effectsRadio.value}`);
  });
};

noUiSlider.create(effectSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

const changeheLevelEffect = function () {

  switch(picrurePreviev.className) {
    case 'effects__preview--chrome':
      picrurePreviev.style.filter = `grayscale(${effectValue.value})`;
      break;
    case 'effects__preview--sepia':
      picrurePreviev.style.filter = `sepia(${effectValue.value})`;
      break;
    case 'effects__preview--marvin':
      picrurePreviev.style.filter = `invert(${effectValue.value}%)`;
      break;
    case 'effects__preview--heat':
      picrurePreviev.style.filter = `brightness(${effectValue.value})`;
      break;
    case 'effects__preview--phobos':
      picrurePreviev.style.filter = `blur(${effectValue.value}px)`;
      break;
    case 'effects__preview--none':
      picrurePreviev.style.filter = 'none';
      break;
  }
};

effectSlider.noUiSlider.on('update', () => {
  effectValue.value = effectSlider.noUiSlider.get();
  changeheLevelEffect();
});


const changeSliderRange = function (effectItem) {
  const effectsRadio = effectItem.querySelector('.effects__radio');
  effectSlider.setAttribute('disabled', true);

  effectsRadio.addEventListener('click', () =>{
    if (picrurePreviev.className === 'effects__preview--chrome' || picrurePreviev.className === 'effects__preview--sepia') {
      effectSlider.removeAttribute('disabled');
      effectSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      });
    } else if (picrurePreviev.className === 'effects__preview--marvin') {
      effectSlider.removeAttribute('disabled');
      effectSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 1,
      });
    } else if (picrurePreviev.className === 'effects__preview--heat') {
      effectSlider.removeAttribute('disabled');
      effectSlider.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
    } else if (picrurePreviev.className === 'effects__preview--phobos') {
      effectSlider.removeAttribute('disabled');
      effectSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
    } else if (picrurePreviev.className === 'effects__preview--none') {
      effectSlider.setAttribute('disabled', true);
      effectSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 1,
        connect: 'lower',
      });
    }
  });
};

for (let i = 0; i < effectsItems.length; i++) {
  addCheckHandler(effectsItems[i]);
  changeSliderRange(effectsItems[i]);
}
