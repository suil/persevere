# Binary Search
<!-- GFM-TOC -->
* [Binary Search](#Binary-Search)
    * [Sqrt(x)](#Sqrtx)
    * [Find Smallest Letter Greater Than Target](#Find-Smallest-Letter-Greater-Than-Target)
    * [Single Element in a Sorted Array](#Single-Element-in-a-Sorted-Array-Medium)
    * [Locate Special Element in a Sorted Array](#Locate-Special-Element-in-a-Sorted-Array)
        * [First Bad Version](#First-Bad-Version)
        * [Search in Rotated Sorted Array](../leet.md#search-in-rotated-sorted-array)
        * [Find First and Last Position of Element in Sorted Array](#Find-First-and-Last-Position-of-Element-in-Sorted-Array)
        * [Random Pick with Weight](#random-pick-with-weight)
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
### Find Minimum in Rotated Sorted Array
[153. Find Minimum in Rotated Sorted Array (Medium)](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/description/)

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

### Find First and Last Position of Element in Sorted Array
[34\. Find First and Last Position of Element in Sorted Array (Medium)](https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/)
```javascript
var searchRange = function(nums, target) {
    let l = 0, h = nums.length - 1;
    while (l < h) {
        const m = l + Math.floor((h - l) / 2);
        if (nums[m] >= target) {
            h = m;
        } else {
            l = m + 1;
        }
    }
    if (l < 0 || l >= nums.length || nums[l] != target) { return [-1, -1]; }
    let end = l;
    while (end < nums.length && nums[end] === nums[l]) { end++; }
    return [l, end - 1]
};
```

### Random Pick with Weight
[528. Random Pick with Weight](https://leetcode.com/problems/random-pick-with-weight/)
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