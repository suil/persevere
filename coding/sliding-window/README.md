# Sliding Window
<!-- GFM-TOC -->
* [Sliding Window](#sliding-window)
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

### Slinding Window + HashMap
```javascript
const map = new Map();
let start = 0;
for (let i = 0; i < s.length; i++) {
    map.set(s[i], (map.get(s[i]) || 0) + 1);
    ... // logic there to decide how to move windows and calculate values in Map
    start++; // move window
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
