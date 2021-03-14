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
    * [9. 修改一个数成为非递减数组](#9-修改一个数成为非递减数组)
    * [10. 子数组最大的和](#10-子数组最大的和)
    * [11. 分隔字符串使同种字符出现在一起](#11-分隔字符串使同种字符出现在一起)
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

```

## 9. 修改一个数成为非递减数组

665\. Non-decreasing Array (Easy)

[Leetcode](https://leetcode.com/problems/non-decreasing-array/description/) / [力扣](https://leetcode-cn.com/problems/non-decreasing-array/description/)

```html
Input: [4,2,3]
Output: True
Explanation: You could modify the first 4 to 1 to get a non-decreasing array.
```

题目描述：判断一个数组是否能只修改一个数就成为非递减数组。

在出现 nums[i] \< nums[i - 1] 时，需要考虑的是应该修改数组的哪个数，使得本次修改能使 i 之前的数组成为非递减数组，并且   **不影响后续的操作**  。优先考虑令 nums[i - 1] = nums[i]，因为如果修改 nums[i] = nums[i - 1] 的话，那么 nums[i] 这个数会变大，就有可能比 nums[i + 1] 大，从而影响了后续操作。还有一个比较特别的情况就是 nums[i] \< nums[i - 2]，修改 nums[i - 1] = nums[i] 不能使数组成为非递减数组，只能修改 nums[i] = nums[i - 1]。

```java
public boolean checkPossibility(int[] nums) {
    int cnt = 0;
    for (int i = 1; i < nums.length && cnt < 2; i++) {
        if (nums[i] >= nums[i - 1]) {
            continue;
        }
        cnt++;
        if (i - 2 >= 0 && nums[i - 2] > nums[i]) {
            nums[i] = nums[i - 1];
        } else {
            nums[i - 1] = nums[i];
        }
    }
    return cnt <= 1;
}
```



## 10. 子数组最大的和

53\. Maximum Subarray (Easy)

[Leetcode](https://leetcode.com/problems/maximum-subarray/description/) / [力扣](https://leetcode-cn.com/problems/maximum-subarray/description/)

```html
For example, given the array [-2,1,-3,4,-1,2,1,-5,4],
the contiguous subarray [4,-1,2,1] has the largest sum = 6.
```

```java
public int maxSubArray(int[] nums) {
    if (nums == null || nums.length == 0) {
        return 0;
    }
    int preSum = nums[0];
    int maxSum = preSum;
    for (int i = 1; i < nums.length; i++) {
        preSum = preSum > 0 ? preSum + nums[i] : nums[i];
        maxSum = Math.max(maxSum, preSum);
    }
    return maxSum;
}
```

## 11. 分隔字符串使同种字符出现在一起

763\. Partition Labels (Medium)

[Leetcode](https://leetcode.com/problems/partition-labels/description/) / [力扣](https://leetcode-cn.com/problems/partition-labels/description/)

```html
Input: S = "ababcbacadefegdehijhklij"
Output: [9,7,8]
Explanation:
The partition is "ababcbaca", "defegde", "hijhklij".
This is a partition so that each letter appears in at most one part.
A partition like "ababcbacadefegde", "hijhklij" is incorrect, because it splits S into less parts.
```

```java
public List<Integer> partitionLabels(String S) {
    int[] lastIndexsOfChar = new int[26];
    for (int i = 0; i < S.length(); i++) {
        lastIndexsOfChar[char2Index(S.charAt(i))] = i;
    }
    List<Integer> partitions = new ArrayList<>();
    int firstIndex = 0;
    while (firstIndex < S.length()) {
        int lastIndex = firstIndex;
        for (int i = firstIndex; i < S.length() && i <= lastIndex; i++) {
            int index = lastIndexsOfChar[char2Index(S.charAt(i))];
            if (index > lastIndex) {
                lastIndex = index;
            }
        }
        partitions.add(lastIndex - firstIndex + 1);
        firstIndex = lastIndex + 1;
    }
    return partitions;
}

private int char2Index(char c) {
    return c - 'a';
}
```
