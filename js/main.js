import './data.js';
import './pictures';
import './user-form.js';
import './api.js';
import {getData} from './api.js';
import {renderSimilarListPictures} from './pictures';

getData((similarPictures) => {
  renderSimilarListPictures(similarPictures);
});
