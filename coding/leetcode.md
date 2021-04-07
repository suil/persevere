## Regular Expression Matching
[10. Regular Expression Matching](https://leetcode.com/problems/regular-expression-matching/)
Backtracking
```javascript
var isMatch = function(s, p) {
    return isMatchDP(s, p);
    if (p.length === 0) {
        return s.length === 0;
    }

    const firstMatch = s.length > 0 && (s[0] === p[0] || p[0] === '.');
    if (p.length >= 2 && p[1] === '*') {
        return (
            isMatch(s, p.substring(2)) || (firstMatch && isMatch(s.substring(1), p))
        );
    }
    return firstMatch && isMatch(s.substring(1), p.substring(1));
};
```

Dynamic Programming
```javascript
function isMatchDP(s, p) {
    let dp = [...Array(s.length + 1)].map(() => [...Array(p.length + 1)].fill(false));
    dp[0][0] = true;

    for (let i = 1; i < dp[0].length; i++){
        if (p[i - 1] === '*' && dp[0][i - 2] === true){
            dp[0][i] = true;
        }
    }

    for (let i = 1; i < dp.length; i++) {
        for (let j = 1; j < dp[0].length; j++) {
            if (s[i - 1] === p[j - 1] || p[j - 1] == '.') {
                dp[i][j] = dp[i - 1][j - 1];
            } else if (p[j - 1] === '*') {
                dp[i][j] = dp[i][j - 2];
                if (p[j - 2] == '.' || p[j - 2] == s[i - 1]){
                    dp[i][j] = dp[i - 1][j] || dp[i][j];
                }
            }
        }
    }
    
    return dp[s.length][p.length];
}
```

## Search in Rotated Sorted Array
[33. Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/)
```javascript
var search = function(nums, target) {
    let start = 0, end = nums.length - 1;
    while (start <= end) {
        let mid = Math.floor(start + (end - start) / 2);
        if (nums[mid] === target) { return mid; }
        if (nums[mid] >= nums[start]) {
            if (target >= nums[start] && target < nums[mid]) {
                end = mid - 1;
            } else {
                start = mid + 1;
            }
        } else {
            if (target <= nums[end] && target > nums[mid]) {
                start = mid + 1;
            } else {
                end = mid - 1;
            }
        }
    }
    return -1;
};
```

## Trapping Rain Water
[42. Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water/)

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
## Multiply Strings
[43. Multiply Strings](https://leetcode.com/problems/multiply-strings/)
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

## Pow(x, n)
[50. Pow(x, n)](https://leetcode.com/problems/powx-n/)
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
## Copy List with Random Pointer
[138. Copy List with Random Pointer](https://leetcode.com/problems/copy-list-with-random-pointer/)
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

## Word Break II
[140. Word Break II](https://leetcode.com/problems/word-break-ii/)

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


## LRU Cache
[146. LRU Cache](https://leetcode.com/problems/lru-cache/)
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

## Binary Tree Upside Down
[156. Binary Tree Upside Down](https://leetcode.com/problems/binary-tree-upside-down/)
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

## Two Sum III - Data structure design
[170. Two Sum III - Data structure design](https://leetcode.com/problems/two-sum-iii-data-structure-design/)
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

## Binary Search Tree Iterator
[173. Binary Search Tree Iterator](https://leetcode.com/problems/binary-search-tree-iterator/)
```javascript
var BSTIterator = function(root) {
    this.cache = []
    const traverse = (node) => {
        if (node === null) { return; }
        if (node.left) traverse(node.left);
        this.cache.push(node.val);
        if (node.right) traverse(node.right);
    }
    traverse(root);
};
/**
 * @return {number}
 */
BSTIterator.prototype.next = function() {
    return this.cache.shift();
};

/**
 * @return {boolean}
 */
BSTIterator.prototype.hasNext = function() {
    return this.cache.length > 0;
};
```
## Lowest Common Ancestor of a Binary Tree
[236. Lowest Common Ancestor of a Binary Tree](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/)
```javascript
var lowestCommonAncestor = function(root, p, q) {
    if (root === null || root === p || root === q) {
        return root
    }
    const left = lowestCommonAncestor(root.left, p, q)
    const right = lowestCommonAncestor(root.right, p, q)
    if (left && right) {
        return root
    }
    return left || right
};
```
## Shortest Word Distance
[243. Shortest Word Distance](https://leetcode.com/problems/shortest-word-distance/)
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

## Shortest Word Distance II
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

## 246. Strobogrammatic Number
[246. Strobogrammatic Number](https://leetcode.com/problems/strobogrammatic-number/)
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

## Strobogrammatic Number II
[247. Strobogrammatic Number II](https://leetcode.com/problems/strobogrammatic-number-ii/)
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

## Group Shifted Strings
[249. Group Shifted Strings](https://leetcode.com/problems/group-shifted-strings/)
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
## Shortest Distance from All Buildings
[317. Shortest Distance from All Buildings](https://leetcode.com/problems/shortest-distance-from-all-buildings/)
```javascript
const DIRECTIONS = [[0, 1], [1, 0], [0, -1], [-1, 0]];

function distanceFromBuilding(grid, startRow, startCol, distances, reaches) {
    const rowLen = grid.length;
    const colLen = grid[0].length;
    let queue = [[startRow, startCol]];
    let minDistance = Infinity;
    let dist = 0;
    const visited = [...Array(rowLen)].map(() => [...Array(colLen)].fill(false));
    
    while (queue.length > 0) {
        const nextQueue = [];
        dist++;

        for (const [row, col] of queue) {
            for (const [rowDelta, colDelta] of DIRECTIONS) {
                const nextRow = row + rowDelta;
                const nextCol = col + colDelta;
                if (grid[nextRow] === undefined
                    || grid[nextRow][nextCol] === undefined 
                    || grid[nextRow][nextCol] === 2
                    || visited[nextRow][nextCol] === true
                ) {
                    continue;
                }
                
                if (grid[nextRow][nextCol] === 0) {
                    distances[nextRow][nextCol] += dist;
                    reaches[nextRow][nextCol]++;
                    nextQueue.push([nextRow, nextCol]);
                }
                visited[nextRow][nextCol] = true;
            }
        }
        queue = nextQueue;
    }
    return minDistance;
}
var shortestDistance = function(grid) {
    const rowLen = grid.length;
    const colLen = grid[0].length;
    const distances = [...Array(rowLen)].map(() => [...Array(colLen)].fill(0));
    const reaches = [...Array(rowLen)].map(() => [...Array(colLen)].fill(0));
    
    let totalBuildings = 0;
    for (let row = 0; row < rowLen; row += 1) {
        for (let col = 0; col < colLen; col += 1) {
            if (grid[row][col] === 1) {
                totalBuildings++;
                distanceFromBuilding(grid, row, col, distances, reaches);
            }
        }
    }

    let minDistance = Infinity;
    for (let row = 0; row < rowLen; row++) {
        for (let col = 0; col < colLen; col++) {
            if (reaches[row][col] === totalBuildings
                && distances[row][col] < minDistance
            ) {
                minDistance = distances[row][col];
            }
        }
    }    
    return minDistance === Infinity ? -1 : minDistance;
};
```
## Nested List Weight Sum
[339. Nested List Weight Sum](https://leetcode.com/problems/nested-list-weight-sum/)
```javascript
var depthSum = function(nestedList) {
    return depthSumHelper(nestedList, 1);
};
function depthSumHelper(nestedList, depth) {
    let sum = 0;
    for (const item of nestedList) {
        if (item.isInteger()) {
            sum += item.getInteger() * depth;
        } else {
            sum += depthSumHelper(item.getList(), depth + 1);
        }
    }
    return sum;
}
```

### Top K Frequent Elements
[347. Top K Frequent Elements (Medium)](https://leetcode.com/problems/top-k-frequent-elements/description/)
```javascript
var topKFrequent = function(nums, k) {
    const freqMap = new Map();
    let maxFreq = 0;
    for (const num of nums) {
        freqMap.set(num, (freqMap.get(num) || 0) + 1);
        maxFreq = Math.max(maxFreq, freqMap.get(num));
    }

    const bucket = [...Array(maxFreq + 1)].map(_ => []);
    for (const [num, freq] of freqMap) {
        bucket[freq].push(num);
    }

    const output = [];
    for (let i = bucket.length - 1; i >= 0; i--) {
        for (const num of bucket[i]) {
            output.push(num);
            if (output.length >= k) {
                return output;
            }
        }
    }
    return output;
};
```

## Intersection of Two Arrays
[349. Intersection of Two Arrays](https://leetcode.com/problems/intersection-of-two-arrays/)
```javascript
var intersection = function(nums1, nums2) {
    let set1 = new Set(nums1);
    let set2 = new Set(nums2);
    let map = new Map();
    let res = [];
    for (const item of set1) {
         map.set(item, 1);
    }
    for (const item of set2) {
        if (map.has(item)) {
            map.set(item, 2);
            res.push(item);
        }
    }
    return res;
};
```

## Nested List Weight Sum II
[364. Nested List Weight Sum II](https://leetcode.com/problems/nested-list-weight-sum-ii/)
```javascript
var depthSumInverse = function(nestedList) {
    const flattened = [];
    helper(nestedList, 0, flattened);
    
    let weight = flattened.length, sum = 0;
    for (const item of flattened) {
        for (let i = 0; i < item.length; i++) {
            sum += item[i] * weight;
        }
        weight--;
    }
    return sum;
};
function helper(nestedList, depth, flattened) {
    if (!flattened[depth]) { flattened[depth] = []; }
    
    for (const item of nestedList) {
        if (item.isInteger()) {
            flattened[depth].push(item.getInteger());
        } else {
            helper(item.getList(), depth + 1, flattened);
        }
    }
}
```

## Find Leaves of Binary Tree
[366. Find Leaves of Binary Tree](https://leetcode.com/problems/find-leaves-of-binary-tree/)
```javascript
var findLeaves = function(root) {
    const result = [];
    while (root !== null) {
        const output = [];
        root = findLeavesHelper(root, output);
        result.push(output);
    }
    return result;
};
function findLeavesHelper(node, output) {
    if (node === null) { return null; }
    if (node.left === null && node.right === null) {
        output.push(node.val);
        return null;
    }
    
    node.left = findLeavesHelper(node.left, output);
    node.right = findLeavesHelper(node.right, output);
    return node;
}
```

## Random Pick Index
[398. Random Pick Index](https://leetcode.com/problems/random-pick-index/)
```javascript
var Solution = function(nums) {
    this.nums = nums;
};
Solution.prototype.pick = function(target) {
    let count = 0;
    let index = -1;
    for (let i = 0; i < this.nums.length; i++) {
        if (this.nums[i] === target) {
            count++;
            if (i === 0 || Math.floor(Math.random() * count) === 0) {
                index = i;
            }
        }
    }
    return index;
};
```
## Find Bottom Left Tree Value
[513. Find Bottom Left Tree Value](https://leetcode.com/problems/find-bottom-left-tree-value/description/)
```javascript
var findBottomLeftValue = function(root) {
    let queue = [root];
    let bottomLeftNode = root.val;
    
    while (queue.length > 0) {
        bottomLeftNode = queue[0];
        const nextQueue = [];
        for (const node of queue) {
            if (node.left) { nextQueue.push(node.left); }
            if (node.right) { nextQueue.push(node.right); }
        }
        queue = nextQueue;
    }
    return bottomLeftNode.val
};
```

## Maximum Swap
[670. Maximum Swap](https://leetcode.com/problems/maximum-swap/)
```javascript
var maximumSwap = function(num) {
    const nums = num.toString().split('');
    const positionMap = new Map();

    for (let i = 0; i < nums.length; i++) {
        positionMap.set(Number(nums[i]), i);
    }

    for (let i = 0; i < nums.length; i++) { 
        for (let d = 9; d > nums[i]; d--) {
            if (!positionMap.has(d)) { continue; }
            const pos = positionMap.get(d);
            if (pos > i) {
                [nums[i], nums[pos]] = [nums[pos], nums[i]];
                return Number(nums.join(''));
            }
        }
    }
    return num;
};
```

## Insert into a Sorted Circular Linked List
[708. Insert into a Sorted Circular Linked List](https://leetcode.com/problems/insert-into-a-sorted-circular-linked-list/)
```javascript
var insert = function(head, insertVal) {
    if (head === null) {
        head = new Node(insertVal);
        head.next = head;
        return head;
    }

    var currNode = head;
    var newNode = new Node(insertVal);
    
    do {
        currNode = currNode.next;
    } while (currNode.val <= currNode.next.val && currNode !== head);
    
    const actualTail = currNode;
    currNode = currNode.next;
    const actualHead = currNode;
    
    if (actualHead.val >= insertVal || actualTail.val <= insertVal) {
        actualTail.next = newNode;
        newNode.next = actualHead;
    } else {
        while (currNode.next.val <= insertVal && currNode.next !== actualHead) {
            currNode = currNode.next;
        }
        const tmpNext = currNode.next;
        currNode.next = newNode;
        newNode.next = tmpNext;
    }
    return head;
};
```

## Goat Latin
[824. Goat Latin](https://leetcode.com/problems/goat-latin/)
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

## Friends Of Appropriate Ages
[825. Friends Of Appropriate Ages](https://leetcode.com/problems/friends-of-appropriate-ages/)
```javascript
var numFriendRequests = function(ages) {
    const counts = Array(121).fill(0);
    const accum = Array(121).fill(0);
    
    for (const age of ages) { ++counts[age]; }
    for (let i = 1; i <= 120; ++i) {
        accum[i] = accum[i - 1] + counts[i];
    }
    let ans = 0;
    for (let i = 15; i <= 120; ++i) {
        const base = accum[i - 1] - accum[Math.floor(i / 2 + 7)];
        ans += base * counts[i] + counts[i] * (counts[i] - 1);
    }
    return ans;
};
```

## Check Completeness of a Binary Tree
[958. Check Completeness of a Binary Tree](https://leetcode.com/problems/check-completeness-of-a-binary-tree/)
```javascript
var isCompleteTree = function(root) {
    let queue = [root];
    let hasNullNode = false;
    while (queue.length > 0) {
        const nextQueue = [];
        for (const node of queue) {
            if (node === null) {
                hasNullNode = true;
            } else {
                if (hasNullNode) { return false; }
                nextQueue.push(node.left);
                nextQueue.push(node.right);
            }
        }
        queue = nextQueue;
    }
    return true;
};
```

## Maximum Difference Between Node and Ancestor
[1026. Maximum Difference Between Node and Ancestor](https://leetcode.com/problems/maximum-difference-between-node-and-ancestor/)

With O(n<sup>2</sup>) complexity

```javascript
var maxAncestorDiff = function(root) {
    let max = -Infinity;
    
    function helper(node, ancesters) {
        if (node === null) {
            return;
        }
        
        ancesters.push(node);
        helper(node.left, ancesters);
        ancesters.pop();
        
        for (const ancester of ancesters) {
            max = Math.max(max, Math.abs(ancester.val - node.val));
        }
        
        ancesters.push(node);
        helper(node.right, ancesters);
        ancesters.pop();
    }

    helper(root, []);
    return max;
}
```

with O(n) complexity
```javascript
var maxAncestorDiff = function(root) {
    const helper = (node, min, max) => {
        if (!node) { return 0 };

        const newMin = Math.min(min, node.val);
        const newMax = Math.max(max, node.val);

        const left = helper(node.left, newMin, newMax);
        const right = helper(node.right, newMin, newMax);

        return Math.max(newMax - newMin, left, right);
    };

    return helper(root, Infinity, -Infinity);
};
```

## Missing Element in Sorted Array
[1060. Missing Element in Sorted Array](https://leetcode.com/problems/missing-element-in-sorted-array/)
```javascript
var missingElement = function(nums, k) {
    let left = 0, right = nums.length - 1;
    
    while (left < right) {
        const mid = Math.floor(left + (right - left) / 2);
        if (getMissingNumCount(nums, mid) >= k) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    return nums[left - 1] + k - getMissingNumCount(nums, left - 1);
};
function getMissingNumCount(nums, index) {
    return nums[index] - nums[0] - index;
}
```
## Dot Product of Two Sparse Vectors
[1570. Dot Product of Two Sparse Vectors](https://leetcode.com/problems/dot-product-of-two-sparse-vectors/)
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
