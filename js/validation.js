import { sendData } from './api.js';
import { showErrorDownloadMessage, showSuccessMessage } from './message.js';
import { blockModal, closeUploadModal, unblockModal } from './upload.js';

const MAX_COUNT_HASHTAG = 5;
const REGEXP = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

const form = document.querySelector('.img-upload__form');
const textHashtags = form.querySelector('.text__hashtags');
const submitButton = form.querySelector('.img-upload__submit');

const pristine = new window.Pristine(form, {
  classTo: 'img-upload__text',
  errorTextParent: 'img-upload__text',
  errorTextClass: 'hashtag__error',
});

const createHashtagArray = (hashtagText) => hashtagText.toLowerCase().split(' ').filter((el) => el);

const validateHashtag = (hashtagText) => {
  const hashtags = createHashtagArray(hashtagText);
  const isValid = (hashtag) => REGEXP.test(hashtag);
  return hashtags.every(isValid);
};

const checkUniquenessOfHashtag = (hashtagText) => {
  const hashtags = createHashtagArray(hashtagText);
  return new Set(hashtags).size === hashtags.length;
};

const checkNumberOfHashtags = (hashtagText) => {
  const hashtags = createHashtagArray(hashtagText);
  return hashtags.length <= MAX_COUNT_HASHTAG;
};

pristine.addValidator(textHashtags, validateHashtag, 'Хэштег должен начинаться с "#" и содержать буквы и числа (не более 20 символов).', 3, true);
pristine.addValidator(textHashtags, checkUniquenessOfHashtag, 'Хэштеги не должны повторяться.', 2, true);
pristine.addValidator(textHashtags, checkNumberOfHashtags, 'Не более 5 хэштегов.', 1, true);

const blockSubmitButton = () => {
  blockModal();
  submitButton.disabled = true;
  submitButton.textContent = 'Публикуем...';
};

const unblockSubmitButton = () => {
  unblockModal();
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const getFormSubmit = () => {
  unblockSubmitButton();
  closeUploadModal();
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();

  if (!isValid) {
    return;
  }

  pristine.reset();
  form.removeEventListener('submit', onFormSubmit);
  blockSubmitButton();
  sendData(
    () => {
      getFormSubmit();
      showSuccessMessage();
    },
    () => {
      getFormSubmit();
      showErrorDownloadMessage();
    },
    new FormData(evt.target),
  );

};

const initFormValidation = () => {
  form.addEventListener('submit', onFormSubmit);
};

export {
  initFormValidation,
};
