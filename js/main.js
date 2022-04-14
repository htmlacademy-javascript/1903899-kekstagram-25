import './pictures';
import './form.js';
import './api.js';
import {getData} from './api.js';
import {renderSimilarListPictures} from './pictures.js';
import {showAlert} from './util.js';

getData(renderSimilarListPictures, showAlert);
