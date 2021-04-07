# Two Pointers
<!-- GFM-TOC -->
* Two Pointers
    * [Two Sum II](#two-sum-ii)
    * [Sum of Square Numbers](#Sum-of-Square-Numbers)
    * [Reverse Vowels of a String](#Reverse-Vowels-of-a-String)
    * [Valid Palindrome II](#Valid-Palindrome-II)
    * [Merge Sorted Array](#Merge-Sorted-Array)
    * [Linked List Cycle](#Linked-List-Cycle)
    * [Longest Word in Dictionary through Deleting](#Longest-Word-in-Dictionary-through-Deleting)
    * [Trapping Rain Water](../leetcode.md#trapping-rain-water)
    * [Shortest Word Distance II](../leetcode.md#shortest-word-distance-ii)
<!-- GFM-TOC -->

Two-pointer is an efficent way to navigate in an array.
## Two Sum II

[167\. Two Sum II - Input array is sorted (Easy)](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/description/)

```javascript
var twoSum = function(numbers, target) {
    let i = 0;
    let j = numbers.length - 1;
    
    while (i < j) {
        const sum = numbers[i] + numbers[j];
        if (sum === target) {
            return [i + 1, j + 1];
        }
        if (sum > target) {
            j--;
        } else {
            i++
        }
    }
    
    return [-1, -1]
};
```

## Sum of Square Numbers

[633\. Sum of Square Numbers (Easy)](https://leetcode.com/problems/sum-of-square-numbers/description/)

```javascript
var judgeSquareSum = function(c) {
    let i = 0;
    let j = Math.ceil(Math.sqrt(c));
 
    while (i <= j) {
        const target = i * i + j * j;
        if (target === c) {
            return true;
        }
        if (target > c) {
            j--;
        } else {
            i++;
        }
    }
    
    return false;
}
```

## Reverse Vowels of a String

[345\. Reverse Vowels of a String (Easy)](https://leetcode.com/problems/reverse-vowels-of-a-string/description/)

```javascript
var reverseVowels = function(s) {
    const vowels = new Set(['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']);
    let i = 0;
    let j = s.length - 1;
    const output = [];
    
    while (i <= j) {
        const sj = s[j];
        const si = s[i];
        if (!vowels.has(si)) {
            output[i++] = si;
        } else if (!vowels.has(sj)) {
            output[j--] = sj;
        } else {
            output[i++] = sj;
            output[j--] = si;
        }
    }
    
    return output.join('');
};
```

## Valid Palindrome II

[680\. Valid Palindrome II (Easy)](https://leetcode.com/problems/valid-palindrome-ii/description/)

```javascript
var validPalindrome = function(s) {
    let i = 0, j = s.length - 1;
    
    while (i < j) {
        if (s[i] !== s[j]) {
            return isPalindrome(s, i, j - 1) || isPalindrome(s, i + 1, j);
        }
        i++;
        j--;
    }
    return true;
};

function isPalindrome(s, i, j) {
    while (i < j) {
        if (s[i++] != s[j--]) {
            return false;
        }
    }
    return true;
}
```

## Merge Sorted Array

[88\. Merge Sorted Array (Easy)](https://leetcode.com/problems/merge-sorted-array/description/)

```javascript
var merge = function(nums1, m, nums2, n) {
    let index1 = m - 1;
    let index2 = n - 1;
    let index = nums1.length - 1;
    
    while (index1 >= 0 || index2 >= 0) {
        if (index1 < 0) {
            nums1[index--] = nums2[index2--];
            continue;
        }
        if (index2 < 0) {
            nums1[index--] = nums1[index1--];
            continue;
        }
        
        if (nums1[index1] >= nums2[index2]) {
            nums1[index--] = nums1[index1--];
        } else {
            nums1[index--] = nums2[index2--];
        }
    }
};
```

## Linked List Cycle

[141\. Linked List Cycle (Easy)](https://leetcode.com/problems/linked-list-cycle/description/)

```java
var hasCycle = function(head) {
    if (!head) return false;
    
    let slowPointer = head;
    let fastPointer = head.next;
    
    while (slowPointer !== fastPointer) {
        if (!fastPointer || !fastPointer.next) {
            return false;
        }
        slowPointer = slowPointer.next;
        fastPointer = fastPointer.next.next;
    }
    
    return true;
};
```

## Longest Word in Dictionary through Deleting

[524\. Longest Word in Dictionary through Deleting (Medium)](https://leetcode.com/problems/longest-word-in-dictionary-through-deleting/description/)

```javascript
var findLongestWord = function(s, dictionary) {
    let output = '';
    for (const word of dictionary) {
        const isMatched = hasMatch(s, word);
        if (isMatched) {
            if (word.length > output.length) {
                output = word;
            } else if (word.length === output.length) {
                output = word < output ? word : output;
            }
        }
    }
    return output;
};

function hasMatch(s, word) {
    let sp = 0, wp = 0;
    
    while (sp < s.length && wp < word.length) {
        if (s[sp] === word[wp]) {
            wp++;
        }
        sp++;
    }
    
    return wp === word.length;
}
```
