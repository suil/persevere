

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
### Multiply Strings
[43. Multiply Strings](https://leetcode.com/problems/multiply-strings/)
```html
Given two non-negative integers num1 and num2 represented as strings, return the product of num1 and num2, also represented as a string.

Note: You must not use any built-in BigInteger library or convert the inputs to integer directly.

Example 1:

Input: num1 = "2", num2 = "3"
Output: "6"
Example 2:

Input: num1 = "123", num2 = "456"
Output: "56088"
```

```javascript
var multiply = function(num1, num2) {
    const chars1 = num1.split('');
    const chars2 = num2.split('');
    const output = [...Array(num1.length + num2.length)].fill('0');
    
    for (let i = num1.length - 1; i >= 0 ; i--) {
        for (let j = num2.length - 1; j >= 0; j--) {
            const product = (chars1[i] - '0') * (chars2[j] - '0');
            const temp = product + (output[i + j + 1] - '0');
            output[i + j + 1] = String(temp % 10);
            output[i + j] = String(output[i + j] - '0' + Math.floor(temp / 10));
        }
    }

    while (output[0] === '0' && output.length > 1) {
        output.shift();
    }
    return output.join('');
};
```

### Pow(x, n)
[50. Pow(x, n)](https://leetcode.com/problems/powx-n/)
```html
Implement pow(x, n), which calculates x raised to the power n (i.e., xn).

Example 1:

Input: x = 2.00000, n = 10
Output: 1024.00000
Example 2:

Input: x = 2.10000, n = 3
Output: 9.26100
Example 3:

Input: x = 2.00000, n = -2
Output: 0.25000
Explanation: 2-2 = 1/22 = 1/4 = 0.25
```

```javascript
var myPow = function(x, n) {
    if (n === 0) { return 1; }
    if (n === 1) { return x; }
    if (n < 0) { return myPow(1/x, -n); }
    
    let result = myPow(x * x, Math.floor(n / 2));
    if (n % 2 !== 0) {
        result *= x;
    }
    return result;
};
```
### Copy List with Random Pointer
[138. Copy List with Random Pointer](https://leetcode.com/problems/copy-list-with-random-pointer/)
```html
A linked list is given such that each node contains an additional random pointer which could point to any node in the list or null.

Return a deep copy of the list.

The Linked List is represented in the input/output as a list of n nodes. Each node is represented as a pair of [val, random_index] where:

val: an integer representing Node.val
random_index: the index of the node (range from 0 to n-1) where random pointer points to, or null if it does not point to any node.
Example 1:


Input: head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
Output: [[7,null],[13,0],[11,4],[10,2],[1,0]]
Example 2:


Input: head = [[1,1],[2,1]]
Output: [[1,1],[2,1]]
Example 3:


Input: head = [[3,null],[3,0],[3,null]]
Output: [[3,null],[3,0],[3,null]]
Example 4:

Input: head = []
Output: []
Explanation: Given linked list is empty (null pointer), so return null.
```

```javascript
var copyRandomList = function(head) {
    if (!head) { return null; }
    const map = new Map([[null, null]]);
    let current = head;
    
    while (current !== null) {
        map.set(current, new Node(current.val, null, null));
        current = current.next;
    }
    
    current = head;
    while (current !== null) {
        map.get(current).next = map.get(current.next);
        map.get(current).random = map.get(current.random);
        current = current.next;
    }
    return map.get(head);
};
```

### Word Break II
[140. Word Break II](https://leetcode.com/problems/word-break-ii/)
```html
Given a string s and a dictionary of strings wordDict, add spaces in s to construct a sentence where each word is a valid dictionary word. Return all such possible sentences in any order.

Note that the same word in the dictionary may be reused multiple times in the segmentation.

 

Example 1:

Input: s = "catsanddog", wordDict = ["cat","cats","and","sand","dog"]
Output: ["cats and dog","cat sand dog"]
Example 2:

Input: s = "pineapplepenapple", wordDict = ["apple","pen","applepen","pine","pineapple"]
Output: ["pine apple pen apple","pineapple pen apple","pine applepen apple"]
Explanation: Note that you are allowed to reuse a dictionary word.
Example 3:

Input: s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
Output: []
```

Backtracking with no memoization

```javascript
var wordBreak = function(s, wordDict) {
    const output = [];
    wordBreakHelper(s, wordDict, [], output);
    return output;
};
function wordBreakHelper(s, wordDict, words, output) {
    if (s.length === 0) {
        output.push(words.join(' '));
        return;
    }
   
    for (let i = 0; i < s.length; i++) {
        const substr = s.substring(0, i + 1);
        if (wordDict.includes(substr)) {
            const nextS = s.substring(i + 1);
            const nextWords = [...words, substr];
            wordBreakHelper(nextS, wordDict, nextWords, output);
        }
    }
    // could loop thru wordDict
    // for (const word of wordDict) {
    //     const substr = s.substring(0, word.length);
    //     if (substr !== word) { continue; }
    //     const nextS = s.substring(word.length);
    //     const nextWords = [...words, word];
    //     wordBreakHelper(nextS, wordDict, nextWords, output, cache);
    // }
}
```

Backtracking with memoization (top-down dynamic programming)
```javascript
var wordBreak = function(s, wordDict) {
    const memo = new Map();
    const words = wordBreakHelperMemoization(s, 0, wordDict, memo);
    return words.map(w => w.join(' '));
};
function wordBreakHelperMemoization(s, current, wordDict, memo) {
    if (memo.has(current)) { return memo.get(current); }
    
    if (current >= s.length) {
        return [[]];
    }

    const words = [];
    for (let i = current; i < s.length; i++) {
        const substr = s.substring(current, i + 1);
        if (wordDict.includes(substr)) {
            const nextCurrent = i + 1;
            const nextWords = wordBreakHelperMemoization(s, nextCurrent, wordDict, memo);
            for (const nextWord of nextWords) {
                words.push([substr, ...nextWord]);
            }
        }
    }

    memo.set(current, words);
    return words;
}
```

### LRU Cache
[146. LRU Cache](https://leetcode.com/problems/lru-cache/)
```html
Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.

Implement the LRUCache class:

LRUCache(int capacity) Initialize the LRU cache with positive size capacity.
int get(int key) Return the value of the key if the key exists, otherwise return -1.
void put(int key, int value) Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity from this operation, evict the least recently used key.
Follow up:
Could you do get and put in O(1) time complexity?

 

Example 1:

Input
["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
Output
[null, null, null, 1, null, -1, null, -1, 3, 4]

Explanation
LRUCache lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // cache is {1=1}
lRUCache.put(2, 2); // cache is {1=1, 2=2}
lRUCache.get(1);    // return 1
lRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}
lRUCache.get(2);    // returns -1 (not found)
lRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}
lRUCache.get(1);    // return -1 (not found)
lRUCache.get(3);    // return 3
lRUCache.get(4);    // return 4
```

```javascript
var LRUCache = function(capacity) {
    this.orderedMap = new Map();
    this.capacity = capacity;
};
LRUCache.prototype.get = function(key) {
    if (!this.orderedMap.has(key)) { return -1; }
    let existingValue = this.orderedMap.get(key);
    this.put(key, existingValue);
    return existingValue;
};
LRUCache.prototype.put = function(key, value) {
    if (this.orderedMap.has(key)) {
        this.orderedMap.delete(key);
    }
    this.orderedMap.set(key, value);
    if (this.orderedMap.size > this.capacity) {
        let keyLRU = [...this.orderedMap.keys()][0]; // this.orderedMap.keys().next().value;
        this.orderedMap.delete(keyLRU);
    }
};
```

### Evaluate Reverse Polish Notation
[150. Evaluate Reverse Polish Notation](https://leetcode.com/problems/evaluate-reverse-polish-notation/)
```html
Evaluate the value of an arithmetic expression in Reverse Polish Notation.

Valid operators are +, -, *, and /. Each operand may be an integer or another expression.

Note that division between two integers should truncate toward zero.

It is guaranteed that the given RPN expression is always valid. That means the expression would always evaluate to a result, and there will not be any division by zero operation.

Example 1:

Input: tokens = ["2","1","+","3","*"]
Output: 9
Explanation: ((2 + 1) * 3) = 9
Example 2:

Input: tokens = ["4","13","5","/","+"]
Output: 6
Explanation: (4 + (13 / 5)) = 6
Example 3:

Input: tokens = ["10","6","9","3","+","-11","*","/","*","17","+","5","+"]
Output: 22
Explanation: ((10 * (6 / ((9 + 3) * -11))) + 17) + 5
= ((10 * (6 / (12 * -11))) + 17) + 5
= ((10 * (6 / -132)) + 17) + 5
= ((10 * 0) + 17) + 5
= (0 + 17) + 5
= 17 + 5
= 22
```
```javascript
var evalRPN = function(tokens) {
    const stack = [];
    let num1, num2, newNum;
    for (const token of tokens) {
        switch (token) {
            case '+':
                num1 = stack.pop();
                num2 = stack.pop();
                newNum = Number(num1) + Number(num2);
                stack.push(newNum);
                break;
            case '-':
                num1 = stack.pop();
                num2 = stack.pop();
                newNum = Number(num2) - Number(num1);
                stack.push(newNum);
                break;
            case '*':
                num1 = stack.pop();
                num2 = stack.pop();
                newNum = Number(num1) * Number(num2);
                stack.push(newNum);
                break;
            case '/':
                num1 = stack.pop();
                num2 = stack.pop();
                newNum = Number(num2) / Number(num1);
                newNum = newNum < 0 ? Math.ceil(newNum) : Math.floor(newNum);
                stack.push(newNum);
                break;
            default:
                stack.push(token);
        }
    }
    return stack[0];
};
```

### Binary Tree Upside Down
[156. Binary Tree Upside Down](https://leetcode.com/problems/binary-tree-upside-down/)
```html
Given a binary tree where all the right nodes are either leaf nodes with a sibling (a left node that shares the same parent node) or empty, flip it upside down and turn it into a tree where the original right nodes turned into left leaf nodes. Return the new root.

Example:

Input: [1,2,3,4,5]

    1
   / \
  2   3
 / \
4   5

Output: return the root of the binary tree [4,5,2,#,#,3,1]

   4
  / \
 5   2
    / \
   3   1  
```

```javascript
var upsideDownBinaryTree = function(root) {
    if (root === null) {
        return null;
    }
    if (!root.left) { return root; }
    var newRoot = upsideDownBinaryTree(root.left);
    root.left.left = root.right;
    root.left.right = root;
    root.left = null;
    root.right = null;
    return newRoot;
};
```

### Two Sum III - Data structure design
[170. Two Sum III - Data structure design](https://leetcode.com/problems/two-sum-iii-data-structure-design/)
```html
Design and implement a TwoSum class. It should support the following operations: add and find.

add - Add the number to an internal data structure.
find - Find if there exists any pair of numbers which sum is equal to the value.

Example 1:

add(1); add(3); add(5);
find(4) -> true
find(7) -> false
Example 2:

add(3); add(1); add(2);
find(3) -> true
find(6) -> false
```

```javascript
var TwoSum = function() {
    this.nums = new Map();
};
TwoSum.prototype.add = function(number) {
    this.nums.set(number, (this.nums.get(number) || 0) + 1);
};
TwoSum.prototype.find = function(value) {
    for (const [num, count] of this.nums) {
        const diff = value - num;
        if (!this.nums.has(diff)) { continue; }
        let count = this.nums.get(diff);
        if (diff === num) {
            if (count > 1) { return true; }
        } else {
            return this.nums.has(diff);
        }
    }
    return false;
};
```
