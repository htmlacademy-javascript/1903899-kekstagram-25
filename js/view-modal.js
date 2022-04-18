import { isEscapeKey } from './util.js';

const DEFAULT_COUNT_COMMENT = 5;

const modal = document.querySelector('.big-picture');
const btnClose = document.querySelector('.big-picture__cancel');
const img = modal.querySelector('.big-picture__img img');
const likesCount = modal.querySelector('.likes-count');
const socialCaption = modal.querySelector('.social__caption');
const btnLoadMore = modal.querySelector('.social__comments-loader');
const commentContainer = modal.querySelector('.social__comments');
const commentCount = modal.querySelector('.social__comment-count');

const getCommentTemplate = ({avatar, name, message}) => `<li class="social__comment">
  <img class="social__picture" src="${avatar}" alt="Аватар ${name}" width="35" height="35">
  <p class="social__text">${message}</p>
</li>`;

const renderCommentsCount = (renderedCommentsCount ,allCommentsCount) => {
  commentCount.innerHTML = `${renderedCommentsCount} из <span class="comments-count">${allCommentsCount}</span> комментариев`;
};

const renderCommentsList = (comments) => {
  comments.forEach((comment) => {
    const commentTemplate = getCommentTemplate(comment);
    commentContainer.insertAdjacentHTML('afterbegin', commentTemplate);
  });
};

let visibleCountComment = DEFAULT_COUNT_COMMENT;
let visibleComments = [];
let allComments = [];

const onBtnLoadMoreClick = () => {
  commentContainer.innerHTML = '';
  visibleCountComment += DEFAULT_COUNT_COMMENT;
  visibleComments = allComments.slice(0, visibleCountComment > allComments.length ? allComments.length : visibleCountComment);

  if (visibleComments.length === allComments.length) {
    btnLoadMore.classList.add('hidden');
    btnLoadMore.removeEventListener('click', onBtnLoadMoreClick);
  }

  renderCommentsList(visibleComments);
  renderCommentsCount(visibleComments.length, allComments.length);
};

const initCommentsBlock = (comments) => {
  visibleComments = comments.slice(0, visibleCountComment);

  renderCommentsList(visibleComments);
  renderCommentsCount(visibleComments.length, comments.length);

  if (allComments.length > DEFAULT_COUNT_COMMENT) {
    btnLoadMore.addEventListener('click', onBtnLoadMoreClick);
  } else {
    btnLoadMore.classList.add('hidden');
  }
};

const closeModal = () => {
  modal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  btnClose.removeEventListener('click', onBtnCloseClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  commentContainer.innerHTML = '';
  visibleComments = [];
  visibleCountComment = DEFAULT_COUNT_COMMENT;
  btnLoadMore.classList.remove('hidden');
};

function onBtnCloseClick() {
  closeModal();
}

function onDocumentKeydown(evt) {
  if(isEscapeKey(evt)) {
    closeModal();
  }
}

const openModal = () => {
  modal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  btnClose.addEventListener('click', onBtnCloseClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

export const initViewModal = ({url, description, likes, comments}) => {
  img.src = url;
  likesCount.textContent = likes;
  socialCaption.textContent = description;
  allComments = comments.slice();
  initCommentsBlock(comments);

  openModal();
};
