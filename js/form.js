import {body} from './big-picture';
import {isEscapeKey} from './util.js';
import './use-effects.js';
import {sendData, createErrorMessage, createSuccessMessage} from './api.js';


const inputElement = document.querySelector('#upload-file');
const picrurePreviev = document.querySelector('.img-upload__preview img');
const imageEditingForm = document.querySelector('.img-upload__overlay');
const closeButtonForm = document.querySelector('.img-upload__cancel');
const form = document.querySelector('.img-upload__form');
const hashtagsText = form.querySelector('.text__hashtags');
const descriptionText = form.querySelector('.text__description');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const submitButton = document.querySelector('.img-upload__submit');
const InputOriginalEffect = document.querySelector('#effect-none');
const effectSlider = document.querySelector('.effect-level__slider');
const effectLevel = document.querySelector('.img-upload__effect-level');

const IMAGE_TYPES = ['jpg', 'jpeg', 'png'];

inputElement.addEventListener('change', (evt) => {
  const file = evt.target.files[0];
  if (!file) {return;}
  const fileExtension = file.name.toLowerCase().split('.').at(-1);

  const isImage = IMAGE_TYPES.includes(fileExtension);
  if (isImage) {
    picrurePreviev.src = URL.createObjectURL(file);
  }
});
const onFormEscKeydown = (evt) => {
  if (isEscapeKey(evt) && evt.target !== descriptionText && evt.target !== hashtagsText) {
    evt.preventDefault();
    imageEditingForm.classList.add('hidden');
    body.classList.remove('modal-open');
    picrurePreviev.className = 'effects__preview--none';
    picrurePreviev.style.filter = 'none';
    inputElement.value = null;
    InputOriginalEffect.checked = 'checked';
    effectLevel.style.display = 'none';
    hashtagsText.value = '';
    descriptionText.value = '';
  }
};

const scaleState = {
  step: 25,
  maxValue: 100,
  mainValue: 25,
  defaultValue: 100,
};

const onScaleMinResize = () => {
  if (parseInt(scaleControlValue.value, 10) > scaleState.mainValue) {
    scaleControlValue.value = `${parseInt(scaleControlValue.value, 10) - scaleState.step} %`;
    picrurePreviev.style.transform = `scale(${parseInt(scaleControlValue.value, 10)/100})`;
  }
};

const onScaleMaxResize = () => {
  if (parseInt(scaleControlValue.value, 10) < scaleState.maxValue) {
    scaleControlValue.value = `${parseInt(scaleControlValue.value, 10) + scaleState.step} %`;
    picrurePreviev.style.transform = `scale(${parseInt(scaleControlValue.value, 10)/100})`;
  }
};

const onUserFormOpen = () => {
  imageEditingForm.classList.remove('hidden');
  body.classList.add('modal-open');
  scaleControlValue.value =`${scaleState.defaultValue} %`;

  document.addEventListener('keydown', onFormEscKeydown);
  scaleControlSmaller.addEventListener('click', onScaleMinResize);
  scaleControlBigger.addEventListener('click', onScaleMaxResize);
};

inputElement.addEventListener('change', onUserFormOpen);


const onUserFormClose = () => {
  imageEditingForm.classList.add('hidden');
  body.classList.remove('modal-open');
  picrurePreviev.className = 'effects__preview--none';
  picrurePreviev.style.filter = 'none';
  inputElement.value = null;
  InputOriginalEffect.checked = 'checked';
  effectSlider.setAttribute('disabled', true);
  effectLevel.style.display = 'none';
  effectSlider.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
  });
  picrurePreviev.style.transform = 'scale(1)';
  hashtagsText.value = '';
  descriptionText.value = '';

  document.removeEventListener('keydown', onFormEscKeydown);
  scaleControlSmaller.removeEventListener('click', onScaleMinResize);
  scaleControlBigger.removeEventListener('click', onScaleMaxResize);
};

closeButtonForm.addEventListener('click', onUserFormClose);
closeButtonForm.addEventListener('click', onUserFormClose);


//валидатор
const pristine = new Pristine(form, {
  classTo: 'text__label',
  errorTextParent: 'text__label',
  errorTextClass: 'text__label--error-text',
});
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const setUserFormSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          unblockSubmitButton();
        },
        () => {
          unblockSubmitButton();
          onUserFormClose();
        },
        new FormData(evt.target),
        createSuccessMessage,
        createErrorMessage,
      );
    }
  });
};

setUserFormSubmit(onUserFormClose);

pristine.addValidator(hashtagsText, (value) => {
  const result = value.split(' ').reduce((acc, hashtag) => {
    if (acc === false) {
      return false;
    }
    if (hashtag.startsWith('#') || value.length === 0) {
      return true;
    }
    return false;
  }, true);
  return result;
}, 'Хэш-тег начинается с символа # (решётка)', 2, false);

pristine.addValidator(hashtagsText, (value) => {
  if (value.length === 0) {
    return true;
  }

  const re = /^[#A-Za-zА-Яа-яЁё0-9 ]{1,}$/;
  const result = re.test(value);
  return result;
}, 'Строка после решётки должна состоять из букв и чисел', 2, false);

pristine.addValidator(hashtagsText, (value) => {
  const result = value.split(' ').reduce((acc, hashtag) => {
    if (acc === false) {
      return false;
    }
    if (hashtag.length < 19) {
      return true;
    }
  }, true);
  return result;
}, 'Максимальная длина одного хэш-тега 20 символов', 2, false);

pristine.addValidator(hashtagsText, (value) => {
  const result = value.toLowerCase().split(' ');
  const arr = [];
  for (let i = 0; i < result.length; i++) {
    if (arr.includes(result[i])) {
      return false;
    }
    arr.push(result[i]);
  }
  return result;
}, 'Один и тот же хэш-тег не может быть использован дважды', 2, false);

pristine.addValidator(hashtagsText, (value) => {
  const result = value.split(' ');
  if (result.length > 5) {
    return false;
  }
  return result;
}, 'Нельзя указать больше пяти хэш-тегов', 2, false);

pristine.addValidator(hashtagsText, (value) => {
  const result = value.split(' ');
  for (let i = 0; i< result.length; i++) {
    if (result[i].length === 1) {
      return false;
    }
  }
  return result;
}, 'Хеш-тег не может состоять только из одной решётки;', 2, false);

export {onUserFormClose, setUserFormSubmit};
