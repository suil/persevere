# Sorting
<!-- GFM-TOC -->
* [Sorting](#Sorting)
    * [Quick Sort](#Quick-Sort)
    * [MinHeap](#minheap)
        * [Kth Element](#kth-element)
    * [Bucket Sort](#Bucket-Sort)
        * [Top K Frequent Elements](#Top-K-Frequent-Elements)
        * [Sort Characters By Frequency](#Sort-Characters-By-Frequency)
    * [Sorting for fixed small number of items](#Sorting-for-fixed-small-number-of-items)
        * [Sort Colors (Medium)](#Sort-Colors)
<!-- GFM-TOC -->


## Quick Sort

```javascript
function partition(items, left, right) {
    const pivot = items[Math.floor(left + (right - left) / 2)];
    let l = left;
    let r = right;
    while (l <= r) {
        while (pivot > items[l]) {
            l++;
        }
        while (items[r] > pivot) {
            r--;
        }
        if (l <= r) {
            var temp = items[l];
            items[l] = items[r];
            items[r] = temp;
            l++;
            r--;
        }
    }
    return l;
}

function quickSort(items, left, right) {
    if (items.length > 1) {
        const index = partition(items, left, right); //index returned from partition
        if (left < index - 1) { //more elements on the left side of the pivot
            quickSort(items, left, index - 1);
        }
        if (index < right) { //more elements on the right side of the pivot
            quickSort(items, index, right);
        }
    }
    return items;
}
```
This algorithm can be used to solve **Kth Element** problem.

When partition() funciton in quick sorting is used, the array needs to be scrambled. Otherwise, the worset case time complexity will become O(N<sup>2</sup>)。

## Heap

It also can be used to solve **TopK Elements** problem.

### Kth Element

[215\. Kth Largest Element in an Array (Medium)](https://leetcode.com/problems/kth-largest-element-in-an-array/description/)

**minHeap**  ：Time O(NlogK)，Space O(K)。

```java
public int findKthLargest(int[] nums, int k) {
    PriorityQueue<Integer> pq = new PriorityQueue<>(); // 小顶堆
    for (int val : nums) {
        pq.add(val);
        if (pq.size() > k)  // 维护堆的大小为 K
            pq.poll();
    }
    return pq.peek();
}
```

**Quick Sort**: Time O(N)，Space O(1)

```javascript
var findKthLargest = function(nums, k) {
    if(nums == null ||  nums.length == 0){
        return 0;
    }
    return quickSelect(nums, 0, nums.length - 1, k)
};

function quickSelect(nums, start, end, k) {
    if (start === end) { return nums[start]; }

    let left = start, right = end, pivot = nums[Math.floor((start + end) / 2)];

    while (left <= right) {
        while (nums[left] > pivot) {
            left++;
        }
        while (nums[right] < pivot) {
            right--;
        }
        if (left <= right) {
            let temp = nums[left];
            nums[left] = nums[right];
            nums[right] = temp;
            left++;
            right--;
        }
    }

    if (start + k - 1 <= right) {
        return quickSelect(nums, start, right, k);
    }
    if (start + k - 1 >= left) {
        return quickSelect(nums, left, end, k - (left - start));
    }

    return nums[right + 1];
}
```

## Bucket Sort

### Top K Frequent Elements

[347\. Top K Frequent Elements (Medium)](https://leetcode.com/problems/top-k-frequent-elements/description/)

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
