import {body} from './big-picture';
import {isEscapeKey} from './util.js';

const succesTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');
const succesElement = succesTemplate.cloneNode(true);
const successButton = succesElement.querySelector('.success__button');
const errorElement = errorTemplate.cloneNode(true);
const errorButton =   errorElement.querySelector('.error__button');

const getData = (onSuccess, onFail) => {
  fetch('https://25.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((similarPictures) => {
      if (similarPictures.length) {
        onSuccess(similarPictures);
      } else {
        onFail('Нет данных!');
      }
    })
    .catch((err) => {
      onFail('Невозможно загрузить изображения!');
      console.error(err);
    });
};

const onMessageClickOnRandomArea = (evt) => {
  if (evt.target.className === 'success') {
    succesElement.classList.add('hidden');
  }
  if (evt.target.className === 'error') {
    errorElement.classList.add('hidden');
  }
  document.removeEventListener('click', onMessageClickOnRandomArea);
};

const onMessageEscKeydown = (evt) => {
  if (isEscapeKey(evt) && evt.target === body) {
    evt.preventDefault();
    succesElement.classList.add('hidden');
    errorElement.classList.add('hidden');
    document.removeEventListener('keydown', onMessageEscKeydown);
  }
};
const closeMessage = () => {
  succesElement.classList.add('hidden');
  errorElement.classList.add('hidden');

  successButton.removeEventListener('click', closeMessage);
};

const createSuccessMessage = () => {
  body.appendChild(succesElement);

  succesElement.classList.remove('hidden');
  successButton.addEventListener('click', closeMessage);
  document.addEventListener('keydown', onMessageEscKeydown);
  document.addEventListener('click', onMessageClickOnRandomArea);
};

const createErrorMessage = () => {
  body.appendChild(errorElement);

  errorElement.classList.remove('hidden');
  errorButton.addEventListener('click', closeMessage);
  document.addEventListener('keydown', onMessageEscKeydown);
  document.addEventListener('click', onMessageClickOnRandomArea);
};

const sendData = (onSuccess, onFail, FormBody, SuccessMessage, ErrorMessage) => {
  fetch(
    'https://25.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      type: 'multipart/form-data',
      body: FormBody,
    }
  )
    .then((response) => {
      if (response.ok) {
        onSuccess(SuccessMessage());
      } else {
        onFail(ErrorMessage());
      }
    })
    .catch((err) => {
      onFail(ErrorMessage());
      console.error(err);
    });
};

export {getData, sendData, createErrorMessage, createSuccessMessage};
