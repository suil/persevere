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
<!-- @include ../leetcode/0633.sum-of-square-numbers.md -->
### Two Sum Less Than K

[1099. Two Sum Less Than K](https://leetcode.com/problems/two-sum-less-than-k/)

```html
<pre>
Given an array nums of integers and integer k, return the maximum sum such that
there exists i &lt; j with nums[i] + nums[j] = sum and sum &gt; k. If no i, j exist
satisfying this equation, return -1. 

Example 1:

Input: nums = [34,23,1,24,75,33,54,8], k = 60 

Output: 58 Explanation: We can use 34 and 24 to
sum 58 which is less than 60. 

Example 2:
Input: nums = [10,20,30], k = 15
Output: -1 Explanation: In this case it is not possible to get a pair sum less
that 15.
</pre>
```

```javascript
var twoSumLessThanK = function (nums, k) {
  let i = 0;
  let j = nums.length - 1;
  let finalSum = -1;
  nums.sort((a, b) => a - b);

  while (i < j) {
    const sum = nums[i] + nums[j];
    if (sum >= k) {
      j--;
    } else {
      finalSum = Math.max(finalSum, sum);
      i++;
    }
  }

  return finalSum;
};
```

<!-- @include ../leetcode/0633.sum-of-square-numbers.md -->
### Sum of Square Numbers
[633. Sum of Square Numbers](https://leetcode.com/problems/sum-of-square-numbers/)

```html
Given a non-negative integer c, decide whether there're two integers a and b such that a2 + b2 = c.
```

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

<!-- @include ../leetcode/0088.merge-sorted-array.md -->
### Merge Sorted Array
[88. Merge Sorted Array](https://leetcode.com/problems/merge-sorted-array/description/)

```html
Given two sorted integer arrays nums1 and nums2, merge nums2 into nums1 as one sorted array.

The number of elements initialized in nums1 and nums2 are m and n respectively. You may assume that nums1 has a size equal to m + n such that it has enough space to hold additional elements from nums2.

Example 1:
Input: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
Output: [1,2,2,3,5,6]

Example 2:
Input: nums1 = [1], m = 1, nums2 = [], n = 0
Output: [1]
```

```javascript
var merge = function(nums1, m, nums2, n) {
    if (nums1.length === 0) {
        return nums1;
    }
    let index1 = m - 1, index2 = n - 1;
    let index = nums1.length - 1;
    
    while (index1 >= 0 || index2 >= 0) {
        if (index1 >= 0 && index2 >= 0) {
            if (nums1[index1] > nums2[index2]) {
                nums1[index--] = nums1[index1--];
            } else {
                nums1[index--] = nums2[index2--];
            }
        } else if (index1 >= 0) {
            nums1[index--] = nums1[index1--];
        } else if (index2 >= 0) {
            nums1[index--] = nums2[index2--];
        }
    }
    return nums1;
};
```

<!-- @include ../leetcode/0141.linked-list-cycle.md -->
### Linked List Cycle
[141. Linked List Cycle](https://leetcode.com/problems/linked-list-cycle/)

```html
Given head, the head of a linked list, determine if the linked list has a cycle in it.

There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter.

Return true if there is a cycle in the linked list. Otherwise, return false.

Example 1:

Input: head = [3,2,0,-4], pos = 1
Output: true
Explanation: There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).

Example 2:
Input: head = [1,2], pos = 0
Output: true
Explanation: There is a cycle in the linked list, where the tail connects to the 0th node.

Example 3:
Input: head = [1], pos = -1
Output: false
Explanation: There is no cycle in the linked list.
```

```javascript
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