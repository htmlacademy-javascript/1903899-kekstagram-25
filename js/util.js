const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];


const showAlertError = () => {

  const alertContainer = document.querySelector('#error').content.querySelector('.error');
  document.body.append(alertContainer);

};

const showAlertSuccess = () => {

  const alertContainer = document.querySelector('#success').content.querySelector('.success');
  document.body.append(alertContainer);

};

export {getRandomArrayElement, getRandomPositiveInteger, showAlertSuccess, showAlertError};

