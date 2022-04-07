import {getRandomArrayElement, getRandomPositiveInteger} from '.util.js';
import {PHOTOS_COUNT, COMMENTS_COUNT} from '.const.js';
import {COMMENT_MESSAGES, NAMES, DESCRIPTIONS, LikesCount} from '.mock-data.js';

const createComment = (index) => ({
  id: `comment-${index}`,
  avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
  message: getRandomArrayElement(COMMENT_MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const createPhotoDescription = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomPositiveInteger(LikesCount.MIN, LikesCount.MAX),
  comments: Array.from({
    length: COMMENTS_COUNT
  }, (item, commentIndex) => createComment(index + 1)),
});

const photosDescriptions = Array.from({
  length: PHOTOS_COUNT
}, (item, index) => createPhotoDescription(index + 1));

export {photosDescriptions};
