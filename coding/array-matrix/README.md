# Array and Matrix
<!-- GFM-TOC -->
* [Array and Matrix](#leetcode-题解---数组与矩阵)
    * [8. 数组相邻差值的个数](#8-数组相邻差值的个数)
    * [9. 数组的度](#9-数组的度)
    * [10. 对角元素相等的矩阵](#10-对角元素相等的矩阵)
    * [11. 嵌套数组](#11-嵌套数组)
    * [12. 分隔数组](#12-分隔数组)
    * [Array](#Array)
        * [Set Mismatch](#set-mismatch)
        * [Kth Smallest Element in a Sorted Matrix](#kth-smallest-element-in-a-sorted-matrix)
        * [Max Consecutive Ones](#max-consecutive-ones)
        * [Move Zeroes](#move-zeroes)
        * [Longest Word in Dictionary](#Longest-Word-in-Dictionary)
        * [Product of Array Except Self](#Product-of-Array-Except-Self)
        * [Leftmost Column with at Least a One](#Leftmost-Column-with-at-Least-a-One)
        * [Monotonic Array](#Monotonic-Array)
        * [Next Permutation](#Next-Permutation)
        * [Intersection of Two Arrays](#intersection-of-two-arrays)
        * [Intersection of Two Arrays II](#intersection-of-two-arrays-ii)
        * [Nested Array](#nested-array)
            * [Nested List Weight Sum](#nested-list-weight-sum)
            * [Nested List Weight Sum II](#nested-list-weight-sum-ii)
            * [Flatten Nested List Iterator](#flatten-nested-list-iterator)
        * [Find K Pairs with Smallest Sums](#find-k-pairs-with-smallest-sums)
        * [Continous Subarray](#continous-subarray)
            * [Subarray Sum Equals K](#Subarray-Sum-Equals-K)
            * [Continuous Subarray Sum](#continuous-subarray-sum)
            * [Maximum Product Subarray](#maximum-product-subarray)
        * [Subarray Sum II](#subarray-sum-ii)

    * [Matrix](#Matrix)
        * [Search a 2D Matrix II](#search-a-2d-matrix-ii)
        * [Reshape the Matrix](#reshape-the-matrix)
        * [Sparse Matrix Multiplication](#Sparse-Matrix-Multiplication)
        * [Range Sum Query 2D - Immutable](#range-sum-query-2d---immutable)
        * [Spiral Matrix](#spiral-matrix)
<!-- GFM-TOC -->

<!-- @include ../leetcode/0283.move-zeroes.md -->
### 283. Move Zeroes
[283. Move Zeroes](https://leetcode.com/problems/move-zeroes/description/)

```html
Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.

Note that you must do this in-place without making a copy of the array.

Example 1:

Input: nums = [0,1,0,3,12]
Output: [1,3,12,0,0]
Example 2:

Input: nums = [0]
Output: [0]
```

```javascript
var moveZeroes = function(nums) {
    let idx = 0;
    for (const num of nums) {
        if (num != 0) {
            nums[idx++] = num;
        }
    }
    while (idx < nums.length) {
        nums[idx++] = 0;
    }
};
```
<!-- @include-end ../leetcode/0283.move-zeroes.md -->

<!-- @include ../leetcode/0566.reshape-the-matrix.md -->
### Reshape the Matrix
[566. Reshape the Matrix](https://leetcode.com/problems/reshape-the-matrix/description/)

```html
In MATLAB, there is a very useful function called 'reshape', which can reshape a matrix into a new one with different size but keep its original data.

You're given a matrix represented by a two-dimensional array, and two positive integers r and c representing the row number and column number of the wanted reshaped matrix, respectively.

The reshaped matrix need to be filled with all the elements of the original matrix in the same row-traversing order as they were.

If the 'reshape' operation with given parameters is possible and legal, output the new reshaped matrix; Otherwise, output the original matrix.

Example 1:
Input: 
nums = 
[[1,2],
 [3,4]]
r = 1, c = 4
Output: 
[[1,2,3,4]]
Explanation:
The row-traversing of nums is [1,2,3,4]. The new reshaped matrix is a 1 * 4 matrix, fill it row by row by using the previous list.
Example 2:
Input: 
nums = 
[[1,2],
 [3,4]]
r = 2, c = 4
Output: 
[[1,2],
 [3,4]]
Explanation:
There is no way to reshape a 2 * 2 matrix to a 2 * 4 matrix. So output the original matrix.
```

```javascript
var matrixReshape = function(nums, r, c) {
    let m = nums.length, n = nums[0].length;
    
    if (m * n != r * c) {
        return nums;
    }
    
    const reshapedNums = [...Array(r)].map(a => [...Array(c)]);

    let index = 0;
    for (let i = 0; i < r; i++) {
        for (let j = 0; j < c; j++) {
            reshapedNums[i][j] = nums[Math.floor(index / n)][index % n];
            index++;
        }
    }
    return reshapedNums;
};
```
<!-- @include-end ../leetcode/0566.reshape-the-matrix.md -->

```javascript
var matrixReshape = function(nums, r, c) {
    let m = nums.length, n = nums[0].length;
    
    if (m * n != r * c) {
        return nums;
    }
    
    const reshapedNums = [...Array(r)].map(a => [...Array(c)]);

    let index = 0;
    for (let i = 0; i < r; i++) {
        for (let j = 0; j < c; j++) {
            reshapedNums[i][j] = nums[Math.floor(index / n)][index % n];
            index++;
        }
    }
    return reshapedNums;
};
```

<!-- @include ../leetcode/0485.max-consecutive-ones.md -->
### Max Consecutive Ones
[485. Max Consecutive Ones](https://leetcode.com/problems/max-consecutive-ones/description/)

```html
Given a binary array nums, return the maximum number of consecutive 1's in the array.

Example 1:

Input: nums = [1,1,0,1,1,1]
Output: 3
Explanation: The first two digits or the last three digits are consecutive 1s. The maximum number of consecutive 1s is 3.
Example 2:

Input: nums = [1,0,1,1,0,1]
Output: 2
```

```javascript
var findMaxConsecutiveOnes = function(nums) {
    if (nums.length == 0) {
        return 0;
    }
    if (nums.length === 1 && nums[0] === 1) {
        return 1;
    }
    let maxOnes = 0;
    let countOnes = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === 1) {
            countOnes++;
        } else {
            maxOnes = Math.max(maxOnes, countOnes);
            countOnes = 0;
        }
    }
    
    return Math.max(maxOnes, countOnes);
};
```
<!-- @include-end ../leetcode/0485.max-consecutive-ones.md -->

<!-- @include ../leetcode/0378.kth-smallest-element-in-a-sorted-matrix.md -->
### Kth Smallest Element in a Sorted Matrix
[378. Kth Smallest Element in a Sorted Matrix](https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/description/)

```html
Given an n x n matrix where each of the rows and columns are sorted in ascending order, return the kth smallest element in the matrix.

Note that it is the kth smallest element in the sorted order, not the kth distinct element.

Example 1:
Input: matrix = [[1,5,9],[10,11,13],[12,13,15]], k = 8
Output: 13
Explanation: The elements in the matrix are [1,5,9,10,11,12,13,13,15], and the 8th smallest number is 13

Example 2:
Input: matrix = [[-5]], k = 1
Output: -5
```

```javascript
var kthSmallest = function(matrix, k) {
    let m = matrix.length, n = matrix[0].length;
    let lo = matrix[0][0], hi = matrix[m - 1][n - 1];
    while (lo <= hi) {
        let mid = Math.floor(lo + (hi - lo) / 2);
        let cnt = 0;
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                if (matrix[i][j] <= mid) {
                    cnt++;
                }
            }
        }
        if (cnt < k) lo = mid + 1;
        else hi = mid - 1;
    }
    return lo;
};
```
<!-- @include-end ../leetcode/0378.kth-smallest-element-in-a-sorted-matrix.md -->

<!-- @include ../leetcode/0645.set-mismatch.md -->
### Set Mismatch
[645. Set Mismatch](https://leetcode.com/problems/set-mismatch/description/)

```html
You have a set of integers s, which originally contains all the numbers from 1 to n. Unfortunately, due to some error, one of the numbers in s got duplicated to another number in the set, which results in repetition of one number and loss of another number.

You are given an integer array nums representing the data status of this set after the error.

Find the number that occurs twice and the number that is missing and return them in the form of an array.

Example 1:
Input: nums = [1,2,2,4]
Output: [2,3]

Example 2:
Input: nums = [1,1]
Output: [1,2]
```

```javascript
var findErrorNums = function(nums) {
    const map = new Map();
    let dup = -1, missing = 1;
    for (const n of nums) {
        map.set(n, (map.get(n) || 0) + 1);
    }
    
    for (let i = 1; i <= nums.length; i++) {
        if (map.has(i)) {
            if (map.get(i) == 2) {
                dup = i;
            }
        }
        else {
            missing = i;
        }
    }
    return [dup, missing];
};
```
<!-- @include-end ../leetcode/0645.set-mismatch.md -->

<!-- @include ../leetcode/0287.find-the-duplicate-number.md -->
### Find the Duplicate Number
[287. Find the Duplicate Number](https://leetcode.com/problems/find-the-duplicate-number/)

```html
Given an array of integers nums containing n + 1 integers where each integer is in the range [1, n] inclusive.
There is only one repeated number in nums, return this repeated number.

Example 1:
Input: nums = [1,3,4,2,2]
Output: 2

Example 2:
Input: nums = [3,1,3,4,2]
Output: 3

Example 3:
Input: nums = [1,1]
Output: 1

Example 4:
Input: nums = [1,1,2]
Output: 1
```

```javascript
var findDuplicate = function(nums) {
    let l = 1, h = nums.length - 1;
    while (l <= h) {
        let mid = Math.floor(l + (h - l) / 2);
        let cnt = 0;
        for (let i = 0; i < nums.length; i++) {
            if (nums[i] <= mid) {
                cnt++;
                console.log({i, 'nums[i]': nums[i], mid, cnt})
            }
        }
        if (cnt > mid) {
            h = mid - 1;
        } else {
            l = mid + 1;
        }
    }
    return l;
};
```
<!-- @include-end ../leetcode/0287.find-the-duplicate-number.md -->

## 8. 数组相邻差值的个数

667\. Beautiful Arrangement II (Medium)
0667.beautiful-arrangement-ii.md
[Leetcode](https://leetcode.com/problems/beautiful-arrangement-ii/description/) / [力扣](https://leetcode-cn.com/problems/beautiful-arrangement-ii/description/)

```html
Input: n = 3, k = 2
Output: [1, 3, 2]
Explanation: The [1, 3, 2] has three different positive integers ranging from 1 to 3, and the [2, 1] has exactly 2 distinct integers: 1 and 2.
```

题目描述：数组元素为 1\~n 的整数，要求构建数组，使得相邻元素的差值不相同的个数为 k。

让前 k+1 个元素构建出 k 个不相同的差值，序列为：1 k+1 2 k 3 k-1 ... k/2 k/2+1.

```java
public int[] constructArray(int n, int k) {
    int[] ret = new int[n];
    ret[0] = 1;
    for (int i = 1, interval = k; i <= k; i++, interval--) {
        ret[i] = i % 2 == 1 ? ret[i - 1] + interval : ret[i - 1] - interval;
    }
    for (int i = k + 1; i < n; i++) {
        ret[i] = i + 1;
    }
    return ret;
}
```

## 9. 数组的度

697\. Degree of an Array (Easy)

[Leetcode](https://leetcode.com/problems/degree-of-an-array/description/) / [力扣](https://leetcode-cn.com/problems/degree-of-an-array/description/)

```html
Input: [1,2,2,3,1,4,2]
Output: 6
```

题目描述：数组的度定义为元素出现的最高频率，例如上面的数组度为 3。要求找到一个最小的子数组，这个子数组的度和原数组一样。

```java
public int findShortestSubArray(int[] nums) {
    Map<Integer, Integer> numsCnt = new HashMap<>();
    Map<Integer, Integer> numsLastIndex = new HashMap<>();
    Map<Integer, Integer> numsFirstIndex = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int num = nums[i];
        numsCnt.put(num, numsCnt.getOrDefault(num, 0) + 1);
        numsLastIndex.put(num, i);
        if (!numsFirstIndex.containsKey(num)) {
            numsFirstIndex.put(num, i);
        }
    }
    int maxCnt = 0;
    for (int num : nums) {
        maxCnt = Math.max(maxCnt, numsCnt.get(num));
    }
    int ret = nums.length;
    for (int i = 0; i < nums.length; i++) {
        int num = nums[i];
        int cnt = numsCnt.get(num);
        if (cnt != maxCnt) continue;
        ret = Math.min(ret, numsLastIndex.get(num) - numsFirstIndex.get(num) + 1);
    }
    return ret;
}
```

## 10. 对角元素相等的矩阵

766\. Toeplitz Matrix (Easy)

[Leetcode](https://leetcode.com/problems/toeplitz-matrix/description/) / [力扣](https://leetcode-cn.com/problems/toeplitz-matrix/description/)

```html
1234
5123
9512

In the above grid, the diagonals are "[9]", "[5, 5]", "[1, 1, 1]", "[2, 2, 2]", "[3, 3]", "[4]", and in each diagonal all elements are the same, so the answer is True.
```

```java
public boolean isToeplitzMatrix(int[][] matrix) {
    for (int i = 0; i < matrix[0].length; i++) {
        if (!check(matrix, matrix[0][i], 0, i)) {
            return false;
        }
    }
    for (int i = 0; i < matrix.length; i++) {
        if (!check(matrix, matrix[i][0], i, 0)) {
            return false;
        }
    }
    return true;
}

private boolean check(int[][] matrix, int expectValue, int row, int col) {
    if (row >= matrix.length || col >= matrix[0].length) {
        return true;
    }
    if (matrix[row][col] != expectValue) {
        return false;
    }
    return check(matrix, expectValue, row + 1, col + 1);
}
```

## 11. 嵌套数组

565\. Array Nesting (Medium)

[Leetcode](https://leetcode.com/problems/array-nesting/description/) / [力扣](https://leetcode-cn.com/problems/array-nesting/description/)

```html
Input: A = [5,4,0,3,1,6,2]
Output: 4
Explanation:
A[0] = 5, A[1] = 4, A[2] = 0, A[3] = 3, A[4] = 1, A[5] = 6, A[6] = 2.

One of the longest S[K]:
S[0] = {A[0], A[5], A[6], A[2]} = {5, 6, 2, 0}
```

题目描述：S[i] 表示一个集合，集合的第一个元素是 A[i]，第二个元素是 A[A[i]]，如此嵌套下去。求最大的 S[i]。

```java
public int arrayNesting(int[] nums) {
    int max = 0;
    for (int i = 0; i < nums.length; i++) {
        int cnt = 0;
        for (int j = i; nums[j] != -1; ) {
            cnt++;
            int t = nums[j];
            nums[j] = -1; // 标记该位置已经被访问
            j = t;

        }
        max = Math.max(max, cnt);
    }
    return max;
}
```

## 12. 分隔数组

769\. Max Chunks To Make Sorted (Medium)

[Leetcode](https://leetcode.com/problems/max-chunks-to-make-sorted/description/) / [力扣](https://leetcode-cn.com/problems/max-chunks-to-make-sorted/description/)

```html
Input: arr = [1,0,2,3,4]
Output: 4
Explanation:
We can split into two chunks, such as [1, 0], [2, 3, 4].
However, splitting into [1, 0], [2], [3], [4] is the highest number of chunks possible.
```

题目描述：分隔数组，使得对每部分排序后数组就为有序。

```java
public int maxChunksToSorted(int[] arr) {
    if (arr == null) return 0;
    int ret = 0;
    int right = arr[0];
    for (int i = 0; i < arr.length; i++) {
        right = Math.max(right, arr[i]);
        if (right == i) ret++;
    }
    return ret;
}
```
## Array

### Longest Word in Dictionary
[720. Longest Word in Dictionary](https://leetcode.com/problems/longest-word-in-dictionary/)
```javascript
var longestWord = function(words) {
    if (words.length === 0) {
        return '';
    }
    
    words.sort();
    
    const set = new Set([words[0]]);
    let result = words[0];

    for (let i = 1; i < words.length; i++) {
        const prevWord = words[i].substring(0, words[i].length - 1);
        if (set.has(prevWord)) {
            if (words[i].length > result.length) {
                result = words[i];
            }
            set.add(words[i]);
        }
    }
    
    return result;
};
```

## Continous Subarray
If elements in an array are all positive numbers, then sliding window approach can be used. This is because for any give element there is only one position that meets the condition (Sum or Product).

If elements in an array can be negative numbers, hash map approach can work in this scenario.

<!-- @include ../leetcode/0560.subarray-sum-equals-k.md -->
## Subarray Sum Equals K
[560. Subarray Sum Equals K](https://leetcode.com/problems/subarray-sum-equals-k/)

```html
Given an array of integers nums and an integer k, return the total number of continuous subarrays whose sum equals to k.

Example 1:
Input: nums = [1,1,1], k = 2
Output: 2

Example 2:
Input: nums = [1,2,3], k = 3
Output: 2
```

```javascript
var subarraySum = function(nums, k) {
    let count = 0, sum = 0;
    const map = new Map();
    map.set(0, 1);
    for (const num of nums) {
        sum += num;
        if (map.has(sum - k)) {
            count += map.get(sum - k);
        }
        map.set(sum, (map.get(sum) || 0) + 1);
    }
    return count;
};
```
<!-- @include-end ../leetcode/0560.subarray-sum-equals-k.md -->

<!-- @include ../leetcode/0523.continuous-subarray-sum.md -->
### Continuous Subarray Sum
[523. Continuous Subarray Sum](https://leetcode.com/problems/continuous-subarray-sum/)

```html
Given an integer array nums and an integer k, return true if nums has a continuous subarray of size at least two whose elements sum up to a multiple of k, or false otherwise.

An integer x is a multiple of k if there exists an integer n such that x = n * k. 0 is always a multiple of k.

Example 1:
Input: nums = [23,2,4,6,7], k = 6
Output: true
Explanation: [2, 4] is a continuous subarray of size 2 whose elements sum up to 6.

Example 2:
Input: nums = [23,2,6,4,7], k = 6
Output: true
Explanation: [23, 2, 6, 4, 7] is an continuous subarray of size 5 whose elements sum up to 42.
42 is a multiple of 6 because 42 = 7 * 6 and 7 is an integer.

Example 3:
Input: nums = [23,2,6,4,7], k = 13
Output: false
```

```javascript
var checkSubarraySum = function(nums, k) {
    const map = new Map([[0, -1]]);
    let sum = 0;
    for (let i = 0; i < nums.length; i++) {
        sum += nums[i];
        if (k != 0) { sum = sum % k; }
        if (map.has(sum)) {
            if (i - map.get(sum) > 1) { return true; }
        } else {
            map.set(sum, i);
        }
    }
    return false;
};
```
<!-- @include-end ../leetcode/0523.continuous-subarray-sum.md -->

<!-- @include ../leetcode/0152.maximum-product-subarray.md -->
### Maximum Product Subarray
[152. Maximum Product Subarray](https://leetcode.com/problems/maximum-product-subarray/)

```html
Given an integer array nums, find a contiguous non-empty subarray within the array that has the largest product, and return the product.

It is guaranteed that the answer will fit in a 32-bit integer.

A subarray is a contiguous subsequence of the array.

Example 1:

Input: nums = [2,3,-2,4]
Output: 6
Explanation: [2,3] has the largest product 6.
Example 2:

Input: nums = [-2,0,-1]
Output: 0
Explanation: The result cannot be 2, because [-2,-1] is not a subarray.
```

```javascript
var maxProduct = function(nums) {
    let max = -Infinity;
    let currentMax = 1;
    let currentMin = 1;
    
    for (let i = 0; i < nums.length; i++) {
        const prevMax = currentMax;
        currentMax = Math.max(nums[i], prevMax * nums[i], currentMin * nums[i]);
        currentMin = Math.min(nums[i], prevMax * nums[i], currentMin * nums[i]);
        max = Math.max(currentMax, max);               
    }
    return max;
};
```
<!-- @include-end ../leetcode/0152.maximum-product-subarray.md -->

<!-- @include ../leetcode/0238.product-of-array-except-self.md -->
### Product of Array Except Self
[238. Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self/)

```html
Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].

The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.

Example 1:
Input: nums = [1,2,3,4]
Output: [24,12,8,6]

Example 2:
Input: nums = [-1,1,0,-3,3]
Output: [0,0,9,0,0]
```

```javascript
var productExceptSelf = function(nums) {
    let product = 1;
    let output = [1];
    for (let i = 1; i < nums.length; i++) {
        product *= nums[i - 1];
        output[i] = product;
    }

    product = 1;
    for (let i = nums.length - 2; i >= 0; i--) {
        product *= nums[i + 1];
        output[i] = product * output[i];
    }
    return output;
};
```
<!-- @include-end ../leetcode/0238.product-of-array-except-self.md -->

### Leftmost Column with at Least a One
[1428. Leftmost Column with at Least a One](https://leetcode.com/problems/leftmost-column-with-at-least-a-one/)
```javascript
var leftMostColumnWithOne = function(binaryMatrix) {
    let [rows, cols] = binaryMatrix.dimensions()
    let currentRow = 0;
    let currentCol = cols - 1;
    while (currentRow < rows && currentCol >= 0) {
        let val = binaryMatrix.get(currentRow, currentCol)
        if (val === 1) {
            currentCol--
        } else {
            currentRow++
        }
    }
    return (currentCol == cols - 1) ? -1 : currentCol + 1;
};
```

### Monotonic Array
[896. Monotonic Array](https://leetcode.com/problems/monotonic-array/)
```javascript
var isMonotonic = function(A) {
    let increase = true, decrease = true;
    for (let i = 0; i < A.length - 1; i++) {
        if(A[i] > A[i + 1]) { increase = false; }
        if(A[i] < A[i + 1]) { decrease = false; }
    }
    return increase || decrease;
};
```

### Next Permutation
[Next Permutation](https://leetcode.com/problems/next-permutation/)
```javascript
var nextPermutation = function(nums) {
    const len = nums.length;
    let i = len - 2, j = len - 1;
    
    while (i >= 0 && nums[i] >= nums[i + 1]) { i--; }
    
    if (i >= 0) {
        while (j > i && nums[j] <= nums[i]) { j--; }
        [nums[i], nums[j]] = [nums[j], nums[i]];
        reverse(nums, i + 1, len - 1);
    } else {
        reverse(nums, 0, len - 1);
    }
};
var reverse = function (arr, start, end) {
    while (start < end) {
        [arr[start], arr[end]] = [arr[end], arr[start]];
        start++;
        end--;
    }
};
```

<!-- @include ../leetcode/0349.intersection-of-two-arrays.md -->
### Intersection of Two Arrays
[349. Intersection of Two Arrays](https://leetcode.com/problems/intersection-of-two-arrays/)
```html
Given two integer arrays nums1 and nums2, return an array of their intersection. Each element in the result must be unique and you may return the result in any order.

Example 1:

Input: nums1 = [1,2,2,1], nums2 = [2,2]
Output: [2]
Example 2:

Input: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
Output: [9,4]
Explanation: [4,9] is also accepted.
```

```javascript
var intersection = function(nums1, nums2) {
    const set1 = new Set(nums1);
    const set2 = new Set();
    for (const num2 of nums2) {
        if (set1.has(num2)) { set2.add(num2); }
    }
    return [...set2];
};
```
<!-- @include-end ../leetcode/0349.intersection-of-two-arrays.md -->


<!-- @include ../leetcode/0350.intersection-of-two-arrays-ii.md -->
### Intersection of Two Arrays II
[350. Intersection of Two Arrays II](https://leetcode.com/problems/intersection-of-two-arrays-ii/)

```html
Given two integer arrays nums1 and nums2, return an array of their intersection. Each element in the result must appear as many times as it shows in both arrays and you may return the result in any order.

Example 1:
Input: nums1 = [1,2,2,1], nums2 = [2,2]
Output: [2,2]

Example 2:
Input: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
Output: [4,9]
Explanation: [9,4] is also accepted.
```

Two pointers:
```javascript
var intersect = function(nums1, nums2) {
    nums1.sort((a, b) => a - b);
    nums2.sort((a, b) => a - b);
    const results = [];
    let i = 0;
    let j = 0;
    while (i < nums1.length && j < nums2.length) {
        if (nums1[i] == nums2[j]) {
            results.push(nums1[i]);
            i++;
            j++;
        } else if (nums1[i] < nums2[j]) {
            i++;
        } else {
            j++;
        }
    }
    return results;
};
```

Hash Map:
```javascript
var intersect = function(nums1, nums2) {
    const map = new Map();
    for (const n of nums1) {
        map.set(n, (map.get(n) || 0) + 1);
    }
    
    const res = [];
    for (const n of nums2){
        if (map.get(n) > 0) {
            res.push(n);
            map.set(n, map.get(n) - 1);
        }
    }
    return res;
};
```
<!-- @include-end ../leetcode/0350.intersection-of-two-arrays-ii.md -->

## Nested Array
<!-- @include ../leetcode/0339.nested-list-weight-sum.md -->
### Nested List Weight Sum
[339. Nested List Weight Sum](https://leetcode.com/problems/nested-list-weight-sum/)
```html
Given a nested list of integers, return the sum of all integers in the list weighted by their depth.

Each element is either an integer, or a list -- whose elements may also be integers or other lists.

Example 1:

Given the list [[1,1],2,[1,1]], return 10. (four 1's at depth 2, one 2 at depth 1)

Example 2:

Given the list [1,[4,[6]]], return 27. (one 1 at depth 1, one 4 at depth 2, and one 6 at depth 3; 1 + 4*2 + 6*3 = 27)
```

```javascript
var depthSum = function(nestedList) {
    return depthSumHelper(nestedList, 1);
};
function depthSumHelper(nestedList, depth) {
    let sum = 0;
    for (const item of nestedList) {
        if (item.isInteger()) {
            sum += item.getInteger() * depth;
        } else {
            sum += depthSumHelper(item.getList(), depth + 1);
        }
    }
    return sum;
}
```
<!-- @include-end ../leetcode/0339.nested-list-weight-sum.md -->

<!-- @include ../leetcode/0364.nested-list-weight-sum-ii.md -->
### Nested List Weight Sum II
[364. Nested List Weight Sum II](https://leetcode.com/problems/nested-list-weight-sum-ii/)
```html
Given a nested list of integers, return the sum of all integers in the list weighted by their depth.

Each element is either an integer, or a list -- whose elements may also be integers or other lists.

Different from the previous question where weight is increasing from root to leaf, now the weight is defined from bottom up. i.e., the leaf level integers have weight 1, and the root level integers have the largest weight.

Example 1: Given the list [[1,1],2,[1,1]], return 8. (four 1's at depth 1, one 2 at depth 2)

Example 2: Given the list [1,[4,[6]]], return 17. (one 1 at depth 3, one 4 at depth 2, and one 6 at depth 1; 1*3 + 4*2 + 6*1 = 17)
```

```javascript
var depthSumInverse = function(nestedList) {
    const flattened = [];
    helper(nestedList, 0, flattened);
    
    let weight = flattened.length, sum = 0;
    for (const item of flattened) {
        for (let i = 0; i < item.length; i++) {
            sum += item[i] * weight;
        }
        weight--;
    }
    return sum;
};
function helper(nestedList, depth, flattened) {
    if (!flattened[depth]) { flattened[depth] = []; }
    
    for (const item of nestedList) {
        if (item.isInteger()) {
            flattened[depth].push(item.getInteger());
        } else {
            helper(item.getList(), depth + 1, flattened);
        }
    }
}
```
<!-- @include-end ../leetcode/0364.nested-list-weight-sum-ii.md -->

<!-- @include ../leetcode/0054.spiral-matrix.md -->
### Spiral Matrix
[54. Spiral Matrix](https://leetcode.com/problems/spiral-matrix/)

```html
Given an m x n matrix, return all elements of the matrix in spiral order.

Example 1:
[1,2,3]
[4,5,6]
[7,8,9]
Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [1,2,3,6,9,8,7,4,5]

Example 2:
[1, 2, 3, 4]
[5, 6, 7, 8],
[9,10,11,12]
Input: matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
Output: [1,2,3,4,8,12,11,10,9,5,6,7]
```

```javascript
var spiralOrder = function(matrix) {
    let top = 0, bottom = matrix.length - 1;
    let left = 0, right = matrix[0].length - 1;
    let dir = 0;
    const ans = [];
    while (top <= bottom && left <= right) {
        if (dir === 0) {
            for (let i = left; i <= right; i++) {
                ans.push(matrix[top][i]);
            }
            top++;
        } else if (dir === 1) {
            for (let i = top; i <= bottom; i++) {
                ans.push(matrix[i][right]);
            }
            right--;
        } else if (dir === 2) {
            for (let i = right; i >= left; i--) {
                ans.push(matrix[bottom][i]);
            }
            bottom--;
        } else if (dir === 3) {
            for (let i = bottom; i >= top; i--) {
                ans.push(matrix[i][left]);
            }
            left++;
        }
        dir = (dir + 1) % 4;
    }
    return ans;
};
```
<!-- @include-end ../leetcode/0054.spiral-matrix.md -->

<!-- @include ../leetcode/L404.subarray-sum-ii.md -->
### Subarray Sum II
[404.Subarray Sum II](https://www.lintcode.com/problem/404/description)

```html
Given an positive integer array A and an interval. Return the number of subarrays whose sum is in the range of given interval.

Wechat reply 【Two Sigma】 get the latest requent Interview questions. (wechat id : jiuzhang1104)


Subarray is a part of origin array with continuous index and contain at least one number.

Example 1:

Input: A = [1, 2, 3, 4], start = 1, end = 3
Output: 4
Explanation: All possible subarrays: [1](sum = 1), [1, 2](sum = 3), [2](sum = 2), [3](sum = 3).
Example 2:

Input: A = [1, 2, 3, 4], start = 1, end = 100
Output: 10
Explanation: Any subarray is ok.
```

```javascript
export class Solution {
  /**
   * @param a: An integer array
   * @param start: An integer
   * @param end: An integer
   * @return: the number of possible answer
   */
  subarraySumII(a, start, end) {
    // write your code here
    // special cases
    if(a == null || a.length == 0 || start > end){
        return 0;
    }

    //preix sum
    const sum = [...Array(a.length + 1)].fill(0);

    for (let i = 1; i <= a.length; i++){
      sum[i] = sum[i - 1] + a[i - 1];
    }

    let count = 0;
    for (let i = 0; i < a.length; i++) {
      for (let j = i + 1; j <= a.length; j++) {
        const diff = sum[j] - sum[i];
          if (diff >= start && diff <= end){
            count++;
          }
      }
    }
    return count;
  }
}
```
<!-- @include-end ../leetcode/L404.subarray-sum-ii.md -->