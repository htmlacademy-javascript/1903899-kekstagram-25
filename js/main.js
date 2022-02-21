//источник https://learn.javascript.ru/task/random-int-min-max
function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
console.log(randomInteger(1, 3));

function getStringLength(сheckinStr,maxLength) {
  if (length <= maxLength)
  return true
  else(length >= maxLength)
  return false
  };
  console.log(getStringLength(1,9))
