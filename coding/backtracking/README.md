# Backtracking
<!-- GFM-TOC -->
* [Backtracking](#backtracking)
    * [Letter Combinations of a Phone Number](#Letter-Combinations-of-a-Phone-Number)
    * [Restore IP Addresses](#Restore-IP-Addresses)
    * [Binary Tree Paths](#Binary-Tree-Paths)
    * [Permutations](#Permutations)
    * [Permutations II](#Permutations-II)
    * [Combinations](#Combinations)
    * [Combination Sum](#Combination-Sum)
    * [Combination Sum II](#Combination-Sum-II)
    * [Combination Sum III](#Combination-Sum-III)
    * [Subsets](#Subsets)
    * [Subsets II](#Subsets-II)
    * [Palindrome Partitioning](#Palindrome-Partitioning)
    * [Expression Add Operators](#Expression-Add-Operators)
    * [Word Break II](../leetcode.md#word-break-ii)
    * [Regular Expression Matching](#regular-expression-matching)
    * [Factor Combinations](#factor-combinations)
    * [Partition to K Equal Sum Subsets](#partition-to-k-equal-sum-subsets)
<!-- GFM-TOC -->

## Backtracking

Backtracking is a special case of DFS.
- DFS is used to solve **connectivity**.
- Backtracking is used to **permutation and combination** problems.
- Backtracking solves the problem from bottom up.
- Backtracking needs at least two extra parameters **intermediate result** and **final output**

### Letter Combinations of a Phone Number

[17\. Letter Combinations of a Phone Number (Medium)](https://leetcode.com/problems/letter-combinations-of-a-phone-number/description/)

```javascript
var letterCombinations = function(digits) {
    if (digits.length === 0) {
        return [];
    }
    
    const output = [];
    letterCombinationsHelper(digits, [], output);
    return output;
};

const map = {
    '2': ['a', 'b', 'c'],
    '3': ['d', 'e', 'f'],
    '4': ['g', 'h', 'i'],
    '5': ['j', 'k', 'l'],
    '6': ['m', 'n', 'o'],
    '7': ['p', 'q', 'r', 's'],
    '8': ['t', 'u', 'v'],
    '9': ['w', 'x', 'y', 'z'],
};

function letterCombinationsHelper(digits, combinations, output) {
    if (digits.length === 0) {
        output.push(combinations.join(''));
        return output;
    }
    
    const firstDigit = digits[0];
    const letters = map[firstDigit];
    const nextDigits = digits.slice(1);

    for (const letter of letters) {
        letterCombinationsHelper(nextDigits, [...combinations, letter], output);
    }
}
```

### Restore IP Addresses

[93\. Restore IP Addresses (Medium)](https://leetcode.com/problems/restore-ip-addresses/description/)

```javascript
var restoreIpAddresses = function(s) {
    const output = [];
    restoreIpAddressesHelper(s, [], output);
    return output;
};

function restoreIpAddressesHelper(s, segments, output) {
    if (s.length === 0 || segments.length >= 4) {
        if (s.length === 0 && segments.length === 4) {
            output.push(segments.join('.'));
        }
        return;
    }
    
    for (let i = 1; i <= Math.min(3, s.length); i++) {
        const segment = s.substring(0, i);
        
        if (Number(segment) > 255 || /^0\d/.test(segment)) {
            break;
        }
        
        const nextS = s.substring(i);
        const nextSegments = [...segments, segment];
        restoreIpAddressesHelper(nextS, nextSegments, output);
    }
}
```

### Binary Tree Paths

[257\. Binary Tree Paths (Easy)](https://leetcode.com/problems/binary-tree-paths/description/)

```javascript
var binaryTreePaths = function(root) {
    const output = [];
    binaryTreePathsHelper(root, [], output);
    return output;
};

function binaryTreePathsHelper(root, paths, output) {
    if (!root.left && !root.right) {
        output.push([...paths, root.val].join('->'));
        return;
    }
    
    if (root.left) {
        binaryTreePathsHelper(root.left, [...paths, root.val], output);
    }
    
    if (root.right) {
        binaryTreePathsHelper(root.right, [...paths, root.val], output);
    }
}
```

### Permutations

Complexity is factorial.

[46\. Permutations (Medium)](https://leetcode.com/problems/permutations/description/)

```javascript
var permute = function(nums) {
    const output = [];
    permuteHelper(nums, [], output);
    return output;
};

function permuteHelper(nums, permutations, output) {
    if (nums.length === 0) {
        output.push([...permutations]);
        return;
    }
    
    for (let i = 0; i < nums.length; i++) {
        const nextNums = nums.filter((_, index) => index !== i);
        const nextPermutations = [...permutations, nums[i]];
        permuteHelper(nextNums, nextPermutations, output);
    }
}
```

### Permutations II

[47\. Permutations II (Medium)](https://leetcode.com/problems/permutations-ii/description/)

```javascript
var permuteUnique = function(nums) {
    nums.sort();
    const output = [];
    permuteUniqueHelper(nums, [], output);
    return output;
};

function permuteUniqueHelper(nums, permutations, output) {
    if (nums.length === 0) {
        output.push([...permutations]);
        return output;
    }
    
    for (let i = 0; i < nums.length; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue;
        }
        const nextNums = nums.filter((_, index) => index !== i);
        const nextPermutations = [...permutations, nums[i]];
        permuteUniqueHelper(nextNums, nextPermutations, output);
    }
}
```

### Combinations

Complexity is exponential.

[77\. Combinations (Medium)](https://leetcode.com/problems/combinations/description/)

```javascript
var combine = function(n, k) {
    const output = [];
    combineHelper(n, k, 1, [], output);
    return output;
};

function combineHelper(n, k, current, combinations, output) {
    if (current > n || combinations.length === k) {
        if (combinations.length === k) {
            output.push([...combinations]);
        }
        return;
    }
    
    for (let i = current; i <= n; i++) {
        const nextCurrent = i + 1;
        const nextCombinations = [...combinations, i];
        combineHelper(n, k, nextCurrent, nextCombinations, output);
    }
}
```

### Combination Sum

[39\. Combination Sum (Medium)](https://leetcode.com/problems/combination-sum/description/)

```javascript
var combinationSum = function(candidates, target) {
    const output = [];
    combinationSumHelper(candidates, target, 0, [], output);
    return output;
};

function combinationSumHelper(candidates, target, current, combinations, output) {
    const combSum = combinations.reduce((memo, c) => memo + c, 0);
    if (current >= candidates.length || combSum >= target) {
        if (combSum === target) {
            output.push([...combinations]);
        }
        return;
    }
    
    for (let i = current; i < candidates.length; i++) {
        const nextCurrent = i;
        const nextCombinations = [...combinations, candidates[i]];
        combinationSumHelper(candidates, target, nextCurrent, nextCombinations, output);
    }
}
```

### Combination Sum II

[40\. Combination Sum II (Medium)](https://leetcode.com/problems/combination-sum-ii/description/)

```javascript
var combinationSum2 = function(candidates, target) {
    const output = [];
    candidates.sort();
    combinationSum2Helper(candidates, target, 0, [], output);
    return output;
};

function combinationSum2Helper(candidates, target, current, combinations, output) {
    const combSum = combinations.reduce((memo, c) => memo + c, 0);
    if (current >= candidates.length || combSum >= target) {
        if (combSum === target) {
            output.push([...combinations]);
        }
        return output;
    }
    
    for (let i = current; i < candidates.length; i++) {
        if (i > current && candidates[i] === candidates[i - 1]) {
            continue;
        }
        const nextCurrent = i + 1;
        const nextCombinations = [...combinations, candidates[i]];
        combinationSum2Helper(candidates, target, nextCurrent, nextCombinations, output);
    }
}
```

### Combination Sum III

[216\. Combination Sum III (Medium)](https://leetcode.com/problems/combination-sum-iii/description/)

```javascript
var combinationSum3 = function(k, n) {
    const output = [];
    combinationSum3Helper(k, n, 1, [], output);
    return output;
};

function combinationSum3Helper(k, target, current, combinations, output) {
    const combSum = combinations.reduce((memo, c) => memo + c, 0);
    if (current > 9 || combSum >= target || combinations.length === k) {
        if (combSum === target && combinations.length === k) {
            output.push([...combinations]);
            return;
        }
    }
    
    for (let i = current; i <= 9; i++) {
        const nextCurrent = i + 1;
        const nextCombinations = [...combinations, i];
        combinationSum3Helper(k, target, nextCurrent, nextCombinations, output);
    }
}
```

### Subsets

[78\. Subsets (Medium)](https://leetcode.com/problems/subsets/description/)

```javascript
var subsets = function(nums) {
    const results = [];
    for (let k = 0; k <= nums.length; k++) {
        const output = [];
        subsetsHelper(nums, k, 0, [], output);
        results.push(...output);
    }
    return results;
};

function subsetsHelper(nums, k, current, combinations, output) {
    if (current >= nums.length || combinations.length === k) {
        if (combinations.length === k) {
            output.push([...combinations])
        }
        return;
    }
    
    for (let i = current; i < nums.length; i++) {
        const nextCurrent = i + 1;
        const nextCombinations = [...combinations, nums[i]];
        subsetsHelper(nums, k, nextCurrent, nextCombinations, output);
    }
}
```

### Subsets II

[90\. Subsets II (Medium)](https://leetcode.com/problems/subsets-ii/description/)

```javascript
var subsetsWithDup = function(nums) {
    nums.sort();
    
    const results = [];
    for (let k = 0; k <= nums.length; k++) {
        const output = [];
        subsetsWithDupHelper(nums, k, 0, [], output);
        results.push(...output);
    }
    return results;
};
function subsetsWithDupHelper(nums, k, current, combinations, output) {
    if (current >= nums.length || combinations.length === k) {
        if (combinations.length === k) {
            output.push([...combinations])
        }
        return;
    }
    
    for (let i = current; i < nums.length; i++) {
        if (i > current && nums[i] === nums[i - 1]) {
            continue;
        }
        const nextCurrent = i + 1;
        const nextCombinations = [...combinations, nums[i]];
        subsetsWithDupHelper(nums, k, nextCurrent, nextCombinations, output);
    }
}
```

### Palindrome Partitioning

[131\. Palindrome Partitioning (Medium)](https://leetcode.com/problems/palindrome-partitioning/description/)

```javascript
var partition = function(s) {
    const output = [];
    partitionHelper(s, [], output);
    return output;
};
function partitionHelper(s, partitions, output) {
    if (s.length === 0) {
        output.push([...partitions]);
        return;
    }
    
    for (let i = 0; i < s.length; i++) {
        const substr = s.substring(0, i + 1);
        if (isPalindrome(substr)) {
            const nextS = s.substring(i + 1);
            const nextPartitions = [...partitions, substr];
            partitionHelper(nextS, nextPartitions, output);
        }
    }
}
function isPalindrome (s) {
    if (!s) {
        return false;
    }
    let start = 0;
    let end = s.length - 1;
    while (start < end) {
        if (s[start++] !== s[end--]) {
            return false;
        }
    }
    return true;
}
```

### Remove Invalid Parentheses
[301. Remove Invalid Parentheses](https://leetcode.com/problems/remove-invalid-parentheses/)
```javascript
var removeInvalidParentheses = function(s) {
    const output = { maxLen: 0, result: [] };
	removeInvalidParenthesesHelper(s, 0, '', output);
    return output.result.filter(expr => expr.length === output.maxLen);
};
function removeInvalidParenthesesHelper(str, numLeftParen, expression, output) {
    if (str === '') {
        if (numLeftParen === 0) {
            if (!output.result.includes(expression)) {
                output.result.push(expression);
                output.maxLen = Math.max(output.maxLen, expression.length);
            }
        }
        return;
    }
    const nextS = str.substring(1);
    if (str[0] === '(') {
        // not taken '('
        removeInvalidParenthesesHelper(nextS, numLeftParen, expression, output);
        // taken '('
        removeInvalidParenthesesHelper(nextS, numLeftParen + 1, expression + '(', output);
    } else if (str[0] === ')') {
        // has to have a '('
        if (numLeftParen > 0) {
            removeInvalidParenthesesHelper(nextS, numLeftParen - 1, expression + ')', output);
        }
        // has
        removeInvalidParenthesesHelper(nextS, numLeftParen, expression, output);
    } else {
        // not parentheses
        removeInvalidParenthesesHelper(nextS, numLeftParen, expression + str[0], output);
    }
}
```

### Expression Add Operators
[282. Expression Add Operators](https://leetcode.com/problems/expression-add-operators/)
```javascript
var addOperators = function(num, target) {
    const output = [];
    addOperatorsHelper(num, target, 0, 0, [], output);
    return output;
};

function addOperatorsHelper(num, target, value, delta, path, output) {
    if (num.length === 0) {
        if (value === target) {
            output.push(path.join(''));
        }
        return;
    };

    for (let i = 1; i <= num.length; i++) {
        const currentNum = num.substring(0, i);
        if (currentNum.length > 1 && currentNum[0] === '0') {
            continue;
        }
        if (Number(currentNum) > Number.MAX_VALUE) {
            continue;
        }
        const nextNum = num.substring(i);
        const currentNumValue = Number(currentNum);
        if (path.length === 0) {
            addOperatorsHelper(nextNum, target, currentNumValue, +currentNumValue, [currentNum], output);
        } else {
            addOperatorsHelper(nextNum, target, value + currentNumValue, +currentNumValue, [...path, '+', currentNum], output);
            addOperatorsHelper(nextNum, target, value - currentNumValue, -currentNumValue, [...path, '-', currentNum], output);
            addOperatorsHelper(nextNum, target, value - delta + delta * currentNum, delta * currentNumValue, [...path, '*', currentNum], output);
        };
    };
}
```

<!-- @include ../leetcode/0010.regular-expression-matching.md -->
## Regular Expression Matching
[10. Regular Expression Matching](https://leetcode.com/problems/regular-expression-matching/)
```html
Given an input string (s) and a pattern (p), implement regular expression matching with support for '.' and '*' where: 

'.' Matches any single character.​​​​
'*' Matches zero or more of the preceding element.
The matching should cover the entire input string (not partial).
```

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
<!-- @include ../leetcode/0254.factor-combinations.md -->
### Factor Combinations
[254. Factor Combinations](https://leetcode.com/problems/factor-combinations/)
```html
Numbers can be regarded as the product of their factors.

For example, 8 = 2 x 2 x 2 = 2 x 4.
Given an integer n, return all possible combinations of its factors. You may return the answer in any order.

Note that the factors should be in the range [2, n - 1].

Example 1:

Input: n = 1
Output: []
Example 2:

Input: n = 12
Output: [[2,6],[3,4],[2,2,3]]
Example 3:

Input: n = 37
Output: []
Example 4:

Input: n = 32
Output: [[2,16],[4,8],[2,2,8],[2,4,4],[2,2,2,4],[2,2,2,2,2]]
```

```javascript
var getFactors = function(n) {
    const output = [];
    getFactorsHelper(n, 2, [], output);
    return output;
};
function getFactorsHelper(n, current, factors, output) {
    if (n === 1) {
        if (factors.length > 1) {
            output.push([...factors]);
            return;
        }
    }
    for (let i = current; i <= n; i++) {
        if (n % i === 0) {
            factors.push(i);
            getFactorsHelper(n / i, i, factors, output);
            factors.pop();
        }
    }
}
```

<!-- @include ../leetcode/0698.partition-to-k-equal-sum-subsets.md -->
## Partition to K Equal Sum Subsets
[698. Partition to K Equal Sum Subsets](https://leetcode.com/problems/partition-to-k-equal-sum-subsets/)
```html
Given an array of integers nums and a positive integer k, find whether it's possible to divide this array into k non-empty subsets whose sums are all equal.

Example 1:

Input: nums = [4, 3, 2, 3, 5, 2, 1], k = 4
Output: True
Explanation: It's possible to divide it into 4 subsets (5), (1, 4), (2,3), (2,3) with equal sums.
```

```javascript
var canPartitionKSubsets = function(nums, k) {
    const total = nums.reduce((sum, num) => sum + num, 0);
    if (total % k !== 0) { return false; }
    const target = total / k;
    return canPartitionKSubsetsHelper(nums, target, k, 0, 0, [])
};
function canPartitionKSubsetsHelper(nums, target, k, current, currentSum, visited) {
    if (k === 1) { return true; }
    
    if (currentSum === target) {
        return canPartitionKSubsetsHelper(nums, target, k - 1, 0, 0, visited);
    }
    
    for (let i = current; i < nums.length; i++) {
        if (visited[i] === true) { continue; }
        visited[i] = true;
        if (canPartitionKSubsetsHelper(nums, target, k, i + 1, currentSum + nums[i], visited)) {
            return true;
        }
        visited[i] = false;
    }
    return false;
}
```
