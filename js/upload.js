import { initScale, destroyScale } from './scale.js';
import { initSlider, destroySlider } from './slider.js';
import { isEscapeKey } from './util.js';
import { initFormValidation } from './validation.js';

const FILE_TYPES = ['png', 'jpeg', 'jpg', 'gif'];

const uploadForm = document.querySelector('.img-upload__form');
const fileInput = uploadForm.querySelector('.img-upload__input');
const imageUploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const preview = document.querySelector('.img-upload__preview img');
const btnCloseModal = uploadForm.querySelector('#upload-cancel');
const hashtagArea = uploadForm.querySelector('.text__hashtags');
const descriptionArea = uploadForm.querySelector('.text__description');

let isForbiddenToClose = false;

const renderPreview = () => {
  const file = fileInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((fileExtension) => fileName.endsWith(fileExtension));

  if (matches) {
    preview.src = URL.createObjectURL(file);
  }
};

export const closeUploadModal = () => {
  imageUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  destroyScale();
  destroySlider();
  uploadForm.reset();
  hashtagArea.removeEventListener('focusin', onHashtagAreaFocus);
  descriptionArea.removeEventListener('focusin', onDescriptionAreaFocus);
};

const onDocumentKeydown = (evt) => {
  if(isEscapeKey(evt) && !isForbiddenToClose) {
    closeUploadModal();
  }
};

const onBtnCloseModalClick = () => {
  closeUploadModal();
};

const onHashtagAreaOut = () => {
  isForbiddenToClose = false;
  hashtagArea.removeEventListener('focusout', onHashtagAreaOut);
};

const onDescriptionAreaOut = () => {
  isForbiddenToClose = false;
  descriptionArea.removeEventListener('focusout', onDescriptionAreaOut);
};

function onHashtagAreaFocus() {
  isForbiddenToClose = true;
  hashtagArea.addEventListener('focusout', onHashtagAreaOut);
}

function onDescriptionAreaFocus() {
  isForbiddenToClose = true;
  descriptionArea.addEventListener('focusout', onDescriptionAreaOut);
}

const openUploadModal = () => {
  imageUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  renderPreview();
  initScale();
  initSlider();
  initFormValidation(closeUploadModal);

  btnCloseModal.addEventListener('click', onBtnCloseModalClick);
  document.addEventListener('keydown', onDocumentKeydown);
  hashtagArea.addEventListener('focusin', onHashtagAreaFocus);
  descriptionArea.addEventListener('focusin', onDescriptionAreaFocus);
};

const onUploadFormChange = () => {
  openUploadModal();
};

const initUpload = () => {
  fileInput.addEventListener('change', onUploadFormChange);
};

const blockModal = () => {
  btnCloseModal.removeEventListener('click', onBtnCloseModalClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('keydown', onDocumentKeydown);
};

const unblockModal = () => {
  btnCloseModal.addEventListener('click', onBtnCloseModalClick);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('keydown', onDocumentKeydown);
};

export {
  initUpload,
  preview,
  blockModal,
  unblockModal,
};
