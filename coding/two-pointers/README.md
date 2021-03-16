# Two Pointers
<!-- GFM-TOC -->
* [Two Pointers](#leetcode-题解---双指针)
    * [Two Sum II](#two-sum-ii)
    * [Sum of Square Numbers](#Sum-of-Square-Numbers)
    * [Reverse Vowels of a String](#Reverse-Vowels-of-a-String)
    * [Valid Palindrome II](#Valid-Palindrome-II)
    * [Merge Sorted Array](#Merge-Sorted-Array)
    * [Linked List Cycle](#Linked-List-Cycle)
    * [7. 最长子序列](#7-最长子序列)
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
public boolean hasCycle(ListNode head) {
    if (head == null) {
        return false;
    }
    ListNode l1 = head, l2 = head.next;
    while (l1 != null && l2 != null && l2.next != null) {
        if (l1 == l2) {
            return true;
        }
        l1 = l1.next;
        l2 = l2.next.next;
    }
    return false;
}
```

## 7. 最长子序列

524\. Longest Word in Dictionary through Deleting (Medium)

[Leetcode](https://leetcode.com/problems/longest-word-in-dictionary-through-deleting/description/) / [力扣](https://leetcode-cn.com/problems/longest-word-in-dictionary-through-deleting/description/)

```
Input:
s = "abpcplea", d = ["ale","apple","monkey","plea"]

Output:
"apple"
```

题目描述：删除 s 中的一些字符，使得它构成字符串列表 d 中的一个字符串，找出能构成的最长字符串。如果有多个相同长度的结果，返回字典序的最小字符串。

通过删除字符串 s 中的一个字符能得到字符串 t，可以认为 t 是 s 的子序列，我们可以使用双指针来判断一个字符串是否为另一个字符串的子序列。

```java
public String findLongestWord(String s, List<String> d) {
    String longestWord = "";
    for (String target : d) {
        int l1 = longestWord.length(), l2 = target.length();
        if (l1 > l2 || (l1 == l2 && longestWord.compareTo(target) < 0)) {
            continue;
        }
        if (isSubstr(s, target)) {
            longestWord = target;
        }
    }
    return longestWord;
}

private boolean isSubstr(String s, String target) {
    int i = 0, j = 0;
    while (i < s.length() && j < target.length()) {
        if (s.charAt(i) == target.charAt(j)) {
            j++;
        }
        i++;
    }
    return j == target.length();
}
```
