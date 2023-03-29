function hourglassSum(arr) {
  // Write your code here
  let sum;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      let firstLineSum = arr[i][j] + arr[i][j + 1] + arr[i][j + 2];
      let secondLineSum = arr[i + 1][j + 1];
      let thirdLineSum = arr[i + 2][j] + arr[i + 2][j + 1] + arr[i + 2][j + 2];

      let tempSum = firstLineSum + secondLineSum + thirdLineSum;
      if (sum === undefined || tempSum > sum) {
        sum = tempSum;
      }
    }
  }

  return sum;
}
