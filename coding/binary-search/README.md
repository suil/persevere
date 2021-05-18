# Binary Search
<!-- GFM-TOC -->
* [Binary Search](#Binary-Search)
    * [Sqrt(x)](#Sqrtx)
    * [Valid Perfect Square](#valid-perfect-square)
    * [Find Smallest Letter Greater Than Target](#Find-Smallest-Letter-Greater-Than-Target)
    * [Single Element in a Sorted Array](#Single-Element-in-a-Sorted-Array-Medium)
    * [Locate Special Element in a Sorted Array](#Locate-Special-Element-in-a-Sorted-Array)
        * [First Bad Version](#First-Bad-Version)
        * [Find First and Last Position of Element in Sorted Array](#Find-First-and-Last-Position-of-Element-in-Sorted-Array)
        * [Random Pick with Weight](#random-pick-with-weight)
        * [Missing Element in Sorted Array](#missing-element-in-sorted-array)
        * [Search Insert Position](#search-insert-position)
    * [Rotated Sorted Array](#rotated-sorted-array)
        * [Search in Rotated Sorted Array](#search-in-rotated-sorted-array)
        * [Find Minimum in Rotated Sorted Array](#find-minimum-in-rotated-sorted-array)
        * [Find Minimum in Rotated Sorted Array II](#find-minimum-in-rotated-sorted-array-ii)

<!-- GFM-TOC -->

**Typical Binary Search Algorithm**  

```text
Input : [1,2,3,4,5] // has to be sorted
key : 3
return the index : 2
```

```javascript
function binarySearch(nums, key) {
    let l = 0, h = nums.length - 1;
    while (l <= h) {
        const m = l + (h - l) / 2;
        if (nums[m] == key) {
            return m;
        }
        if (nums[m] > key) {
            h = m - 1;
        } else {
            l = m + 1;
        }
    }
    return -1;
}
```

**Time complexity**  

O(logN)。

**computing medium value**

m = l + (h - l) / 2 can prevent integer overflow.

**Returned value when not found**  

If the key is not found when exiting from the loop, there could be two useful values：

- -1: not-found indicator
- l: the position where key can be inserted correctly

**Variations**

Different initial value and boarder conditions can produce different variations. The following shows the left-most position of the key value in an array with duplicate items:

```javascript
function binarySearch(nums, key) {
    let l = 0, h = nums.length;
    while (l < h) {
        int m = l + Math.floor((h - l) / 2);
        if (nums[m] >= key) {
            h = m;
        } else {
            l = m + 1;
        }
    }
    return l;
}
```

This is the difference:

- The assignment of h is **h = m** for the condition of **nums[m] \>= key**
- while loop conditions is **l \< h**
- return l instead of -1

<!-- @include ../leetcode/0069.sqrtx.md -->
### Sqrt(x)
[69. Sqrt(x)](https://leetcode.com/problems/sqrtx/)

```html
Given a non-negative integer x, compute and return the square root of x.

Since the return type is an integer, the decimal digits are truncated, and only the integer part of the result is returned.

Example 1:
Input: x = 4
Output: 2

Example 2:
Input: x = 8
Output: 2
Explanation: The square root of 8 is 2.82842..., and since the decimal part is truncated, 2 is returned.
```

```javascript
var mySqrt = function(x) {
    if (x <= 1) {
        return x;
    }

    let low = 1, high = Math.floor(x / 2);
    while (low <= high) {
        const mid = Math.floor(low + (high - low) / 2);
        const square = mid * mid;
        
        if (square > x) {
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return high;
};
```

<!-- @include ../leetcode/0367.valid-perfect-square.md -->
### Valid Perfect Square
[367. Valid Perfect Square](https://leetcode.com/problems/valid-perfect-square/)

```html
Given a positive integer num, write a function which returns True if num is a perfect square else False.

Follow up: Do not use any built-in library function such as sqrt.

Example 1:
Input: num = 16
Output: true

Example 2:
Input: num = 14
Output: false
```

Binary Search:
```javascript
var isPerfectSquare = function(num) {
    if (num < 2) { return true; }
    let lo = 0, hi = num;
    while (lo <= hi) {
        const mid = Math.floor(lo + (hi - lo) / 2);
        const squre = mid * mid;
        if (squre === num) { return true; }
        if (squre > num) {
            hi = mid - 1;
        } else {
            lo = mid + 1;
        }
    }
    return false;
};
```

Math:
The series of square num：1,4,9,16,..

The gap between square numbers is ：3,5,7,...

```javascript
var isPerfectSquare = function(num) {
    let subNum = 1;
    while (num > 0) {
        num -= subNum;
        subNum += 2;
    }
    return num === 0;
};
```

<!-- @include ../leetcode/0744.find-smallest-letter-greater-than-target.md -->
### Find Smallest Letter Greater Than Target
[744. Find Smallest Letter Greater Than Target](https://leetcode.com/problems/find-smallest-letter-greater-than-target/)

```html
Given a list of sorted characters letters containing only lowercase letters, and given a target letter target, find the smallest element in the list that is larger than the given target.

Letters also wrap around. For example, if the target is target = 'z' and letters = ['a', 'b'], the answer is 'a'.

Examples:
Input:
letters = ["c", "f", "j"]
target = "a"
Output: "c"

Input:
letters = ["c", "f", "j"]
target = "c"
Output: "f"

Input:
letters = ["c", "f", "j"]
target = "d"
Output: "f"

Input:
letters = ["c", "f", "j"]
target = "g"
Output: "j"

Input:
letters = ["c", "f", "j"]
target = "j"
Output: "c"

Input:
letters = ["c", "f", "j"]
target = "k"
Output: "c"
```

```javascript
var nextGreatestLetter = function(letters, target) {
    let left = 0, right = letters.length - 1;
    
    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        if (letters[mid] > target) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return letters[left] || letters[0];
};
```

## Single Element in a Sorted Array

[540\. Single Element in a Sorted Array (Medium)](https://leetcode.com/problems/single-element-in-a-sorted-array/description/)

```javascript
var singleNonDuplicate = function(nums) {
    let l = 0, h = nums.length - 1;
    while (l < h) {
        let m = l + (h - l) / 2;
        if (m % 2 == 1) {
            m--;
        }
        if (nums[m] == nums[m + 1]) {
            l = m + 2;
        } else {
            h = m;
        }
    }
    return nums[l];
};
```

## Locate Special Element in a Sorted Array
A few conditions and initial values will change
- loop condition change to `while (l < h)`
- comparison changes to `nums[m] <= nums[h]`
- assignment changes to `h = m`

### First Bad Version
[278\. First Bad Version (Easy)](https://leetcode.com/problems/first-bad-version/description/)

```javascript
var solution = function(isBadVersion) {
    /**
     * @param {integer} n Total versions
     * @return {integer} The first bad version
     */
    return function(n) {
        let lo = 0, hi = n;
        while (lo <= hi) {
            const mid = Math.floor(lo + (hi - lo) / 2);
            const isMidBadVersion = isBadVersion(mid);
            if (isMidBadVersion) {
                hi = mid - 1;
            } else {
                lo = mid + 1;
            }
        }
        return lo;
    };
};
```

<!-- @include ../leetcode/0034.find-first-and-last-position-of-element-in-sorted-array.md -->
### Find First and Last Position of Element in Sorted Array
[34. Find First and Last Position of Element in Sorted Array](https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/)

```html
Given an array of integers nums sorted in ascending order, find the starting and ending position of a given target value.

If target is not found in the array, return [-1, -1].

Follow up: Could you write an algorithm with O(log n) runtime complexity?

Example 1:
Input: nums = [5,7,7,8,8,10], target = 8
Output: [3,4]

Example 2:
Input: nums = [5,7,7,8,8,10], target = 6
Output: [-1,-1]

Example 3:
Input: nums = [], target = 0
Output: [-1,-1]
```

```javascript
var searchRange = function(nums, target) {
    let left = 0, right = nums.length - 1;
    
    while (left < right) {
        const mid = Math.floor(left + (right - left) / 2);
        if (nums[mid] >= target) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }

    if (left < 0 || left >= nums.length || nums[left] !== target) {
        return [-1, -1];
    }
    
    let end = left;
    while (end < nums.length && nums[end] === nums[left]) {
        end++
    }
    return [left, end - 1]
};
```

<!-- @include ../leetcode/0528.random-pick-with-weight.md -->
### Random Pick with Weight
[528. Random Pick with Weight](https://leetcode.com/problems/random-pick-with-weight/)

```html
You are given an array of positive integers w where w[i] describes the weight of ith index (0-indexed).

We need to call the function pickIndex() which randomly returns an integer in the range [0, w.length - 1]. pickIndex() should return the integer proportional to its weight in the w array. For example, for w = [1, 3], the probability of picking the index 0 is 1 / (1 + 3) = 0.25 (i.e 25%) while the probability of picking the index 1 is 3 / (1 + 3) = 0.75 (i.e 75%).

More formally, the probability of picking index i is w[i] / sum(w).

Example 1:
Input
["Solution","pickIndex"]
[[[1]],[]]
Output
[null,0]

Explanation
Solution solution = new Solution([1]);
solution.pickIndex(); // return 0. Since there is only one single element on the array the only option is to return the first element.

Example 2:
Input
["Solution","pickIndex","pickIndex","pickIndex","pickIndex","pickIndex"]
[[[1,3]],[],[],[],[],[]]
Output
[null,1,1,1,1,0]

Explanation
Solution solution = new Solution([1, 3]);
solution.pickIndex(); // return 1. It's returning the second element (index = 1) that has probability of 3/4.
solution.pickIndex(); // return 1
solution.pickIndex(); // return 1
solution.pickIndex(); // return 1
solution.pickIndex(); // return 0. It's returning the first element (index = 0) that has probability of 1/4.

Since this is a randomization problem, multiple answers are allowed so the following outputs can be considered correct :
[null,1,1,1,1,0]
[null,1,1,1,1,1]
[null,1,1,1,0,0]
[null,1,1,1,0,1]
[null,1,0,1,0,0]
......
and so on.
```

```javascript
var Solution = function(w) {
    this.accuSums = [];
    this.totalSum = 0;
    
    for (let i = 0; i < w.length; i++) {
        this.totalSum += w[i];
        this.accuSums[i] = this.totalSum;
    }
};

/**
 * @return {number}
 */
Solution.prototype.pickIndex = function() {
    const target = this.totalSum * Math.random();
    // for (let i = 0; i < this.accuSums.length; ++i) {
    //     if (target < this.accuSums[i]) {
    //         return i;
    //     }
    // }
    let low = 0, high = this.accuSums.length - 1;
    while (low < high) {
        const mid = Math.floor(low + (high - low) / 2);
        if (this.accuSums[mid] > target) {
            high = mid;
        } else {
            low = mid + 1;
        }
    }
    return low;
};
```



<!-- @include ../leetcode/1060.missing-element-in-sorted-array.md -->
### Missing Element in Sorted Array
[1060. Missing Element in Sorted Array](https://leetcode.com/problems/missing-element-in-sorted-array/)
```html
Given an integer array nums which is sorted in ascending order and all of its elements are unique and given also an integer k, return the kth missing number starting from the leftmost number of the array.
```

```javascript
var missingElement = function(nums, k) {
    let left = 0, right = nums.length - 1;
    
    while (left < right) {
        const mid = Math.floor(left + (right - left) / 2);
        if (getMissingNumCount(nums, mid) >= k) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    return nums[left - 1] + k - getMissingNumCount(nums, left - 1);
};
function getMissingNumCount(nums, index) {
    return nums[index] - nums[0] - index;
}
```

<!-- @include ../leetcode/0035.search-insert-position.md -->
## Search Insert Position
[35. Search Insert Position](https://leetcode.com/problems/search-insert-position/)

```html
Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.

You must write an algorithm with O(log n) runtime complexity.

Example 1:
Input: nums = [1,3,5,6], target = 5
Output: 2

Example 2:
Input: nums = [1,3,5,6], target = 2
Output: 1

Example 3:
Input: nums = [1,3,5,6], target = 7
Output: 4

Example 4:
Input: nums = [1,3,5,6], target = 0
Output: 0

Example 5:
Input: nums = [1], target = 0
Output: 0
```

```javascript
var searchInsert = function(nums, target) {
    let low = 0;
    let high = nums.length - 1;
    
    while (low <= high) {
        const mid = Math.floor(low + (high - low) / 2);
        if (nums[mid] == target) {
            return mid;
        }
        if (nums[mid] > target) {
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return low;
};
```

## Rotated Sorted Array

<!-- @include ../leetcode/0033.search-in-rotated-sorted-array.md -->
### Search in Rotated Sorted Array
[33. Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/)
```html
There is an integer array nums sorted in ascending order (with distinct values).

Prior to being passed to your function, nums is rotated at an unknown pivot index k (0 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,5,6,7] might be rotated at pivot index 3 and become [4,5,6,7,0,1,2].

Given the array nums after the rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.
```

```javascript
var search = function(nums, target) {
    let start = 0, end = nums.length - 1;
    while (start <= end) {
        let mid = Math.floor(start + (end - start) / 2);
        if (nums[mid] === target) { return mid; }
        if (nums[mid] >= nums[start]) {
            if (target >= nums[start] && target < nums[mid]) {
                end = mid - 1;
            } else {
                start = mid + 1;
            }
        } else {
            if (target <= nums[end] && target > nums[mid]) {
                start = mid + 1;
            } else {
                end = mid - 1;
            }
        }
    }
    return -1;
};
```

<!-- @include ../leetcode/0153.find-minimum-in-rotated-sorted-array.md -->
### Find Minimum in Rotated Sorted Array
[153. Find Minimum in Rotated Sorted Array](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/)

```html
Suppose an array of length n sorted in ascending order is rotated between 1 and n times. For example, the array nums = [0,1,2,4,5,6,7] might become:

[4,5,6,7,0,1,2] if it was rotated 4 times.
[0,1,2,4,5,6,7] if it was rotated 7 times.
Notice that rotating an array [a[0], a[1], a[2], ..., a[n-1]] 1 time results in the array [a[n-1], a[0], a[1], a[2], ..., a[n-2]].

Given the sorted rotated array nums of unique elements, return the minimum element of this array.
```

```javascript
var findMin = function(nums) {
    let l = 0, h = nums.length - 1;
    while (l < h) {
        let m = Math.floor(l + (h - l) / 2);
        if (nums[m] <= nums[h]) {
            h = m;
        } else {
            l = m + 1;
        }
    }
    return nums[l];
};
```

<!-- @include ../leetcode/0154.find-minimum-in-rotated-sorted-array-ii.md -->
### Find Minimum in Rotated Sorted Array II
[154. Find Minimum in Rotated Sorted Array II](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array-ii/)

```html
Suppose an array of length n sorted in ascending order is rotated between 1 and n times. For example, the array nums = [0,1,4,4,5,6,7] might become:

[4,5,6,7,0,1,4] if it was rotated 4 times.
[0,1,4,4,5,6,7] if it was rotated 7 times.
Notice that rotating an array [a[0], a[1], a[2], ..., a[n-1]] 1 time results in the array [a[n-1], a[0], a[1], a[2], ..., a[n-2]].

Given the sorted rotated array nums that may contain duplicates, return the minimum element of this array.

Example 1:
Input: nums = [1,3,5]

Output: 1

Example 2:
Input: nums = [2,2,2,0,1]
Output: 0
```

```javascript
var findMin = function(nums) {
    let lo = 0, hi = nums.length - 1;

    while (lo < hi) {
        const pivot = Math.floor(lo + (hi - lo) / 2);
        if (nums[pivot] < nums[hi]) {
            hi = pivot;
        } else if (nums[pivot] > nums[hi]) {
            lo = pivot + 1;
        } else {
            hi -= 1;
        }
    }
    return nums[lo];
};
```
