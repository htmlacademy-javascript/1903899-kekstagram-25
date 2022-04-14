const picrurePreviev = document.querySelector('.img-upload__preview img');
const imgUploadEffects = document.querySelector('.img-upload__effects');
const effectLevel = document.querySelector('.img-upload__effect-level');
const effectValue = effectLevel.querySelector('.effect-level__value');
const effectSlider = effectLevel.querySelector('.effect-level__slider');

let currentEffect;

window.noUiSlider.create(effectSlider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});

const hideSlider = () => {
  if (currentEffect === 'none') {
    effectLevel.classList.add('hidden');
  } else {
    effectLevel.classList.remove('hidden');
  }
};

const resetSlider = () => {
  effectSlider.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  });
};

const resetEffects = () => {
  currentEffect = 'none';
  resetSlider();
};

const onEffectChange = (evt) => {
  picrurePreviev.classList.remove(`effects__preview--${currentEffect}`);
  currentEffect = evt.target.value;
  picrurePreviev.classList.add(`effects__preview--${currentEffect}`);

  hideSlider();

  if (currentEffect === 'none' || currentEffect === 'chrome' || currentEffect === 'sepia') {
    resetSlider();
  }

  if (currentEffect === 'marvin') {
    effectSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    });
  }

  if (currentEffect === 'phobos') {
    effectSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
  }

  if (currentEffect === 'heat') {
    effectSlider.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
  }

};

effectSlider.noUiSlider.on('update', () => {
  effectValue.value = effectSlider.noUiSlider.get();

  if (currentEffect === 'none') {
    picrurePreviev.style.filter = 'none';
  }

  if (currentEffect === 'chrome') {
    picrurePreviev.style.filter = `grayscale(${effectValue.value})`;
  }

  if (currentEffect === 'sepia') {
    picrurePreviev.style.filter = `sepia(${effectValue.value})`;
  }

  if (currentEffect === 'marvin') {
    picrurePreviev.style.filter = `invert(${effectValue.value}%)`;
  }

  if (currentEffect === 'phobos') {
    picrurePreviev.style.filter = `blur(${effectValue.value}px)`;
  }
  if (currentEffect === 'heat') {
    picrurePreviev.style.filter = `brightness(${effectValue.value})`;
  }
});

imgUploadEffects.addEventListener('change', onEffectChange);

const initSlider = () => {
  currentEffect = 'none';
  hideSlider();
};

export {
  initSlider,
  resetEffects
};
