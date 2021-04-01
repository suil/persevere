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
## LRU Cache
[146. LRU Cache](https://leetcode.com/problems/lru-cache/)
```javascript
var LRUCache = function(capacity) {
    this.orderedMap = new Map();
    this.capacity = capacity;
};
LRUCache.prototype.get = function(key) {
    if (this.orderedMap.has(key)) {
        let existingValue = this.orderedMap.get(key);
        this.put(key, existingValue);
        return existingValue;
    }
    return -1;
};
LRUCache.prototype.put = function(key, value) {
    if (this.orderedMap.has(key)) {
        // Let us Update key with new insertion order
        this.orderedMap.delete(key);
    }

    // New or existing, just set it
    this.orderedMap.set(key, value);

    if (this.orderedMap.size > this.capacity) {
        let keyLRU = [...this.orderedMap.keys()][0]; // this.orderedMap.keys().next().value;
        this.orderedMap.delete(keyLRU);
    }
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
### Nested List Weight Sum
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