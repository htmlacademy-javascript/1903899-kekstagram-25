import { isEscapeKey } from './util.js';

const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const successTemplate = document.querySelector('#success').content.querySelector('.success');

export const showSuccessMessage = () => {
  const successMessage = successTemplate.cloneNode(true);
  const successButton = successMessage.querySelector('.success__button');
  document.body.appendChild(successMessage);

  const removeSuccessMessage = () => {
    successMessage.remove();
    document.removeEventListener('click', onDocumentClick);
    document.removeEventListener('keydown', onDocumentKeydown);
  };

  function onDocumentKeydown(evt) {
    if(isEscapeKey(evt)) {
      removeSuccessMessage();
    }
  }

  function onDocumentClick(evt) {
    evt.preventDefault();
    if (evt.target === successButton || !evt.target.closest('.error__inner')) {
      removeSuccessMessage();
    }
  }

  const onErrorButtonClick = (evt) => {
    evt.preventDefault();
    removeSuccessMessage();
  };

  successButton.addEventListener('click', onErrorButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
};

export const showErrorDownloadMessage = (isDownload = false) => {
  const errorMessage = errorTemplate.cloneNode(true);
  const errorTitle = errorMessage.querySelector('.error__title');
  const errorButton = errorMessage.querySelector('.error__button');
  document.body.appendChild(errorMessage);

  if (isDownload) {
    errorTitle.textContent = 'Ошибка загрузки данных';
    errorButton.textContent = 'Ок';
  }

  const removeErrorMessage = () => {
    errorMessage.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('click', onDocumentClick);
  };

  function onDocumentKeydown(evt) {
    if(isEscapeKey(evt)) {
      removeErrorMessage();
    }
  }

  function onDocumentClick(evt) {
    evt.preventDefault();
    if (evt.target === errorButton || !evt.target.closest('.error__inner')) {
      removeErrorMessage();
    }
  }

  const onErrorButtonClick = (evt) => {
    evt.preventDefault();
    removeErrorMessage();
  };

  errorButton.addEventListener('click', onErrorButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
};
