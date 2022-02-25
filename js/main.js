//источник https://learn.javascript.ru/task/random-int-min-max
function randomInteger(min, max) {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
randomInteger(1,3);

function checkStringLength(сheckinString,maxLength) {
  if (length <= maxLength) {
    return false;
  }
  return true;
}
checkStringLength(2,9);
