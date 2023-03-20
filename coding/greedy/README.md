# Greedy
<!-- GFM-TOC -->
* [Greedy](#Greedy)
    * [Assignment](#Assignment)
        * [Assign Cookies](#Assign-Cookies)
    * [Intervals](#Intervals)
        * [Non-overlapping Intervals](#non--overlapping-Intervals)
        * [Minimum Number of Arrows to Burst Balloons](#Minimum-Number-of-Arrows-to-Burst-Balloons)
        * [Interval List Intersections](#Interval-List-Intersections)
        * [Meeting Rooms](#meeting-rooms)
        * [Meeting Rooms II](#Meeting-Rooms-II)
        * [Merge Intervals](#Merge-Intervals)
        * [Insert Interval](#insert-interval)
        * [Total Length Covered by Intervals](#total-length-covered-by-intervals)

    * [Queue Reconstruction by Height](#Queue-Reconstruction-by-Height)
    * [Stock Buy and Sell](#stock-buy-and-sell)
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
    * [Maximum Swap](#maximum-swap)
    * [Flower Planting With No Adjacent](#flower-planting-with-no-adjacent)

<!-- GFM-TOC -->

Ensure every operation is local optimum, and final result will be global optimum.

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
  intervals.sort((a, b) => a[1] - b[1]);

  let prevEnd = intervals[0][1];
  let count = 0;
  for (let i = 1; i < intervals.length; i++) {
    const [currentStart, currentEnd] = intervals[i];
    if (currentStart >= prevEnd) { // not overlapping
      prevEnd = currentEnd;
    } else { // overlapping
      prevEnd = Math.min(prevEnd, currentEnd);
      count++;
    }
  }

  return count;
```

### Minimum Number of Arrows to Burst Balloons

[452\. Minimum Number of Arrows to Burst Balloons (Medium)](https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/description/)

```javascript
var findMinArrowShots = function(points) {
  points.sort((a, b) => a[1] - b[1]);
  
  let prevEnd = points[0][1];
  let count = 1;
  for (let i = 1; i < points.length; i++) {
    const [currentStart, currentEnd] = points[i];
    if (currentStart > prevEnd) { // not overlapping
      count++;
      prevEnd = currentEnd;
    } else { // overlapping
      prevEnd = Math.min(prevEnd, currentEnd);
    }
  }

  return count;
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

<!-- @include ../leetcode/0253.meeting-rooms-ii.md -->
### Meeting Rooms
[253. Meeting Rooms](https://leetcode.com/problems/meeting-rooms/)
```javascript
var canAttendMeetings = function(intervals) {
  if (intervals.length === 0) return true;

  intervals.sort((a, b) => a[0] - b[0]);

  let prevEnd = intervals[0][1];

  for (let i = 1; i < intervals.length; i++) {
    const [currentStart, currentEnd] = intervals[i];
    if (currentStart >= prevEnd) { // no overlapping
      prevEnd = currentEnd;
    } else { // overlapping
      return false;
    }
  }

  return true;
};
```

<!-- @include ../leetcode/0253.meeting-rooms-ii.md -->
### Meeting Rooms II
[253. Meeting Rooms](https://leetcode.com/problems/meeting-rooms-ii)

```html
Given an array of meeting time intervals intervals where intervals[i] = [starti, endi], return the minimum number of conference rooms required.
```

```javascript
var minMeetingRooms = function(intervals) {
  // edge cases

  // initial states
  intervals.sort((a, b) => a[0] - b[0]);

  const meetingEndTimes = [intervals[0][1]];  

  for (let i = 1; i < intervals.length; i++) {
    const [currentStart, currentEnd] = intervals[i];
    const earliestMeetingEndTimes = Math.min(...meetingEndTimes);
    if (currentStart >= earliestMeetingEndTimes) { // no overlapping
      // not open a new room, but update the current end time
      meetingEndTimes[meetingEndTimes.indexOf(earliestMeetingEndTimes)] = currentEnd;
    } else { // overlapping
      meetingEndTimes.push(currentEnd);
    }
  }

  return meetingEndTimes.length
};
```
<!-- @include end -->

```java
class Solution {
  public int minMeetingRooms(int[][] intervals) {
    // edge case

    // initial state
    Arrays.sort(intervals, (int[] a, int[] b) -> (a[0] - b[0]));
    PriorityQueue<Integer> minHeap = new PriorityQueue<>((a, b) -> a - b);
    minHeap.add(intervals[0][1]);

    for (int i = 1; i < intervals.length; i++) {
      int currentStart = intervals[i][0];
      int currentEnd = intervals[i][1];

      if (currentStart >= minHeap.peek()) { // not overlapping
        minHeap.poll();
        minHeap.add(intervals[i][1]);
      } else { // overlapping
        minHeap.add(intervals[i][1]);
      }
    }

    return minHeap.size();        
  }
}
```
<!-- @include end -->

<!-- @include ../leetcode/0056.merge-intervals.md -->
### Merge Intervals
[56. Merge Intervals](https://leetcode.com/problems/merge-intervals/)

```html
Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.

Example 1:
Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
Explanation: Since intervals [1,3] and [2,6] overlaps, merge them into [1,6].
Example 2:

Input: intervals = [[1,4],[4,5]]
Output: [[1,5]]
Explanation: Intervals [1,4] and [4,5] are considered overlapping.
```

```javascript
var merge = function(intervals) {
  // edge case
  if (intervals.length === 0) {
    return [];
  }

  // intial state
  intervals.sort((a, b) => a[0] - b[0]);

  const output = [intervals[0]];
  let previous = intervals[0];

  for (let i = 1; i < intervals.length; i++) {
    const current = intervals[i];
    const [currentStart, currentEnd] = current;

    if (currentStart > previous[1]) { // no overlapping
      previous = current;
      output.push(current);
    } else { // overlapping
      const extendedEnd = Math.max(previous[1], currentEnd);
      previous[1] = extendedEnd;
      output[output.length - 1][1] = extendedEnd;
    }
  }
  
  return output;
};
```

<!-- @include ../leetcode/0057.insert-interval.md -->
### Insert Interval
[57. Insert Interval](https://leetcode.com/problems/insert-interval/)

```html
Given a set of non-overlapping intervals, insert a new interval into the intervals (merge if necessary).
You may assume that the intervals were initially sorted according to their start times.

Example 1:
Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
Output: [[1,5],[6,9]]

Example 2:
Input: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
Output: [[1,2],[3,10],[12,16]]
Explanation: Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10].

Example 3:
Input: intervals = [], newInterval = [5,7]
Output: [[5,7]]

Example 4:
Input: intervals = [[1,5]], newInterval = [2,3]
Output: [[1,5]]

Example 5:
Input: intervals = [[1,5]], newInterval = [2,7]
Output: [[1,7]]
```

```javascript
var merge = function(intervals) {
  // edge case
  if (intervals.length === 0) {
    return [];
  }

  // intial state
  intervals.sort((a, b) => a[0] - b[0]);

  const output = [intervals[0]];
  let prevEnd = intervals[0][1];

  for (let i = 1; i < intervals.length; i++) {
    const current = intervals[i];
    const [currentStart, currentEnd] = current;

    if (currentStart > prevEnd) { // no overlapping
      prevEnd = currentEnd;
      output.push(current);
    } else { // overlapping
      prevEnd = Math.max(prevEnd, currentEnd);
      output[output.length - 1][1] = prevEnd;
    }
  }
  
  return output;
};
```

<!-- @include ../leetcode/X001.total-length-covered-by-intervals.md -->
### Total Length Covered by Intervals

```html
Returns a total length covered by intervals.
If several intervals intersect, intersection should be counted only once.
Example:

addInterval(3, 6)
addInterval(8, 9)
addInterval(1, 5)

getTotalCoveredLength() -> 6
i.e. [1,5] and [3,6] intersect and give a total covered interval [1,6]
[1,6] and [8,9] don't intersect so total covered length is a sum for both intervals, that is 6.

               _____________
                                      ____
    ____________________

0   1    2    3    4    5   6   7    8    9    10
```

Greedy

```javascript
const intervals = [
  [3, 6], [8, 9], [1, 5]
];

function addIntervals(begin, end) {
  intervals.push([begin, end]);
}

function getTotalCoveredLength() {
  intervals.sort((a, b) => a[0] - b[0]);

  let totalLength = intervals[0][1] - intervals[0][0];
  let prevEnd = intervals[0][1];

  for (let i = 1; i < intervals.length; i++) {
    const [currentStart, currentEnd] = intervals[i];
    if (currentStart > previous[1]) { // not overlap
      totalLength += (currentEnd - currentStart);
      prevEnd = currentEnd;
    } else { // overlap
      prevEnd = Math.max(prevEnd, currentEnd)
      totalLength += (extendedEnd - prevEnd);
    }
  }

  return totalLength;
}
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

## Stock Buy and Sell

<!-- @include ../leetcode/0121.best-time-to-buy-and-sell-stock.md -->
### Best Time to Buy and Sell Stock
[121. Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)

```html
You are given an array prices where prices[i] is the price of a given stock on the ith day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.

Example 1:
Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.

Example 2:
Input: prices = [7,6,4,3,1]
Output: 0
Explanation: In this case, no transactions are done and the max profit = 0.
```

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

<!-- @include ../leetcode/0605.can-place-flowers.md -->
## Can Place Flowers
[605. Can Place Flowers](https://leetcode.com/problems/can-place-flowers/description/)

```html
You have a long flowerbed in which some of the plots are planted, and some are not. However, flowers cannot be planted in adjacent plots.

Given an integer array flowerbed containing 0's and 1's, where 0 means empty and 1 means not empty, and an integer n, return if n new flowers can be planted in the flowerbed without violating the no-adjacent-flowers rule.

Example 1:
Input: flowerbed = [1,0,0,0,1], n = 1
Output: true

Example 2:
Input: flowerbed = [1,0,0,0,1], n = 2
Output: false
```

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
        const prevMax = currentMax;
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

<!-- @include ../leetcode/0621.task-scheduler.md -->
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

```java
class Solution {
    public int leastInterval(char[] tasks, int n) {
        HashMap<Character, Integer> map = new HashMap<>();
        for (char c: tasks) {
          map.put(c, map.getOrDefault(c, 0) + 1);
        }

        PriorityQueue<Integer> maxHeap = new PriorityQueue<>((a, b) -> b - a);
        maxHeap.addAll(map.values());

        int cycles = 0;
        while (maxHeap.size() > 0) {
          ArrayList<Integer> runningTasks = new ArrayList<Integer>();
          for (int i = 0; i < n + 1; i++) {
            if (maxHeap.size() > 0) {
              runningTasks.add(maxHeap.remove());
            }
          }

          for (int taskFreq: runningTasks) {
            taskFreq--;
            if (taskFreq > 0) {
              maxHeap.add(taskFreq);
            }
          }

          cycles += maxHeap.isEmpty() ? runningTasks.size() : n + 1;
        }
        
        return cycles;
    }
}
```

<!-- @include ../leetcode/0670.maximum-swap.md -->
## Maximum Swap
[670. Maximum Swap](https://leetcode.com/problems/maximum-swap/)
```html
Given a non-negative integer, you could swap two digits at most once to get the maximum valued number. Return the maximum valued number you could get.

Example 1:
Input: 2736
Output: 7236
Explanation: Swap the number 2 and the number 7.
Example 2:
Input: 9973
Output: 9973
Explanation: No swap.
```

```javascript
var maximumSwap = function(num) {
    const nums = num.toString().split('');
    const positionMap = new Map();

    for (let i = 0; i < nums.length; i++) {
        positionMap.set(Number(nums[i]), i);
    }

    for (let i = 0; i < nums.length; i++) { 
        for (let d = 9; d > nums[i]; d--) {
            if (!positionMap.has(d)) { continue; }
            const pos = positionMap.get(d);
            if (pos > i) {
                [nums[i], nums[pos]] = [nums[pos], nums[i]];
                return Number(nums.join(''));
            }
        }
    }
    return num;
};
```

<!-- @include ../leetcode/1042.flower-planting-with-no-adjacent.md -->
### Flower Planting With No Adjacent
[1042. Flower Planting With No Adjacent](https://leetcode.com/problems/flower-planting-with-no-adjacent/)

```html
You have n gardens, labeled from 1 to n, and an array paths where paths[i] = [xi, yi] describes a bidirectional path between garden xi to garden yi. In each garden, you want to plant one of 4 types of flowers.

All gardens have at most 3 paths coming into or leaving it.

Your task is to choose a flower type for each garden such that, for any two gardens connected by a path, they have different types of flowers.

Return any such a choice as an array answer, where answer[i] is the type of flower planted in the (i+1)th garden. The flower types are denoted 1, 2, 3, or 4. It is guaranteed an answer exists.

Example 1:
Input: n = 3, paths = [[1,2],[2,3],[3,1]]
Output: [1,2,3]
Explanation:
Gardens 1 and 2 have different types.
Gardens 2 and 3 have different types.
Gardens 3 and 1 have different types.
Hence, [1,2,3] is a valid answer. Other valid answers include [1,2,4], [1,4,2], and [3,2,1].

Example 2:
Input: n = 4, paths = [[1,2],[3,4]]
Output: [1,2,1,2]
Example 3:

Input: n = 4, paths = [[1,2],[2,3],[3,4],[4,1],[1,3],[2,4]]
Output: [1,2,3,4]
```

```javascript
var gardenNoAdj = function(n, paths) {
    const graph = [...Array(n)].map(() => []);
    for (const [u, v] of paths) {
        graph[u - 1].push(v - 1);
        graph[v - 1].push(u - 1);
    }
    
    const ans = [];
    for (let u = 0; u < n; u++) {
        const neighbors = graph[u];
        const usedColors = new Set();
        for (const neighbor of neighbors) {
            if (ans[neighbor]) { usedColors.add(ans[neighbor]); }
        }
        for (const color of [1, 2, 3, 4]) {
            if (!usedColors.has(color)) {
                ans[u] = color;
                break;
            }
        }
    }
    return ans;
};
```
