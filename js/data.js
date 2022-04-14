import {getRandomArrayElement, getRandomPositiveInteger} from '.util.js';
import {COMMENTS_COUNT} from '.const.js';
import {COMMENT_MESSAGES, NAMES, DESCRIPTIONS, } from '.mock-data.js';

const randomIdCreator = () => {
  const IDS = [];

  return () => {
    if (IDS.length === 25) {
      return null;
    }

    let randomId = getRandomPositiveInteger(1, 25);

    if (IDS.includes(randomId) ) {
      randomId = getRandomPositiveInteger(1, 25);
    }

    IDS.push(randomId);

    return randomId;
  };
};

const getRandomId = randomIdCreator();
const getRandomId2 = randomIdCreator();

const getRandomUrl = () => {
  const NUM_FOTO = getRandomId2();
  return `photos/${NUM_FOTO}.jpg`;
};

const getLikesCount = function () {
  return getRandomPositiveInteger(15, 200);
};

const commentsIdCreator = () => {
  const IDS = [];

  return () => {

    let randomId = getRandomPositiveInteger(1, 2**53-1);

    if (IDS.includes(randomId) ) {
      randomId = getRandomPositiveInteger(1, 2**53-1);
    }

    IDS.push(randomId);

    return randomId;
  };
};

const getRandomIdComment = commentsIdCreator();

const getRandomAvatar = () => {
  const NUM_AVATAR = getRandomPositiveInteger(1, 6);
  return `img/avatar-${NUM_AVATAR}.svg`;
};

const createCommentObject = function () {
  return {
    id: getRandomIdComment(),
    avatar: getRandomAvatar(),
    message: getRandomArrayElement(COMMENT_MESSAGES),
    name: getRandomArrayElement(NAMES),
  };
};


const createCommentsArray =  function () {
  return Array.from({length: COMMENTS_COUNT }, createCommentObject);
};

const createPhotoDescription = function () {
  return {
    id: getRandomId(),
    url: getRandomUrl(),
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getLikesCount(),
    comments: createCommentsArray(),
  };
};

const photosDescriptions = function (count) {
  return Array.from({length: count}, createPhotoDescription);
};

export {photosDescriptions};
