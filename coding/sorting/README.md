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

### Kth Largest Element in an Array

[215\. Kth Largest Element in an Array (Medium)](https://leetcode.com/problems/kth-largest-element-in-an-array/description/)

**minHeap**  ：Time O(NlogK)，Space O(K)。

```java
public int findKthLargest(int[] nums, int k) {
    PriorityQueue<Integer> pq = new PriorityQueue<>(); // 小顶堆
    for (int val : nums) {
        pq.add(val);
        if (pq.size() > k)
            pq.poll();
    }
    return pq.peek();
}
```

**Quick Sort**: Time O(N)，Space O(1)

```javascript
var findKthLargest = function(nums, k) {
    return quickSelect(nums, 0, nums.length - 1, k);
};
function partition(arr, start, end) {
    let lo = start - 1, hi = end + 1;
    const pivot = arr[Math.floor(start + (end - start) / 2)];
    while (true) {
        while (arr[++lo] > pivot); // ascending '<'
        while (arr[--hi] < pivot); // ascending '>'

        if (lo >= hi) { return hi; }
        [arr[lo], arr[hi]] = [arr[hi], arr[lo]];
    }
}
function quickSelect(arr, start, end, k) {
    if (start === end) {
        return arr[start];
    }
    const pivot = partition(arr, start, end);
    if (pivot < k - 1) {
        return quickSelect(arr, pivot + 1, end, k);
    }
    return quickSelect(arr, start, pivot, k);
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
### Sort Colors

[75\. Sort Colors (Medium)](https://leetcode.com/problems/sort-colors/description/)

```javascript
var sortColors = function(nums) {
    let low = 0;
    let high = nums.length - 1;
    let index = 0;

    while (index <= high){
        if (nums[index] === 0){
            swap(nums, low, index);
            index++;
            low++;
        } else if (nums[index] === 2){
            swap(nums, index, high);
            high--;
        } else {
            index++;
        }
    }
};

function swap(nums, i, j) {
    const t = nums[i];
    nums[i] = nums[j];
    nums[j] = t;
}
```
