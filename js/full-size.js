import {
  isEscapeKey
} from './util.js';

const bigPicture = document.querySelector('.big-picture');
const bigImage = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const socialComments = bigPicture.querySelector('.social__comments');
const commentTemplate = bigPicture.querySelector('.social__comment');
const socialCaption = bigPicture.querySelector('.social__caption');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const closeButton = bigPicture.querySelector('.big-picture__cancel');

const COMMENTS_BLOCK = 5;

let commentsToRenderCount = COMMENTS_BLOCK;
let commentsArray;

const renderComments = () => {
  if (commentsArray.length <= commentsToRenderCount) {
    commentsToRenderCount = commentsArray.length;
    commentsLoader.classList.add('hidden');
  }

  socialCommentCount.textContent = `${commentsToRenderCount} из ${commentsArray.length} комментариев`;

  const commentsToShow = commentsArray.slice(0, commentsToRenderCount);

  const fragment = document.createDocumentFragment();

  commentsToShow.forEach((comment) => {
    const socialComment = commentTemplate.cloneNode(true);
    const commentAvatar = socialComment.querySelector('.social__picture');
    const commentMessage = socialComment.querySelector('.social__text');

    commentAvatar.src = comment.avatar;
    commentAvatar.alt = comment.name;
    commentMessage.textContent = comment.message;
    fragment.appendChild(socialComment);
  });

  socialComments.innerHTML = '';
  socialComments.appendChild(fragment);

  commentsToRenderCount += COMMENTS_BLOCK;
};

const closeFullSizeImage = (listener) => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', listener);
  commentsLoader.removeEventListener('click', renderComments);

  commentsToRenderCount = COMMENTS_BLOCK;
  commentsLoader.classList.remove('hidden');
};

const onImageEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullSizeImage(onImageEscKeydown);
  }
};

const onCloseButtonClick = () => {
  closeFullSizeImage(onImageEscKeydown);
};

const openFullSizeImage = () => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onImageEscKeydown);
  commentsLoader.addEventListener('click', renderComments);
};

const generateModal = (photo) => {
  const {
    url,
    description,
    likes,
    comments
  } = photo;
  bigImage.src = url;
  likesCount.textContent = likes;
  socialCaption.textContent = description;

  commentsArray = comments;

  renderComments();
  openFullSizeImage();
};

closeButton.addEventListener('click', onCloseButtonClick);

export {
  generateModal,
  onCloseButtonClick
};

// const bigPicture = document.querySelector('.big-picture');
// const body = document.querySelector('body');
// const bigImage = bigPicture.querySelector('.big-picture__img img');
// const likesCount = bigPicture.querySelector('.likes-count');
// const commentsCount = bigPicture.querySelector('.comments-count');
// const socialCaption = bigPicture.querySelector('.social__caption');
// const socialComments = bigPicture.querySelector('.social__comments');
// const socialCommentsCount = bigPicture.querySelector('.social__comment-count');
// const closeButton = bigPicture.querySelector('.big-picture__cancel');
// const commentsLoader = bigPicture.querySelector('.comments-loader');

// const commentsState = {
//   countRenderComments: 0,
//   step: 5,
// };

// const renderComments = ({avatar, message, name}) => {
//   const commentsListItem = document.createElement('li');
//   commentsListItem.classList.add('social__comment');
//   const commentsPicture = document.createElement('img');
//   commentsPicture.classList.add('social__picture');
//   commentsPicture.src = avatar;
//   commentsPicture.alt = name;
//   const commentsText = document.createElement('p');
//   commentsText.classList.add('social__text');
//   commentsText.textContent = message;

//   commentsListItem.append(commentsPicture);
//   commentsListItem.append(commentsText);
//   socialComments.append(commentsListItem);
// };

// const onCommentsLoaderClick = () => {
//   if (commentsState.totalCountComments > commentsState.countRenderComments + commentsState.step) {
//     for (let i = commentsState.countRenderComments; i < commentsState.countRenderComments + commentsState.step; i++) {
//       renderComments(commentsState.comments[i]);
//     }
//     commentsState.countRenderComments = commentsState.countRenderComments + commentsState.step;
//     socialCommentsCount.textContent = `${commentsState.countRenderComments} из ${commentsState.totalCountComments} комментариев`;
//   } else {
//     for (let i = commentsState.countRenderComments; i < commentsState.totalCountComments; i++) {
//       renderComments(commentsState.comments[i]);
//     }
//     commentsState.countRenderComments = commentsState.totalCountComments;
//     socialCommentsCount.textContent = `${commentsState.countRenderComments} из ${commentsState.totalCountComments} комментариев`;
//   }
//   if (commentsState.countRenderComments === commentsState.totalCountComments) {
//     commentsLoader.style.display = 'none';
//   }
// };

// const generateModal = (data) => {
//   const {url, likes, comments, description} = data;
//   commentsState.comments = comments;
//   commentsState.totalCountComments = comments.length;
//   commentsState.countRenderComments = 0;

//   if (commentsState.totalCountComments > commentsState.countRenderComments + commentsState.step) {
//     commentsLoader.style.display = 'block';
//   }

//   bigImage.src = url;
//   likesCount.textContent = likes;
//   commentsCount.textContent = comments.length;
//   socialCaption.textContent = description;
//   socialComments.innerHTML = '';

//   onCommentsLoaderClick();
//   commentsLoader.addEventListener('click', onCommentsLoaderClick);

//   if (commentsState.totalCountComments > commentsState.countRenderComments + commentsState.step) {
//     for (let i = commentsState.countRenderComments; i < commentsState.countRenderComments + commentsState.step; i++) {
//       renderComments(commentsState.comments[i]);
//     }
//     commentsState.countRenderComments = commentsState.countRenderComments + commentsState.step;
//     socialCommentsCount.textContent = `${commentsState.countRenderComments} из ${commentsState.totalCountComments} комментариев`;
//   } else {
//     for (let i = commentsState.countRenderComments; i < commentsState.totalCountComments; i++) {
//       renderComments(commentsState.comments[i]);
//     }
//     commentsState.countRenderComments = commentsState.totalCountComments;
//     socialCommentsCount.textContent = `${commentsState.countRenderComments} из ${commentsState.totalCountComments} комментариев`;
//   }
// };

// const onPopupEscKeydown = (evt) => {
//   if (isEscapeKey(evt)) {
//     evt.preventDefault();
//     bigPicture.classList.add('hidden');
//     body.classList.remove('modal-open');
//   }
// };

// const openUserModal = () => {
//   bigPicture.classList.remove('hidden');
//   body.classList.add('modal-open');

//   document.addEventListener('keydown', onPopupEscKeydown);
// };

// const closeUserModal = () => {
//   bigPicture.classList.add('hidden');
//   body.classList.remove('modal-open');

//   document.removeEventListener('keydown', onPopupEscKeydown);
//   commentsLoader.removeEventListener('click', onCommentsLoaderClick);
// };

// closeButton.addEventListener('click', () => {
//   closeUserModal();
// });

// export {generateModal, openUserModal, body};
