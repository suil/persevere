# Leetcode 题解 - 动态规划
<!-- GFM-TOC -->
* [Leetcode 题解 - 动态规划](#leetcode-题解---动态规划)
    * [fibonacci sequence](#fibonacci-sequence)
        * [Climbing Stairs](#climbing-stairs)
        * [House Robber](#house-robber)
        * [House Robber II](#house-robber-ii)
        * [4. 信件错排](#4-信件错排)
        * [5. 母牛生产](#5-母牛生产)
    * [Path of Matrix](#path-of-matrix)
        * [Minimum Path Sum](#minimum-path-sum)
        * [Unique Paths](#unique-paths)
    * [Array Ranges](#数组区间)
        * [Range Sum Query - Immutable](#range-sum-query-immutable)
        * [Arithmetic Slices](#arithmetic-slices)
    * [Dividing Integers](#dividing-integers)
        * [Integer Break](#integer-break)
        * [Perfect Squares](#perfect-squares)
        * [Decode Ways](#decode-ways)
    * [Longest Increasing Subsequence Problem](#longest-increasing-subsequence-problem)
        * [Longest Increasing Subsequence](#longest-increasing-subsequence)
        * [Maximum Length of Pair Chain](#maximum-length-of-pair-chain)
        * [Wiggle Subsequence](#wiggle-subsequence)
    * [Longest Subsequence](#longest-subsequence)
        * [Longest Common Subsequence](#longest-common-subsequence)
        * [Longest Palindromic Subsequence](#longest-palindromic-subsequence)
    * [0-1 Knapsack](#0-1-knapsack)
        * [Partition Equal Subset Sum](#partition-equal-subset-sum)
        * [Target Sum](#target-sum)
        * [Ones and Zeroes](#ones-and-zeroes)
        * [Coin Change](#coin-change)
        * [Coin Change II](#coin-change-ii)
        * [Word Break](#word-break)
        * [Word Break II](#word-break-ii)
        * [Combination Sum IV](#combination-sum-iv)
    * [Stock Trading](#stock-trading)
        * [Best Time to Buy and Sell Stock](#best-time-to-buy-and-sell-stock)
        * [Best Time to Buy and Sell Stock II](#best-time-to-buy-and-sell-stock-ii)
        * [Best Time to Buy and Sell Stock III](#best-time-to-buy-and-sell-stock-iii)
        * [Best Time to Buy and Sell Stock IV](#best-time-to-buy-and-sell-stock-iv)
        * [Best Time to Buy and Sell Stock with Cooldown](#best-time-to-buy-and-sell-stock-with-cooldown)
        * [Best Time to Buy and Sell Stock with Transaction Fee](#best-time-to-buy-and-sell-stock-with-transaction-fee)
    * [字符串编辑](#字符串编辑)
        * [1. 删除两个字符串的字符使它们相等](#1-删除两个字符串的字符使它们相等)
        * [2. 编辑距离](#2-编辑距离)
        * [3. 复制粘贴字符](#3-复制粘贴字符)
    * String Matching and Manipulationg
        * [Regular Expression Matching](../leetcode.md#regular-expression-matching)
    * [Array Crossing](#array-crossing)
        * [Paint House](#paint-house)
    * [Gaming](#Gaming)
        * [Can I Win](#can-i-win)
    * [Ugly Number](#ugly-number)
        * [Ugly Number II](#ugly-number-ii)
<!-- GFM-TOC -->

The recursion and dynamic programming are both solve the problem by dividing the original problem into multiple sub-problems. Their fundamental differences are that the dynamic programming keeps the results of sub-problems, thus avoiding duplicate calculations.

<!-- @include ../leetcode/0070.climbing-stairs.md -->
### Climbing Stairs
[70. Climbing Stairs](https://leetcode.com/problems/0070.climbing-stairs/)

```html
You are climbing a staircase. It takes n steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

Example 1:
Input: n = 2
Output: 2
Explanation: There are two ways to climb to the top.
1. 1 step + 1 step
2. 2 steps

Example 2:
Input: n = 3
Output: 3
Explanation: There are three ways to climb to the top.
1. 1 step + 1 step + 1 step
2. 1 step + 2 steps
3. 2 steps + 1 step
```

```javascript
var climbStairs = function(n) {
    const dp = [1, 2];
    for (let i = 2; i < n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n - 1];
};
```
<!-- @include-end ../leetcode/0070.climbing-stairs.md -->

<!-- @include ../leetcode/0198.house-robber.md -->
### House Robber
[198. House Robber](https://leetcode.com/problems/house-robber/)

```html
You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night.

Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.

<div align="center"> <img src="https://cs-notes-1256109796.cos.ap-guangzhou.myqcloud.com/2de794ca-aa7b-48f3-a556-a0e2708cb976.jpg" width="350px"> </div><br>

Example 1:

Input: nums = [1,2,3,1]
Output: 4
Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
Total amount you can rob = 1 + 3 = 4.
Example 2:

Input: nums = [2,7,9,3,1]
Output: 12
Explanation: Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1).
Total amount you can rob = 2 + 9 + 1 = 12.
```

```java
public int rob(int[] nums) {
    int pre2 = 0, pre1 = 0;
    for (int i = 0; i < nums.length; i++) {
        int cur = Math.max(pre2 + nums[i], pre1);
        pre2 = pre1;
        pre1 = cur;
    }
    return pre1;
}
```
<!-- @include-end ../leetcode/0198.house-robber.md -->

<!-- @include ../leetcode/0213.house-robber-ii.md -->
### House Robber II
[213. House Robber II](https://leetcode.com/problems/house-robber-ii/)

```html
You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. All houses at this place are arranged in a circle. That means the first house is the neighbor of the last one. Meanwhile, adjacent houses have a security system connected, and it will automatically contact the police if two adjacent houses were broken into on the same night.

Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.

Example 1:

Input: nums = [2,3,2]
Output: 3
Explanation: You cannot rob house 1 (money = 2) and then rob house 3 (money = 2), because they are adjacent houses.
Example 2:

Input: nums = [1,2,3,1]
Output: 4
Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
Total amount you can rob = 1 + 3 = 4.
Example 3:

Input: nums = [1,2,3]
Output: 3
```

```java
public int rob(int[] nums) {
    if (nums == null || nums.length == 0) {
        return 0;
    }
    int n = nums.length;
    if (n == 1) {
        return nums[0];
    }
    return Math.max(rob(nums, 0, n - 2), rob(nums, 1, n - 1));
}

private int rob(int[] nums, int first, int last) {
    int pre2 = 0, pre1 = 0;
    for (int i = first; i <= last; i++) {
        int cur = Math.max(pre1, pre2 + nums[i]);
        pre2 = pre1;
        pre1 = cur;
    }
    return pre1;
}
```
<!-- @include-end ../leetcode/0213.house-robber-ii.md -->

### 4. 信件错排

题目描述：有 N 个 信 和 信封，它们被打乱，求错误装信方式的数量。

定义一个数组 dp 存储错误方式数量，dp[i] 表示前 i 个信和信封的错误方式数量。假设第 i 个信装到第 j 个信封里面，而第 j 个信装到第 k 个信封里面。根据 i 和 k 是否相等，有两种情况：

- i==k，交换 i 和 j 的信后，它们的信和信封在正确的位置，但是其余 i-2 封信有 dp[i-2] 种错误装信的方式。由于 j 有 i-1 种取值，因此共有 (i-1)\*dp[i-2] 种错误装信方式。
- i != k，交换 i 和 j 的信后，第 i 个信和信封在正确的位置，其余 i-1 封信有 dp[i-1] 种错误装信方式。由于 j 有 i-1 种取值，因此共有 (i-1)\*dp[i-1] 种错误装信方式。

综上所述，错误装信数量方式数量为：

<!--<div align="center"><img src="https://latex.codecogs.com/gif.latex?dp[i]=(i-1)*dp[i-2]+(i-1)*dp[i-1]" class="mathjax-pic"/></div> <br>-->

<div align="center"> <img src="https://cs-notes-1256109796.cos.ap-guangzhou.myqcloud.com/da1f96b9-fd4d-44ca-8925-fb14c5733388.png" width="350px"> </div><br>

### 5. 母牛生产

[程序员代码面试指南-P181](#)

题目描述：假设农场中成熟的母牛每年都会生 1 头小母牛，并且永远不会死。第一年有 1 只小母牛，从第二年开始，母牛开始生小母牛。每只小母牛 3 年之后成熟又可以生小母牛。给定整数 N，求 N 年后牛的数量。

第 i 年成熟的牛的数量为：

<!--<div align="center"><img src="https://latex.codecogs.com/gif.latex?dp[i]=dp[i-1]+dp[i-3]" class="mathjax-pic"/></div> <br>-->

<div align="center"> <img src="https://cs-notes-1256109796.cos.ap-guangzhou.myqcloud.com/879814ee-48b5-4bcb-86f5-dcc400cb81ad.png" width="250px"> </div><br>

## Path of Matrix

<!-- @include ../leetcode/0064.minimum-path-sum.md -->
### Minimum Path Sum
[64. Minimum Path Sum](https://leetcode.com/problems/minimum-path-sum/)

Given a m x n grid filled with non-negative numbers, find a path from top left to bottom right, which minimizes the sum of all numbers along its path.

Note: You can only move either down or right at any point in time.

Example 1:

Input: grid = [
  [1,3,1],
  [1,5,1],
  [4,2,1]
]
Output: 7
Explanation: Because the path 1 → 3 → 1 → 1 → 1 minimizes the sum.

Example 2:

Input: grid = [[1,2,3],[4,5,6]]
Output: 12

```javascript
var minPathSum = function(grid) {
    const rowLen = grid.length;
    const colLen = grid[0].length;
    const dp = [...Array(rowLen)].map(_ => Array(colLen).fill(Infinity));

    for (let row = 0; row < rowLen; row++) {
        for (let col = 0; col < colLen; col++) {
            if (row === 0) {
                dp[row][col] = (dp[row][col - 1] || 0) + grid[row][col];
            } else if (col === 0) {
                dp[row][col] = (dp[row - 1]?.[col] || 0) + grid[row][col];
            } else {
                dp[row][col] = Math.min(dp[row - 1][col], dp[row][col - 1]) + grid[row][col];
            }
        }
    }

    return dp[rowLen - 1][colLen - 1];
};
```
<!-- @include-end ../leetcode/0064.minimum-path-sum.md -->

<!-- @include ../leetcode/0062.unique-paths.md -->
### Unique Paths
[62. Unique Paths](https://leetcode.com/problems/unique-paths/)

```html
There is a robot on an m x n grid. The robot is initially located at the top-left corner (i.e., grid[0][0]). 
The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move either down or right at any point in time.

Given the two integers m and n, return the number of possible unique paths that the robot can take to reach the bottom-right corner.

The test cases are generated so that the answer will be less than or equal to 2 * 109.
```
 
```javascript
var uniquePaths = function(m, n) {
    const dp = [...Array(m)].map(_ => [...Array(n)].fill(1));
    
    for (let row = 1; row < m; row++) {
        for (let col = 1; col < n; col++) {
            dp[row][col] = dp[row - 1][col] + dp[row][col - 1];
        }
    }
    
    return dp[m - 1][n - 1];
};
```

could use formula to solve this. This is a combination problem.
the total movments is S = m + n - 2. downward movment is D = m - 1.
So the problem is C(S, D).

```java
public int uniquePaths(int m, int n) {
    int S = m + n - 2;  // total movments
    int D = m - 1;      // downward movments
    long ret = 1;
    for (int i = 1; i <= D; i++) {
        ret = ret * (S - D + i) / i;
    }
    return (int) ret;
}
```
<!-- @include-end ../leetcode/0062.unique-paths.md -->

## Array Ranges

<!-- @include ../leetcode/0303.range-sum-query-immutable.md -->
### Range Sum Query - Immutable
[303. Range Sum Query - Immutable](https://leetcode.com/problems/range-sum-query-immutable)

```html
Given an integer array nums, handle multiple queries of the following type:

Calculate the sum of the elements of nums between indices left and right inclusive where left <= right.
Implement the NumArray class:

NumArray(int[] nums) Initializes the object with the integer array nums.
int sumRange(int left, int right) Returns the sum of the elements of nums between indices left and right inclusive (i.e. nums[left] + nums[left + 1] + ... + nums[right]).
 

Example 1:

Input
["NumArray", "sumRange", "sumRange", "sumRange"]
[[[-2, 0, 3, -5, 2, -1]], [0, 2], [2, 5], [0, 5]]
Output
[null, 1, -1, -3]

Explanation
NumArray numArray = new NumArray([-2, 0, 3, -5, 2, -1]);
numArray.sumRange(0, 2); // return (-2) + 0 + 3 = 1
numArray.sumRange(2, 5); // return 3 + (-5) + 2 + (-1) = -1
numArray.sumRange(0, 5); // return (-2) + 0 + 3 + (-5) + 2 + (-1) = -3
```

```javascript
/**
 * @param {number[]} nums
 */
var NumArray = function(nums) {
    this.prefixSum = [];
    let sum = 0;
    for (let i = 0; i < nums.length; i++) {
        sum += nums[i];
        this.prefixSum.push(sum);
    }
};

/** 
 * @param {number} left 
 * @param {number} right
 * @return {number}
 */
NumArray.prototype.sumRange = function(left, right) {
    return this.prefixSum[right] - (this.prefixSum[left - 1] || 0);
};
```
<!-- @include-end ../leetcode/0303.range-sum-query-immutable.md -->

<!-- @include ../leetcode/0413.arithmetic-slices.md -->
### Arithmetic Slices
[413. Arithmetic Slices](https://leetcode.com/problems/arithmetic-slices)

```html
An integer array is called arithmetic if it consists of at least three elements and if the difference between any two consecutive elements is the same.

For example, [1,3,5,7,9], [7,7,7,7], and [3,-1,-5,-9] are arithmetic sequences.
Given an integer array nums, return the number of arithmetic subarrays of nums.

A subarray is a contiguous subsequence of the array.

Example 1:

Input: nums = [1,2,3,4]
Output: 3
Explanation: We have 3 arithmetic slices in nums: [1, 2, 3], [2, 3, 4] and [1,2,3,4] itself.
Example 2:

Input: nums = [1]
Output: 0
```

```javascript
var numberOfArithmeticSlices = function(nums) {
    const dp = [...Array(nums.length)].fill(0);
    
    let total = 0;
    for (let i = 2; i < nums.length; i++) {
        if (nums[i] - nums[i - 1] === nums[i - 1] - nums[i - 2]) {
            dp[i] = dp[i - 1] + 1;
            total += dp[i];
        }
    }
    return total;
};
```
<!-- @include-end ../leetcode/0413.arithmetic-slices.md -->

## Dividing Integers
<!-- @include ../leetcode/0343.integer-break.md -->
### Integer Break
[343. Integer Break](https://leetcode.com/problems/integer-break)

```html
Given an integer n, break it into the sum of k positive integers, where k >= 2, and maximize the product of those integers.

Return the maximum product you can get.

Example 1:

Input: n = 2
Output: 1
Explanation: 2 = 1 + 1, 1 × 1 = 1.
Example 2:

Input: n = 10
Output: 36
Explanation: 10 = 3 + 3 + 4, 3 × 3 × 4 = 36.
```

backtracking solution:
```javascript
var integerBreak = function(n) {
    const nums = [...Array(n)].map((_, index) => index + 1);
    const output = [];
    backtrack(nums, n, [], output);
  
    let maxProduct = 1;
    for (const com of output) {
        const product = com.reduce((p, n) => p * n, 1);
        maxProduct = Math.max(maxProduct, product);
    }
    return maxProduct;
};

function backtrack(nums, target, combinations, output) {
    const comSum = combinations.reduce((sum, n) => sum + n, 0);
    if (nums.length === 0 || comSum >= target) {
        if (comSum === target && combinations.length >= 2) {
            output.push([...combinations]);
        }
        return;
    }

    for (let i = 0; i < nums.length; i++) {
        const nextNums = nums.slice(i);
        const nextCombinations = [...combinations, nums[i]];
        backtrack(nextNums, target, nextCombinations, output);
    }
}
```

dynamic programming solution:
don't need to consider the case of breaking into more than two numbers. as long as we could find two numbers with max product values for themselves, we could guarantee it's the max product as a result.

```javascript
var integerBreak = function(n) {
    const dp = [...Array(n + 1)].fill(1);
    
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= i - 1; j++) {
            dp[i] = Math.max(dp[i], dp[j] * (i - j), j * (i - j)); 
        }
    }
    return dp[n];
};
```
<!-- @include-end ../leetcode/0343.integer-break.md -->

<!-- @include ../leetcode/0279.perfect-squares.md -->
### Perfect Squares
[279. Perfect Squares](https://leetcode.com/problems/perfect-squares/)

```html
Given an integer n, return the least number of perfect square numbers that sum to n.

A perfect square is an integer that is the square of an integer; in other words, it is the product of some integer with itself. For example, 1, 4, 9, and 16 are perfect squares while 3 and 11 are not.

Example 1:

Input: n = 12
Output: 3
Explanation: 12 = 4 + 4 + 4.
Example 2:

Input: n = 13
Output: 2
Explanation: 13 = 4 + 9.
```

BFS:
```javascript
var numSquares = function(n) {
    let queue = [n];
    let count = 0;

    while (queue.length > 0) {
        const nextQueue = [];
        count++;
        
        for (const item of queue) {
            for (let i = 1; i * i <= item; i++) {
                const remainder = item - i * i;
                if (remainder === 0) {
                    return count;
                }

                nextQueue.push(remainder);
            }
            
        }

        queue = nextQueue;
    }

    return -1;
};
```

DP:
```javascript
var numSquares = function(n) {
    const dp = [...Array(n + 1)].map((_, index) => index);

    for (let i = 1; i <= n; i++) {
        for (let j = 1; j * j <= i; j++) {
            dp[i] = Math.min(dp[i], 1 + dp[i - j * j]);
        }
    }

    return dp[n];
};
```
<!-- @include-end ../leetcode/0279.perfect-squares.md -->

<!-- @include ../leetcode/0091.decode-ways.md -->
### Decode Ways
[91. Decode Ways](https://leetcode.com/problems/decode-ways/)

```html
A message containing letters from A-Z can be encoded into numbers using the following mapping:

'A' -> "1"
'B' -> "2"
...
'Z' -> "26"
To decode an encoded message, all the digits must be grouped then mapped back into letters using the reverse of the mapping above (there may be multiple ways). For example, "11106" can be mapped into:

"AAJF" with the grouping (1 1 10 6)
"KJF" with the grouping (11 10 6)
Note that the grouping (1 11 06) is invalid because "06" cannot be mapped into 'F' since "6" is different from "06".

Given a string s containing only digits, return the number of ways to decode it.

The test cases are generated so that the answer fits in a 32-bit integer.

 

Example 1:

Input: s = "12"
Output: 2
Explanation: "12" could be decoded as "AB" (1 2) or "L" (12).
Example 2:

Input: s = "226"
Output: 3
Explanation: "226" could be decoded as "BZ" (2 26), "VF" (22 6), or "BBF" (2 2 6).
Example 3:

Input: s = "06"
Output: 0
Explanation: "06" cannot be mapped to "F" because of the leading zero ("6" is different from "06").
```

backtracking:
```javascript
const encoding = {
    '1': 'A',
    '2': 'B',
    '3': 'C',
    '4': 'D',
    '5': 'E',
    '6': 'F',
    '7': 'G',
    '8': 'H',
    '9': 'I',
    '10': 'J',
    '11': 'K',
    '12': 'L',
    '13': 'M',
    '14': 'N',
    '15': 'O',
    '16': 'P',
    '17': 'Q',
    '18': 'R',
    '19': 'S',
    '20': 'T',
    '21': 'U',
    '22': 'V',
    '23': 'W',
    '24': 'X',
    '25': 'Y',
    '26': 'Z'
}

function numDecodingsBacktracking(s, output) {
    if (s.length === 0) {
        output.count++;
        return;
    }
    
    for (let i = 1; i <= s.length; i++) { 
        const leftStr = s.substring(0, i);
        const decoded = encoding[leftStr];
        if (!decoded) {
            break;
        }
        const nextS = s.substring(i);
        numDecodingsBacktracking(nextS, output);
    }
}
```

recursion with memoization:
```javascript
var numDecodings = function(s) {
    const output = recursiveWithMemo(s, 0, new Map());
    return output;
};

function recursiveWithMemo(str, index, memo) {
    // Have we already seen this substring?
    if (memo.has(index)) {
        return memo.get(index);
    }
    
    // If the string starts with a zero, it can't be decoded
    if (str[index] === '0') {
        return 0;
    }

    // If you reach the end of the string
    // Return 1 for success.
    if (index >= str.length - 1) {
        return 1;
    }

    let ans = recursiveWithMemo(str, index + 1, memo);
    if (Number(str.substring(index, index + 2)) <= 26) {
        ans += recursiveWithMemo(str, index + 2, memo);
    }

    // Save for memoization
    memo.set(index, ans);

    return ans;
}
```

DP:
```javascript
var numDecodings = function(s) {
    if (s == null || s.length == 0) {
        return 0;
    }

    const n = s.length;
    const dp = [...Array(n)].fill(0);
    dp[0] = encodingMap.has(s[0]) ? 1 : 0;
    dp[1] = (encodingMap.has(s[1]) ? dp[0] : 0) + (encodingMap.has(s.substr(0, 2)) ? 1 : 0);

    for (let i = 2; i < s.length; i++) {
        const oneCharStr = s.substr(i, 1);
        const twoCharStr = s.substr(i - 1, 2);

        if (encodingMap.has(oneCharStr)) {
            dp[i] = dp[i - 1];
        }
        if (encodingMap.has(twoCharStr)) {
            dp[i] += dp[i - 2];
        }
    }
    return dp[s.length - 1];
};

```
<!-- @include-end ../leetcode/0091.decode-ways.md -->

## Longest Increasing Subsequence Problem

<div align="left"> <img src="https://cs-notes-1256109796.cos.ap-guangzhou.myqcloud.com/ee994da4-0fc7-443d-ac56-c08caf00a204.jpg" width="350px"> </div><br>

<!-- @include ../leetcode/0300.longest-increasing-subsequence.md -->
### Longest Increasing Subsequence
[300. Longest Increasing Subsequence](https://leetcode.com/problems/longest-increasing-subsequence)

```html
Given an integer array nums, return the length of the longest strictly increasing subsequence.

Example 1:

Input: nums = [10,9,2,5,3,7,101,18]
Output: 4
Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.
Example 2:

Input: nums = [0,1,0,3,2,3]
Output: 4
Example 3:

Input: nums = [7,7,7,7,7,7,7]
Output: 1
```

Brute Force Recursion:
```javascript
var lengthOfLIS = function(nums) {
    const output = lengthOfLISBruteForce(nums, 0, -Infinity);
    return output;
};

function lengthOfLISBruteForce(nums, current, prevNum) {
    if (current >= nums.length) {
        return 0;
    }

    let taken = 0;
    if (nums[current] > prevNum) {
        taken = 1 + lengthOfLISBruteForce(nums, current + 1, nums[current]);
    }
    const notTaken = lengthOfLISBruteForce(nums, current + 1, prevNum);

    return Math.max(taken, notTaken);
}
```

DP:
```javascript
var lengthOfLIS = function(nums) {
    if (nums.length == 1) {
        return 1;
    }
    
    const dp = [...Array(nums.length)].fill(1);
    let maxLen = 1;
    
    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1)
                maxLen = Math.max(maxLen, dp[i]);
            }
        }
    }

    return maxLen;
};
```
<!-- @include-end ../leetcode/0300.longest-increasing-subsequence.md -->

<!-- @include ../leetcode/0646.maximum-length-of-pair-chain.md -->
### Maximum Length of Pair Chain
[646. Maximum Length of Pair Chain](https://leetcode.com/problems/maximum-length-of-pair-chain)

```html
You are given an array of n pairs pairs where pairs[i] = [lefti, righti] and lefti < righti.

A pair p2 = [c, d] follows a pair p1 = [a, b] if b < c. A chain of pairs can be formed in this fashion.

Return the length longest chain which can be formed.

You do not need to use up all the given intervals. You can select pairs in any order.

Example 1:

Input: pairs = [[1,2],[2,3],[3,4]]
Output: 2
Explanation: The longest chain is [1,2] -> [3,4].
Example 2:

Input: pairs = [[1,2],[7,8],[4,5]]
Output: 3
Explanation: The longest chain is [1,2] -> [4,5] -> [7,8].
```

DP:
```javascript
var findLongestChain = function(pairs) {
    pairs.sort((a, b) => a[0] - b[0]);
    
    const n = pairs.length;
    const dp = [...Array(pairs.length)].fill(1);
    
    let maxLen = 1;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (pairs[i][0] > pairs[j][1]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
                maxLen = Math.max(maxLen, dp[i]);
            }
        }
    }
    
    return maxLen;
};
```

Greedy:
```javascript
var findLongestChain = function(pairs) {
    pairs.sort((a, b) => a[1] - b[1]);

    let end = pairs[0][1];
    let count = 1;

    for (let i = 1; i < pairs.length; i++) {
        if (end < pairs[i][0]) {
            end = pairs[i][1];
            count++;
        }
    }
    return count;
};
```
<!-- @include-end ../leetcode/0646.maximum-length-of-pair-chain.md -->

<!-- @include ../leetcode/0376.wiggle-subsequence.md -->
### Wiggle Subsequence
[376. Wiggle Subsequence](https://leetcode.com/problems/wiggle-subsequence)

```html
Medium
4.6K
150
company
Amazon
company
Apple
company
Bloomberg
A wiggle sequence is a sequence where the differences between successive numbers strictly alternate between positive and negative. The first difference (if one exists) may be either positive or negative. A sequence with one element and a sequence with two non-equal elements are trivially wiggle sequences.

For example, [1, 7, 4, 9, 2, 5] is a wiggle sequence because the differences (6, -3, 5, -7, 3) alternate between positive and negative.
In contrast, [1, 4, 7, 2, 5] and [1, 7, 4, 5, 5] are not wiggle sequences. The first is not because its first two differences are positive, and the second is not because its last difference is zero.
A subsequence is obtained by deleting some elements (possibly zero) from the original sequence, leaving the remaining elements in their original order.

Given an integer array nums, return the length of the longest wiggle subsequence of nums.

Example 1:

Input: nums = [1,7,4,9,2,5]
Output: 6
Explanation: The entire sequence is a wiggle sequence with differences (6, -3, 5, -7, 3).
Example 2:

Input: nums = [1,17,5,10,13,15,10,5,16,8]
Output: 7
Explanation: There are several subsequences that achieve this length.
One is [1, 17, 10, 13, 10, 16, 8] with differences (16, -7, 3, -3, 6, -8).
Example 3:

Input: nums = [1,2,3,4,5,6,7,8,9]
Output: 2
```

Recursion:
```javascript
var wiggleMaxLength = function(nums) {
    if (nums.length <= 1) {
        return 1;
    }

    let maxLength = nums[0] !== nums[1] ? 2 : 1;
    console.log({maxLength})
    maxLength += dfs(nums, 2, nums[1], nums[0]);
    return maxLength;
};

```

DP:
```javascript
var wiggleMaxLength = function(nums) {
    if (!nums|| nums.length == 0) {
        return 0;
    }
    let up = 1, down = 1;
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] > nums[i - 1]) {
            up = down + 1;
        } else if (nums[i] < nums[i - 1]) {
            down = up + 1;
        }
    }
    return Math.max(up, down);
};
```
<!-- @include-end ../leetcode/0376.wiggle-subsequence.md -->

## Longest Subsequence

<!-- @include ../leetcode/1143.longest-common-subsequence.md -->
### Longest Common Subsequence
[1143. Longest Common Subsequence](https://leetcode.com/problems/longest-common-subsequence/)

```html
Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0.
A subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.
For example, "ace" is a subsequence of "abcde".
A common subsequence of two strings is a subsequence that is common to both strings.

Example 1:
Input: text1 = "abcde", text2 = "ace" 
Output: 3  
Explanation: The longest common subsequence is "ace" and its length is 3.

Example 2:
Input: text1 = "abc", text2 = "abc"
Output: 3
Explanation: The longest common subsequence is "abc" and its length is 3.

Example 3:
Input: text1 = "abc", text2 = "def"
Output: 0
Explanation: There is no such common subsequence, so the result is 0.
```

Memoization
```javascript
var longestCommonSubsequence = function(text1, text2) {
    const memo = [...Array(text1.length)].map(() => [...Array(text2.length)]);
    return longestCommonSubsequenceBruteforce(text1, 0, text2, 0, memo);
};
function longestCommonSubsequenceBruteforce(text1, index1, text2, index2, memo) {
    if (index1 >= text1.length || index2 >= text2.length) {
        return 0;
    }
    if (memo[index1][index2]) { return memo[index1][index2]; }
    
    let res;
    if (text1[index1] === text2[index2]) {
        res = 1 + longestCommonSubsequenceBruteforce(text1, index1 + 1, text2, index2 + 1, memo);
    } else {
        res = Math.max(
            longestCommonSubsequenceBruteforce(text1, index1, text2, index2 + 1, memo),
            longestCommonSubsequenceBruteforce(text1, index1 + 1, text2, index2, memo),
        );
    }
    memo[index1][index2] = res;
    return res;
}
```

Dynamic Programming
```javascript
var longestCommonSubsequence = function(text1, text2) {
    const n1 = text1.length;
    const n2 = text2.length;
    const dp = [...Array(n1 + 1)].map(_ => [...Array(n2 + 1)].fill(0));
    
    for (let i = 1; i <= n1; i++) {
        for (let j = 1; j <= n2; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i][j - 1], dp[i - 1][j]);
            }
        }
    }
    return dp[n1][n2];
};
```
<!-- @include-end ../leetcode/1143.longest-common-subsequence.md -->

<!-- @include ../leetcode/0516.longest-palindromic-subsequence.md -->
### Longest Palindromic Subsequence
[516. Longest Palindromic Subsequence](https://leetcode.com/problems/longest-palindromic-subsequence/)

```html
516. Longest Palindromic Subsequence
Given a string s, find the longest palindromic subsequence's length in s.
A subsequence is a sequence that can be derived from another sequence by deleting some or no elements without changing the order of the remaining elements.

Example 1:
Input: s = "bbbab"
Output: 4
Explanation: One possible longest palindromic subsequence is "bbbb".

Example 2:
Input: s = "cbbd"
Output: 2
Explanation: One possible longest palindromic subsequence is "bb".
```

Memoization
```javascript
var longestPalindromeSubseq = function(s) {
    const memo = [...Array(s.length)].map(() => [...Array(s.length)].fill(0));
    return longestPalindromeSubseqMemo(s, 0, s.length - 1, memo);
};
function longestPalindromeSubseqMemo(s, left, right, memo) {
    if (left === right) { return 1; }
    if (left > right) { return 0; }
    if (memo[left][right]) { return memo[left][right]; }
    
    let res;
    if (s[left] === s[right]) {
        res = longestPalindromeSubseqMemo(s, left + 1, right - 1, memo) + 2;
    } else {
        res = Math.max(
            longestPalindromeSubseqMemo(s, left + 1, right, memo),
            longestPalindromeSubseqMemo(s, left, right - 1, memo)
        );
    }
    memo[left][right] = res;
    return res;
}
```

Dynamic Programming
```javascript
var longestPalindromeSubseqDP = function(s) {
    const dp = [...Array(s.length)].map(() => [...Array(s.length)].fill(0));
    
    for (let len = 1; len <= s.length; len++) {
        for (let left = 0; left <= s.length - len; left++) {
            let right = left + len - 1;
            if (left === right) {
                dp[left][right] = 1;
                continue;
            }
            if (s[left] === s[right]) {
                dp[left][right] = dp[left + 1][right - 1] + 2;
            } else {
                dp[left][right] = Math.max(dp[left + 1][right], dp[left][right - 1]);
            }
        }
    }
    return dp[0][s.length - 1];
};
```
<!-- @include-end ../leetcode/0516.longest-palindromic-subsequence.md -->


## 0-1 knapsack

There is a knapsack with N capacity. We are using it to hold items with the most values. These items have two properties: capacity and value.

<div align="center"> <img src="https://cs-notes-1256109796.cos.ap-guangzhou.myqcloud.com/8cb2be66-3d47-41ba-b55b-319fc68940d4.png" width="400px"> </div><br>

```javascript
// W: total capacity
// N: total number
// weights: weight of total n items
// values: value of total n items
public int knapsack(W, N, weights, values) {
    const dp = [...Array(N + 1)].map(_ => [...Array(W + 1)];
    for (let i = 1; i <= N; i++) {
        const w = weights[i - 1], v = values[i - 1];
        for (let j = 1; j <= W; j++) {
            if (j >= w) {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - w] + v);
            } else {
                dp[i][j] = dp[i - 1][j];
            }
        }
    }
    return dp[N][W];
}
```

**space optimization**  

<div align="center"> <img src="https://cs-notes-1256109796.cos.ap-guangzhou.myqcloud.com/9ae89f16-7905-4a6f-88a2-874b4cac91f4.jpg" width="300px"> </div><br>

```javascript
public int knapsack(W, N, weights, values) {
    const dp = [...Array(W + 1)];
    for (let i = 1; i <= N; i++) {
        const w = weights[i - 1], v = values[i - 1];
        for (let j = W; j >= 1; j--) {
            if (j >= w) {
                dp[j] = Math.max(dp[j], dp[j - w] + v);
            }
        }
    }
    return dp[W];
}
```

**memoization**
```javascript
function knapsackBF(n, capacity, memo) {
  if (memo.has(`${n}-${capacity}`)) {
    return memo.get(`${n}-${capacity}`);
  }

  if (n === 0 || capacity === 0) {
    return 0;
  }

  if (weights[n - 1] > capacity) {
    return knapsackBF(n - 1, capacity);
  }

  const res = Math.max(
    knapsackBF(n - 1, capacity, memo),
    knapsackBF(n - 1, capacity - weights[n - 1], memo) + values[n - 1]
  );
  memo.set(`${n}-${capacity}`, res);
  return res;
}
```

**Why the greedy approach is not applicable**  

| id | w | v | v/w |
| --- | --- | --- | --- |
| 0 | 1 | 6 | 6 |
| 1 | 2 | 10 | 5 |
| 2 | 3 | 12 | 4 |

**Variations**  

- unbounded knapsack：number of items is unlimited

- multiple knapsack: number of items is limited

- multiple dimention knapsack: limitations on weight and capacity

- others：items are depending on each other

<!-- @include ../leetcode/0416.partition-equal-subset-sum.md -->
### Partition Equal Subset Sum

[416. Partition Equal Subset Sum](https://leetcode.com/problems/partition-equal-subset-sum)

```html
Given an integer array nums, return true if you can partition the array into two subsets such that the sum of the elements in both subsets is equal or false otherwise.

Example 1:

Input: nums = [1,5,11,5]
Output: true
Explanation: The array can be partitioned as [1, 5, 5] and [11].
Example 2:

Input: nums = [1,2,3,5]
Output: false
Explanation: The array cannot be partitioned into equal sum subsets.
```

Memoization:
```javascript
var canPartition = function(nums) {
    const sum = nums.reduce((sum, n) => sum + n, 0);
    if (sum % 2 !== 0) {
        return false;
    }
    return memoization(nums, Math.floor(sum / 2), new Map());
};

function memoization(nums, target, memo) {
    if (memo.has(`${nums[0]}-${target}`)) {
        return memo.get(`${nums[0]}-${target}`);
    }
    if (target === 0) {
        return true;
    }
    if (nums.length === 0 || target < 0) {
        return false;
    }
    
    const taken = memoization(nums.slice(1), target - nums[0], memo);
    const notTaken = memoization(nums.slice(1), target, memo);
    const res = taken || notTaken;
    memo.set(`${nums[0]}-${target}`, res);
    return res;
}
```

DP:
```javascript
var canPartition = function(nums) {
    const sum = nums.reduce((memo, num) => memo + num, 0);
    const subsetSum = Math.floor(sum / 2);
    if (sum % 2 != 0) { return false; }
    
    const dp = [...Array(subsetSum + 1)].fill(false);
    dp[0] = true;
    
    for (const num of nums) {
        for (let i = subsetSum; i >= num; i--) {
            dp[i] = dp[i - num] || dp[i];
        }
    }
    
    return dp[subsetSum];
};
```
<!-- @include-end ../leetcode/0416.partition-equal-subset-sum.md -->

<!-- @include ../leetcode/0494.target-sum.md -->
### Target Sum
[494. Target Sum](https://leetcode.com/problems/target-sum/)

```html
You are given an integer array nums and an integer target.

You want to build an expression out of nums by adding one of the symbols '+' and '-' before each integer in nums and then concatenate all the integers.

For example, if nums = [2, 1], you can add a '+' before 2 and a '-' before 1 and concatenate them to build the expression "+2-1".
Return the number of different expressions that you can build, which evaluates to target.

Example 1:

Input: nums = [1,1,1,1,1], target = 3
Output: 5
Explanation: There are 5 ways to assign symbols to make the sum of nums be target 3.
-1 + 1 + 1 + 1 + 1 = 3
+1 - 1 + 1 + 1 + 1 = 3
+1 + 1 - 1 + 1 + 1 = 3
+1 + 1 + 1 - 1 + 1 = 3
+1 + 1 + 1 + 1 - 1 = 3
Example 2:

Input: nums = [1], target = 1
Output: 1

This problem can be converted to Subset Sum. So 0-1 Knapsack can solve it。

                  sum(P) - sum(N) = target
sum(P) + sum(N) + sum(P) - sum(N) = target + sum(P) + sum(N)
                       2 * sum(P) = target + sum(nums)
```

memoization:
```javascript
var findTargetSumWays = function(nums, target) {
    if (nums.length === 0) {
        return target == 0 ? 1 : 0;
    }
    return findTargetSumWays(nums.slice(1), target + nums[0]) + findTargetSumWays(nums.slice(1), target - nums[0]);
};

```

DP:
```javascript
var findTargetSumWays = function(nums, S) {
    const sum = nums.reduce((memo, n) => memo + n, 0);
    if (sum < S || (sum + S) % 2 == 1) {
        return 0;
    }
    const target = (sum + S) / 2;

    const dp = [...Array(target + 1)].fill(false);
    dp[0] = 1;
    
    for (const num of nums) {
        for (let i = target; i >= num; i--) {
            dp[i] = dp[i] + dp[i - num];
        }
    }
    
    return dp[target];
};
```
<!-- @include-end ../leetcode/0494.target-sum.md -->

<!-- @include ../leetcode/0474.ones-and-zeroes.md -->
### Ones and Zeroes
[474. Ones and Zeroes](https://leetcode.com/problems/ones-and-zeroes)

```html
You are given an array of binary strings strs and two integers m and n.

Return the size of the largest subset of strs such that there are at most m 0's and n 1's in the subset.

A set x is a subset of a set y if all elements of x are also elements of y.

Example 1:

Input: strs = ["10","0001","111001","1","0"], m = 5, n = 3
Output: 4
Explanation: The largest subset with at most 5 0's and 3 1's is {"10", "0001", "1", "0"}, so the answer is 4.
Other valid but smaller subsets include {"0001", "1"} and {"10", "1", "0"}.
{"111001"} is an invalid subset because it contains 4 1's, greater than the maximum of 3.
Example 2:

Input: strs = ["10","0","1"], m = 1, n = 1
Output: 2
Explanation: The largest subset is {"0", "1"}, so the answer is 2.
```

Memoization:
```javascript
function memoization(strs, numOf0, numOf1) {
    if (strs.length === 0) {
        return 0;
    }
    
    const countOf0s = strs[0].split('').reduce((c, s) => s === '0' ? c + 1 : c, 0);
    const countOf1s = strs[0].split('').reduce((c, s) => s === '1' ? c + 1 : c, 0);

    if (countOf0s > numOf0 || countOf1s > numOf1) {
        return memoization(strs.slice(1), numOf0, numOf1);
    }

    return Math.max(
        memoization(strs.slice(1), numOf0 - countOf0s, numOf1 - countOf1s) + 1,
        memoization(strs.slice(1), numOf0, numOf1),
    );
}
```

DP:
```javascript
var findMaxForm = function(strs, m, n) {
    const dp = [...Array(m + 1)].map(a => [...Array(n + 1)].fill(0));
    for (const str of strs) {
        const count0 = strs[0].split('').reduce((c, s) => s === '0' ? c + 1 : c, 0);
        const count1 = strs[0].split('').reduce((c, s) => s === '1' ? c + 1 : c, 0);

        for (let zero = m; zero >= count0; zero--) {
            for (let one = n; one >= count1; one--) {
                dp[zero][one] = Math.max(1 + dp[zero - count0][one - count1], dp[zero][one]);
            }
        }
    }
    return dp[m][n];
};

```
<!-- @include-end ../leetcode/0474.ones-and-zeroes.md -->

<!-- @include ../leetcode/0322.coin-change.md -->
### Coin Change
[322. Coin Change](https://leetcode.com/problems/coin-change)

```html
You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.

Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.

You may assume that you have an infinite number of each kind of coin.

Example 1:

Input: coins = [1,2,5], amount = 11
Output: 3
Explanation: 11 = 5 + 5 + 1
Example 2:

Input: coins = [2], amount = 3
Output: -1
Example 3:

Input: coins = [1], amount = 0
Output: 0
```

Memoization:
```javascript
var coinChange = function(coins, amount, memo = new Map()) {
    if (memo.has(`${coins[0]}-${amount}`)) {
        return memo.get(`${coins[0]}-${amount}`);
    }

    if (amount === 0) {
        return 0;
    }

    if (coins.length === 0 || amount < 0) {
        return -1;
    }

    let min = Infinity;
    for (const coin of coins) {
        let count = coinChange(coins, amount - coin);
        if (count != -1) {
            min = Math.min(min, count + 1);
        }
    }
    const res = min === Infinity ? -1 : min;
    memo.set(`${coins[0]}-${amount}`, res);
    return res;
};

```

DP:
```javascript
var coinChange = function(coins, amount) {
    const dp = [...Array(amount + 1)].fill(Infinity);
    dp[0] = 0;
    
    for (const coin of coins) {
        let min = Infinity;
        for (let i = coin; i <= amount; i++) {
            if (i >= coin) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    return dp[amount] === Infinity ? -1 : dp[amount];
};
```
<!-- @include-end ../leetcode/0322.coin-change.md -->

<!-- @include ../leetcode/0518.coin-change-ii.md -->
### Coin Change II
[518. Coin Change II](https://leetcode.com/problems/coin-change-ii/)

```html
You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.

Return the number of combinations that make up that amount. If that amount of money cannot be made up by any combination of the coins, return 0.

You may assume that you have an infinite number of each kind of coin.

The answer is guaranteed to fit into a signed 32-bit integer.

Example 1:

Input: amount = 5, coins = [1,2,5]
Output: 4
Explanation: there are four ways to make up the amount:
5=5
5=2+2+1
5=2+1+1+1
5=1+1+1+1+1
Example 2:

Input: amount = 3, coins = [2]
Output: 0
Explanation: the amount of 3 cannot be made up just with coins of 2.
Example 3:

Input: amount = 10, coins = [10]
Output: 1
```

Memoization:
```javascript
var change = function(amount, coins) {
    if (amount === 0) {
        return 1;
    }
    if (coins.length === 0 || amount < 0) {
        return 0;
    }
    const taken = change(amount - coins[0], coins);
    const notTaken = change(amount, coins.slice(1));
    return taken + notTaken;
};
```

DP:
```javascript
var change = function(amount, coins) {
    const dp = [...Array(amount + 1)].fill(0);
    dp[0] = 1;
    for (const coin of coins) {
        for (let i = coin; i <= amount; i++) {
            dp[i] = dp[i] + dp[i - coin];
        }
    }
    return dp[amount];
};
```
<!-- @include-end ../leetcode/0518.coin-change-ii.md -->

<!-- @include ../leetcode/0139.word-break.md -->
### Word Break
[139. Word Break](https://leetcode.com/problems/word-break/)

```html
Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.

Note that the same word in the dictionary may be reused multiple times in the segmentation.

Example 1:

Input: s = "leetcode", wordDict = ["leet","code"]
Output: true
Explanation: Return true because "leetcode" can be segmented as "leet code".
Example 2:

Input: s = "applepenapple", wordDict = ["apple","pen"]
Output: true
Explanation: Return true because "applepenapple" can be segmented as "apple pen apple".
Note that you are allowed to reuse a dictionary word.
Example 3:

Input: s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
Output: false
```

Memoization:
```javascript
var wordBreak = function(s, wordDict, memo = new Map()) {
    if (memo.has(s)) {
        return memo.get(s);
    }
    if (s.length === 0) {
        return true;
    }
    if (wordDict.length === 0) {
        return false;
    }

    for (let i = 0; i <= s.length; i++) {
        const word = s.substring(0, i);
        const nextS = s.substring(i);
        if (wordDict.includes(word) && wordBreak(nextS, wordDict, memo)) {
            memo.set(s, true);
            return true;
        }
    }
    memo.set(s, false);
    return false;
};
```

DP:
```javascript
var wordBreak = function(s, wordDict, memo = new Map()) {
    const dp = [...Array(s.length + 1)].fill(false);
    dp[0] = true;

    for (let i = 1; i <= s.length; i++) {
        for (const word of wordDict) {
            if (s.substring(i - word.length, i) === word) {
                dp[i] = dp[i] || dp[i - word.length];
            }
        }
    }

    return dp[s.length];
};
```
<!-- @include-end ../leetcode/0139.word-break.md -->

<!-- @include ../leetcode/0140.word-break-ii.md -->
### Word Break II
[140. Word Break II](https://leetcode.com/problems/word-break-ii/)
```html
Given a string s and a dictionary of strings wordDict, add spaces in s to construct a sentence where each word is a valid dictionary word. Return all such possible sentences in any order.

Note that the same word in the dictionary may be reused multiple times in the segmentation.

Example 1:

Input: s = "catsanddog", wordDict = ["cat","cats","and","sand","dog"]
Output: ["cats and dog","cat sand dog"]
Example 2:

Input: s = "pineapplepenapple", wordDict = ["apple","pen","applepen","pine","pineapple"]
Output: ["pine apple pen apple","pineapple pen apple","pine applepen apple"]
Explanation: Note that you are allowed to reuse a dictionary word.
Example 3:

Input: s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
Output: []
```

Backtracking with no memoization
```javascript
var wordBreak = function(s, wordDict) {
    const output = [];
    backtrack(s, wordDict, [], output);
    return output;
};

function backtrack(s, wordDict, words, output) {
  if (s.length === 0) {
      return output.push(words.join(' '));
  }

  for (const word of wordDict) {
    if (!s.startsWith(word)) { continue; }
    const nextS = s.slice(word.length);
    const nextWords = [...words, word];
    backtrack(nextS, wordDict, nextWords, output);
  }
}
```

Backtracking with memoization
```javascript
var wordBreak = function(s, wordDict) {
    const output = backtrack(s, wordDict, new Map());
    return output.map(s => s.join(' '));
};

function backtrack(s, wordDict, memo) {
    if (memo.has(s)) {
        return memo.get(s);
    }

    if (s.length === 0) {
        return [[]];
    }

    const words = [];
    for (let i = 1; i <= s.length; i++) {
        const word = s.substring(0, i);
        if (wordDict.includes(word)) {
            const nextS = s.substring(i);
            const nextWords = backtrack(nextS, wordDict, memo);
            console.log({i, s, nextS, word, nextWords})
            for (const nextWord of nextWords) {
                words.push([word, ...nextWord]);
            }
        }
    }
    
    memo.set(s, words);
    return words;
}
```

DP:
```javascript
function wordBreak(s, wordDict) {
    const dp = [...Array(s.length + 1)].fill([[]]);

    for (let i = 1; i <= s.length; i++) {
        for (const word of wordDict) {
            if (word === s.substring(i - word.length, i)) {
                dp[i] = dp[i - word.length].map(words => [word, ...words]);
                break;
            }
        }
    }
    return dp[s.length];
}
```
<!-- @include-end ../leetcode/0140.word-break-ii.md -->

## Stock Trading

<!-- @include ../leetcode/0121.best-time-to-buy-and-sell-stock.md -->
### Best Time to Buy and Sell Stock
[121. Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)

```html
You are given an array prices where prices[i] is the price of a given stock on the ith day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.

Example 1:
Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.

Example 2:
Input: prices = [7,6,4,3,1]
Output: 0
Explanation: In this case, no transactions are done and the max profit = 0.
```

```javascript
var maxProfit = function(prices) {
    let minPrice = Infinity;
    let maxprofit = -Infinity;
    
    for (const price of prices) {
        minPrice = Math.min(minPrice, price);
        maxprofit = Math.max(maxprofit, price - minPrice);
    }
    return maxprofit;
};
```
<!-- @include-end ../leetcode/0121.best-time-to-buy-and-sell-stock.md -->

<!-- @include ../leetcode/0122.best-time-to-buy-and-sell-stock-ii.md -->
### 122. Best Time to Buy and Sell Stock II
[122. Best Time to Buy and Sell Stock II](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii)

```html
You are given an integer array prices where prices[i] is the price of a given stock on the ith day.

On each day, you may decide to buy and/or sell the stock. You can only hold at most one share of the stock at any time. However, you can buy it then immediately sell it on the same day.

Find and return the maximum profit you can achieve.
```

```javascript
var maxProfit = function(prices) {
    const len = prices.length;
    const maxProfitAfterBuy = Array(len - 1);
    const maxProfitAfterSell = Array(len - 1);
    maxProfitAfterBuy[0] = -prices[0];
    maxProfitAfterSell[0] = 0;

    for (let i = 1; i < len; i++) {
        maxProfitAfterBuy[i] = Math.max(
            maxProfitAfterBuy[i - 1], // hold
            maxProfitAfterSell[i - 1] - prices[i] // buy
        )
        maxProfitAfterSell[i] = Math.max(
            maxProfitAfterSell[i - 1], // hold
            maxProfitAfterBuy[i - 1] + prices[i] // sell
        )
    }

    return maxProfitAfterSell[len - 1];
};
```
<!-- @include-end ../leetcode/0122.best-time-to-buy-and-sell-stock-ii.md -->

<!-- @include ../leetcode/0123.best-time-to-buy-and-sell-stock-iii.md -->
### Best Time to Buy and Sell Stock III
[123. Best Time to Buy and Sell Stock III](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii)

```html
You are given an array prices where prices[i] is the price of a given stock on the ith day.

Find the maximum profit you can achieve. You may complete at most two transactions.

Note: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).


Example 1:

Input: prices = [3,3,5,0,0,3,1,4]
Output: 6
Explanation: Buy on day 4 (price = 0) and sell on day 6 (price = 3), profit = 3-0 = 3.
Then buy on day 7 (price = 1) and sell on day 8 (price = 4), profit = 4-1 = 3.
Example 2:

Input: prices = [1,2,3,4,5]
Output: 4
Explanation: Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.
Note that you cannot buy on day 1, buy on day 2 and sell them later, as you are engaging multiple transactions at the same time. You must sell before buying again.
Example 3:

Input: prices = [7,6,4,3,1]
Output: 0
Explanation: In this case, no transaction is done, i.e. max profit = 0.
```

```javascript
var maxProfit = function(prices) {
    const len = prices.length;
    const maxProfitAfterBuy1 = Array(len);
    const maxProfitAfterBuy2 = Array(len);
    const maxProfitAfterSell1 = Array(len);
    const maxProfitAfterSell2 = Array(len);

    maxProfitAfterBuy1[0] = -prices[0];
    maxProfitAfterBuy2[0] = -prices[0];
    maxProfitAfterSell1[0] = 0;
    maxProfitAfterSell2[0] = 0;

    for (let i = 1; i < len; i++) {
        maxProfitAfterSell2[i] = Math.max(
            maxProfitAfterSell2[i - 1], // hold
            maxProfitAfterBuy2[i - 1] + prices[i] // 2nd sell 
        );
        maxProfitAfterBuy2[i] = Math.max(
            maxProfitAfterBuy2[i - 1], // hold
            maxProfitAfterSell1[i - 1] - prices[i] // 2nd buy
        );
        maxProfitAfterSell1[i] = Math.max(
            maxProfitAfterSell1[i - 1], // hold
            maxProfitAfterBuy1[i - 1] + prices[i] // 1st sell
        );
        maxProfitAfterBuy1[i] = Math.max(
            maxProfitAfterBuy1[i - 1], // hold
            maxProfitAfterSell1[0] - prices[i] // 1st buy
        );
    }

    return maxProfitAfterSell2[len - 1];
};
```
<!-- @include-end ../leetcode/0123.best-time-to-buy-and-sell-stock-iii.md -->

<!-- @include ../leetcode/0188.best-time-to-buy-and-sell-stock-iv.md -->
### Best Time to Buy and Sell Stock IV
[188. Best Time to Buy and Sell Stock IV](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv)

```html
You are given an integer array prices where prices[i] is the price of a given stock on the ith day, and an integer k.

Find the maximum profit you can achieve. You may complete at most k transactions: i.e. you may buy at most k times and sell at most k times.

Note: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).

Example 1:

Input: k = 2, prices = [2,4,1]
Output: 2
Explanation: Buy on day 1 (price = 2) and sell on day 2 (price = 4), profit = 4-2 = 2.
Example 2:

Input: k = 2, prices = [3,2,6,5,0,3]
Output: 7
Explanation: Buy on day 2 (price = 2) and sell on day 3 (price = 6), profit = 6-2 = 4. Then buy on day 5 (price = 0) and sell on day 6 (price = 3), profit = 3-0 = 3.
```

```javascript
var maxProfit = function(kTimes, prices) {
    const len = prices.length;
    const maxProfitAfterBuy = [...Array(kTimes)].map(_ => [...Array(len)]);
    const maxProfitAfterSell = [...Array(kTimes)].map(_ => [...Array(len)]);

    for (let i = 0; i < kTimes; i++) {
        maxProfitAfterBuy[i][0] = -prices[0];
        maxProfitAfterSell[i][0] = 0;
    }

    for (let i = 1; i < len; i++) {
        for (let k = 0; k < kTimes; k++) {
            maxProfitAfterSell[k][i] = Math.max(
                maxProfitAfterSell[k][i - 1], // hold,
                maxProfitAfterBuy[k][i - 1] + prices[i] // sell
            );
            maxProfitAfterBuy[k][i] = Math.max(
                maxProfitAfterBuy[k][i - 1], // hold
                (maxProfitAfterSell[k - 1]?.[i - 1] || 0) - prices[i] // buy
            )
        }
    }

    return maxProfitAfterSell[kTimes - 1][len - 1];
};
```
<!-- @include-end ../leetcode/0188.best-time-to-buy-and-sell-stock-iv.md -->

<!-- @include ../leetcode/0309.best-time-to-buy-and-sell-stock-with-cooldown.md -->
### Best Time to Buy and Sell Stock with Cooldown
[309. Best Time to Buy and Sell Stock with Cooldown](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown)

```html
You are given an array prices where prices[i] is the price of a given stock on the ith day.

Find the maximum profit you can achieve. You may complete as many transactions as you like (i.e., buy one and sell one share of the stock multiple times) with the following restrictions:

After you sell your stock, you cannot buy stock on the next day (i.e., cooldown one day).
Note: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).

Example 1:

Input: prices = [1,2,3,0,2]
Output: 3
Explanation: transactions = [buy, sell, cooldown, buy, sell]
Example 2:

Input: prices = [1]
Output: 0
```

```javascript
var maxProfit = function(prices) {
    if (prices == null || prices.length == 0) {
        return 0;
    }

    const len = prices.length;
    const sell = Array(len);
    const buy = Array(len);
    const rest = Array(len);

    sell[0] = 0;
    buy[0] = -prices[0];
    rest[0] = 0;

    for (let i = 1; i < prices.length; i++) {
        buy[i] = Math.max(buy[i - 1], rest[i - 1] - prices[i]);
        sell[i] = Math.max(sell[i - 1], buy[i - 1] + prices[i]);
        rest[i] = Math.max(sell[i - 1], Math.max(buy[i - 1], rest[i - 1]));
    }
    return sell[prices.length - 1];
};
```

```javascript
var maxProfit = function(prices) {
    if (prices == null || prices.length == 0) {
        return 0;
    }

    const len = prices.length;
    const maxProfitAfterBuy = Array(len);
    const maxProfitAfterSell = Array(len);
    let prevPrice = 0;

    maxProfitAfterBuy[0] = -prices[0];
    maxProfitAfterSell[0] = 0;

    for (let i = 1; i < len; i++) {
        maxProfitAfterSell[i] = Math.max(
            maxProfitAfterSell[i - 1], // hold
            maxProfitAfterBuy[i - 1] + prices[i] // sell
        );
        maxProfitAfterBuy[i] = Math.max(
            maxProfitAfterBuy[i - 1], // hold
            prevPrice - prices[i] // buy
        );
        prevPrice = maxProfitAfterSell[i - 1];
    }

    return maxProfitAfterSell[len - 1]
};
```
<!-- @include-end ../leetcode/0309.best-time-to-buy-and-sell-stock-with-cooldown.md -->

<!-- @include ../leetcode/0714.best-time-to-buy-and-sell-stock-with-transaction-fee.md -->
### Best Time to Buy and Sell Stock with Transaction Fee
[714. Best Time to Buy and Sell Stock with Transaction Fee](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee)

```html
You are given an array prices where prices[i] is the price of a given stock on the ith day, and an integer fee representing a transaction fee.

Find the maximum profit you can achieve. You may complete as many transactions as you like, but you need to pay the transaction fee for each transaction.

Note: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).

Example 1:

Input: prices = [1,3,2,8,4,9], fee = 2
Output: 8
Explanation: The maximum profit can be achieved by:
- Buying at prices[0] = 1
- Selling at prices[3] = 8
- Buying at prices[4] = 4
- Selling at prices[5] = 9
The total profit is ((8 - 1) - 2) + ((9 - 4) - 2) = 8.
Example 2:

Input: prices = [1,3,7,5,10,3], fee = 3
Output: 6
```

```javascript
var maxProfit = function(prices, fee) {
    const len = prices.length;
    const maxProfitAfterBuy = Array(len);
    const maxProfitAfterSell = Array(len);
    maxProfitAfterBuy[0] = -prices[0];
    maxProfitAfterSell[0] = 0;
    
    for (let i = 1; i < len; i++) {
        maxProfitAfterSell[i] = Math.max(
            maxProfitAfterSell[i - 1], // on hold
            maxProfitAfterBuy[i - 1] + prices[i] - fee // sell
        );
        maxProfitAfterBuy[i] = Math.max(
            maxProfitAfterBuy[i - 1], // on hold
            maxProfitAfterSell[i - 1] - prices[i]
        );
    }

    return maxProfitAfterSell[len - 1];
};
```
<!-- @include-end ../leetcode/0714.best-time-to-buy-and-sell-stock-with-transaction-fee.md -->

<!-- @include ../leetcode/0377.combination-sum-iv.md -->
### Combination Sum IV

[377. Combination Sum IV](https://leetcode.com/problems/combination-sum-iv)

```html
Given an array of distinct integers nums and a target integer target, return the number of possible combinations that add up to target.

The test cases are generated so that the answer can fit in a 32-bit integer.

Example 1:

Input: nums = [1,2,3], target = 4
Output: 7
Explanation:
The possible combination ways are:
(1, 1, 1, 1)
(1, 1, 2)
(1, 2, 1)
(1, 3)
(2, 1, 1)
(2, 2)
(3, 1)
Note that different sequences are counted as different combinations.
Example 2:

Input: nums = [9], target = 3
Output: 0
```

Memoization:
```javascript
var combinationSum4 = function(nums, target) {
    const memo = new Map()
    return memoize(nums, target, memo);
};

function memoize(nums, target, memo) {
    if (target === 0) {
        return 1;
    }

    if (memo.has(target)) {
        return memo.get(target);
    }

    let res = 0;
    for (const num of nums) {
        if (target - num >= 0) {
            res += memoize(nums, target - num, memo);
        }
    }
    memo.set(target, res);
    return res;
}
```

DP:
```javascript
var combinationSum4 = function(nums, target) {
    const len = nums.length;
    const dp = [...Array(target + 1)].fill(0);
    dp[0] = 1;
    
    for (let i = 1; i <= target; i++) {
        for (const num of nums) {
            if (i >= num) {
                dp[i] = dp[i] + dp[i - num];
            }
        }
    }
    
    return dp[target];
};
```
<!-- @include-end ../leetcode/0377.combination-sum-iv.md -->

### 4. 只能进行 k 次的股票交易

188\. Best Time to Buy and Sell Stock IV (Hard)

[Leetcode](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/description/) / [力扣](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iv/description/)

```java
public int maxProfit(int k, int[] prices) {
    int n = prices.length;
    if (k >= n / 2) {   // 这种情况下该问题退化为普通的股票交易问题
        int maxProfit = 0;
        for (int i = 1; i < n; i++) {
            if (prices[i] > prices[i - 1]) {
                maxProfit += prices[i] - prices[i - 1];
            }
        }
        return maxProfit;
    }
    int[][] maxProfit = new int[k + 1][n];
    for (int i = 1; i <= k; i++) {
        int localMax = maxProfit[i - 1][0] - prices[0];
        for (int j = 1; j < n; j++) {
            maxProfit[i][j] = Math.max(maxProfit[i][j - 1], prices[j] + localMax);
            localMax = Math.max(localMax, maxProfit[i - 1][j] - prices[j]);
        }
    }
    return maxProfit[k][n - 1];
}
```

## 字符串编辑

### 1. 删除两个字符串的字符使它们相等

583\. Delete Operation for Two Strings (Medium)

[Leetcode](https://leetcode.com/problems/delete-operation-for-two-strings/description/) / [力扣](https://leetcode-cn.com/problems/delete-operation-for-two-strings/description/)

```html
Input: "sea", "eat"
Output: 2
Explanation: You need one step to make "sea" to "ea" and another step to make "eat" to "ea".
```

可以转换为求两个字符串的最长公共子序列问题。

```java
public int minDistance(String word1, String word2) {
    int m = word1.length(), n = word2.length();
    int[][] dp = new int[m + 1][n + 1];
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (word1.charAt(i - 1) == word2.charAt(j - 1)) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i][j - 1], dp[i - 1][j]);
            }
        }
    }
    return m + n - 2 * dp[m][n];
}
```

### 2. 编辑距离

72\. Edit Distance (Hard)

[Leetcode](https://leetcode.com/problems/edit-distance/description/) / [力扣](https://leetcode-cn.com/problems/edit-distance/description/)

```html
Example 1:

Input: word1 = "horse", word2 = "ros"
Output: 3
Explanation:
horse -> rorse (replace 'h' with 'r')
rorse -> rose (remove 'r')
rose -> ros (remove 'e')
Example 2:

Input: word1 = "intention", word2 = "execution"
Output: 5
Explanation:
intention -> inention (remove 't')
inention -> enention (replace 'i' with 'e')
enention -> exention (replace 'n' with 'x')
exention -> exection (replace 'n' with 'c')
exection -> execution (insert 'u')
```

题目描述：修改一个字符串成为另一个字符串，使得修改次数最少。一次修改操作包括：插入一个字符、删除一个字符、替换一个字符。

```java
public int minDistance(String word1, String word2) {
    if (word1 == null || word2 == null) {
        return 0;
    }
    int m = word1.length(), n = word2.length();
    int[][] dp = new int[m + 1][n + 1];
    for (int i = 1; i <= m; i++) {
        dp[i][0] = i;
    }
    for (int i = 1; i <= n; i++) {
        dp[0][i] = i;
    }
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (word1.charAt(i - 1) == word2.charAt(j - 1)) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = Math.min(dp[i - 1][j - 1], Math.min(dp[i][j - 1], dp[i - 1][j])) + 1;
            }
        }
    }
    return dp[m][n];
}
```

### 3. 复制粘贴字符

650\. 2 Keys Keyboard (Medium)

[Leetcode](https://leetcode.com/problems/2-keys-keyboard/description/) / [力扣](https://leetcode-cn.com/problems/2-keys-keyboard/description/)

题目描述：最开始只有一个字符 A，问需要多少次操作能够得到 n 个字符 A，每次操作可以复制当前所有的字符，或者粘贴。

```
Input: 3
Output: 3
Explanation:
Intitally, we have one character 'A'.
In step 1, we use Copy All operation.
In step 2, we use Paste operation to get 'AA'.
In step 3, we use Paste operation to get 'AAA'.
```

```java
public int minSteps(int n) {
    if (n == 1) return 0;
    for (int i = 2; i <= Math.sqrt(n); i++) {
        if (n % i == 0) return i + minSteps(n / i);
    }
    return n;
}
```

```java
public int minSteps(int n) {
    int[] dp = new int[n + 1];
    int h = (int) Math.sqrt(n);
    for (int i = 2; i <= n; i++) {
        dp[i] = i;
        for (int j = 2; j <= h; j++) {
            if (i % j == 0) {
                dp[i] = dp[j] + dp[i / j];
                break;
            }
        }
    }
    return dp[n];
}
```

## Array Crossing

<!-- @include ../leetcode/0256.paint-house.md -->
### Paint House
[256. Paint House](https://leetcode.com/problems/paint-house/)
```html
There are a row of n houses, each house can be painted with one of the three colors: red, blue or green. The cost of painting each house with a certain color is different. You have to paint all the houses such that no two adjacent houses have the same color.

The cost of painting each house with a certain color is represented by a n x 3 cost matrix. For example, costs[0][0] is the cost of painting house 0 with color red;costs[1][2] is the cost of painting house 1 with color green, and so on... Find the minimum cost to paint all houses.

Note: All costs are positive integers.
```
Memoization (top down)

```javascript
function minCostMemoization(costs, currentIndex, lastColorIndex, memo) {
    if (memo.has(`${currentIndex}:${lastColorIndex}`)) {
        return memo.get(`${currentIndex}:${lastColorIndex}`);
    }
    
    if (currentIndex >= costs.length) {
        return 0;
    }
    
    let min = Infinity;
    for (let i = 0; i < 3; i++) {
        if (lastColorIndex === i) {
            continue;
        }
        min = Math.min(min, costs[currentIndex][i] + minCostMemoization(costs, currentIndex + 1, i, memo));
    }
    memo.set(`${currentIndex}:${lastColorIndex}`, min)
    return min;
}
```

```javascript
var minCost = function(costs) {
    let n = costs.length;
    const dp = [...Array(n)].map(_ => [...Array(3)].fill(0));
    dp[0][0] = costs[0][0];
    dp[0][1] = costs[0][1];
    dp[0][2] = costs[0][2];
    for (let i = 1; i < n; i++) {
        dp[i][0] = costs[i][0] + Math.min(dp[i - 1][1], dp[i - 1][2]);
        dp[i][1] = costs[i][1] + Math.min(dp[i - 1][0], dp[i - 1][2]);
        dp[i][2] = costs[i][2] + Math.min(dp[i - 1][0], dp[i - 1][1]);
    }
    return Math.min(dp[n - 1][0], dp[n - 1][1], dp[n - 1][2]);
};
```


## Gaming

<!-- @include ../leetcode/0464.can-i-win.md -->
### Can I Win
[464. Can I Win](https://leetcode.com/problems/can-i-win/)

```html
In the "100 game" two players take turns adding, to a running total, any integer from 1 to 10. The player who first causes the running total to reach or exceed 100 wins.
What if we change the game so that players cannot re-use integers?
For example, two players might take turns drawing from a common pool of numbers from 1 to 15 without replacement until they reach a total >= 100.
Given two integers maxChoosableInteger and desiredTotal, return true if the first player to move can force a win, otherwise, return false. Assume both players play optimally.

Example 1:
Input: maxChoosableInteger = 10, desiredTotal = 11
Output: false
Explanation:
No matter which integer the first player choose, the first player will lose.
The first player can choose an integer from 1 up to 10.
If the first player choose 1, the second player can only choose integers from 2 up to 10.
The second player will win by choosing 10 and get a total = 11, which is >= desiredTotal.
Same with other integers chosen by the first player, the second player will always win.

Example 2:
Input: maxChoosableInteger = 10, desiredTotal = 0
Output: true

Example 3:
Input: maxChoosableInteger = 10, desiredTotal = 1
Output: true
```

```javascript
var canIWin = function(maxChoosableInteger, desiredTotal) {
    const picked = [...Array(maxChoosableInteger + 1)].fill(false);
    const memo = new Map();
    
    if (desiredTotal <= maxChoosableInteger) { return true; }
    
    if ((1 + maxChoosableInteger) / 2 * maxChoosableInteger < desiredTotal) { return false; }

    return canIWinHelper(maxChoosableInteger, desiredTotal, picked, memo);
};
function canIWinHelper(maxChoosableInteger, desiredTotal, picked, memo) {
    const key = picked.toString();
    if (memo.has(key)) { return memo.get(key); }

    for (let i = 1; i <= maxChoosableInteger; i++) {
        if (picked[i]) { continue; }

        picked[i] = true;
        if (desiredTotal - i <= 0
            || !canIWinHelper(maxChoosableInteger, desiredTotal - i, picked, memo)
        ) {
            picked[i] = false;
            memo.set(key, true);
            return true;
        }
        picked[i] = false;
    }

    memo.set(key, false);
    return false;
}
```

<!-- @include ../leetcode/0264.ugly-number-ii.md -->
### Ugly Number II
[264. Ugly Number II](https://leetcode.com/problems/ugly-number-ii)

```html
An ugly number is a positive integer whose prime factors are limited to 2, 3, and 5.

Given an integer n, return the nth ugly number.

Example 1:

Input: n = 10
Output: 12
Explanation: [1, 2, 3, 4, 5, 6, 8, 9, 10, 12] is the sequence of the first 10 ugly numbers.
Example 2:

Input: n = 1
Output: 1
Explanation: 1 has no prime factors, therefore all of its prime factors are limited to 2, 3, and 5.
```

```javascript
var nthUglyNumber = function(n) {
    var dp = new Array(n)
    dp[0] = 1

    let p1 = 0, p2 = 0, p3 = 0;
    for (let i = 1; i < n; i++) {
        let next1 = dp[p1] * 2
        let next2 = dp[p2] * 3
        let next3 = dp[p3] * 5

        dp[i] = Math.min(next1, next2, next3)

        if (dp[i] == next1) p1++
        if (dp[i] == next2) p2++
        if (dp[i] == next3) p3++
    }
    return dp[n - 1]
};
```
<!-- @include-end ../leetcode/0264.ugly-number-ii.md -->
