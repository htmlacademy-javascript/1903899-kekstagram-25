import {
  renderPictures
} from './thumbnail.js';
import {
  getData
} from './api.js';
import {
  initialFiltering
} from './filter.js';

const initRendering = (photos) => {
  renderPictures(photos);
  initialFiltering(photos);
};

const showGallery = () => {
  getData(initRendering);
};

export {
  showGallery
};
