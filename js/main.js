const getRandomInteger = (min = 0, max) => {
  const rand = min + Math.random() * (max + 1 - min);

  return Math.floor(rand);
};
getRandomInteger(3);

const checkStringLength = (string, maxLength) => string.length <= maxLength;
checkStringLength('hello', 4);
