# Divided and Conquer
<!-- GFM-TOC -->
* [Divided and Conquer](#Divided-and-Conquer)
    * [Different Ways to Add Parentheses](#Different-Ways-to-Add-Parentheses)
    * [Unique Binary Search Trees II](#Unique-Binary-Search-Trees-II)
    * [Majority Element](#majority-element)
    * [Sort an Array](#sort-an-array)
    * [Count of Smaller Numbers After Self](#count-of-smaller-numbers-after-self)

<!-- GFM-TOC -->


## Different Ways to Add Parentheses

[241\. Different Ways to Add Parentheses (Medium)](https://leetcode.com/problems/different-ways-to-add-parentheses/description/)

```javascript
var diffWaysToCompute = function(input) {
    if (input.length === 0) {
        return [];
    }
    
    if (!/[\+\-\*]/.test(input)) {
        return [Number(input)];
    }
    
    const ways = [];
    
    for (let i = 0; i < input.length; i++) {
        const isValidOperator = ['+', '-', '*'].some(o => o === input[i]);
        if (!isValidOperator) {
            continue;
        }
        const firstInput = input.substring(0, i);
        const secondInput = input.substring(i + 1);
        const firstWays = diffWaysToCompute(firstInput);
        const secondWays = diffWaysToCompute(secondInput);
        
        for (const firstWay of firstWays) {
            for (const secondWay of secondWays) {
                switch (input[i]) {
                    case '+':
                        ways.push(firstWay + secondWay);
                        break;
                    case '-':
                        ways.push(firstWay - secondWay);
                        break;
                    case '*':
                        ways.push(firstWay * secondWay);
                        break;
                }
            }
        }
    }
    
    return ways;
};
```

## Unique Binary Search Trees II

[95. Unique Binary Search Trees II (Medium)](https://leetcode.com/problems/unique-binary-search-trees-ii/description/)

```javascript
var generateTrees = function(n) {
    return generateTreesHelper(1, n);
};

function generateTreesHelper(start, end) {
    if (start > end) {
        return [null];
    }
    if (start === end) {
        return [new TreeNode(start)];
    }
    
    const trees = [];
    for (let i = start; i <= end; i++) {
        const leftTrees = generateTreesHelper(start, i - 1);
        const rightTrees = generateTreesHelper(i + 1, end);

        for (const leftTree of leftTrees) {
            for (const rightTree of rightTrees) {
                const newTree = new TreeNode(i, leftTree, rightTree);
                trees.push(newTree);
            }
        }
    }
    
    return trees;
}
```

<!-- @include ../leetcode/0169.majority-element.md -->
### Majority Element
[169. Majority Element](https://leetcode.com/problems/majority-element/)

```html
Given an array nums of size n, return the majority element.

The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array.

Example 1:

Input: nums = [3,2,3]
Output: 3
Example 2:

Input: nums = [2,2,1,1,1,2,2]
Output: 2
```
Sorting:
```javascript
var majorityElement = function(nums) {
    nums.sort();
    return nums[Math.floor(nums.length / 2)];
};
```

Divide and Conquer:

```javascript
var majorityElement = function(nums) {
    return majorityElementDivideAndConquer(nums, 0, nums.length - 1);
};
function majorityElementDivideAndConquer(nums, lo, hi) {
    // base case; the only element in an array of size 1 is the majority
    // element.
    if (lo === hi) { return nums[lo]; }

    // recurse on left and right halves of this slice.
    const mid = Math.floor(lo + (hi - lo) / 2);
    const left = majorityElementDivideAndConquer(nums, lo, mid);
    const right = majorityElementDivideAndConquer(nums, mid + 1, hi);

    // if the two halves agree on the majority element, return it.
    if (left === right) { return left; }

    // otherwise, count each element and return the "winner".
    const leftCount = countInRange(nums, left, lo, hi);
    const rightCount = countInRange(nums, right, lo, hi);

    return leftCount > rightCount ? left : right;
}
function countInRange(nums, num, lo, hi) {
    let count = 0;
    for (let i = lo; i <= hi; i++) {
        if (nums[i] == num) {
            count++;
        }
    }
    return count;
}
```

Boyer-Moore Voting Algorithm:
```javascript
var majorityElement = function(nums) {
    int cnt = 0, majority = nums[0];
    for (num of nums) {
        majority = (cnt == 0) ? num : majority;
        cnt = (majority == num) ? cnt + 1 : cnt - 1;
    }
    return majority;
}
```

<!-- @include ../leetcode/0912.sort-an-array.md -->
### Sort an Array
[912. Sort an Array](https://leetcode.com/problems/sort-an-array/)

```html
Given an array of integers nums, sort the array in ascending order.

Example 1:
Input: nums = [5,2,3,1]
Output: [1,2,3,5]

Example 2:
Input: nums = [5,1,1,2,0,0]
Output: [0,0,1,1,2,5]
```

Merge Sort:
```javascript
var sortArray = function(nums) {
    if (nums.length < 2) { return nums; }

    const mid = Math.floor(nums.length / 2);
    const left = sortArray(nums.slice(0, mid));
    const right = sortArray(nums.slice(mid));

    const merged = [];
    let i = 0, j = 0;
    while (i < left.length && j < right.length) {
        merged.push(left[i] > right[j] ? right[j++] : left[i++])
    }
    return [...merged, ...left.slice(i), ...right.slice(j)];
};
```

<!-- @include ../leetcode/0315.count-of-smaller-numbers-after-self.md -->
### Count of Smaller Numbers After Self
[315. Count of Smaller Numbers After Self](https://leetcode.com/problems/count-of-smaller-numbers-after-self/)

```html
You are given an integer array nums and you have to return a new counts array. The counts array has the property where counts[i] is the number of smaller elements to the right of nums[i].

Example 1:

Input: nums = [5,2,6,1]
Output: [2,1,1,0]
Explanation:
To the right of 5 there are 2 smaller elements (2 and 1).
To the right of 2 there is only 1 smaller element (1).
To the right of 6 there is 1 smaller element (1).
To the right of 1 there is 0 smaller element.
Example 2:

Input: nums = [-1]
Output: [0]
Example 3:

Input: nums = [-1,-1]
Output: [0,0]
```

```javascript
var countSmaller = function(nums) {
    if (nums.length == 0 || !nums) return nums;

    let inversion = Array(nums.length).fill(0);
    let map = nums.map((val, index) => ({ val, index}));

    var merge = function(arr) {
        if (arr.length == 1) { return arr; }
        let mid = Math.floor(arr.length / 2)
        let left = merge(arr.slice(0, mid));
        let right = merge(arr.slice(mid));
        
        let leftIndex = 0, rightIndex = 0, inversionCount = 0, sorted = [];
        // compare numbers from left part to right part
        while (leftIndex < left.length) {
            if (right[rightIndex] && left[leftIndex].val > right[rightIndex].val) {
                // inversion found
                inversionCount++;
                sorted.push(right[rightIndex++]);
            } else {
                // no inversions for this number (or right is exhausted)
                // update its inversion count up to the current stack
                inversion[left[leftIndex].index] += inversionCount;
                sorted.push(left[leftIndex++]);
            }
        }

        // deal with left over right values and return
        return [...sorted, ...right.slice(rightIndex)];        
    }

    merge(map);
    return inversion;
};
```
