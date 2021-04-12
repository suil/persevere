# Greedy
<!-- GFM-TOC -->
* [Greedy](#Greedy)
    * [Assignment](#Assignment)
        * [Assign Cookies](#Assign-Cookies)
    * [Intervals](#Intervals)
        * [Non-overlapping Intervals](#Non-overlapping-Intervals)
        * [Minimum Number of Arrows to Burst Balloons](#Minimum-Number-of-Arrows-to-Burst-Balloons)
        * [Interval List Intersections](#Interval-List-Intersections)
        * [Meeting Rooms II](#Meeting-Rooms-II)
        * [Merge Intervals](#Merge-Intervals)
    * [Queue Reconstruction by Height](#Queue-Reconstruction-by-Height)
    * [Best Time to Buy and Sell Stock](#Best-Time-to-Buy-and-Sell-Stock)
        * [Best Time to Buy and Sell Stock I](#Best-Time-to-Buy-and-Sell-Stock-I)
        * [Best Time to Buy and Sell Stock II](#Best-Time-to-Buy-and-Sell-Stock-II)
    * Max or Min on a contiguous subarray
        * [Maximum Subarray](#Maximum-Subarray)
        * [Maximum Product Subarray](#maximum-product-subarray)
    * [Can Place Flowers](#Can-Place-Flowers)
    * [Is Subsequence](#Is-Subsequence)
    * [Non-decreasing Array](#Non-decreasing-Array)
    * [Partition Labels](#Partition-Labels)
    * [Task Scheduler](#Task-Scheduler)
    * [Maximum Swap](../leetcode.md#maximum-swap)
<!-- GFM-TOC -->


保证每次操作都是局部最优的，并且最后得到的结果是全局最优的。

## Assignment

### Assign Cookies

[455\. Assign Cookies (Easy)](https://leetcode.com/problems/assign-cookies/description/)

```javascript
var findContentChildren = function(g, s) {
    g.sort((a, b) => a - b);
    s.sort((a, b) => a - b);
    let gi = 0, si = 0;
    while (gi < g.length && si < s.length) {
        if (g[gi] <= s[si]) {
            gi++;
        }
        si++;
    }
    return gi;
};
```

## Intervals

### Non-overlapping Intervals

[435\. Non-overlapping Intervals (Medium)](https://leetcode.com/problems/non-overlapping-intervals/description/)

```javascript
var eraseOverlapIntervals = function(intervals) {
    if (intervals.length == 0) {
        return 0;
    }
    intervals.sort((a, b) => a[1] - b[1]);
    let count = 0;
    let end = intervals[0][1];
    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][0] < end) {
            count++;
        } else {
            end = intervals[i][1];
        }
    }
    return count;
};
```

### Minimum Number of Arrows to Burst Balloons

[452\. Minimum Number of Arrows to Burst Balloons (Medium)](https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/description/)

```javascript
var findMinArrowShots = function(points) {
    if (points.length === 0) {
        return 0;
    }
    points.sort((a, b) => a[1] - b[1]);
    
    let end = points[0][1];
    let arrow = 1;
    for (let i = 1; i < points.length; i++) {
        if (points[i][0] > end) {
            arrow++;
            end = points[i][1];
        }
    }
    return arrow;
};
```

### Interval List Intersections
[986. Interval List Intersections](https://leetcode.com/problems/interval-list-intersections/)
```javascript
var intervalIntersection = function(firstList, secondList) {
    const intersections = [];
    let p1 = 0, p2 = 0;

    while (p1 < firstList.length && p2 < secondList.length) {
        // Let's check if A[i] intersects B[j].
        // lo - the startpoint of the intersection
        // hi - the endpoint of the intersection
        const lo = Math.max(firstList[p1][0], secondList[p2][0]);
        const hi = Math.min(firstList[p1][1], secondList[p2][1]);
        if (lo <= hi) {
            intersections.push([lo, hi]);
        }

        // Remove the interval with the smallest endpoint
        if (firstList[p1][1] < secondList[p2][1])
            p1++;
        else
            p2++;
    }
    return intersections;
}
```
### Meeting Rooms II
[253. Meeting Rooms II](https://leetcode.com/problems/meeting-rooms-ii/)
```javascript
var minMeetingRooms = function(intervals) {
    if (intervals.length < 1) { return 0; }
    
    // sort intervals by start time
    intervals.sort((a, b) => a[0] - b[0]);
    
    //save the end time of all rooms
    let roomEndTime = [intervals[0][1]];
    for (let i = 1; i < intervals.length; i++){
        const [start, end] = intervals[i];
        
        // the earliest available time 
        const earliestRoomEndTime = Math.min(...roomEndTime)
        
        if (start < earliestRoomEndTime) {
            roomEndTime.push(end);
        } else {
            roomEndTime[roomEndTime.indexOf(earliestRoomEndTime)] = end;
        }
    }
    return roomEndTime.length;
};
```

### Merge Intervals
[Merge Intervals](https://leetcode.com/problems/merge-intervals/)
```javascript
var merge = function(intervals) {
    if (intervals.length === 0) { return []; }
    
    intervals.sort((a, b) => a[0] - b[0]);
    
    const output = [];
    let previous = intervals[0];
    
    for (let i = 1; i < intervals.length; i++) {
        const current = intervals[i];
        if (previous[1] >= current[0]) {
            previous[1] = Math.max(previous[1], current[1]);
        } else {
            output.push(previous);
            previous = current;
        }
    }
    output.push(previous);
    return output;
};
```
## Queue Reconstruction by Height

[406\. Queue Reconstruction by Height(Medium)](https://leetcode.com/problems/queue-reconstruction-by-height/description/)

```javascript
var reconstructQueue = function(people) {
    people.sort((a, b) => a[0] !== b[0] ? b[0] - a[0] : a[1] - b[1]);
    
    const output = [];
    for (const person of people) {
        let insertIdx = person[1];
        output.splice(insertIdx, 0, person);
    }
    return output;
};
```

## Best Time to Buy and Sell Stock

### Best Time to Buy and Sell Stock I

[121\. Best Time to Buy and Sell Stock (Easy)](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/description/)

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

### Best Time to Buy and Sell Stock II

[122\. Best Time to Buy and Sell Stock II (Easy)](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/description/)

```javascript
var maxProfit = function(prices) {
    let profit = 0;
    
    for (let i = 1; i < prices.length; i++) {
        if (prices[i] > prices[i - 1]) {
            profit += prices[i] - prices[i - 1];
        }
    }
    
    return profit;
};
```

## Can Place Flowers

[605\. Can Place Flowers (Easy)](https://leetcode.com/problems/can-place-flowers/description/)

```javascript
var canPlaceFlowers = function(flowerbed, n) {
    let count = 0;
    for (let i = 0; i < flowerbed.length; i++) {
        if (flowerbed[i] == 1) {
            continue;
        }
        const prev = (i == 0 ? 0 : flowerbed[i - 1]);
        const next = (i == flowerbed.length - 1 ? 0 : flowerbed[i + 1]);
        if (prev === 0 && next === 0) {
            count++;
            flowerbed[i] = 1;
        }
    }
    return count >= n;
};
```

## Is Subsequence

[392\. Is Subsequence (Medium)](https://leetcode.com/problems/is-subsequence/description/)

```javascript
var isSubsequence = function(s, t) {
    let index = -1;
    for (let i = 0; i < s.length; i++) {
        index = t.indexOf(s[i], index + 1);
        if (index == -1) {
            return false;
        }
    }
    return true;
};
```

## Non-decreasing Array

[665\. Non-decreasing Array (Easy)](https://leetcode.com/problems/non-decreasing-array/description/)

```javascript
var checkPossibility = function(nums) {
    let count = 0;
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] >= nums[i - 1]) {
            continue;
        }

        count++;
        if (count > 1) {
            return false;
        }

        if (i >= 2 && nums[i - 2] > nums[i]) {
            nums[i] = nums[i - 1];
        } else {
            nums[i - 1] = nums[i];
        }
    }
    return true;
};
```

<!-- @include ../leetcode/0053.maximum-subarray.md -->
## Maximum Subarray
[53. Maximum Subarray (Easy)](https://leetcode.com/problems/maximum-subarray/)
```html
Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.

Example 1:

Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: [4,-1,2,1] has the largest sum = 6.
Example 2:

Input: nums = [1]
Output: 1
Example 3:

Input: nums = [5,4,-1,7,8]
Output: 23
```

```javascript
var maxSubArray = function(nums) {
    let sum = nums[0];
    let max = nums[0];
    for (let i = 1; i < nums.length; i++) {
        const num = nums[i];
        sum = Math.max(num, num + sum);
        max = Math.max(max, sum)
    }
    return max;
};
```

<!-- @include ../leetcode/0152.maximum-product-subarray.md -->
## Maximum Product Subarray
[152. Maximum Product Subarray](https://leetcode.com/problems/maximum-product-subarray/)

```html
Given an integer array nums, find a contiguous non-empty subarray within the array that has the largest product, and return the product.

It is guaranteed that the answer will fit in a 32-bit integer.

A subarray is a contiguous subsequence of the array.

Example 1:

Input: nums = [2,3,-2,4]
Output: 6
Explanation: [2,3] has the largest product 6.
Example 2:

Input: nums = [-2,0,-1]
Output: 0
Explanation: The result cannot be 2, because [-2,-1] is not a subarray.
```

```javascript
var maxProduct = function(nums) {
    let max = -Infinity;
    let currentMax = 1;
    let currentMin = 1;
    
    for (let i = 0; i < nums.length; i++) {
        let prevMax = currentMax;
        currentMax = Math.max(nums[i], prevMax * nums[i], currentMin * nums[i]);
        currentMin = Math.min(nums[i], prevMax * nums[i], currentMin * nums[i]);
        max = Math.max(currentMax, max);               
    }
    return max;
};
```

## Partition Labels
[763\. Partition Labels (Medium)](https://leetcode.com/problems/partition-labels/description/)
```javascript
var partitionLabels = function(S) {
    const positionMap = new Map();
    for (let i = 0; i < S.length; i++) {
        positionMap.set(S[i], i);
    }
    
    let start = 0;
    let end = 0;
    let partitions = [];
    for (let i = 0; i < S.length; i++) {
        end = Math.max(end, positionMap.get(S[i]));
        if (end === i) {
            partitions.push(end - start + 1);
            start = end + 1;
            end = 0;
        }
    }
    return partitions;
};
```

## License Key Formatting

[482. License Key Formatting](https://leetcode.com/problems/license-key-formatting/)
```javascript
var licenseKeyFormatting = function(S, K) {
    const output = [];
    let group = [];
    for (let i = S.length - 1; i >= 0; i--) {
        if (S[i] === '-') { continue; }
        group.unshift(S[i].toUpperCase());
        if (group.length >= K) {
            output.unshift(group.join(''));
            group = [];
        }
    }
    if (group.length > 0) {
        output.unshift(group.join(''));
    }
    return output.join('-');
};
```

## Task Scheduler
[621. Task Scheduler](https://leetcode.com/problems/task-scheduler/)
```javascript
var leastInterval = function(tasks, n) {
    const frequencies = [...Array(26)].fill(0);
    for (const task of tasks) {
        frequencies[task.charCodeAt(0) - 'A'.charCodeAt(0)]++;
    }

    frequencies.sort();

    // max frequency
    const maxFreq = frequencies[25];
    let idleTime = (maxFreq - 1) * n;

    for (let i = frequencies.length - 2; i >= 0 && idleTime > 0; --i) {
        idleTime -= Math.min(maxFreq - 1, frequencies[i]); 
    }
    
    idleTime = Math.max(0, idleTime);
    return idleTime + tasks.length;
};
```
