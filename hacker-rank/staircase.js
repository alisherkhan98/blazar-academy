function staircase(n) {
  // Write your code here

  const spaceBar = " ";
  const hashTag = "#";
  let string = "";

  for (let i = 1; i <= n; i++) {
    let tempString = spaceBar.repeat(n - i) + hashTag.repeat(i) + "\n";
    string += tempString;
  }

  console.log(string);
}
