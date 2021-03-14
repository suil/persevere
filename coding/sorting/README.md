# Sorting
<!-- GFM-TOC -->
* [Sorting](#Sorting)
    * [Quick Sort](#Quick-Sort)
    * [MinHeap](#minheap)
        * [Kth Element](#kth-element)
    * [Bucket Sort](#Bucket-Sort)
        * [Top K Frequent Elements](#Top-K-Frequent-Elements)
        * [2. 按照字符出现次数对字符串排序](#2-按照字符出现次数对字符串排序)
    * [荷兰国旗问题](#荷兰国旗问题)
        * [1. 按颜色进行排序](#1-按颜色进行排序)
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

```

## 荷兰国旗问题

荷兰国旗包含三种颜色：红、白、蓝。

有三种颜色的球，算法的目标是将这三种球按颜色顺序正确地排列。它其实是三向切分快速排序的一种变种，在三向切分快速排序中，每次切分都将数组分成三个区间：小于切分元素、等于切分元素、大于切分元素，而该算法是将数组分成三个区间：等于红色、等于白色、等于蓝色。

<div align="center"> <img src="https://cs-notes-1256109796.cos.ap-guangzhou.myqcloud.com/7a3215ec-6fb7-4935-8b0d-cb408208f7cb.png"/> </div><br>


### 1. 按颜色进行排序

75\. Sort Colors (Medium)

[Leetcode](https://leetcode.com/problems/sort-colors/description/) / [力扣](https://leetcode-cn.com/problems/sort-colors/description/)

```html
Input: [2,0,2,1,1,0]
Output: [0,0,1,1,2,2]
```

题目描述：只有 0/1/2 三种颜色。

```java
public void sortColors(int[] nums) {
    int zero = -1, one = 0, two = nums.length;
    while (one < two) {
        if (nums[one] == 0) {
            swap(nums, ++zero, one++);
        } else if (nums[one] == 2) {
            swap(nums, --two, one);
        } else {
            ++one;
        }
    }
}

private void swap(int[] nums, int i, int j) {
    int t = nums[i];
    nums[i] = nums[j];
    nums[j] = t;
}
```
