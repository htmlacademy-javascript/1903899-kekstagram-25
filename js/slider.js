import { preview } from './upload.js';

const DEFAULT_SLIDER_EFFECT = {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
};

const Effect = {
  DEFAULT: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
};

const imgUploadEffects = document.querySelector('.img-upload__effects');
const effectLevel = document.querySelector('.img-upload__effect-level');
const effectValue = effectLevel.querySelector('.effect-level__value');
const effectSlider = effectLevel.querySelector('.effect-level__slider');

let currentEffect;

window.noUiSlider.create(effectSlider, {
  ...DEFAULT_SLIDER_EFFECT,
  connect: 'lower',
});

const hideSlider = () => {
  effectLevel.classList[currentEffect === 'none' ? 'add' : 'remove']('hidden');
};

const resetSlider = () => {
  effectSlider.noUiSlider.updateOptions(DEFAULT_SLIDER_EFFECT);
};

const resetEffects = () => {
  currentEffect = Effect.DEFAULT;
  resetSlider();
};

const onEffectChange = (evt) => {
  preview.classList.remove(`effects__preview--${currentEffect}`);
  currentEffect = evt.target.value;
  preview.classList.add(`effects__preview--${currentEffect}`);

  hideSlider();

  if (currentEffect === Effect.DEFAULT || currentEffect === Effect.CHROME || currentEffect === Effect.SEPIA) {
    resetSlider();
  }

  if (currentEffect === Effect.MARVIN) {
    effectSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    });
  }

  if (currentEffect === Effect.PHOBOS) {
    effectSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
  }

  if (currentEffect === Effect.HEAT) {
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

  if (currentEffect === Effect.DEFAULT) {
    preview.style.filter = 'none';
  }

  if (currentEffect === Effect.CHROME) {
    preview.style.filter = `grayscale(${effectValue.value})`;
  }

  if (currentEffect === Effect.SEPIA) {
    preview.style.filter = `sepia(${effectValue.value})`;
  }

  if (currentEffect === Effect.MARVIN) {
    preview.style.filter = `invert(${effectValue.value}%)`;
  }

  if (currentEffect === Effect.PHOBOS) {
    preview.style.filter = `blur(${effectValue.value}px)`;
  }
  if (currentEffect === Effect.HEAT) {
    preview.style.filter = `brightness(${effectValue.value})`;
  }
});

const initSlider = () => {
  currentEffect = Effect.DEFAULT;
  imgUploadEffects.addEventListener('change', onEffectChange);
  hideSlider();
};

const destroySlider = () => {
  resetEffects();
  imgUploadEffects.removeEventListener('change', onEffectChange);
};

export {
  initSlider,
  destroySlider,
};
