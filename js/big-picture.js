import { createThumbnails } from './pictures.js';

const picturesElement = document.querySelector('.pictures');

const bigPictureElement = document.querySelector('.big-picture');
const bigPictureCloseElement = document.querySelector('.big-picture__cancel');
const bigPictureImgElement = document.querySelector('#big-picture__img');
const bigPictureSocialElement = document.querySelector('.big-picture__social');
const likesCountElement = bigPictureSocialElement.querySelector('.likes-count');
const socialCaptionElement = bigPictureSocialElement.querySelector('.social__caption');
const socialCommentCountElement = document.querySelector('.social__comment-count');
const commentsCountElement = socialCommentCountElement.querySelector('.comments-count');
const socialCommentsElement = document.querySelector('.social__comments');
const commentsLoaderElement = document.querySelector('.comments-loader');
const bodyElement = document.querySelector('body');


const setupComments = () => {
  const socialCommentElement = socialCommentsElement.querySelectorAll('.social__comment');

  for (let i = 5; i < socialCommentElement.length; i++) {
    socialCommentElement[i].style.display = 'none';
  }

  if (socialCommentElement.length > 5) {
    let countComment = 5;
    socialCommentCountElement.textContent = `${countComment} из ${socialCommentElement.length} комментариев`;

    const listenerComment = function () {
      countComment += 5;
      if (countComment <= socialCommentElement.length) {
        for (let i = 0; i < countComment; i++) {
          socialCommentElement[i].style.display = null;
        }
        socialCommentCountElement.textContent = `${countComment} из ${socialCommentElement.length} комментариев`;
      }

      if (countComment >= socialCommentElement.length) {
        for (let i = 0; i < socialCommentElement.length; i++) {
          socialCommentElement[i].style.display = null;
          commentsLoaderElement.classList.add('hidden');
          commentsLoaderElement.removeEventListener('click', listenerComment);
        }
        socialCommentCountElement.textContent = `${socialCommentElement.length} из ${commentsCountElement.textContent} комментарияев`;
      }
    };

    commentsLoaderElement.addEventListener('click', listenerComment);
    commentsLoaderElement.classList.remove('hidden');

  } else {
    commentsLoaderElement.classList.add('hidden');
    if (socialCommentElement.length > 1) {
      socialCommentCountElement.textContent = `${socialCommentElement.length} из ${socialCommentElement.length} комментариев`;
    } else {
      socialCommentCountElement.textContent = `${socialCommentElement.length} из ${socialCommentElement.length} комментария`;
    }
  }
};

const addThumbnailClickHandler = function (thumbnail, similarPhotos) {
  thumbnail.addEventListener('click', () => {
    bigPictureElement.classList.remove('hidden');
    bigPictureImgElement.src = thumbnail.querySelector('img').getAttribute('src');
    likesCountElement.textContent = thumbnail.querySelector('.picture__likes').textContent;
    commentsCountElement.textContent = thumbnail.querySelector('.picture__comments').textContent;

    const id = thumbnail.querySelector('img').getAttribute('id');
    socialCommentsElement.innerHTML = '';

    similarPhotos.find((photo) => String(photo.id) === id).comments.forEach(({avatar, name, message}) => {
      bigPictureElement.querySelector('.social__comments').insertAdjacentHTML('beforeend', `
          <li class="social__comment">
            <img
              class="social__picture"
              src="${avatar}"
              alt="${name}"
              width="35" height="35">
            <p class="social__text">${message}</p>
          </li>`);
    });

    socialCaptionElement.textContent = similarPhotos.find((photo) => String(photo.id) === id).description;
    setupComments();

    bodyElement.classList.add('modal-open');
  });
};


const renderSimularList = (similarPhotos) => {
  const similarPicturesFragment = createThumbnails(similarPhotos);
  picturesElement.appendChild(similarPicturesFragment);
  const thumbnails = document.querySelectorAll('.picture');

  for (const thumbnail of thumbnails) {
    addThumbnailClickHandler(thumbnail, similarPhotos);
  }
};

bigPictureCloseElement.addEventListener('click', () => {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
});

document.addEventListener('click', (evt) => {
  if(evt.key === 'Escape') {
    bigPictureElement.classList.add('hidden');
    bodyElement.classList.remove('modal-open');
  }
});
