import { initViewModal } from './view-modal.js';

const gallery = document.querySelector('.pictures');

const initGallery = (photos) => {
  const fragment = document.createDocumentFragment();
  const template = document.querySelector('#picture').content.querySelector('.picture');

  photos.forEach((photo) => {
    const {url, likes, comments} = photo;

    const thumbnail = template.cloneNode(true);
    thumbnail.querySelector('.picture__img').src = url;
    thumbnail.querySelector('.picture__likes').textContent = likes;
    thumbnail.querySelector('.picture__comments').textContent = comments.length;

    thumbnail.addEventListener('click', () => initViewModal(photo));
    fragment.appendChild(thumbnail);
  });

  gallery.appendChild(fragment);
};


const destroyGallery = () => {
  const pictures = gallery.querySelectorAll('.picture');

  pictures.forEach((picture) => picture.remove());
};

export { initGallery, destroyGallery };
