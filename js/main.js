import { getData } from './api.js';
import { initFilter } from './filter.js';
import { initGallery} from './gallery.js';
import { initUpload } from './upload.js';

const initApp = (photos) => {
  initFilter(photos);
  initGallery(photos);
};

initUpload();

getData(initApp);
