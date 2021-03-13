# Divided and Conquer
<!-- GFM-TOC -->
* [Divided and Conquer](#Divided-and-Conquer)
    * [Different Ways to Add Parentheses](#Different-Ways-to-Add-Parentheses)
    * [Unique Binary Search Trees II](#Unique-Binary-Search-Trees-II)
<!-- GFM-TOC -->


## Different Ways to Add Parentheses

[241\. Different Ways to Add Parentheses (Medium)](https://leetcode.com/problems/different-ways-to-add-parentheses/description/)

```javascript
var diffWaysToCompute = function(input) {
    if (input.length === 0) {
        return [];
    }
    
    if (!/[\+\-\*]/.test(input)) {
        return [Number(input)];
    }
    
    const ways = [];
    
    for (let i = 0; i < input.length; i++) {
        const isValidOperator = ['+', '-', '*'].some(o => o === input[i]);
        if (!isValidOperator) {
            continue;
        }
        const firstInput = input.substring(0, i);
        const secondInput = input.substring(i + 1);
        const firstWays = diffWaysToCompute(firstInput);
        const secondWays = diffWaysToCompute(secondInput);
        
        for (const firstWay of firstWays) {
            for (const secondWay of secondWays) {
                switch (input[i]) {
                    case '+':
                        ways.push(firstWay + secondWay);
                        break;
                    case '-':
                        ways.push(firstWay - secondWay);
                        break;
                    case '*':
                        ways.push(firstWay * secondWay);
                        break;
                }
            }
        }
    }
    
    return ways;
};
```

## Unique Binary Search Trees II

[95\. Unique Binary Search Trees II (Medium)](https://leetcode.com/problems/unique-binary-search-trees-ii/description/)

```javascript
var generateTrees = function(n) {
    return generateTreesHelper(1, n);
};

function generateTreesHelper(start, end) {
    if (start > end) {
        return [null];
    }
    if (start === end) {
        return [new TreeNode(start)];
    }
    
    const trees = [];
    for (let i = start; i <= end; i++) {
        const leftTrees = generateTreesHelper(start, i - 1);
        const rightTrees = generateTreesHelper(i + 1, end);

        for (const leftTree of leftTrees) {
            for (const rightTree of rightTrees) {
                const newTree = new TreeNode(i, leftTree, rightTree);
                trees.push(newTree);
            }
        }
    }
    
    return trees;
}
```