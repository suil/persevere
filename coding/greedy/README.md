# Greedy
<!-- GFM-TOC -->
* [Greedy](#Greedy)
    * [Assignment](#Assignment)
        * [Assign Cookies](#Assign-Cookies)
    * [Intervals](#Intervals)
        * [Non-overlapping Intervals](#Non-overlapping-Intervals)
        * [Minimum Number of Arrows to Burst Balloons](#Minimum-Number-of-Arrows-to-Burst-Balloons)
    * [Queue Reconstruction by Height](#Queue-Reconstruction-by-Height)
    * [Best Time to Buy and Sell Stock](#Best-Time-to-Buy-and-Sell-Stock)
        * [Best Time to Buy and Sell Stock I](#Best-Time-to-Buy-and-Sell-Stock-I)
        * [Best Time to Buy and Sell Stock II](#Best-Time-to-Buy-and-Sell-Stock-II)
    * [Can Place Flowers](#Can-Place-Flowers)
    * [Is Subsequence](#Is-Subsequence)
    * [Non-decreasing Array](#Non-decreasing-Array)
    * [Maximum Subarray](#Maximum-Subarray)
    * [Partition Labels](#Partition-Labels)
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



## Maximum Subarray

[53\. Maximum Subarray (Easy)](https://leetcode.com/problems/maximum-subarray/description/)

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
