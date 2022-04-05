const PHOTOS_COUNT = 25;
const COMMENTS_COUNT = 5;

const COMMENT_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const NAMES = [
  'Михаил',
  'Аня',
  'Анатолий',
  'Кристина',
  'Олег',
  'Марина',
  'Артем',
];
const DESCRIPTIONS = [
  'Хорошо отдохнули!',
  'Как обычно.',
  'Просто лучший день!',
  'Круто провел время!',
];

const LikesCount = {
  MIN: 15,
  MAX: 200,
};

const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

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
  }, (item, index) => createComment(index + 1)),
});

const photosDescriptions = Array.from({
  length: PHOTOS_COUNT
}, (item, index) => createPhotoDescription(index + 1));
