/* const getRandomInteger = (min = 0, max) => {
  const rand = min + Math.random() * (max + 1 - min);

  return Math.floor(rand);
};
getRandomInteger(3); */
const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};
getRandomPositiveInteger(1,5);

const checkStringLength = (string, length) => string.length <= length;
checkStringLength('hello', 4);
