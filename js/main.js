import './data.js';
import './pictures';
import './user-form.js';
import './api.js';
import {getData} from './api.js';
import {renderSimilarListPictures} from './pictures';
import {showAlert} from './util.js';

getData(renderSimilarListPictures, showAlert);
