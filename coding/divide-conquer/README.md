# Divided and Conquer
<!-- GFM-TOC -->
* [Divided and Conquer](#Divided-and-Conquer)
    * [Different Ways to Add Parentheses](#Different-Ways-to-Add-Parentheses)
    * [Unique Binary Search Trees II](#Unique-Binary-Search-Trees-II)
    * [Majority Element](#majority-element)
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

[95\. Unique Binary Search Trees II (Medium)](https://leetcode.com/problems/unique-binary-search-trees-ii/description/)

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
