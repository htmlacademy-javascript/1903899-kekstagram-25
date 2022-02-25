//источник https://learn.javascript.ru/task/random-int-min-max
function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};
randomInteger(1,3);

function stringLength(сheckinString,maxLength) {
  if (length <= maxLength) {
  return false;
  }
  return true;
}
stringLength(1,9);
