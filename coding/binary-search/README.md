# Binary Search
<!-- GFM-TOC -->
* [Binary Search](#Binary-Search)
    * [Sqrt(x)](#Sqrtx)
    * [Find Smallest Letter Greater Than Target](#Find-Smallest-Letter-Greater-Than-Target)
    * [Single Element in a Sorted Array](#Single-Element-in-a-Sorted-Array-Medium)
    * [4. 第一个错误的版本](#4-第一个错误的版本)
    * [5. 旋转数组的最小数字](#5-旋转数组的最小数字)
    * [Find First and Last Position of Element in Sorted Array](#Find-First-and-Last-Position-of-Element-in-Sorted-Array)
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
        int m = l + (h - l) / 2;
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

## Sqrt(x)

[69\. Sqrt(x) (Easy)](https://leetcode.com/problems/sqrtx/description/)

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

## Find Smallest Letter Greater Than Target

[744\. Find Smallest Letter Greater Than Target (Easy)](https://leetcode.com/problems/find-smallest-letter-greater-than-target/description/)

```javascript
var nextGreatestLetter = function(letters, target) {
    let l = 0, h = letters.length - 1;
    
    while (l <= h) {
        const m = l + Math.floor((h - l) / 2);
        if (letters[m] > target) {
            h = m - 1;
        } else {
            l = m + 1;
        }
    }
    
    return letters[l] || letters[0];
};
```

## Single Element in a Sorted Array (Medium)

[540\. Single Element in a Sorted Array (Medium)](https://leetcode.com/problems/single-element-in-a-sorted-array/description/)

题目描述：一个有序数组只有一个数不出现两次，找出这个数。

要求以 O(logN) 时间复杂度进行求解，因此不能遍历数组并进行异或操作来求解，这么做的时间复杂度为 O(N)。

令 index 为 Single Element 在数组中的位置。在 index 之后，数组中原来存在的成对状态被改变。如果 m 为偶数，并且 m + 1 \< index，那么 nums[m] == nums[m + 1]；m + 1 \>= index，那么 nums[m] != nums[m + 1]。

从上面的规律可以知道，如果 nums[m] == nums[m + 1]，那么 index 所在的数组位置为 [m + 2, h]，此时令 l = m + 2；如果 nums[m] != nums[m + 1]，那么 index 所在的数组位置为 [l, m]，此时令 h = m。

因为 h 的赋值表达式为 h = m，那么循环条件也就只能使用 l \< h 这种形式。

```javascript

```

## 4. 第一个错误的版本

278\. First Bad Version (Easy)

[Leetcode](https://leetcode.com/problems/first-bad-version/description/) / [力扣](https://leetcode-cn.com/problems/first-bad-version/description/)

题目描述：给定一个元素 n 代表有 [1, 2, ..., n] 版本，在第 x 位置开始出现错误版本，导致后面的版本都错误。可以调用 isBadVersion(int x) 知道某个版本是否错误，要求找到第一个错误的版本。

如果第 m 个版本出错，则表示第一个错误的版本在 [l, m] 之间，令 h = m；否则第一个错误的版本在 [m + 1, h] 之间，令 l = m + 1。

因为 h 的赋值表达式为 h = m，因此循环条件为 l \< h。

```java
public int firstBadVersion(int n) {
    int l = 1, h = n;
    while (l < h) {
        int mid = l + (h - l) / 2;
        if (isBadVersion(mid)) {
            h = mid;
        } else {
            l = mid + 1;
        }
    }
    return l;
}
```

## Find Minimum in Rotated Sorted Array

[Find Minimum in Rotated Sorted Array (Medium)](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/description/)

```javascript

```

## Find First and Last Position of Element in Sorted Array

[34\. Find First and Last Position of Element in Sorted Array (Medium)](https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/)

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
