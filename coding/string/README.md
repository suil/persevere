# String
<!-- GFM-TOC -->
* [String](#string)
    * [String Custom Sorting](#String-Custom-Sorting)
        * [Verifying an Alien Dictionary](#Verifying-an-Alien-Dictionary)
    * [Sliding Window + HashMap](#Sliding-window--Hashmap)
        * [Longest Substring with At Most K Distinct Characters](#Longest-Substring-with-At-Most-K-Distinct-Characters)
        * [Minimum Window Substring](Minimum-Window-Substring)
    * [1. 字符串循环移位包含](#1-字符串循环移位包含)
    * [2. 字符串循环移位](#2-字符串循环移位)
    * [3. 字符串中单词的翻转](#3-字符串中单词的翻转)
    * [4. 两个字符串包含的字符是否完全相同](#4-两个字符串包含的字符是否完全相同)
    * [5. 计算一组字符集合可以组成的回文字符串的最大长度](#5-计算一组字符集合可以组成的回文字符串的最大长度)
    * [Valid Anagram](#Valid-Anagram)
    * [7. 回文子字符串个数](#7-回文子字符串个数)
    * [8. 判断一个整数是否是回文数](#8-判断一个整数是否是回文数)
    * [9. 统计二进制字符串中连续 1 和连续 0 数量相同的子字符串个数](#9-统计二进制字符串中连续-1-和连续-0-数量相同的子字符串个数)
    * [Repeated Substring Pattern](#Repeated-Substring-Pattern)
    * [Long Pressed Name](#Long-Pressed-Name)
    * [Group Shifted Strings](../leetcode.md#group-shifted-strings)
    * [Goat Latin](../leetcode.md#goat-latin)
    * [Strobogrammatic Number](../leetcode.md#strobogrammatic-number)
    * [Strobogrammatic Number II](../leetcode.md#strobogrammatic-number-ii)
<!-- GFM-TOC -->


### 1. 字符串循环移位包含

[编程之美 3.1](#)

```html
s1 = AABCD, s2 = CDAA
Return : true
```

给定两个字符串 s1 和 s2，要求判定 s2 是否能够被 s1 做循环移位得到的字符串包含。

s1 进行循环移位的结果是 s1s1 的子字符串，因此只要判断 s2 是否是 s1s1 的子字符串即可。

### 2. 字符串循环移位

[编程之美 2.17](#)

```html
s = "abcd123" k = 3
Return "123abcd"
```

将字符串向右循环移动 k 位。

将 abcd123 中的 abcd 和 123 单独翻转，得到 dcba321，然后对整个字符串进行翻转，得到 123abcd。

### 3. 字符串中单词的翻转

[程序员代码面试指南](#)

```html
s = "I am a student"
Return "student a am I"
```

将每个单词翻转，然后将整个字符串翻转。

## String Custom Sorting
```javascript
function compare(word1, word2, orderMap) {
    const k = Math.min(word1.length, word2.length);
    for (let i = 0; i < k; i++) {
        if (word1[i] !== word2[i]) {
            if (/* custom comparison rule when word1[i] > word2[i] */) {
                return 1;
            }
            if (/* custom comparison rule when word1[i] < word2[i] */) {
                return -1;
            }
            break;
        }
    }
    // equal case need to go in the end
    if (word1.length === word2.length) {
        return 0;
    }
    if (word1.length > word2.length) { return 1; }
    if (word1.length < word2.length) { return -1; }
}
```

### Verifying an Alien Dictionary
[953. Verifying an Alien Dictionary](https://leetcode.com/problems/verifying-an-alien-dictionary/)
```javascript
var isAlienSorted = function(words, order) {
    const orderMap = new Map();
    for (let i = 0; i < order.length; i++) {
        orderMap.set(order[i], i);
    }
    
    for (let i = 1; i < words.length; i++) {
        if (compare(words[i - 1], words[i], orderMap) > 0) {
            return false;
        }
    }
    return true;
};
function compare(word1, word2, orderMap) {
    const k = Math.min(word1.length, word2.length);
    for (let i = 0; i < k; i++) {
        if (word1[i] !== word2[i]) {
            if (orderMap.get(word1[i]) > orderMap.get(word2[i])) {
                return 1;
            }
            if (orderMap.get(word1[i]) < orderMap.get(word2[i])) {
                return -1;
            }
            break;
        }
    }
    if (word1.length === word2.length) {
        return 0;
    }
    if (word1.length > word2.length) { return 1; }
    if (word1.length < word2.length) { return -1; }
}
```

## Sliding Window + HashMap
Sliding window plus HashMap is a powerful tool to solve problems.

```javascript
const map = new Map();
let start = 0;
for (let i = 0; i < s.length; i++) {
    map.set(s[i], (map.get(s[i]) || 0) + 1);
    ... // logic there to decide how to move windows and calculate values in Map
    start++; // move window
}
```

### Longest Substring with At Most K Distinct Characters
[340. Longest Substring with At Most K Distinct Characters](https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/)
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

### Minimum Window Substring
[76. Minimum Window Substring](https://leetcode.com/problems/minimum-window-substring/)
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
### Valid Anagram
[242. Valid Anagram](https://leetcode.com/problems/valid-anagram/description/)
```javascript
var isAnagram = function(s, t) {
    if (s.length !== t.length) { return false; }
    const map = new Map();
    for (let i = 0; i < s.length; i++) {
        map.set(s[i], (map.get(s[i]) || 0) + 1);
        map.set(t[i], (map.get(t[i]) || 0) - 1);
    }
    for (const [char, count] of map) {
        if (count !== 0) { return false; }
    }
    return true;
}
```

### 5. 计算一组字符集合可以组成的回文字符串的最大长度

409\. Longest Palindrome (Easy)

[Leetcode](https://leetcode.com/problems/longest-palindrome/description/) / [力扣](https://leetcode-cn.com/problems/longest-palindrome/description/)

```html
Input : "abccccdd"
Output : 7
Explanation : One longest palindrome that can be built is "dccaccd", whose length is 7.
```

使用长度为 256 的整型数组来统计每个字符出现的个数，每个字符有偶数个可以用来构成回文字符串。

因为回文字符串最中间的那个字符可以单独出现，所以如果有单独的字符就把它放到最中间。

```java
public int longestPalindrome(String s) {
    int[] cnts = new int[256];
    for (char c : s.toCharArray()) {
        cnts[c]++;
    }
    int palindrome = 0;
    for (int cnt : cnts) {
        palindrome += (cnt / 2) * 2;
    }
    if (palindrome < s.length()) {
        palindrome++;   // 这个条件下 s 中一定有单个未使用的字符存在，可以把这个字符放到回文的最中间
    }
    return palindrome;
}
```

### 6. 字符串同构

205\. Isomorphic Strings (Easy)

[Leetcode](https://leetcode.com/problems/isomorphic-strings/description/) / [力扣](https://leetcode-cn.com/problems/isomorphic-strings/description/)

```html
Given "egg", "add", return true.
Given "foo", "bar", return false.
Given "paper", "title", return true.
```

记录一个字符上次出现的位置，如果两个字符串中的字符上次出现的位置一样，那么就属于同构。

```java
public boolean isIsomorphic(String s, String t) {
    int[] preIndexOfS = new int[256];
    int[] preIndexOfT = new int[256];
    for (int i = 0; i < s.length(); i++) {
        char sc = s.charAt(i), tc = t.charAt(i);
        if (preIndexOfS[sc] != preIndexOfT[tc]) {
            return false;
        }
        preIndexOfS[sc] = i + 1;
        preIndexOfT[tc] = i + 1;
    }
    return true;
}
```

### 7. 回文子字符串个数

647\. Palindromic Substrings (Medium)

[Leetcode](https://leetcode.com/problems/palindromic-substrings/description/) / [力扣](https://leetcode-cn.com/problems/palindromic-substrings/description/)

```html
Input: "aaa"
Output: 6
Explanation: Six palindromic strings: "a", "a", "a", "aa", "aa", "aaa".
```

从字符串的某一位开始，尝试着去扩展子字符串。

```java
private int cnt = 0;

public int countSubstrings(String s) {
    for (int i = 0; i < s.length(); i++) {
        extendSubstrings(s, i, i);     // 奇数长度
        extendSubstrings(s, i, i + 1); // 偶数长度
    }
    return cnt;
}

private void extendSubstrings(String s, int start, int end) {
    while (start >= 0 && end < s.length() && s.charAt(start) == s.charAt(end)) {
        start--;
        end++;
        cnt++;
    }
}
```

### 8. 判断一个整数是否是回文数

9\. Palindrome Number (Easy)

[Leetcode](https://leetcode.com/problems/palindrome-number/description/) / [力扣](https://leetcode-cn.com/problems/palindrome-number/description/)

要求不能使用额外空间，也就不能将整数转换为字符串进行判断。

将整数分成左右两部分，右边那部分需要转置，然后判断这两部分是否相等。

```java
public boolean isPalindrome(int x) {
    if (x == 0) {
        return true;
    }
    if (x < 0 || x % 10 == 0) {
        return false;
    }
    int right = 0;
    while (x > right) {
        right = right * 10 + x % 10;
        x /= 10;
    }
    return x == right || x == right / 10;
}
```

### 9. 统计二进制字符串中连续 1 和连续 0 数量相同的子字符串个数

696\. Count Binary Substrings (Easy)

[Leetcode](https://leetcode.com/problems/count-binary-substrings/description/) / [力扣](https://leetcode-cn.com/problems/count-binary-substrings/description/)

```html
Input: "00110011"
Output: 6
Explanation: There are 6 substrings that have equal number of consecutive 1's and 0's: "0011", "01", "1100", "10", "0011", and "01".
```

```java
public int countBinarySubstrings(String s) {
    int preLen = 0, curLen = 1, count = 0;
    for (int i = 1; i < s.length(); i++) {
        if (s.charAt(i) == s.charAt(i - 1)) {
            curLen++;
        } else {
            preLen = curLen;
            curLen = 1;
        }

        if (preLen >= curLen) {
            count++;
        }
    }
    return count;
}
```

### Repeated Substring Pattern
[459. Repeated Substring Pattern](https://leetcode.com/problems/repeated-substring-pattern/)
```javascript
var repeatedSubstringPattern = function(s) {
    let pattern = '';
    for (let i = 0; i < Math.floor(s.length / 2); i++) {
        pattern += s[i];
        if (pattern.repeat(s.length / pattern.length) === s) return true;
    }
    return false;
};
```

### Long Pressed Name
[925. Long Pressed Name](https://leetcode.com/problems/long-pressed-name/)
```javascript
var isLongPressedName = function(name, typed) {
    if (name === typed) { return true; }
    if (name.length > typed.length) { return false; }

    let j = 0;
    for (let i = 0; i < typed.length; i++) {
        if (typed[i] === name[j]) {
           j++;
        } else if (typed[i] === name[j - 1]) {
            continue;
        } else {
            return false;
        }
    }
    return j === name.length;
};
```

### Find All Anagrams in a String
[438. Find All Anagrams in a String](https://leetcode.com/problems/find-all-anagrams-in-a-string/)
```javascript
var findAnagrams = function(s, p) {
    const size = p.length;
    const output = [];
    const mapP = new Map();
    for (let i = 0; i < p.length; i++) {
        mapP.set(p[i], (mapP.get(p[i]) || 0) + 1);
    }
    const mapS = new Map();
    for (let i = 0; i < s.length; i++) {
        mapS.set(s[i], (mapS.get(s[i]) || 0) + 1);
        if (compareMap(mapS, mapP)) {
            output.push(i - size + 1);
        }
        if (i >= size - 1) {
            mapS.set(s[i - size + 1], mapS.get(s[i - size + 1]) - 1);
            if (mapS.get(s[i - size + 1]) <= 0) {
                mapS.delete(s[i - size + 1]);
            }
        }
    }
    return output;
};
function compareMap(map1, map2) {
    if (map1.size !== map2.size) { return false; }
    for (const [key, val] of map1) {
        if (map2.get(key) !== val) { return false; }
    }
    return true;
}
```
