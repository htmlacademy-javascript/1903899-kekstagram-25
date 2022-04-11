import {body} from './big-picture';
import {showAlert} from './util.js';
import {isEscapeKey} from './util.js';

const succesTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const getData = (onSuccess) => {
  fetch('https://25.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((similarPictures) => {
      if (similarPictures.length) {
        onSuccess(similarPictures);
      } else {
        showAlert('Нет данных!');
      }
    })
    .catch((err) => {
      showAlert('Невозможно загрузить изображения!');
    });
};
const succesElement = succesTemplate.cloneNode(true);
const successButton = succesElement.querySelector('.success__button');

const onSuccessMessageEscKeydown = (evt) => {
  if (isEscapeKey(evt) && evt.target === body) {
    evt.preventDefault();
    succesElement.classList.add('hidden');
    document.removeEventListener('keydown', onSuccessMessageEscKeydown);
  }
};

const closeSuccessMessage = function () {
  succesElement.classList.add('hidden');

  successButton.removeEventListener('click', closeSuccessMessage);
};

const onSuccessMessageClickOnRandomArea = function (evt) {
  if (evt.target.className === 'success') {
    succesElement.classList.add('hidden');
  }
};

const createSuccessMessage = function () {
  succesElement.querySelector('.success__inner');
  succesElement.querySelector('.success__title');
  succesElement.querySelector('.success__button');

  body.appendChild(succesElement);

  succesElement.classList.remove('hidden');
  successButton.addEventListener('click', closeSuccessMessage);
  document.addEventListener('keydown', onSuccessMessageEscKeydown);
  document.addEventListener('click', onSuccessMessageClickOnRandomArea);
};

const errorElement = errorTemplate.cloneNode(true);
const errorButton =   errorElement.querySelector('.error__button');


const onErrorMessageEscKeydown = (evt) => {
  if (isEscapeKey(evt) && evt.target === body) {
    evt.preventDefault();
    errorElement.classList.add('hidden');
    document.removeEventListener('keydown', onErrorMessageEscKeydown);
  }
};

const onErrorMessageClickOnRandomArea = function (evt) {
  if (evt.target.className === 'error') {
    errorElement.classList.add('hidden');
  }
  document.removeEventListener('click', onErrorMessageClickOnRandomArea);
};

const closeErrorMessage = function () {
  errorElement.classList.add('hidden');

  errorButton.removeEventListener('click', closeErrorMessage);
};

const createErrorMessage = function () {
  errorElement.querySelector('.error__inner');
  errorElement.querySelector('.error__title');

  body.appendChild(errorElement);

  errorElement.classList.remove('hidden');
  errorButton.addEventListener('click', closeErrorMessage);
  document.addEventListener('keydown', onErrorMessageEscKeydown);
  document.addEventListener('click', onErrorMessageClickOnRandomArea);
};


const sendData = (onSuccess, onFail, FormBody) => {
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
        onSuccess(createSuccessMessage());
      } else {
        onFail(createErrorMessage());
      }
    })
    .catch((err) => {
      onFail(createErrorMessage());
    });
};

export {getData, sendData};
