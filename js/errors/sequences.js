function solution (X, Y, A) {
  var N = A.length;
  var result = -1;
  var nX = 0;
  var nY = 0;
  for (var i = 0; i < N; i++) {
    if (A[i] == X)
      nX += 1;
    else if (A[i] == Y) //remove else
      nY += 1;
    if (nX == nY)
      result = i;
  }
  return result;
}

let result
result = solution(7, 7, [6, 7, 11, 7, 1, 7, 1])
// result = solution(7, 42, [6, 42, 7, 8, 42, 1])
// result = solution(7, 42, [0, 42, 0, 7, 0, 42])
// result = solution(1, 42, [6, 42, 11, 7, 1, 42])
console.info(result)
