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
        * [Subarray Sum Equals K](#Subarray-Sum-Equals-K)
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

    * [Matrix](#Matrix)
        * [Search a 2D Matrix II](#search-a-2d-matrix-ii)
        * [Reshape the Matrix](#reshape-the-matrix)
        * [Sparse Matrix Multiplication](#Sparse-Matrix-Multiplication)
        * [Range Sum Query 2D - Immutable](#range-sum-query-2d---immutable)
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

### Subarray Sum Equals K
[560. Subarray Sum Equals K](https://leetcode.com/problems/subarray-sum-equals-k/)
```javascript
var subarraySum = function(nums, k) {
    let count = 0, sum = 0;
    const map = new Map();
    map.set(0, 1);
    for (let i = 0; i < nums.length; i++) {
        sum += nums[i];
        if (map.has(sum - k)) {
            count += map.get(sum - k);
        }
        map.set(sum, (map.get(sum) || 0) + 1);
    }
    return count;
};
```

### Continuous Subarray Sum
[523. Continuous Subarray Sum](https://leetcode.com/problems/continuous-subarray-sum/)
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

### Product of Array Except Self
[238. Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self/description/)
```javascript
var productExceptSelf = function(nums) {
    const numLen = nums.length;
    const output = [1];
    
    for (let i = 1; i < numLen; i++) {
        output[i] = output[i - 1] * nums[i - 1];
    }
    
    let product = 1;
    for (let i = numLen - 1; i >= 0; i--) {
        output[i] = output[i] * product;
        product = product * nums[i];
    }
    return output;
};
```

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
    let set1 = new Set(nums1);
    let set2 = new Set(nums2);
    let map = new Map();
    let res = [];
    for (const item of set1) {
         map.set(item, 1);
    }
    for (const item of set2) {
        if (map.has(item)) {
            map.set(item, 2);
            res.push(item);
        }
    }
    return res;
};
```
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
        if (map.get(n)) {
            res.push(n);
            map.set(n, map.get(n) - 1);
        }
    }
    return res;
};
```

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


<!-- @include ../leetcode/0341.flatten-nested-list-iterator.md -->
### Flatten Nested List Iterator
[341. Flatten Nested List Iterator](https://leetcode.com/problems/flatten-nested-list-iterator/)
```html
You are given a nested list of integers nestedList. Each element is either an integer or a list whose elements may also be integers or other lists. Implement an iterator to flatten it.

Implement the NestedIterator class:

NestedIterator(List<NestedInteger> nestedList) Initializes the iterator with the nested list nestedList.
int next() Returns the next integer in the nested list.
boolean hasNext() Returns true if there are still some integers in the nested list and false otherwise.

Example 1:

Input: nestedList = [[1,1],2,[1,1]]
Output: [1,1,2,1,1]
Explanation: By calling next repeatedly until hasNext returns false, the order of elements returned by next should be: [1,1,2,1,1].
Example 2:

Input: nestedList = [1,[4,[6]]]
Output: [1,4,6]
Explanation: By calling next repeatedly until hasNext returns false, the order of elements returned by next should be: [1,4,6].
```

```javascript
var NestedIterator = function(nestedList) {
    function flattern(list) {
        if (!list) {
            return [];
        }
        let flattenedList = [];
        for (const item of list) {
            if (item.isInteger()) {
                flattenedList.push(item.getInteger());
            } else {
                flattenedList = [...flattenedList, ...flattern(item.getList())];
            }
        }
        return flattenedList;
    }
    this.flattenedList = flattern(nestedList);
};
NestedIterator.prototype.hasNext = function() {
    return this.flattenedList.length > 0;
};
NestedIterator.prototype.next = function() {
    return this.flattenedList.shift();
};
```

<!-- @include ../leetcode/0373.find-k-pairs-with-smallest-sums.md -->
### Find K Pairs with Smallest Sums
[373. Find K Pairs with Smallest Sums](https://leetcode.com/problems/find-k-pairs-with-smallest-sums/)

```html
You are given two integer arrays nums1 and nums2 sorted in ascending order and an integer k.
Define a pair (u, v) which consists of one element from the first array and one element from the second array.
Return the k pairs (u1, v1), (u2, v2), ..., (uk, vk) with the smallest sums.

Example 1:
Input: nums1 = [1,7,11], nums2 = [2,4,6], k = 3
Output: [[1,2],[1,4],[1,6]]
Explanation: The first 3 pairs are returned from the sequence: [1,2],[1,4],[1,6],[7,2],[7,4],[11,2],[7,6],[11,4],[11,6]

Example 2:
Input: nums1 = [1,1,2], nums2 = [1,2,3], k = 2
Output: [[1,1],[1,1]]
Explanation: The first 2 pairs are returned from the sequence: [1,1],[1,1],[1,2],[2,1],[1,2],[2,2],[1,3],[1,3],[2,3]

Example 3:
Input: nums1 = [1,2], nums2 = [3], k = 3
Output: [[1,3],[2,3]]
Explanation: All possible pairs are returned from the sequence: [1,3],[2,3]
```

```javascript
var kSmallestPairs = function(nums1, nums2, k) {
    const res = [];
    if (nums1.length === 0 || nums2.length === 0 || k === 0) { return res; }
    const queue = new FastPriorityQueue((a, b) => a.sum < b.sum)
    
    for (let i = 0; i < Math.min(nums1.length, k); i++) {
        queue.add({
            index1: i,
            index2: 0,
            sum: nums1[i] + nums2[0]
        });
    }

    while (k > 0 && queue.size > 0) {
        const num = queue.poll();
        res.push([
            nums1[num.index1],
            nums2[num.index2] 
        ]);
        if (num.index2 < nums2.length - 1) {
            queue.add({
                index1: num.index1,
                index2: num.index2 + 1,
                sum: nums1[num.index1] + nums2[num.index2 + 1]
            });
        }
        k--;
    }
    return res;
};
```

## Matrix

<!-- @include ../leetcode/0240.search-a-2d-matrix-ii.md -->
### Search a 2D Matrix II
[240. Search a 2D Matrix II](https://leetcode.com/problems/search-a-2d-matrix-ii/description/)

```html
Write an efficient algorithm that searches for a target value in an m x n integer matrix. The matrix has the following properties:

Integers in each row are sorted in ascending from left to right.
Integers in each column are sorted in ascending from top to bottom.

Example 1:
[ 1, 4, 7,11,15]
[ 2, 5, 8,12,19]
[ 3, 6, 9,16,22]
[10,13,14,17,24]
[18,21,23,26,30]
Input: matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 5
Output: true

Example 2:
[ 1, 4, 7,11,15]
[ 2, 5, 8,12,19]
[ 3, 6, 9,16,22]
[10,13,14,17,24]
[18,21,23,26,30]
Input: matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 20
Output: false
```
```javascript
var searchMatrix = function(matrix, target) {
    const firstRow = matrix[0];
    const targetColIdex = binarySearch(firstRow, target);
    
    const searchColArray = 
    console.log(targetColIdex)
};
function binarySearch(array, target) {
    let low = 0, high = array.length - 1;
    while (low <= high) {
        const mid = Math.floor(low + (high - low) / 2);
        if (array[mid] === target) {
            return mid;
        }
        if (array[mid] > target) {
            high = mid - 1;
        } else {
            low = mid + 1
        }
    }
    return low - 1;
}
```



### Sparse Matrix Multiplication
[311. Sparse Matrix Multiplication](https://leetcode.com/problems/sparse-matrix-multiplication/)
```javascript
var multiply = function(mat1, mat2) {
    const ans = [];
    for (let row = 0; row < mat1.length; row++) {
        ans.push([]);
        for (let col = 0; col < mat2[0].length; col++) {
            const mat1Row = mat1[row];
            ans[row][col] = 0;
            for (let k = 0; k < mat1Row.length; k++) {
                ans[row][col] += mat1Row[k] * mat2[k][col];
            }
        }
    }
    return ans;
};
```

### Range Sum Query 2D - Immutable
[304. Range Sum Query 2D - Immutable](https://leetcode.com/problems/range-sum-query-2d-immutable/)
```javascript
var NumMatrix = function(matrix) {
    if (matrix == null || matrix.length === 0 || matrix[0].length === 0) return;

    const rowLen = matrix.length;
    const colLen = matrix[0].length;

    const dp = [...Array(rowLen + 1)].map(_ => [...Array(colLen + 1)].fill(0));
    for (let row = 0; row < rowLen; row++) {
        for (let col = 0; col < colLen; col++) {
            dp[row + 1][col + 1] = dp[row + 1][col] + dp[row][col + 1] + matrix[row][col] - dp[row][col];
        }
    }
    this.dp = dp;
};
NumMatrix.prototype.sumRegion = function(row1, col1, row2, col2) {
    return this.dp[row2 + 1][col2 + 1]
        - this.dp[row1][col2 + 1]
        - this.dp[row2 + 1][col1]
        + this.dp[row1][col1];
};
```

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
