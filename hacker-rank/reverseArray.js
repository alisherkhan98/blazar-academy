
function reverseArray(a) {
    // Write your code here
    let tempArray = []
    for(let i = a.length - 1; i>=0;i--){
        tempArray.push(a[i])
    }
    return tempArray

}