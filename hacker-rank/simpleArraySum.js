function simpleArraySum(ar) {
  // Write your code here
  return ar.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);
}
