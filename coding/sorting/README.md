# Sorting
<!-- GFM-TOC -->
* [Sorting](#Sorting)
    * [Quick Sort](#Quick-Sort)
    * [MinHeap](#minheap)
        * [Kth Element](#kth-element)
        * [K Closest Points to Origin](#K-Closest-Points-to-Origin)
    * [Bucket Sort](#Bucket-Sort)
        * [Top K Frequent Elements](#Top-K-Frequent-Elements)
        * [Sort Characters By Frequency](#Sort-Characters-By-Frequency)
    * [Sorting for fixed small number of items](#Sorting-for-fixed-small-number-of-items)
        * [Sort Colors (Medium)](#Sort-Colors)
        * [Sort Colors II](#sort-colors-ii)
    * [Sort Transformed Array](#sort-transformed-array)
<!-- GFM-TOC -->


## Quick Sort
```javascript
function partition(arr, start, end) {
    let lo = start - 1, hi = end + 1;
    const pivot = arr[Math.floor(start + (end - start) / 2)];
    
    while (true) {
        while (arr[++lo] > pivot);
        while (arr[--hi] < pivot);
        if (lo >= hi) { return hi; }
        [arr[lo], arr[hi]] = [arr[hi], arr[lo]];
    }
}
function quickSort(arr, start, end) {
    if (start < end) {
       const pivot = partition(arr, start, end);
       quickSort(arr, start, pivot); 
       quickSort(arr, pivot + 1, end);
   }
}
```
This algorithm can be used to solve **Kth Element** problem.

When partition() funciton in quick sorting is used, the array needs to be scrambled. Otherwise, the worset case time complexity will become O(N<sup>2</sup>)。

## Heap

It also can be used to solve **TopK Elements** problem.

<!-- @include ../leetcode/0215.kth-largest-element-in-an-array.md -->
### Kth Largest Element in an Array
[215. Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/)

```html
Given an integer array nums and an integer k, return the kth largest element in the array.

Note that it is the kth largest element in the sorted order, not the kth distinct element.

Example 1:

Input: nums = [3,2,1,5,6,4], k = 2
Output: 5
Example 2:

Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
Output: 4
```

```javascript
var findKthLargest = function(nums, k) {
    return quickSelect(nums, 0, nums.length - 1, k);
}
function partition(nums, start, end) {
    let lo = start - 1, hi = end + 1;
    const pivot = nums[Math.floor(start + (end - start) / 2)];
    while (true) {
        while (nums[++lo] > pivot);
        while (nums[--hi] < pivot);
        if (lo >= hi) { return hi; }
        [nums[lo], nums[hi]] = [nums[hi], nums[lo]];
    }
}
function quickSelect(nums, start, end, k) {
    if (start === end) { return nums[start]; }
    const pivotIndex = partition(nums, start, end);
    if (pivotIndex < k - 1) {
        return quickSelect(nums, pivotIndex + 1, end, k);
    }
    return quickSelect(nums, start, pivotIndex, k);
}
```


## K Closest Points to Origin
This is to take all K top elements. Use variant of quick sorting algorithm. Only sort the first k elments

[973. K Closest Points to Origin](https://leetcode.com/problems/k-closest-points-to-origin/)
```javascript
var kClosest = function(points, k) {
    partialQuickSort(points, 0, points.length - 1, k)
    return points.slice(0, k)
};

function partition(arr, start, end) {
    let lo = start - 1, hi = end + 1;
    const pivot = arr[Math.floor(start + (end - start) / 2)];
    while (true) {
        while (distanceToOrigin(arr[++lo]) < distanceToOrigin(pivot));
        while (distanceToOrigin(arr[--hi]) > distanceToOrigin(pivot));

        if (lo >= hi) {
            return hi;
        }
        [arr[lo], arr[hi]] = [arr[hi], arr[lo]];
    }
}
function partialQuickSort(arr, start, end, k) {
    if (start >= end) {
        return;
    }
    const mi = partition(arr, start, end, k);
    if (mi < k - 1) {
        partialQuickSort(arr, mi + 1, end, k);
    }
    return partialQuickSort(arr, start, mi, k);
}
function distanceToOrigin(point) {
    return Math.sqrt(Math.pow(point[0], 2) + Math.pow(point[1], 2));
}
```

## Bucket Sort

<!-- @include ../leetcode/0347.top-k-frequent-elements.md -->
### Top K Frequent Elements
[347. Top K Frequent Elements (Medium)](https://leetcode.com/problems/top-k-frequent-elements/description/)
```html
Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.

Example 1:

Input: nums = [1,1,1,2,2,3], k = 2
Output: [1,2]
Example 2:

Input: nums = [1], k = 1
Output: [1]
```

```javascript
var topKFrequent = function(nums, k) {
    const freqMap = new Map();
    let maxFreq = 0;
    for (const num of nums) {
        freqMap.set(num, (freqMap.get(num) || 0) + 1);
        maxFreq = Math.max(maxFreq, freqMap.get(num));
    }

    const bucket = [...Array(maxFreq + 1)].map(_ => []);
    for (const [num, freq] of freqMap) {
        bucket[freq].push(num);
    }

    const output = [];
    for (let i = bucket.length - 1; i >= 0; i--) {
        for (const num of bucket[i]) {
            output.push(num);
            if (output.length >= k) {
                return output;
            }
        }
    }
    return output;
};
```


### Sort Characters By Frequency

[451\. Sort Characters By Frequency (Medium)](https://leetcode.com/problems/sort-characters-by-frequency/description/)

```javascript
var frequencySort = function(s) {
    const freqMap = new Map();
    let maxFreq = 0;
    for (let i = 0; i < s.length; i++) {
        freqMap.set(s[i], (freqMap.get(s[i]) || 0) + 1);
        maxFreq = Math.max(maxFreq, freqMap.get(s[i]));
    }

    const bucket = [...Array(maxFreq + 1)].map(_ => []);
    for (const [num, freq] of freqMap) {
        bucket[freq].push(num);
    }
    
    const output = [];
    for (let freq = bucket.length - 1; freq >= 0; freq--) {
        const letters = bucket[freq];
        for (const letter of letters) {
            output.push(letter.repeat(freq))
        }
    }
    return output.join('');
};
```

## Sorting for fixed small number of values in an array

<!-- @include ../leetcode/0075.sort-colors.md -->
### Sort Colors
[75. Sort Colors](https://leetcode.com/problems/sort-colors/)

```html
Given an array nums with n objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue.

We will use the integers 0, 1, and 2 to represent the color red, white, and blue, respectively.

Example 1:
Input: nums = [2,0,2,1,1,0]
Output: [0,0,1,1,2,2]

Example 2:
Input: nums = [2,0,1]
Output: [0,1,2]

Example 3:
Input: nums = [0]
Output: [0]

Example 4:
Input: nums = [1]
Output: [1]
```

```javascript
var sortColors = function(nums) {
    let low = 0;
    let high = nums.length - 1;
    let index = 0;

    while (index <= high) {
        if (nums[index] == 0) {
            [nums[low], nums[index]] = [nums[index], nums[low]];
            index++;
            low++;
        } else if (nums[index] == 2) {
            [nums[index], nums[high]] = [nums[high], nums[index]];
            high--;
        } else {
            index++;
        }
    }
};
```
<!-- @include ../leetcode/L143.sort-colors-ii.md -->
### Sort Colors II
[143 · Sort Colors II](https://www.lintcode.com/problem/143)

```html
Given an array of n objects with k different colors (numbered from 1 to k), sort them so that objects of the same color are adjacent, with the colors in the order 1, 2, ... k.

Example1

Input: 
[3,2,2,1,4] 
4
Output: 
[1,2,2,3,4]

Example2

Input: 
[2,1,1,2,2] 
2
Output: 
[1,1,2,2,2]
```

```javascript
class Solution {
  sortColors2(colors, k) {
    // write your code here
    if (colors === null || colors.length === 0) {
      return;
    }
    this.rainbowSort(colors, 0, colors.length - 1, 1, k);
  }

  rainbowSort(colors, left, right, colorFrom, colorTo) {
    if (colorFrom === colorTo) {
        return;
    }
    if (left >= right) {
        return;
    }

    const colorMid = Math.floor((colorFrom + colorTo) / 2);
    let l = left, r = right;
    while (l <= r) {
        while (l <= r && colors[l] <= colorMid) {
          l++;
        }
        while (l <= r && colors[r] > colorMid) {
          r--;
        }
        if (l <= r) {
          [colors[l], colors[r]] = [colors[r], colors[l]];
          l++;
          r--;
        }
    }
    
    this.rainbowSort(colors, left, r, colorFrom, colorMid);
    this.rainbowSort(colors, l, right, colorMid + 1, colorTo);
  }
}
```
<!-- @include-end ../leetcode/L143.sort-colors-ii.md -->

<!-- @include ../leetcode/0360.sort-transformed-array.md -->
### Sort Transformed Array
[360. Sort Transformed Array](https://leetcode.com/problems/0360.sort-transformed-array/)

```html
Given a sorted integer array nums and three integers a, b and c, apply a quadratic function of the form f(x) = ax2 + bx + c to each element nums[i] in the array, and return the array in a sorted order.

Example 1:

Input: nums = [-4,-2,2,4], a = 1, b = 3, c = 5
Output: [3,9,15,33]
Example 2:

Input: nums = [-4,-2,2,4], a = -1, b = 3, c = 5
Output: [-23,-5,1,7]
```

```javascript
var sortTransformedArray = function(nums, a, b, c) {
    let l = 0, r = nums.length - 1;
    const res = [];
    let idx = a >= 0 ? nums.length - 1 : 0;
    while (l <= r) {
        const val1 = quadratic(nums[l], a, b, c), val2 = quadratic(nums[r], a, b, c);
        if (a >= 0) {
            if (val1 >= val2) {
                res[idx--] = val1;
                ++l;
            } else {
                res[idx--] = val2;
                --r;
            }
        } else {
            if (val1 <= val2) {
                res[idx++] = val1;
                ++l;
            } else {
                res[idx++] = val2;
                --r;
            }
        }
    }
    return res;
};
function quadratic(x, a, b, c) {
    return a * x * x + b * x + c;
}
```

