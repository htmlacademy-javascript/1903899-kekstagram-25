import { showErrorDownloadMessage } from './message.js';

const URL_GET = 'https://25.javascript.pages.academy/kekstagram/data';
const URL_SEND = 'https://25.javascript.pages.academy/kekstagram';

export const getData = (onSuccess) => {
  fetch(URL_GET)
    .then((response) => response.json())
    .then((photos) => {
      onSuccess(photos);
    })
    .catch(showErrorDownloadMessage);
};

export const sendData = (onSuccess, onFail, body) => {
  fetch(URL_SEND, {
    method: 'POST',
    body,
  },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};
