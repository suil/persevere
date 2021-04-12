# HashMap
<!-- GFM-TOC -->
* [HashMap](#hashmap)
    * [HashMap of occurence](#HashMap-of-occurence)
        * [Bulls and Cows](#Bulls-and-Cows)
        * [X of a Kind in a Deck of Cards](#X-of-a-Kind-in-a-Deck-of-Cards)
        * [Shortest Word Distance](#shortest-word-distance)
        * [Shortest Word Distance II](#shortest-word-distance-ii)
        * [Shortest Word Distance III](#shortest-word-distance-iii)
    * [Logger Rate Limiter](#Logger-Rate-Limiter)
    * [1. 数组中两个数的和为给定值](#1-数组中两个数的和为给定值)
    * [2. 判断数组是否含有重复元素](#2-判断数组是否含有重复元素)
    * [3. 最长和谐序列](#3-最长和谐序列)
    * [4. 最长连续序列](#4-最长连续序列)
    * [friends-of-appropriate-ages](../leedcode.md#friends-of-appropriate-ages)
    * [Group Shifted Strings](#group-shifted-strings)
    * [Two Sum III - Data structure design](../leetcode.md#two-sum-iii-data-structure-design)
    * [Dot Product of Two Sparse Vectors](#dot-product-of-two-sparse-vectors)
    * Ordered HashMap
        * [LRU Cache](../leetcode.md#lru-cache)
    * HashMap and Array
        * [Insert Delete GetRandom O(1)](#insert-delete-getrandom-o1)
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
<!-- @include ../leetcode/0243.shortest-word-distance.md -->
### Shortest Word Distance
[243. Shortest Word Distance](https://leetcode.com/problems/shortest-word-distance/)
```html
Given an array of strings wordsDict and two different strings that already exist in the array word1 and word2, return the shortest distance between these two words in the list.

Example 1:

Input: wordsDict = ["practice", "makes", "perfect", "coding", "makes"], word1 = "coding", word2 = "practice"
Output: 3
Example 2:

Input: wordsDict = ["practice", "makes", "perfect", "coding", "makes"], word1 = "makes", word2 = "coding"
Output: 1
```

Hashmap Solution:

```javascript
var shortestDistance = function(wordsDict, word1, word2) {
    const map = new Map();
    for (let i = 0; i < wordsDict.length; i++) {
        const word = wordsDict[i];
        if (!map.has(word)) { map.set(word, []); }
        map.get(word).push(i);
    }
    
    const positions1 = map.get(word1);
    const positions2 = map.get(word2);
    
    let index1 = 0;
    let index2 = 0;
    
    let min = Infinity;
    while (index1 < positions1.length && index2 < positions2.length) {
        const position1 = positions1[index1];
        const position2 = positions2[index2];
        min = Math.min(min, Math.abs(position1 - position2));
        
        if (position1 < position2) {
            index1++;
        } else {
            index2++;
        }
    }
    return min;
};
```

One pass:
```javascript
var shortestDistance = function(wordsDict, word1, word2) {
    let p1 = null, p2 = null;
    const same = word1 === word2;
    let min = Infinity;
    for (let i = 0; i < wordsDict.length; i++) {
        if (wordsDict[i] === word1) { p1 = i; }
        if (wordsDict[i] === word2) { p2 = i; }
        if (p1 !== null && p2 !== null) {
            min = Math.min(min, Math.abs(p1 - p2));
        }
    }
    return min;
}
```

<!-- @include ../leetcode/0244.shortest-word-distance-ii.md -->
### Shortest Word Distance II
[244. Shortest Word Distance II](https://leetcode.com/problems/shortest-word-distance-ii/)

The core algorithm in this problem is to find min difference between values in two sorted arrays.
Example:

Array1: [1, 3, 10, 38]
Array2: [4, 9, 80, 100]

min distance = Math.abs(value1 from Array1 - value2 from Array2)

This can be solved by two pointers.

```javascript
var WordDistance = function(wordsDict) {
    this.map = new Map();
    for (let i = 0; i < wordsDict.length; i++) {
        const word = wordsDict[i];
        if (!this.map.has(word)) {
            this.map.set(word, []);
        }
        this.map.get(word).push(i);
    }
};

/** 
 * @param {string} word1 
 * @param {string} word2
 * @return {number}
 */
WordDistance.prototype.shortest = function(word1, word2) {
    const array1 = this.map.get(word1);
    const array2 = this.map.get(word2);
    let min = Infinity;

    let i1 = 0;
    let i2 = 0;

    while (i1 < array1.length && i2 < array2.length) {
        const position1 = array1[i1];
        const position2 = array2[i2];
        min = Math.min(min, Math.abs(position2 - position1));

        if (position1 < position2) {
            i1++;
        } else {
            i2++;
        }
    }
    return min;
};
```

<!-- @include ../leetcode/0245.shortest-word-distance-iii.md -->
### Shortest Word Distance III
[245. Shortest Word Distance III](https://leetcode.com/problems/shortest-word-distance-iii/)

```html
Given an array of strings wordsDict and two strings that already exist in the array word1 and word2, return the shortest distance between these two words in the list.

Note that word1 and word2 may be the same. It is guaranteed that they represent two individual words in the list.

Example 1:

Input: wordsDict = ["practice", "makes", "perfect", "coding", "makes"], word1 = "makes", word2 = "coding"
Output: 1
Example 2:

Input: wordsDict = ["practice", "makes", "perfect", "coding", "makes"], word1 = "makes", word2 = "makes"
Output: 3
```

HashMap Solution:

```javascript
var shortestWordDistance = function(wordsDict, word1, word2) {
    const map = new Map();
    for (let i = 0; i < wordsDict.length; i++) {
        if (!map.has(wordsDict[i])) { map.set(wordsDict[i], []); }
        map.get(wordsDict[i]).push(i);
    }
    
    let minDistance = Infinity;
    if (word1 === word2) {
        const positions = map.get(word1);
        for (let i = 1; i < positions.length; i++) {
            minDistance = Math.min(minDistance, Math.abs(positions[i] - positions[i - 1]));
        }
        return minDistance;
    }
    
    const positions1 = map.get(word1);
    const positions2 = map.get(word2);
    let index1 = 0, index2 = 0;

    while (index1 < positions1.length && index2 < positions2.length) {
        minDistance = Math.min(minDistance, Math.abs(positions2[index2] - positions1[index1]));
        if (positions2[index2] > positions1[index1]) {
            index1++;
        } else {
            index2++;
        }
    }
    return minDistance;
};
```
One-pass Solution:
```javascript
function shortestWordDistanceOnePass(words, word1, word2) {
    let p1 = null, p2 = null;
    const same = word1 === word2;
    let min = Infinity;
    for (let i = 0; i < words.length; i++) {
        if (same && words[i] === word1) {
            if (p1 === null) {
                p1 = i;
                continue;
            }
            min = Math.min(min, i - p1);
            p1 = i;
        } else {
            if (words[i] === word1) { p1 = i; }
            if (words[i] === word2) { p2 = i; }
            if (p1 !== null && p2 !== null) {
                min = Math.min(min, Math.abs(p1 - p2));
            }
        }
    }
    return min;
}
```


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

<!-- @include ../leetcode/0249.group-shifted-strings.md -->
### Group Shifted Strings
[249. Group Shifted Strings](https://leetcode.com/problems/group-shifted-strings/)
```html
Given a string, we can "shift" each of its letter to its successive letter, for example: "abc" -> "bcd". We can keep "shifting" which forms the sequence:

"abc" -> "bcd" -> ... -> "xyz"
Given a list of strings which contains only lowercase alphabets, group all strings that belong to the same shifting sequence.

For example, given: ["abc", "bcd", "acef", "xyz", "az", "ba", "a", "z"], Return:

[
  ["abc","bcd","xyz"],
  ["az","ba"],
  ["acef"],
  ["a","z"]
]
Note: For the return value, each inner list's elements must follow the lexicographic order.
```

```javascript
var groupStrings = function(strings) {
    const map = new Map();
    
    for (const string of strings) {
        const chars = string.split('');
        const normalizedCode = [];
        for (const char of chars) {
            let code = char.charCodeAt() - chars[0].charCodeAt();
            code = code >= 0 ? code : code + 26;
            normalizedCode.push(code);
        }
        const key = normalizedCode.join(',');
        if (!map.has(key)) { map.set(key, []); }
        map.get(key).push(string);
    }
    return [...map.values()];
};
```


<!-- @include ../leetcode/0380.insert-delete-getrandom-o1.md -->
## Insert Delete GetRandom O(1)
[380. Insert Delete GetRandom O(1)](https://leetcode.com/problems/insert-delete-getrandom-o1/)
```html
Implement the RandomizedSet class:

RandomizedSet() Initializes the RandomizedSet object.
bool insert(int val) Inserts an item val into the set if not present. Returns true if the item was not present, false otherwise.
bool remove(int val) Removes an item val from the set if present. Returns true if the item was present, false otherwise.
int getRandom() Returns a random element from the current set of elements (it's guaranteed that at least one element exists when this method is called). Each element must have the same probability of being returned.
 
Example 1:

Input
["RandomizedSet", "insert", "remove", "insert", "getRandom", "remove", "insert", "getRandom"]
[[], [1], [2], [2], [], [1], [2], []]
Output
[null, true, false, true, 2, true, false, 2]

Explanation
RandomizedSet randomizedSet = new RandomizedSet();
randomizedSet.insert(1); // Inserts 1 to the set. Returns true as 1 was inserted successfully.
randomizedSet.remove(2); // Returns false as 2 does not exist in the set.
randomizedSet.insert(2); // Inserts 2 to the set, returns true. Set now contains [1,2].
randomizedSet.getRandom(); // getRandom() should return either 1 or 2 randomly.
randomizedSet.remove(1); // Removes 1 from the set, returns true. Set now contains [2].
randomizedSet.insert(2); // 2 was already in the set, so return false.
randomizedSet.getRandom(); // Since 2 is the only number in the set, getRandom() will always return 2.
```
```javascript
var RandomizedSet = function() {
    this.arr = [];
    this.map = new Map();
};
RandomizedSet.prototype.insert = function(val) {
    if (!this.map.has(val)) {
        this.arr.push(val);
        this.map.set(val, this.arr.length - 1);
        return true;
    }
    return false;
};
RandomizedSet.prototype.remove = function(val) {
    if (this.map.has(val)) {
        const ind = this.map.get(val);
        this.map.delete(val);
        const lastInd = this.arr.length - 1;
        this.arr[ind] = this.arr[lastInd];
        this.arr.pop();
        this.map.set(this.arr[ind], ind)
        return true;
    }
    return false;
};
RandomizedSet.prototype.getRandom = function() {
    const ind = Math.floor(Math.random() * this.arr.length);
    return this.arr[ind];
};
```

