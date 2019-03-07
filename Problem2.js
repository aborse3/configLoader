function solve(arr){
    if(!arr.length){
      return 0;
    }

    let result = [0, -1, []];

    for(let i = 0; i< arr.length; i++){
      if(arr[i] < 0) continue;

      let prev = (i-1 == 0) ? null: arr[i-1];
      let next = (i+1 == arr.length) ? null : arr[i+1];

      let nxt = [];
      for(let j=0; j<i-1; j++){
        if(arr[j] == prev || arr[j] == next){
          continue;
        }
        nxt.push(arr[j])
      }

      for(let j=i+2; j<arr.length; j++){
        if(arr[j] == prev || arr[j] == next){
          continue;
        }
        nxt.push(arr[j]);
      }

      let maxi = arr[i] + (nxt.length ? Math.max(0, ...nxt) : 0);

      if(result[0] < maxi){
        result = [maxi, i, nxt];
      }else if(result[0] == maxi && arr[i] > arr[result[1]]){
        result = [maxi, i, nxt];
      }
    }
    return result[1] >= 0 ? arr[result[1]] + solve(result[2]) : 0;
}

console.log(solve([1,1,4,1,1]))
console.log(solve([1,1,1,1,1,1,1,10]))
console.log(solve([-1,3,2,3,4,3]))
console.log(solve([-1,-2,-3]))
console.log(solve([0,1,2,3,4,5,6,7,8,9,10]))
