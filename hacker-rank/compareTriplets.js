function compareTriplets(a, b) {
  let results = [0, 0];
  a.forEach((value, i) => {
    if (value > b[i]) {
      results[0]++;
    } else if (value < b[i]) {
      results[1]++;
    }
  });
  return results;
}
