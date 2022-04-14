import {generateModal, openUserModal} from './big-picture';
import {getRandomArrayElement} from './util.js';
import {getData} from './api.js';
import {debounce} from './util.js';

const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const similarListElement = document.querySelector('.pictures');
const filters = document.querySelector('.img-filters');
const randomButton = filters.querySelector('#filter-random');
const discussedButton = filters.querySelector('#filter-discussed');
const defaultButton = filters.querySelector('#filter-default');

const RERENDER_DELAY = 500;

const getRandomImages = (similarPictures) => {
  const arr = [];

  for (let i = 0; i < 10; i++) {
    let random = getRandomArrayElement(similarPictures);

    if (arr.includes(random)) {
      random = getRandomArrayElement(similarPictures);
    }
    arr.push(random);
  }
  return arr;
};

const renderSimilarListPictures = (similarPictures) => {
  const pictures = document.querySelectorAll('.picture');
  for (let i = 0; i < pictures.length; i++) {
    pictures[i].remove();
  }

  const similarListFragment = document.createDocumentFragment();

  similarPictures.forEach((data) => {
    const {url, likes, comments} = data;
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureElement.addEventListener('click', () => {
      generateModal(data);
      openUserModal();
    });
    similarListFragment.appendChild(pictureElement);
  });

  similarListElement.appendChild(similarListFragment);
  filters.classList.remove('img-filters--inactive');
};

randomButton.addEventListener('click', debounce(() => {
  randomButton.classList.add('img-filters__button--active');
  defaultButton.classList.remove('img-filters__button--active');
  discussedButton.classList.remove('img-filters__button--active');

  getData((similarPictures) => {
    const result = getRandomImages(similarPictures);
    renderSimilarListPictures(result);
  });
},RERENDER_DELAY));

defaultButton.addEventListener('click', debounce(() => {
  defaultButton.classList.add('img-filters__button--active');
  randomButton.classList.remove('img-filters__button--active');
  discussedButton.classList.remove('img-filters__button--active');

  getData((similarPictures) => {
    renderSimilarListPictures(similarPictures);
  });
},RERENDER_DELAY));

discussedButton.addEventListener('click', debounce(() => {
  discussedButton.classList.add('img-filters__button--active');
  randomButton.classList.remove('img-filters__button--active');
  defaultButton.classList.remove('img-filters__button--active');

  getData((similarPictures) => {
    const result = similarPictures.slice();
    result.sort((a, b) => b.comments.length - a.comments.length);
    renderSimilarListPictures(result);
  });
}, RERENDER_DELAY));

export {renderSimilarListPictures};
