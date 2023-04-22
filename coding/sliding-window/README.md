# Sliding Window
<!-- GFM-TOC -->
* [Sliding Window](#sliding-window)
    * [Simple Sliding Window](#Simple-Sliding-Window)
        * [Window Sum](#Window-Sum)
        * [Find the Index of the First Occurrence in a String](#Find-the-Index-of-the-First-Occurrence-in-a-String)
    * [Sliding Window + HashMap](#Sliding-window--Hashmap)
        * [Longest Substring with At Most K Distinct Characters](#Longest-Substring-with-At-Most-K-Distinct-Characters)
        * [Minimum Window Substring](Minimum-Window-Substring)
    * [Subarray Product Less Than K](#subarray-product-less-than-k)
<!-- GFM-TOC -->

## Sliding Window
```javascript
let left = 0;
for (let right = 0; right < length; right++) {
    ... // apply logic to decide how to move the window.
    left++; // move window
}
```

## Slinding Window + HashMap
```javascript
const map = new Map();
let start = 0;
for (let i = 0; i < s.length; i++) {
    map.set(s[i], (map.get(s[i]) || 0) + 1);
    ... // logic there to decide how to move windows and calculate values in Map
    start++; // move window
}
```
## Simple Sliding Window

<!-- @include ../leetcode/L604.window-sum.md -->
### Window Sum
[604. Window Sum] (https://www.lintcode.com/problem/604/description)

```html
Given an array of n integers, and a moving window(size k), move the window at each iteration from the start of the array, find the sum of the element inside the window at each moving.

Example 1

Input：array = [1,2,7,8,5], k = 3
Output：[10,17,20]
Explanation：
1 + 2 + 7 = 10
2 + 7 + 8 = 17
7 + 8 + 5 = 20
```

```javascript
  winSum(nums, k) {
    // write your code here
    if (nums == null || nums.length < k || k <= 0) {
        return [];
    }

    const sums = Array(nums.length - k + 1).fill(0);
    for (let i = 0; i < k; i++) {
        sums[0] += nums[i];
    }

    for (let i = 1; i < sums.length; i++) {
        sums[i] = sums[i - 1] - nums[i - 1] + nums[i + k - 1];
    }

    return sums;
  }
```
<!-- @include-end ../leetcode/L604.window-sum.md -->

<!-- @include ../leetcode/0028.find-the-index-of-the-first-occurrence-in-a-string.md -->
### Find the Index of the First Occurrence in a String
[28. Find the Index of the First Occurrence in a String](https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string)

```html
Given two strings needle and haystack, return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.

Example 1:

Input: haystack = "sadbutsad", needle = "sad"
Output: 0
Explanation: "sad" occurs at index 0 and 6.
The first occurrence is at index 0, so we return 0.
Example 2:

Input: haystack = "leetcode", needle = "leeto"
Output: -1
Explanation: "leeto" did not occur in "leetcode", so we return -1.
```

```java
class Solution {
    public int strStr(String haystack, String needle) {
        int haystackLen = haystack.length();
        int needleLen = needle.length();

        if (needleLen == 0) {
            return 0;
        }

        if (haystackLen < needleLen) {
            return -1;
        }

        for (int windowStart = 0; windowStart <= haystackLen - needleLen; windowStart++) {
            for (int j = 0; j < needleLen; j++) {
                if (haystack.charAt(windowStart + j) != needle.charAt(j)) {
                    break;
                }
                if (j == needleLen - 1) {
                    return windowStart;
                }
            }
        }

        return -1;
    }
}
```

<!-- @include ../leetcode/0340.longest-substring-with-at-most-k-distinct-characters.md -->
### Longest Substring with At Most K Distinct Characters
[340. Longest Substring with At Most K Distinct Characters](https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/)

```html
Given a string s and an integer k, return the length of the longest substring of s that contains at most k distinct characters.

Example 1:
Input: s = "eceba", k = 2
Output: 3
Explanation: The substring is "ece" with length 3.

Example 2:

Input: s = "aa", k = 1
Output: 2
Explanation: The substring is "aa" with length 2.
```

```javascript
var lengthOfLongestSubstringKDistinct = function(s, k) {
    const map = new Map();
    let start = 0;
    let maxLen = 0;
    
    for (let i = 0; i < s.length; i++) {
        map.set(s[i], (map.get(s[i]) || 0) + 1);
        
        if (map.size <= k) {
            maxLen = Math.max(maxLen, i - start + 1);
        } else {
            map.set(s[start], map.get(s[start]) - 1);
            if (map.get(s[start]) === 0) { map.delete(s[start]); }
            start++;
        }
    }
    return maxLen;
};
```

<!-- @include ../leetcode/0076.minimum-window-substring.md -->
### Minimum Window Substring
[76. Minimum Window Substring](https://leetcode.com/problems/minimum-window-substring/)

```html
Given two strings s and t, return the minimum window in s which will contain all the characters in t. If there is no such window in s that covers all characters in t, return the empty string "".

Note that If there is such a window, it is guaranteed that there will always be only one unique minimum window in s.

Example 1:
Input: s = "ADOBECODEBANC", t = "ABC"
Output: "BANC"

Example 2:
Input: s = "a", t = "a"
Output: "a"
```

```javascript
var minWindow = function(s, t) {
    let map = new Map();
    t.split('').forEach(c => map.set(c, (map.get(c) || 0) + 1));

    let count = t.length;   // remaining matching count

    let l = 0;
    let output = '';
    let minLen = Infinity;

    for (let r = 0; r < s.length; r++) {
        if (map.has(s[r])) {
            if (map.get(s[r]) > 0) { count--; }
            map.set(s[r], map.get(s[r]) - 1);
        }

        while (count === 0) {   // valid
            if (r - l + 1 < minLen) {
                minLen = r - l + 1;
                output = s.substr(l, minLen);
            }
            
            if (map.has(s[l])) {
                if (map.get(s[l]) === 0) { count++; } // make it invalid
                map.set(s[l], map.get(s[l]) + 1);
            }
            l++;
        }
    }
    return output;
};
```

<!-- @include ../leetcode/0713.subarray-product-less-than-k.md -->
### Subarray Product Less Than K
[713. Subarray Product Less Than K](https://leetcode.com/problems/subarray-product-less-than-k/)

```html
Your are given an array of positive integers nums.

Count and print the number of (contiguous) subarrays where the product of all the elements in the subarray is less than k.

Example 1:
Input: nums = [10, 5, 2, 6], k = 100
Output: 8
Explanation: The 8 subarrays that have product less than 100 are: [10], [5], [2], [6], [10, 5], [5, 2], [2, 6], [5, 2, 6].
Note that [10, 5, 2] is not included as the product of 100 is not strictly less than k.
```

```javascript
var numSubarrayProductLessThanK = function(nums, k) {
    if (k <= 1) { return 0;}
    let product = 1, left = 0, res = 0;
    for (let right = 0; right < nums.length; right++) {
        product *= nums[right];
        while (product >= k) {
            product /= nums[left];
            left++;
        }
        res += right - left + 1;
    }
    return res;
};
```

