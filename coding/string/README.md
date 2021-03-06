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
    * [Isomorphic Strings](#isomorphic-strings)
    * [Valid Anagram](#Valid-Anagram)
    * [Palindromic Substrings](#palindromic-substrings)
    * [8. 判断一个整数是否是回文数](#8-判断一个整数是否是回文数)
    * [9. 统计二进制字符串中连续 1 和连续 0 数量相同的子字符串个数](#9-统计二进制字符串中连续-1-和连续-0-数量相同的子字符串个数)
    * [Repeated Substring Pattern](#Repeated-Substring-Pattern)
    * [Long Pressed Name](#Long-Pressed-Name)
    * [Group Shifted Strings](#group-shifted-strings)
    * [Goat Latin](#goat-latin)
    * [Strobogrammatic Number](#strobogrammatic-number)
    * [Strobogrammatic Number II](#strobogrammatic-number-ii)
    * [Repeated DNA Sequences](#repeated-dna-sequences)
    * [Reverse Words in a String](#reverse-words-in-a-string)
    * [Rotate String](#rotate-string)
    * [Check if One String Swap Can Make Strings Equal](#check-if-one-string-swap-can-make-strings-equal)

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

<!-- @include ../leetcode/0205.isomorphic-strings.md -->
### Isomorphic Strings
[205. Isomorphic Strings](https://leetcode.com/problems/isomorphic-strings/)

```html
Given two strings s and t, determine if they are isomorphic.

Two strings s and t are isomorphic if the characters in s can be replaced to get t.

All occurrences of a character must be replaced with another character while preserving the order of characters. No two characters may map to the same character, but a character may map to itself.

Example 1:
Input: s = "egg", t = "add"
Output: true

Example 2:
Input: s = "foo", t = "bar"
Output: false

Example 3:
Input: s = "paper", t = "title"
Output: true
```

```javascript
var isIsomorphic = function(s, t) {
    if (!s || !t || s.length != t.length) {
        return false;
    }
    
    const mapS = new Map();
    const mapT = new Map();
    for (let i = 0; i < s.length; i++) {
        if (mapS.get(s[i]) !== mapT.get(t[i])) {
            return false;
        }
        mapS.set(s[i], i);
        mapT.set(t[i], i);
    }
    return true;
};
```

<!-- @include ../leetcode/0647.palindromic-substrings.md -->
### Palindromic Substrings
[647. Palindromic Substrings](https://leetcode.com/problems/palindromic-substrings/)

```html
Given a string s, return the number of palindromic substrings in it.

A string is a palindrome when it reads the same backward as forward.

A substring is a contiguous sequence of characters within the string.

Example 1:
Input: s = "abc"
Output: 3
Explanation: Three palindromic strings: "a", "b", "c".

Example 2:
Input: s = "aaa"
Output: 6
Explanation: Six palindromic strings: "a", "a", "a", "aa", "aa", "aaa".
```

```javascript
var countSubstrings = function(s) {
    let count = 0;
    for (let i = 0; i < s.length; i++) {
        count += countSubstringsHelper(s, i, i);
        count += countSubstringsHelper(s, i, i + 1);
    }
    return count;
    
};
function countSubstringsHelper(s, low, high) {
    let count = 0;
    while (low >= 0 && high <= s.length - 1) {
        if (s[low] !== s[high]) { break; }
        count++;
        low--;
        high++;
    }
    return count;
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


<!-- @include ../leetcode/0824.goat-latin.md -->
### Goat Latin
[824. Goat Latin](https://leetcode.com/problems/goat-latin/)
```html
A sentence S is given, composed of words separated by spaces. Each word consists of lowercase and uppercase letters only.

We would like to convert the sentence to "Goat Latin" (a made-up language similar to Pig Latin.)

The rules of Goat Latin are as follows:

If a word begins with a vowel (a, e, i, o, or u), append "ma" to the end of the word.
For example, the word 'apple' becomes 'applema'.
 
If a word begins with a consonant (i.e. not a vowel), remove the first letter and append it to the end, then add "ma".
For example, the word "goat" becomes "oatgma".
 
Add one letter 'a' to the end of each word per its word index in the sentence, starting with 1.
For example, the first word gets "a" added to the end, the second word gets "aa" added to the end and so on.
Return the final sentence representing the conversion from S to Goat Latin. 
Example 1:

Input: "I speak Goat Latin"
Output: "Imaa peaksmaaa oatGmaaaa atinLmaaaaa"
Example 2:

Input: "The quick brown fox jumped over the lazy dog"
Output: "heTmaa uickqmaaa rownbmaaaa oxfmaaaaa umpedjmaaaaaa overmaaaaaaa hetmaaaaaaaa azylmaaaaaaaaa ogdmaaaaaaaaaa"
```

```javascript
var toGoatLatin = function(S) {
    let words = S.split(' ');
    let vowels = new Set(['a', 'e', 'i', 'o', 'u']);
    let ending = 'a';
    
    for (let i = 0; i < words.length; i++) {
        if (vowels.has(words[i].substring(0, 1).toLowerCase())) {
            words[i] += 'ma' + ending;
        } else {
            words[i] = words[i].substring(1, words[i].length) + words[i].substring(0, 1) + 'ma' + ending;
        }
        ending += 'a';
    }
    return words.join(' ');
};
```

<!-- @include ../leetcode/0247.strobogrammatic-number.md -->
### 246. Strobogrammatic Number
[246. Strobogrammatic Number](https://leetcode.com/problems/strobogrammatic-number/)
```html
A strobogrammatic number is a number that looks the same when rotated 180 degrees (looked at upside down).

Write a function to determine if a number is strobogrammatic. The number is represented as a string.

For example, the numbers "69", "88", and "818" are all strobogrammatic.
```

```javascript
var isStrobogrammatic = function(num) {
    let upsideDowns = {
        '1' : '1',
        '6' : '9',
        '8' : '8',
        '9' : '6',
        '0' : '0'
    }
    for (let i = 0, j = num.length -1; i < num.length; i++, j--){
        if (upsideDowns[num[i]] != num[j]) {
            return false
        }
    }
    return true;
};
```


<!-- @include ../leetcode/0247.strobogrammatic-number-ii.md -->
### Strobogrammatic Number II
[247. Strobogrammatic Number II](https://leetcode.com/problems/strobogrammatic-number-ii/)
```html
A strobogrammatic number is a number that looks the same when rotated 180 degrees (looked at upside down).

Find all strobogrammatic numbers that are of length = n.

For example,
Given n = 2, return["11","69","88","96"].
```

```javascript
var findStrobogrammatic = function(n) {
    return findStrobogrammaticRecursive(n);
};
function findStrobogrammaticRecursive(len, n) {
    if (len === 0) { return ['']; }
    if (len === 1) { return ['0', '1', '8']; }
    let prevNums = findStrobogrammaticRecursive(len - 2);

    const res = [];
    for (let num of prevNums) {
        if (len !== n) { res.push('0' + num + '0'); }
        res.push('1' + num + '1');
        res.push('6' + num + '9');
        res.push('8' + num + '8');
        res.push('9' + num + '6');
    }
    return res;
}
```

<!-- @include ../leetcode/0187.repeated-dna-sequences.md -->
### Repeated DNA Sequences
[187. Repeated DNA Sequences](https://leetcode.com/problems/repeated-dna-sequences/)
```html
The DNA sequence is composed of a series of nucleotides abbreviated as 'A', 'C', 'G', and 'T'.

For example, "ACGAATTCCG" is a DNA sequence.
When studying DNA, it is useful to identify repeated sequences within the DNA.

Given a string s that represents a DNA sequence, return all the 10-letter-long sequences (substrings) that occur more than once in a DNA molecule. You may return the answer in any order.

Example 1:

Input: s = "AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT"
Output: ["AAAAACCCCC","CCCCCAAAAA"]
Example 2:

Input: s = "AAAAAAAAAAAAA"
Output: ["AAAAAAAAAA"]
```

```javascript
var findRepeatedDnaSequences = function(s) {
    const seen = new Set();
    const repeated = new Set();

    for (let i = 0; i < s.length - 9; i++) {
        const seq = s.substr(i, 10);
        if (seen.has(seq)) { repeated.add(seq); }
        seen.add(seq);
    }

    return [...repeated];
};
```

<!-- @include ../leetcode/0151.reverse-words-in-a-string.md -->
### Reverse Words in a String
[151. Reverse Words in a String](https://leetcode.com/problems/reverse-words-in-a-string/)

```html
Given an input string s, reverse the order of the words.

A word is defined as a sequence of non-space characters. The words in s will be separated by at least one space.

Return a string of the words in reverse order concatenated by a single space.
Note that s may contain leading or trailing spaces or multiple spaces between two words. The returned string should only have a single space separating the words. Do not include any extra spaces.

Example 1:
Input: s = "the sky is blue"
Output: "blue is sky the"

Example 2:
Input: s = "  hello world  "
Output: "world hello"
Explanation: Your reversed string should not contain leading or trailing spaces.

Example 3:
Input: s = "a good   example"
Output: "example good a"
Explanation: You need to reduce multiple spaces between two words to a single space in the reversed string.

Example 4:
Input: s = "  Bob    Loves  Alice   "
Output: "Alice Loves Bob"

Example 5:
Input: s = "Alice does not even like bob"
Output: "bob like even not does Alice"
```

```javascript
var reverseWords = function(s) {
    const newS = s.split(' ').filter(c => !!c);
    let left = 0, right = newS.length - 1;
    while (left < right) {
        const t = newS[left];
        newS[left] = newS[right];
        newS[right] = t;
        left++;
        right--;
    }
    return newS.join(' ');
};
```

<!-- @include ../leetcode/0796.rotate-string.md -->
### Rotate String
[796. Rotate String](https://leetcode.com/problems/rotate-string/)

```html
We are given two strings, A and B.

A shift on A consists of taking string A and moving the leftmost character to the rightmost position. For example, if A = 'abcde', then it will be 'bcdea' after one shift on A. Return True if and only if A can become B after some number of shifts on A.

Example 1:
Input: A = 'abcde', B = 'cdeab'
Output: true

Example 2:
Input: A = 'abcde', B = 'abced'
Output: false
```

Simple Check:
```javascript
var rotateString = function(A, B) {
    return A.length === B.length && `${A}${A}`.indexOf(B) !== -1;
};
```

<!-- @include ../leetcode/1790.check-if-one-string-swap-can-make-strings-equal.md -->
### Check if One String Swap Can Make Strings Equal
[1790. Check if One String Swap Can Make Strings Equal](https://leetcode.com/problems/check-if-one-string-swap-can-make-strings-equal/)

```html
You are given two strings s1 and s2 of equal length. A string swap is an operation where you choose two indices in a string (not necessarily different) and swap the characters at these indices.

Return true if it is possible to make both strings equal by performing at most one string swap on exactly one of the strings. Otherwise, return false.

Example 1:

Input: s1 = "bank", s2 = "kanb"
Output: true
Explanation: For example, swap the first character with the last character of s2 to make "bank".

Example 2:
Input: s1 = "attack", s2 = "defend"
Output: false
Explanation: It is impossible to make them equal with one string swap.

Example 3:
Input: s1 = "kelb", s2 = "kelb"
Output: true
Explanation: The two strings are already equal, so no string swap operation is required.

Example 4:
Input: s1 = "abcd", s2 = "dcba"
Output: false
```

```javascript
var areAlmostEqual = function(s1, s2) {
    if (s1.length !== s2.length) { return false; }
    if (s1 === s2) { return true; }
    
    let indices = [];
    for (let i = 0; i < s1.length; i++) {
        if (s1[i] !== s2[i]) { indices.push(i); }
        if (indices.length > 2) { return false; }
    }

    if (s1[indices[1]] === s2[indices[0]] && s1[indices[0]] === s2[indices[1]]) {
        return true;
    }
    return false;    
};
```

