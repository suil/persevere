# HashMap
<!-- GFM-TOC -->
* [HashMap](#hashmap)
    * [HashMap of occurence](#HashMap-of-occurence)
        * [Bulls and Cows](#Bulls-and-Cows)
        * [X of a Kind in a Deck of Cards](#X-of-a-Kind-in-a-Deck-of-Cards)
        * [Shortest Word Distance](../leetcode.md#shortest-word-distance)
        * [Shortest Word Distance II](../leetcode.md#shortest-word-distance-ii)
        * [Shortest Word Distance III](../leetcode.md#shortest-word-distance-iii)
    * [Logger Rate Limiter](#Logger-Rate-Limiter)
    * [1. 数组中两个数的和为给定值](#1-数组中两个数的和为给定值)
    * [2. 判断数组是否含有重复元素](#2-判断数组是否含有重复元素)
    * [3. 最长和谐序列](#3-最长和谐序列)
    * [4. 最长连续序列](#4-最长连续序列)
    * [friends-of-appropriate-ages](../leedcode.md#friends-of-appropriate-ages)
    * [Group Shifted Strings](../leetcode.md#group-shifted-strings)
    * [Two Sum III - Data structure design](../leetcode.md#two-sum-iii-data-structure-design)
    * [Dot Product of Two Sparse Vectors](#dot-product-of-two-sparse-vectors)
    * Ordered HashMap
        * [LRU Cache](../leetcode.md#lru-cache)
    * HashMap and Array
        * [Insert Delete GetRandom O(1)](../leetcode.md#insert-delete-getrandom-o1)
<!-- GFM-TOC -->


HashMap use O(N) space complexity to store data, and use time complexity O(1) to access data.

JavaScript HashMap implementation could be Map object, regular object, or array. If the range of data is predictable, a simple array could be used to solve this. For example, for all lower cased letters, we could just use an array with length of 26 elements to store it. This lowers the space complexity to O(1).

[Encode and Decode TinyURL](https://leetcode.com/problems/encode-and-decode-tinyurl/description/)

## HashMap of occurence

Use HashMap to store the number of occurence data can help solve problems.

### Bulls and Cows
[299. Bulls and Cows (Medium)](https://leetcode.com/problems/bulls-and-cows/)
```javascript
var getHint = function(secret, guess) {
    const freqMap = new Map();
    for (let i = 0; i < secret.length; i++) {
        freqMap.set(secret[i], (freqMap.get(secret[i]) || 0) + 1);
    } 
    let numBull = 0, numCow = 0;
    // Bulls take precendence.
    for (let i = 0; i < guess.length; i++) {
        if (secret[i] === guess[i]) {
            numBull++;
            freqMap.set(guess[i], (freqMap.get(guess[i]) - 1));
        }
    }
    for (let i = 0; i < guess.length; i++) {
        if (secret[i] !== guess[i] && freqMap.get(guess[i]) > 0) {
            numCow++;
            freqMap.set(guess[i], (freqMap.get(guess[i]) - 1));
        }
    }
    return `${numBull}A${numCow}B`;
};
```

### X of a Kind in a Deck of Cards
[914. X of a Kind in a Deck of Cards](https://leetcode.com/problems/x-of-a-kind-in-a-deck-of-cards/)
```javascript
var hasGroupsSizeX = function(deck) {
    const freqMap = new Map();
    for (const card of deck) {
        freqMap.set(card, (freqMap.get(card) || 0) + 1);
    }
    let g;
    for (const [deck, count] of freqMap) {
        g = (g === undefined) ? count : gcd(g, count);
    }
    return g >= 2;
};
function gcd(x, y) {
    return x === 0 ? y : gcd(y % x, x)
}

```
## Logger Rate Limiter

[359. Logger Rate Limiter (Easy)](https://leetcode.com/problems/logger-rate-limiter/)

```javascript
var Logger = function() {
    this.timeHash = new Map();
};
/**
 * @param {number} timestamp 
 * @param {string} message
 * @return {boolean}
 */
Logger.prototype.shouldPrintMessage = function(timestamp, message) {
    if (!this.timeHash.has(message)) {
        this.timeHash.set(message, timestamp);
        return true;
    }
    if (timestamp - this.timeHash.get(message) >= 10) {
        this.timeHash.set(message, timestamp);
        return true;
    }
    return false;
};
```

## 1. 数组中两个数的和为给定值

1\. Two Sum (Easy)

[Leetcode](https://leetcode.com/problems/two-sum/description/) / [力扣](https://leetcode-cn.com/problems/two-sum/description/)

可以先对数组进行排序，然后使用双指针方法或者二分查找方法。这样做的时间复杂度为 O(NlogN)，空间复杂度为 O(1)。

用 HashMap 存储数组元素和索引的映射，在访问到 nums[i] 时，判断 HashMap 中是否存在 target - nums[i]，如果存在说明 target - nums[i] 所在的索引和 i 就是要找的两个数。该方法的时间复杂度为 O(N)，空间复杂度为 O(N)，使用空间来换取时间。

```java
public int[] twoSum(int[] nums, int target) {
    HashMap<Integer, Integer> indexForNum = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        if (indexForNum.containsKey(target - nums[i])) {
            return new int[]{indexForNum.get(target - nums[i]), i};
        } else {
            indexForNum.put(nums[i], i);
        }
    }
    return null;
}
```

## 2. 判断数组是否含有重复元素

217\. Contains Duplicate (Easy)

[Leetcode](https://leetcode.com/problems/contains-duplicate/description/) / [力扣](https://leetcode-cn.com/problems/contains-duplicate/description/)

```java
public boolean containsDuplicate(int[] nums) {
    Set<Integer> set = new HashSet<>();
    for (int num : nums) {
        set.add(num);
    }
    return set.size() < nums.length;
}
```

## 3. 最长和谐序列

594\. Longest Harmonious Subsequence (Easy)

[Leetcode](https://leetcode.com/problems/longest-harmonious-subsequence/description/) / [力扣](https://leetcode-cn.com/problems/longest-harmonious-subsequence/description/)

```html
Input: [1,3,2,2,5,2,3,7]
Output: 5
Explanation: The longest harmonious subsequence is [3,2,2,2,3].
```

和谐序列中最大数和最小数之差正好为 1，应该注意的是序列的元素不一定是数组的连续元素。

```java
public int findLHS(int[] nums) {
    Map<Integer, Integer> countForNum = new HashMap<>();
    for (int num : nums) {
        countForNum.put(num, countForNum.getOrDefault(num, 0) + 1);
    }
    int longest = 0;
    for (int num : countForNum.keySet()) {
        if (countForNum.containsKey(num + 1)) {
            longest = Math.max(longest, countForNum.get(num + 1) + countForNum.get(num));
        }
    }
    return longest;
}
```

## 4. 最长连续序列

128\. Longest Consecutive Sequence (Hard)

[Leetcode](https://leetcode.com/problems/longest-consecutive-sequence/description/) / [力扣](https://leetcode-cn.com/problems/longest-consecutive-sequence/description/)

```html
Given [100, 4, 200, 1, 3, 2],
The longest consecutive elements sequence is [1, 2, 3, 4]. Return its length: 4.
```

要求以 O(N) 的时间复杂度求解。

```java
public int longestConsecutive(int[] nums) {
    Map<Integer, Integer> countForNum = new HashMap<>();
    for (int num : nums) {
        countForNum.put(num, 1);
    }
    for (int num : nums) {
        forward(countForNum, num);
    }
    return maxCount(countForNum);
}

private int forward(Map<Integer, Integer> countForNum, int num) {
    if (!countForNum.containsKey(num)) {
        return 0;
    }
    int cnt = countForNum.get(num);
    if (cnt > 1) {
        return cnt;
    }
    cnt = forward(countForNum, num + 1) + 1;
    countForNum.put(num, cnt);
    return cnt;
}

private int maxCount(Map<Integer, Integer> countForNum) {
    int max = 0;
    for (int num : countForNum.keySet()) {
        max = Math.max(max, countForNum.get(num));
    }
    return max;
}
```
<!-- @include ../leetcode/1570.dot-product-of-two-sparse-vectors.md -->
### Dot Product of Two Sparse Vectors
[1570. Dot Product of Two Sparse Vectors](https://leetcode.com/problems/dot-product-of-two-sparse-vectors/)
```html
Given two sparse vectors, compute their dot product.

Implement class SparseVector:

SparseVector(nums) Initializes the object with the vector nums
dotProduct(vec) Compute the dot product between the instance of SparseVector and vec
A sparse vector is a vector that has mostly zero values, you should store the sparse vector efficiently and compute the dot product between two SparseVector.

Follow up: What if only one of the vectors is sparse?

Example 1:

Input: nums1 = [1,0,0,2,3], nums2 = [0,3,0,4,0]
Output: 8
Explanation: v1 = SparseVector(nums1) , v2 = SparseVector(nums2)
v1.dotProduct(v2) = 1*0 + 0*3 + 0*0 + 2*4 + 3*0 = 8
Example 2:

Input: nums1 = [0,1,0,0,0], nums2 = [0,0,0,0,2]
Output: 0
Explanation: v1 = SparseVector(nums1) , v2 = SparseVector(nums2)
v1.dotProduct(v2) = 0*0 + 1*0 + 0*0 + 0*0 + 0*2 = 0
Example 3:

Input: nums1 = [0,1,0,0,2,0,0], nums2 = [1,0,0,0,3,0,4]
Output: 6
```

```javascript
var SparseVector = function(nums) {
    this.map = new Map();
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] != 0) {
            this.map.set(i, nums[i]);
        }
    }
};
SparseVector.prototype.dotProduct = function(vec) {
    let result = 0;
    for (const [index, value] of this.map) {
        if (vec.map.has(index)) {
            result += value * vec.map.get(index);
        }
    }
    return result;
};
```

