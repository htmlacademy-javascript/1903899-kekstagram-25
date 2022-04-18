import { preview as imgUploadPreview} from './upload.js';

const SCALE_STEP = 25;

const Scale = {
  MIN: 25,
  MAX: 100,
};

const imgUploadScale = document.querySelector('.img-upload__scale');
const scaleControlSmaller = imgUploadScale.querySelector('.scale__control--smaller');
const scaleControlBigger = imgUploadScale.querySelector('.scale__control--bigger');
const scaleControlValue = imgUploadScale.querySelector('.scale__control--value');

let scale = Scale.MAX;

const scalePreview = () => {
  scaleControlValue.value = `${scale}%`;
  imgUploadPreview.style.transform = `scale(${scale / Scale.MAX})`;
};

const scaleUp = () => {
  scale = Math.min(scale + SCALE_STEP, Scale.MAX);

  scalePreview();
};

const scaleDown = () => {
  scale = Math.max(scale - SCALE_STEP, Scale.MIN);

  scalePreview();
};

const initScale = () => {
  scaleControlBigger.addEventListener('click', scaleUp);
  scaleControlSmaller.addEventListener('click', scaleDown);
  scale = Scale.MAX;
  scalePreview();
};

const destroyScale = () => {
  scaleControlBigger.removeEventListener('click', scaleUp);
  scaleControlSmaller.removeEventListener('click', scaleDown);

  scale = Scale.MAX;
  scalePreview();
};


export {
  initScale,
  destroyScale,
};
