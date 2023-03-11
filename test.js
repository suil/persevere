const nums = [34, 23, 1, 24, 75, 33, 54, 8];
const k = 60;

var twoSumLessThanK = function (nums, k) {
  let i = 0;
  let j = nums.length - 1;
  let finalSum = -1;
  nums.sort((a, b) => a - b);

  while (i < j) {
    const sum = nums[i] + nums[j];
    if (sum >= k) {
      j--;
    } else {
      finalSum = Math.max(finalSum, sum)
      i++;
    }
  }

  return finalSum;
}

const r = twoSumLessThanK(nums, k);
console.log(r);