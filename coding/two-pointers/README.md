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
    * [Trapping Rain Water](#trapping-rain-water)
    * [Shortest Word Distance II](../leetcode.md#shortest-word-distance-ii)
* Three Pointers
    * [Valid Triangle Number](#valid-triangle-number)
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
<!-- @include ../leetcode/0042.trapping-rain-water.md -->
### Trapping Rain Water
[42. Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water/)
```html
Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

Example 1:

Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6
Explanation: The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.
Example 2:

Input: height = [4,2,0,3,2,5]
Output: 9
```

Dynamic Programming solution:
```javascript
var trap = function(height) {
    if (!height) { return 0; }
    
    let len = height.length;
    let leftMax = [], rightMax = [];
    
    leftMax[0] = height[0];
    rightMax[len - 1] = height[len - 1];
    
    for (let i = 1; i < len; i++) {
        leftMax[i] = Math.max(height[i], leftMax[i - 1])
    }
    for (let i = len - 2; i >= 0; i--) {
        rightMax[i] = Math.max(height[i], rightMax[i + 1]);
    }
    
    let totalWater = 0;
    for (let i = 0; i < len; i++) {
        let water = Math.min(leftMax[i], rightMax[i]) - height[i];
        totalWater += water;
    }
    return totalWater;
};
```

Two Pointer solution:
```javascript
var trap = function(height) {
    if (!height || height.length === 0 || height.length === 1) {
        return 0;
    }

    let i = 0, j = height.length - 1;
    let maxR = -Infinity, maxL = -Infinity;
    let totalWater = 0;

    while (i < j) {
        if (height[i] < height[j]) {
            if (height[i] >= maxL) {
                maxL = height[i];
            } else {
                totalWater += height[i] - maxL;
            }
            i++;
        } else {
            if (height[j] >= maxR) {
                maxR = height[j];
            } else {
                totalWater += height[j] - maxR;
            }
            j--;
        }
    }
    return Math.abs(totalWater);
};
```


<!-- @include ../leetcode/0611.valid-triangle-number.md -->
## Valid Triangle Number
[611. Valid Triangle Number](https://leetcode.com/problems/valid-triangle-number/)
```
Given an array consists of non-negative integers, your task is to count the number of triplets chosen from the array that can make triangles if we take them as side lengths of a triangle.
Example 1:
Input: [2,2,3,4]
Output: 3
Explanation:
Valid combinations are: 
2,3,4 (using the first 2)
2,3,4 (using the second 2)
2,2,3
```
```javascript
var triangleNumber = function(nums) {
    if (nums.length < 3) { return 0; }
    
    nums.sort((a, b) => a - b);

    let res = 0;
    for (let i = nums.length - 1; i >= 0; i--) {
        let left = 0, right = i - 1;
        while (left < right) {
            if (nums[left] + nums[right] > nums[i]) {
                res += right - left;
                right--;
            } else {
                left++;
            }
        }
    }
    return res;
};
```