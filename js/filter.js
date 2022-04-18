import { shuffle, debounce} from './util.js';
import { destroyGallery, initGallery } from './gallery.js';

const RANDOM_PHOTOS_COUNT = 10;

const Class = {
  FILTER_INACTIVE: 'img-filters--inactive',
  BTN_ACTIVE: 'img-filters__button--active',
};

const Filter = {
  DEFAULT: 'default',
  RANDOM: 'random',
  DISCUSSED: 'discussed',
};

const filter = document.querySelector('.img-filters');
const filterForm = filter.querySelector('.img-filters__form');
const formButtons = filterForm.querySelectorAll('.img-filters__button');

const compareCommentsNumber = (a, b) => b.comments.length - a.comments.length;

let downloadedPhotos = [];

const getFilteredPhotos = (photos, filterName) => {
  switch (filterName) {
    case Filter.RANDOM:
      return shuffle(photos).slice(0, RANDOM_PHOTOS_COUNT);
    case Filter.DISCUSSED:
      return photos.slice().sort(compareCommentsNumber);
    default:
      return downloadedPhotos;
  }
};

const onFilterClick = (evt) => {
  if (evt.target.dataset.role && !evt.target.classList.contains(Class.BTN_ACTIVE)) {
    formButtons.forEach((btn) => btn.classList.remove(Class.BTN_ACTIVE));
    evt.target.classList.add(Class.BTN_ACTIVE);
    destroyGallery();
    initGallery(getFilteredPhotos(downloadedPhotos.slice(), evt.target.dataset.role));
  }
};

const initFilter = (photos) => {
  downloadedPhotos = photos.slice();
  filter.classList.remove(Class.FILTER_INACTIVE);
  filterForm.addEventListener('click', debounce(onFilterClick));
};

export {
  initFilter
};
