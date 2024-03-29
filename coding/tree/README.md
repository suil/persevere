# Leetcode 题解 - 树
<!-- GFM-TOC -->
* [Leetcode 题解 - 树](#leetcode-题解---树)
    * [Recursive](#Recursive)
        * [Maximum Depth of Binary Tree](#maximum-depth-of-binary-tree)
        * [Balanced Binary Tree](#balanced-binary-tree)
        * [3. 两节点的最长路径](#3-两节点的最长路径)
        * [4. 翻转树](#4-翻转树)
        * [5. 归并两棵树](#5-归并两棵树)
        * [Path Sum](#path-sum)
            * [Path Sum](#path-sum)
            * [Path Sum II](#path-sum-ii)
            * [Path Sum III](#path-sum-iii)
        * [7. 统计路径和等于一个数的路径数量](#7-统计路径和等于一个数的路径数量)
        * [Subtree of Another Tree](#Subtree-of-Another-Tree)
        * [Symmetric Tree](#symmetric-tree)
        * [Minimum Depth of Binary Tree](#minimum-depth-of-binary-tree)
        * [11. 统计左叶子节点的和](#11-统计左叶子节点的和)
        * [House Robber III](#house-robber-iii)
        * [Second Minimum Node In a Binary Tree](#second-minimum-node-in-a-binary-tree)
        * [Serialize and Deserialize](#Serialize-and-Deserialize)
            * [Serialize and Deserialize Binary Tree](#Serialize-and-Deserialize-Binary-Tree)
            * [Serialize and Deserialize BST](#serialize-and-deserialize-bst)
        * [Tree Path Depth](#Tree-Path-depth)
            * [Binary Tree Maximum Path Sum](#Binary-Tree-Maximum-Path-Sum)
            * [Diameter of Binary Tree](#diameter-of-binary-tree)
            * [Longest Univalue Path](#longest-univalue-path)
        * [Binary Tree Right Side View](#Binary-Tree-Right-Side-View)
        * [Convert Binary Search Tree to Sorted Doubly Linked List](#Convert-Binary-Search-Tree-to-Sorted-Doubly-Linked-List)
        * [Lowest Common Ancestor](#lowest-common-ancestor)
            * [Lowest Common Ancestor of a Binary Tree](#lowest-common-ancestor-of-a-binary-tree)
            * [Lowest Common Ancestor of a Binary Tree III](#lowest-common-ancestor-of-a-binary-tree-iii)
            * [Lowest Common Ancestor of a Binary Search Tree](#lowest-common-ancestor-of-a-binary-search-tree)
        * [Maximum Difference Between Node and Ancestor](#maximum-difference-between-node-and-ancestor)
        * [Binary Tree Upside Down](#binary-tree-upside-down)
        * [Find Leaves of Binary Tree](#find-leaves-of-binary-tree)
        * [Same Tree](#same-tree)
        * [Flip Equivalent Binary Trees](#flip-equivalent-binary-trees)
        * [Univalued Binary Tree](#univalued-binary-tree)
        * [Tree Pruning](#tree-pruning)
            * [Binary Tree Pruning](#binary-tree-pruning)
            * [Delete Leaves With a Given Value](#delete-leaves-with-a-given-value)
        * [Roof to Leaf Path](#roof-to-leaf-path)
            * [Sum Root to Leaf Numbers](#sum-root-to-leaf-numbers)
            * [Binary Tree Paths](#binary-tree-paths)
        * [Most Frequent Subtree Sum](#most-frequent-subtree-sum)
        * [Binary Tree Cameras](#binary-tree-cameras)
        * [Distribute Coins in Binary Tree](#distribute-coins-in-binary-tree)
        * [Validate Binary Search Tree](#validate-binary-search-tree)

    * [Breath First Search](#Breath-First-Search)
        * [1. 一棵树每层节点的平均数](#1-一棵树每层节点的平均数)
        * [Find Bottom Left Tree Value](#find-bottom-left-tree-value)
        * [Check Completeness of a Binary Tree](#check-completeness-of-a-binary-tree)
        * [N-ary Tree Level Order Traversal](#n-ary-tree-level-order-traversal)
        * [Deepest Leaves Sum](#deepest-leaves-sum)
        * [Level Order Traversal](#level-order-traversal)
            * [Binary Tree Level Order Traversal](#binary-tree-level-order-traversal)
            * [Binary Tree Level Order Traversal II](#binary-tree-level-order-traversal-ii)
        * [Leaf-Similar Trees](#leaf-similar-trees)

    * [前中后序遍历](#前中后序遍历)
        * [Binary Tree Preorder Traversal](#binary-tree-preorder-traversal)
        * [Binary Tree Postorder Traversal](#binary-tree-postorder-traversal)
        * [3. 非递归实现二叉树的中序遍历](#3-非递归实现二叉树的中序遍历)
        * [Binary Tree Inorder Traversal](#binary-tree-inorder-traversal)
        * [Closest Binary Search Tree Value](#Closest-Binary-Search-Tree-Value)
        * [Range Sum of BST](#Range-Sum-of-BST)
        * [Binary Search Tree Iterator](#binary-search-tree-iterator)
        * [N-ary Tree Preorder Traversal](#n-ary-tree-preorder-traversal)
        * [N-ary Tree Postorder Traversal](#n-ary-tree-postorder-traversal)

    * [Vertical order traversal](#vertical-order-traversal)
        * [Vertical Order Traversal of a Binary Tree](#Vertical-Order-Traversal-of-a-Binary-Tree)
    * [Binary Search Tree](#bst)
        * [1. 修剪二叉查找树](#1-修剪二叉查找树)
        * [2. 寻找二叉查找树的第 k 个元素](#2-寻找二叉查找树的第-k-个元素)
        * [3. 把二叉查找树每个节点的值都加上比它大的节点的值](#3-把二叉查找树每个节点的值都加上比它大的节点的值)
        * [4. 二叉查找树的最近公共祖先](#4-二叉查找树的最近公共祖先)
        * [Convert Sorted Array to Binary Search Tree](#Convert-Sorted-Array-to-Binary-Search-Tree)
        * [7. 根据有序链表构造平衡的二叉查找树](#7-根据有序链表构造平衡的二叉查找树)
        * [8. 在二叉查找树中寻找两个节点，使它们的和为一个给定值](#8-在二叉查找树中寻找两个节点，使它们的和为一个给定值)
        * [9. 在二叉查找树中查找两个节点之差的最小绝对值](#9-在二叉查找树中查找两个节点之差的最小绝对值)
        * [Find Mode in Binary Search Tree](#Find-Mode-in-Binary-Search-Tree)
        * [Kth Smallest Element in a BST](#kth-smallest-element-in-a-bst)
        * [Minimum Absolute Difference in BST](#minimum-absolute-Difference-in-bst)
        * [Search in a Binary Search Tree](#search-in-a-binary-search-tree)
        * [Insert into a Binary Search Tree](#Insert-into-a-Binary-Search-Tree)
        * [Recover Binary Search Tree](#recover-binary-search-tree)
        * [Delete Node in a BST](#delete-node-in-a-bst)

    * [Trie](#trie)
        * [1. 实现一个 Trie](#1-实现一个-trie)
        * [2. 实现一个 Trie，用来求前缀和](#2-实现一个-trie，用来求前缀和)
        * [Design Add and Search Words Data Structure](#Design-Add-and-Search-Words-Data-Structure)
<!-- GFM-TOC -->


## Recursive

Due to the recursive nature of binary trees, many problems can be solve by recursions.

<!-- @include ../leetcode/0104.maximum-depth-of-binary-tree.md -->
### Maximum Depth of Binary Tree
[104. Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/)

```html
Given the root of a binary tree, return its maximum depth.

A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

Example 1:
    3
   / \
  9   20
     /  \
   15    7
Input: root = [3,9,20,null,null,15,7]
Output: 3
Example 2:

Input: root = [1,null,2]
Output: 2
Example 3:

Input: root = []
Output: 0
Example 4:

Input: root = [0]
Output: 1
```

```javascript
var maxDepth = function(root) {
    if (!root) {
        return 0;
    }
    return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
};
```

<!-- @include ../leetcode/0110.balanced-binary-tree.md -->
### Balanced Binary Tree
[110. Balanced Binary Tree](https://leetcode.com/problems/balanced-binary-tree/)

```html
Given a binary tree, determine if it is height-balanced.

For this problem, a height-balanced binary tree is defined as:

a binary tree in which the left and right subtrees of every node differ in height by no more than 1.

Example 1:

    3
   / \
  9  20
    /  \
   15   7

Input: root = [3,9,20,null,null,15,7]
Output: true

Example 2:

       _ 1 _
      /     \
     2       2
    / \
   3   3
  / \
 4   4

Input: root = [1,2,2,3,3,null,null,4,4]
Output: false

Example 3:

Input: root = []
Output: true
```

```javascript
var isBalanced = function(root) {
    if (!root || !root.left && !root.right) {
        return true;
    }
    
    if (!isBalanced(root.left) || !isBalanced(root.right)) {
        return false;
    }
    
    const leftDepth = depthOfTree(root.left);
    const rightDepth = depthOfTree(root.right);
    
    return Math.abs(leftDepth - rightDepth) <= 1;
};
function depthOfTree(node) {
    if (!node) {
        return -1;
    }
    return Math.max(depthOfTree(node.left), depthOfTree(node.right)) + 1;
}
```

<!-- @include ../leetcode/0543.diameter-of-binary-tree.md -->
## Diameter of Binary Tree
[543. Diameter of Binary Tree](https://leetcode.com/problems/diameter-of-binary-tree/)

```html
Given the root of a binary tree, return the length of the diameter of the tree.

The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.

The length of a path between two nodes is represented by the number of edges between them.

Example 1:
        1
       / \
      2   3
     / \
    4   5
Input: root = [1,2,3,4,5]
Output: 3
Explanation: 3is the length of the path [4,2,1,3] or [5,2,1,3].

Example 2:
Input: root = [1,2]
Output: 1
```

```javascript
var diameterOfBinaryTree = function(root) {
    let diameter = 0;
    
    function depthOfTree(node) {
        if (!node) { return 0; }
        const leftDepth = depthOfTree(node.left);
        const rightDepth = depthOfTree(node.right);
        
        diameter = Math.max(diameter, leftDepth + rightDepth);
        
        return 1 + Math.max(leftDepth, rightDepth);
    }
    
    depthOfTree(root);
    return diameter
};
```
<!-- @include-end ../leetcode/0543.diameter-of-binary-tree.md -->

### Diameter of Binary Tree
Diameter of the binary tree = left depth + right depth

### 4. 翻转树

226\. Invert Binary Tree (Easy)

[Leetcode](https://leetcode.com/problems/invert-binary-tree/description/) / [力扣](https://leetcode-cn.com/problems/invert-binary-tree/description/)

```java
public TreeNode invertTree(TreeNode root) {
    if (root == null) return null;
    TreeNode left = root.left;  // 后面的操作会改变 left 指针，因此先保存下来
    root.left = invertTree(root.right);
    root.right = invertTree(left);
    return root;
}
```

### 5. 归并两棵树

617\. Merge Two Binary Trees (Easy)

[Leetcode](https://leetcode.com/problems/merge-two-binary-trees/description/) / [力扣](https://leetcode-cn.com/problems/merge-two-binary-trees/description/)

```html
Input:
       Tree 1                     Tree 2
          1                         2
         / \                       / \
        3   2                     1   3
       /                           \   \
      5                             4   7

Output:
         3
        / \
       4   5
      / \   \
     5   4   7
```

```java
public TreeNode mergeTrees(TreeNode t1, TreeNode t2) {
    if (t1 == null && t2 == null) return null;
    if (t1 == null) return t2;
    if (t2 == null) return t1;
    TreeNode root = new TreeNode(t1.val + t2.val);
    root.left = mergeTrees(t1.left, t2.left);
    root.right = mergeTrees(t1.right, t2.right);
    return root;
}
```
## Path Sum

<!-- @include ../leetcode/0112.path-sum.md -->
### Path Sum
[112. Path Sum](https://leetcode.com/problems/path-sum/)

```html
Given the root of a binary tree and an integer targetSum, return true if the tree has a root-to-leaf path such that adding up all the values along the path equals targetSum.

A leaf is a node with no children.

Example 1:

              5
             / \
            4   8
           /   / \
          11  13  4
         /  \      \
        7    2      1

Input: root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22
Output: true

Example 2:
    1
   / \
  2   3
Input: root = [1,2,3], targetSum = 5
Output: false

Example 3:
Input: root = [1,2], targetSum = 0
Output: false
```

```javascript
var hasPathSum = function(root, targetSum) {
    if (!root) { return false; }
    if (!root.left && !root.right && targetSum === root.val) {
        return true;
    }
    return hasPathSum(root.left, targetSum - root.val) || hasPathSum(root.right, targetSum - root.val);
};
```

<!-- @include ../leetcode/0113.path-sum-ii.md -->
### Path Sum II
[113. Path Sum II](https://leetcode.com/problems/path-sum-ii/)

```html
Given the root of a binary tree and an integer targetSum, return all root-to-leaf paths where each path's sum equals targetSum.

A leaf is a node with no children.

Example 1:
Input: root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
Output: [[5,4,11,2],[5,8,4,5]]

Example 2:
Input: root = [1,2,3], targetSum = 5
Output: []

Example 3:
Input: root = [1,2], targetSum = 0
Output: []
```

```javascript
var pathSum = function(root, targetSum) {
    const output = [];
    helperFunction(root, targetSum, [], output);
    return output;
};
function helperFunction(node, targetSum, pathes, output) {
    if (node === null) { return; }

    let newVal = targetSum - node.val;
    pathes.push(node.val);

    if (!node.left && !node.right && newVal ===0) {
        output.push([...pathes])
    }

    helperFunction(node.left, newVal, [...pathes], output);
    helperFunction(node.right, newVal, [...pathes], output);
}
```

<!-- @include ../leetcode/0437.path-sum-iii.md -->
### Path Sum III
[437. Path Sum III](https://leetcode.com/problems/path-sum-iii/)

```html
Given the root of a binary tree and an integer targetSum, return the number of paths where the sum of the values along the path equals targetSum.

The path does not need to start or end at the root or a leaf, but it must go downwards (i.e., traveling only from parent nodes to child nodes).

Example 1:
Input: root = [10,5,-3,3,2,null,11,3,-2,null,1], targetSum = 8
Output: 3
Explanation: The paths that sum to 8 are shown.

Example 2:
Input: root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
Output: 3
```

```javascript
var pathSum = function(root, sum) {
    if (!root) { return 0; }
    return pathSumStartWithRoot(root, sum) + pathSum(root.left, sum) + pathSum(root.right, sum);
};
function pathSumStartWithRoot(root, sum) {
    if (!root) { return 0; }
    let pathSum = 0;
    if (root.val === sum) { pathSum++ }
    pathSum += pathSumStartWithRoot(root.left, sum - root.val) + pathSumStartWithRoot(root.right, sum - root.val);
    return pathSum;
}
```

### 7. 统计路径和等于一个数的路径数量

437\. Path Sum III (Easy)

[Leetcode](https://leetcode.com/problems/path-sum-iii/description/) / [力扣](https://leetcode-cn.com/problems/path-sum-iii/description/)

```html
root = [10,5,-3,3,2,null,11,3,-2,null,1], sum = 8

      10
     /  \
    5   -3
   / \    \
  3   2   11
 / \   \
3  -2   1

Return 3. The paths that sum to 8 are:

1.  5 -> 3
2.  5 -> 2 -> 1
3. -3 -> 11
```

路径不一定以 root 开头，也不一定以 leaf 结尾，但是必须连续。

```java
public int pathSum(TreeNode root, int sum) {
    if (root == null) return 0;
    int ret = pathSumStartWithRoot(root, sum) + pathSum(root.left, sum) + pathSum(root.right, sum);
    return ret;
}

private int pathSumStartWithRoot(TreeNode root, int sum) {
    if (root == null) return 0;
    int ret = 0;
    if (root.val == sum) ret++;
    ret += pathSumStartWithRoot(root.left, sum - root.val) + pathSumStartWithRoot(root.right, sum - root.val);
    return ret;
}
```

<!-- @include ../leetcode/0572.subtree-of-another-tree.md -->
### Subtree of Another Tree
[572. Subtree of Another Tree](https://leetcode.com/problems/subtree-of-another-tree/)

```html
Given the roots of two binary trees root and subRoot, return true if there is a subtree of root with the same structure and node values of subRoot and false otherwise.

A subtree of a binary tree tree is a tree that consists of a node in tree and all of this node's descendants. The tree tree could also be considered as a subtree of itself.

Example 1:
     3        
    / \
   4   5
  / \
 1   2

   4
  / \
 1   2

Input: root = [3,4,5,1,2], subRoot = [4,1,2]
Output: true

Example 2:

     3
    / \
   4   5
  / \
 1   2
    /
   0

Given tree t:
   4
  / \
 1   2

Input: root = [3,4,5,1,2,null,null,0], subRoot = [4,1,2]
Output: false
```

```javascript
var isSubtree = function(s, t) {
    if (s === null && t === null) {
        return true;
    }
    if (s === null || t === null) {
        return false;
    }

    const isSubtreeOnLeft = isSubtree(s.left, t);
    const isSubtreeOnRight = isSubtree(s.right, t);
    
    return isSame(s, t) || isSubtreeOnLeft || isSubtreeOnRight;
};
function isSame(tree1, tree2) {
    if (!tree1 && !tree2) {
        return true;
    }
    if (tree1 === null || tree2 === null) {
        return false;
    }
    
    return tree1.val === tree2.val
        && isSame(tree1.left, tree2.left)
        && isSame(tree1.right, tree2.right)
}
```

<!-- @include ../leetcode/0101.symmetric-tree.md -->
### Symmetric Tree
[101. Symmetric Tree](https://leetcode.com/problems/symmetric-tree/)

```html
Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).

Example 1:
        1
      /   \
     2     2
    / \   / \
   3   4 3   4 
Input: root = [1,2,2,3,4,4,3]
Output: true

Example 2:
Input: root = [1,2,2,null,3,null,3]
Output: false
```

```javascript
var isSymmetric = function(root) {
    if (root === null) { return true; }
    return isMirror(root, root);
}
function isMirror(node1, node2) {
    if (node1 === null && node2 === null) { return true; }
    if (node1 === null || node2 === null) { return false; }
    return node1.val === node2.val
        && isMirror(node1.left, node2.right)
        && isMirror(node1.right, node2.left);
}
```

<!-- @include ../leetcode/0111.minimum-depth-of-binary-tree.md -->
### Minimum Depth of Binary Tree
[111. Minimum Depth of Binary Tree](https://leetcode.com/problems/minimum-depth-of-binary-tree/)

```html
Given a binary tree, find its minimum depth.

The minimum depth is the number of nodes along the shortest path from the root node down to the nearest leaf node.

Note: A leaf is a node with no children.

Example 1:
    3
   / \
  9   20
     /  \
    15   7
Input: root = [3,9,20,null,null,15,7]
Output: 2
Example 2:

Input: root = [2,null,3,null,4,null,5,null,6]
Output: 5
```

```javascript
var minDepth = function(root) {
    if (root == null) return 0;
    if (!root.left && !root.right) {
        return 1;
    }
    
    let left = minDepth(root.left);
    let right = minDepth(root.right);
    if (left === 0 || right === 0) {
        return left + right + 1;
    }
    return Math.min(left, right) + 1;
};
```

树的根节点到叶子节点的最小路径长度

```java
public int minDepth(TreeNode root) {
    if (root == null) return 0;
    int left = minDepth(root.left);
    int right = minDepth(root.right);
    if (left == 0 || right == 0) return left + right + 1;
    return Math.min(left, right) + 1;
}
```

### 11. 统计左叶子节点的和

404\. Sum of Left Leaves (Easy)

[Leetcode](https://leetcode.com/problems/sum-of-left-leaves/description/) / [力扣](https://leetcode-cn.com/problems/sum-of-left-leaves/description/)

```html
    3
   / \
  9  20
    /  \
   15   7

There are two left leaves in the binary tree, with values 9 and 15 respectively. Return 24.
```

```java
public int sumOfLeftLeaves(TreeNode root) {
    if (root == null) return 0;
    if (isLeaf(root.left)) return root.left.val + sumOfLeftLeaves(root.right);
    return sumOfLeftLeaves(root.left) + sumOfLeftLeaves(root.right);
}

private boolean isLeaf(TreeNode node){
    if (node == null) return false;
    return node.left == null && node.right == null;
}
```

<!-- @include ../leetcode/0687.longest-univalue-path.md -->
### Longest Univalue Path
[687.Longest Univalue Path](https://leetcode.com/problems/longest-univalue-path/)

```html
Given the root of a binary tree, return the length of the longest path, where each node in the path has the same value. This path may or may not pass through the root.

The length of the path between two nodes is represented by the number of edges between them.

Example 1:
        5
       / \
      4   5
     / \   \
    1   1   5
Input: root = [5,4,5,1,1,5]
Output: 2

Example 2:
Input: root = [1,4,5,4,4,5]
Output: 2
```

```javascript
var longestUnivaluePath = function(root) {
    let count = 0;
    
    function longestUnivaluePathHelper(node) {
        if (!node) { return 0; }

        let leftCount = longestUnivaluePathHelper(node.left);
        let rightCount = longestUnivaluePathHelper(node.right);
        
        if (node.left && node.left.val === node.val) {
            leftCount++;
        } else {
            leftCount = 0;
        }
        
        if (node.right && node.right.val === node.val) {
            rightCount++;
        } else {
            rightCount = 0;
        }
        
        count = Math.max(count, leftCount + rightCount);
        return Math.max(leftCount, rightCount);
    }
    
    longestUnivaluePathHelper(root);
    return count;
};
```

<!-- @include ../leetcode/0337.house-robber-iii.md -->
### House Robber III
[337. House Robber III](https://leetcode.com/problems/house-robber-iii/)

```html
The thief has found himself a new place for his thievery again. There is only one entrance to this area, called root.

Besides the root, each house has one and only one parent house. After a tour, the smart thief realized that all houses in this place form a binary tree. It will automatically contact the police if two directly-linked houses were broken into on the same night.

Given the root of the binary tree, return the maximum amount of money the thief can rob without alerting the police.

Example 1:

     3
    / \
   2   3
    \   \
     3   1

Input: root = [3,2,3,null,3,null,1]
Output: 7
Explanation: Maximum amount of money the thief can rob = 3 + 3 + 1 = 7.

Example 2:

        3
      /   \
     4     5
    / \     \
   1   3     1

Input: root = [3,4,5,1,3,null,1]
Output: 9
Explanation: Maximum amount of money the thief can rob = 4 + 5 = 9.
```

```javascript
var rob = function(root) {
    if (!root) { return 0; }
    const { robbed, notRobbed } = robHelper(root);
    return Math.max(robbed, notRobbed);
};

function robHelper(node) {
    if (!node) {
        return { robbed: 0, notRobbed: 0 };
    }

    const leftRob = robHelper(node.left);
    const rightRob = robHelper(node.right);
    
    const robbed = node.val + leftRob.notRobbed + rightRob.notRobbed;
    const notRobbed = Math.max(leftRob.robbed, leftRob.notRobbed) + Math.max(rightRob.robbed, rightRob.notRobbed);
    return { robbed, notRobbed };
}
```


<!-- @include ../leetcode/0671.second-minimum-node-in-a-binary-tree.md -->
### Second Minimum Node In a Binary Tree
[671. Second Minimum Node In a Binary Tree](https://leetcode.com/problems/second-minimum-node-in-a-binary-tree/)

```html
Given a non-empty special binary tree consisting of nodes with the non-negative value, where each node in this tree has exactly two or zero sub-node. If the node has two sub-nodes, then this node's value is the smaller value among its two sub-nodes. More formally, the property root.val = min(root.left.val, root.right.val) always holds.

Given such a binary tree, you need to output the second minimum value in the set made of all the nodes' value in the whole tree.

If no such second minimum value exists, output -1 instead.

Example 1:
        2
      /   \
     2     5
          / \
         5   7
Input: root = [2,2,5,null,null,5,7]
Output: 5
Explanation: The smallest value is 2, the second smallest value is 5.

Example 2:
        2
      /   \
     2     2
Input: root = [2,2,2]
Output: -1
Explanation: The smallest value is 2, but there isn't any second smallest value.
```

```javascript
var findSecondMinimumValue = function(root) {
    if (!root) {
        return -1;
    }
    if (!root.left && !root.right) {
        return -1;
    }
    
    const leftSecMin = 
        root.left.val === root.val
        ? findSecondMinimumValue(root.left)
        : root.left.val;

    const rightSecMin = 
        root.right.val === root.val
        ? findSecondMinimumValue(root.right)
        : root.right.val;

    if (leftSecMin != -1 && rightSecMin != -1) {
        return Math.min(leftSecMin, rightSecMin);
    }
    
    if (leftSecMin != -1) {
        return leftSecMin;
    }
    if (rightSecMin != -1) {
        return rightSecMin;
    }
    
    return -1;
};
```

## Lowest Common Ancestor

<!-- @include ../leetcode/0236.lowest-common-ancestor-of-a-binary-tree.md -->
### Lowest Common Ancestor of a Binary Tree
[236. Lowest Common Ancestor of a Binary Tree](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/)
```html
Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.

According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes v and w as the lowest node in T that has both v and w as descendants (where we allow a node to be a descendant of itself).”

        _______3______
       /              \
    ___5__          ___1__
   /      \        /      \
   6      _2       0       8
         /  \
         7   4
For example, the lowest common ancestor (LCA) of nodes 5 and 1 is 3. Another example is LCA of nodes 5 and 4 is 5, since a node can be a descendant of itself according to the LCA definition.
```

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

<!-- @include ../leetcode/0235.lowest-common-ancestor-of-a-binary-search-tree.md -->
### Lowest Common Ancestor of a Binary Search Tree
[235. Lowest Common Ancestor of a Binary Search Tree](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/)

```html
Given a binary search tree (BST), find the lowest common ancestor (LCA) of two given nodes in the BST.

According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).”

Example 1:
        ____6____
       /         \
     _2_         _8_
    /   \       /   \
   0     4     7     9
        / \
       3   5
Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
Output: 6
Explanation: The LCA of nodes 2 and 8 is 6.

Example 2:
        ____6____
       /         \
     _2_         _8_
    /   \       /   \
   0     4     7     9
        / \
       3   5
Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4
Output: 2
Explanation: The LCA of nodes 2 and 4 is 2, since a node can be a descendant of itself according to the LCA definition.

Example 3:
Input: root = [2,1], p = 2, q = 1
Output: 2
```

```javascript
var lowestCommonAncestor = function(root, p, q) {
    if (root === null) { return null; }
    if (p.val > root.val && q.val > root.val) {
        return lowestCommonAncestor(root.right, p, q);
    }
    if (p.val < root.val && q.val < root.val) {
        return lowestCommonAncestor(root.left, p, q);
    }
    return root;
};
```

<!-- @include ../leetcode/1650.lowest-common-ancestor-of-a-binary-tree-iii.md -->
### Lowest Common Ancestor of a Binary Tree III
[1650. Lowest Common Ancestor of a Binary Tree III](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree-iii/)

```html
Given two nodes of a binary tree p and q, return their lowest common ancestor (LCA).

Each node will have a reference to its parent node. The definition for Node is below:

class Node {
    public int val;
    public Node left;
    public Node right;
    public Node parent;
}
According to the definition of LCA on Wikipedia: "The lowest common ancestor of two nodes p and q in a tree T is the lowest node that has both p and q as descendants (where we allow a node to be a descendant of itself)."

Example 1:
          __3__
         /     \
        5       1
       / \     / \
      6   2   0   8
         / \
        7   4
Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
Output: 3
Explanation: The LCA of nodes 5 and 1 is 3.

Example 2:
          __3__
         /     \
        5       1
       / \     / \
      6   2   0   8
         / \
        7   4
Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
Output: 5
Explanation: The LCA of nodes 5 and 4 is 5 since a node can be a descendant of itself according to the LCA definition.

Example 3:
Input: root = [1,2], p = 1, q = 2
Output: 1
```

using two pointers:
```javascript
var lowestCommonAncestor = function(p, q) {
    let nodeA = p;
    let nodeB = q; 
    while (nodeA !== nodeB) {
        nodeA = nodeA === null ? q : nodeA.parent;
        nodeB = nodeB === null ? p : nodeB.parent;        
    }
    return nodeA;
};
```

Set:
```javascript
var lowestCommonAncestor = function(p, q) {
    const set = new Set();
    while (p !== null) {
        set.add(p);
        p = p.parent;
    }
    while (q !== null) {
        if (set.has(q)) {
            return q;
        }
        q = q.parent;
    }
    return null;
};
```

## Serialize and Deserialize

<!-- @include ../leetcode/0297.serialize-and-deserialize-binary-tree.md -->
### Serialize and Deserialize Binary Tree
[297. Serialize and Deserialize Binary Tree](https://leetcode.com/problems/serialize-and-deserialize-binary-tree/)

```html
Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.

Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.

Clarification: The input/output format is the same as how LeetCode serializes a binary tree. You do not necessarily need to follow this format, so please be creative and come up with different approaches yourself.

Example 1:
    1
   / \
  2   3
     / \
    4   5
Input: root = [1,2,3,null,null,4,5]
Output: [1,2,3,null,null,4,5]

Example 2:
Input: root = []
Output: []

Example 3:
Input: root = [1]
Output: [1]

Example 4:
Input: root = [1,2]
Output: [1,2]
```

```javascript
var serialize = function(root) {
    return serializeHelper(root).toString();
};
var serializeHelper = function (root) {
    if (!root) {
        return ['null'];
    }
    return [
        root.val,
        ...serializeHelper(root.left),
        ...serializeHelper(root.right),
    ];
};
var deserialize = function(data) {
    if (!data || data.length === 0) {
        return null;
    }
    return deserializeHelper(data.split(','));
};
var deserializeHelper = function (lst) {
    if (lst.length < 1) {
        return null;
    }
    let val = lst.shift();
	if (val === 'null') {
        return null;
    }
    var root = new TreeNode(val);
    root.left = deserializeHelper(lst);
    root.right = deserializeHelper(lst);
    return root;
};
```

<!-- @include ../leetcode/0449.serialize-and-deserialize-bst.md -->
### Serialize and Deserialize BST
[449. Serialize and Deserialize BST](https://leetcode.com/problems/serialize-and-deserialize-bst)

```html
Serialization is converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.

Design an algorithm to serialize and deserialize a binary search tree. There is no restriction on how your serialization/deserialization algorithm should work. You need to ensure that a binary search tree can be serialized to a string, and this string can be deserialized to the original tree structure.

The encoded string should be as compact as possible.

Example 1:
Input: root = [2,1,3]
Output: [2,1,3]

Example 2:
Input: root = []
Output: []
```

```javascript
var serialize = function(root) {
    return JSON.stringify(serializeHelper(root));
};
function serializeHelper(node) {
    if (node === null) {
        return [];
    }
    return [
        node.val,
        ...serializeHelper(node.left),
        ...serializeHelper(node.right)
    ];
}
var deserialize = function(data) {
    return deserializeHelper(JSON.parse(data));
};
function deserializeHelper(array) {
    if (!array || array.length === 0) {
        return null;
    }
    const node = new TreeNode(array[0]);
    node.left = deserializeHelper(array.filter(n => n < array[0]));
    node.right = deserializeHelper(array.filter(n => n > array[0]));
    return node;
}
```

## Tree Path Depth

<!-- @include ../leetcode/0124.binary-tree-maximum-path-sum.md -->
### Binary Tree Maximum Path Sum
[124. Binary Tree Maximum Path Sum](https://leetcode.com/problems/binary-tree-maximum-path-sum/)

```html
A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence at most once. Note that the path does not need to pass through the root.

The path sum of a path is the sum of the node's values in the path.

Given the root of a binary tree, return the maximum path sum of any path.

Example 1:
Input: root = [1,2,3]
Output: 6
Explanation: The optimal path is 2 -> 1 -> 3 with a path sum of 2 + 1 + 3 = 6.

Example 2:
Input: root = [-10,9,20,null,null,15,7]
Output: 42
Explanation: The optimal path is 15 -> 20 -> 7 with a path sum of 15 + 20 + 7 = 42.
```

```javascript
var maxPathSum = function(root) {
    let max = -Infinity;
    
    function maxPathSumHelper(node) {
        if (node === null) { return 0; }
        
        const leftSum = maxPathSumHelper(node.left);
        const rightSum = maxPathSumHelper(node.right);
        
        const allPathSum = leftSum + rightSum + node.val;
        const leftPathSum = leftSum + node.val;
        const rightPathSum = rightSum + node.val;
        
        max = Math.max(max, node.val, allPathSum, leftPathSum, rightPathSum);
        return Math.max(node.val, leftPathSum, rightPathSum);
    }
    
    maxPathSumHelper(root);
    
    return max;
};
```
<!-- @include-end ../leetcode/0124.binary-tree-maximum-path-sum.md -->

<!-- @include ../leetcode/0543.diameter-of-binary-tree.md -->
## Diameter of Binary Tree
[543. Diameter of Binary Tree](https://leetcode.com/problems/diameter-of-binary-tree/)

```html
Given the root of a binary tree, return the length of the diameter of the tree.

The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.

The length of a path between two nodes is represented by the number of edges between them.

Example 1:
        1
       / \
      2   3
     / \
    4   5
Input: root = [1,2,3,4,5]
Output: 3
Explanation: 3is the length of the path [4,2,1,3] or [5,2,1,3].

Example 2:
Input: root = [1,2]
Output: 1
```

```javascript
var diameterOfBinaryTree = function(root) {
    let diameter = 0;
    
    function depthOfTree(node) {
        if (!node) { return 0; }
        const leftDepth = depthOfTree(node.left);
        const rightDepth = depthOfTree(node.right);
        
        diameter = Math.max(diameter, leftDepth + rightDepth);
        
        return 1 + Math.max(leftDepth, rightDepth);
    }
    
    depthOfTree(root);
    return diameter
};
```

### Binary Tree Right Side View
[199. Binary Tree Right Side View](https://leetcode.com/problems/binary-tree-right-side-view/)
```javascript
var rightSideView = function(root) {
    if (root === null) { return []; }
    // return rightSideViewBfs(root)
    const output = [];
    rightSideViewDfs(root, 0, output);
    return output;
};

function rightSideViewDfs(node, level, output) {
    if (!node) { return; }
    if (!output[level]) {
        output[level] = node.val;
    }
    rightSideViewDfs(node.right, level + 1, output);
    rightSideViewDfs(node.left, level + 1, output);
}

function rightSideViewBfs(root) {
    let queue = [root];
    let output = [];
    while (queue.length > 0) {
        const nextQueue = [];
        let lastVal;
        for (const node of queue) {
            if (!node) { continue; }
            lastVal = node.val;
            if (node.left) { nextQueue.push(node.left); }
            if (node.right) { nextQueue.push(node.right); }
        }
        output.push(lastVal);
        queue = nextQueue;
    }
    return output;
}
```

<!-- @include ../leetcode/0156.binary-tree-upside-down.md -->
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


<!-- @include ../leetcode/0366.find-leaves-of-binary-tree.md -->
## Find Leaves of Binary Tree
[366. Find Leaves of Binary Tree](https://leetcode.com/problems/find-leaves-of-binary-tree/)
```html
Given a binary tree, collect a tree's nodes as if you were doing this: Collect and remove all leaves, repeat until the tree is empty.

Example:
Given binary tree
          1
         / \
        2   3
       / \     
      4   5    
Returns [4, 5, 3], [2], [1].
```

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
<!-- @include ../leetcode/0951.flip-equivalent-binary-trees.md -->
### Flip Equivalent Binary Trees
[951. Flip Equivalent Binary Trees](https://leetcode.com/problems/flip-equivalent-binary-trees/)

```html
For a binary tree T, we can define a flip operation as follows: choose any node, and swap the left and right child subtrees.

A binary tree X is flip equivalent to a binary tree Y if and only if we can make X equal to Y after some number of flip operations.

Given the roots of two binary trees root1 and root2, return true if the two trees are flip equivelent or false otherwise.

Example 1:

Flipped Trees Diagram
Input: root1 = [1,2,3,4,5,6,null,null,null,7,8], root2 = [1,3,2,null,6,4,5,null,null,null,null,8,7]
Output: true
Explanation: We flipped at nodes with values 1, 3, and 5.
Example 2:

Input: root1 = [], root2 = []
Output: true
Example 3:

Input: root1 = [], root2 = [1]
Output: false
Example 4:

Input: root1 = [0,null,1], root2 = []
Output: false
Example 5:

Input: root1 = [0,null,1], root2 = [0,1]
Output: true
```

```javascript
var flipEquiv = function(root1, root2) {
    if (root1 === null && root2 === null) {
        return true;
    }
    
    if (root1?.val !== root2?.val) {
        return false;
    }

    return (
        flipEquiv(root1.left, root2.right) && flipEquiv(root1.right, root2.left)
        || flipEquiv(root1.left, root2.left) && flipEquiv(root1.right, root2.right)
    );
};
```

<!-- @include ../leetcode/0965.univalued-binary-tree.md -->
### Univalued Binary Tree
[965. Univalued Binary Tree](https://leetcode.com/problems/univalued-binary-tree/)

```html
A binary tree is univalued if every node in the tree has the same value.

Return true if and only if the given tree is univalued.

Example 1:
        1
      /   \
     1     1
    / \     \
   1   1     1
Input: [1,1,1,1,1,null,1]
Output: true

Example 2:
        2
      /   \
     2     2
    / \
   5   2
Input: [2,2,2,5,2]
Output: false
```

```javascript
var isUnivalTree = function(root) {
    if (root === null) { return true; }
    return isUnivalTreeHelper(root, root.val);
};
var isUnivalTreeHelper = function(node, val) {
    if (!node) {
        return true;
    }
    return node.val == val && 
        isUnivalTreeHelper(node.left, val) &&
        isUnivalTreeHelper(node.right, val);    
}
```
## Tree Pruning
Removal happens in next resursion. For example:
```javascript
function prune(node) {
    if (condition is true) { return null; }
    root.left = prune(root.left);
    root.right = prune(root.right);
    if (some condition) { return node or null; }
}
```

<!-- @include ../leetcode/0814.binary-tree-pruning.md -->
### Binary Tree Pruning
[814. Binary Tree Pruning](https://leetcode.com/problems/binary-tree-pruning/)

```html
We are given the head node root of a binary tree, where additionally every node's value is either a 0 or a 1.

Return the same tree where every subtree (of the given tree) not containing a 1 has been removed.

(Recall that the subtree of a node X is X, plus every node that is a descendant of X.)

Example 1:
Input: [1,null,0,0,1]
Output: [1,null,0,null,1]
 
Explanation: 
Only the red nodes satisfy the property "every subtree not containing a 1".
The diagram on the right represents the answer.
    1              1
     \              \
      0      =>      0
     / \              \
   (0)  1              1

Example 2:
Input: [1,0,1,0,0,0,1]
Output: [1,null,1,null,1]
      __1__              1
     /     \              \  
   (0)      1       =>     1
   / \     / \              \
 (0) (0) (0)  1              1

Example 3:
Input: [1,1,0,1,1,0,1,0]
Output: [1,1,0,1,1,null,1]

      __1__              1
     /     \           /   \  
    1       0     =>  1     0
   / \     / \       / \     \
  1   1  (0)  1     1   1     1
 /
(0)

Note:

The binary tree will have at most 200 nodes.
The value of each node will only be 0 or 1.
```

```javascript
var pruneTree = function(root) {
    if (root === null) { return null; }
    if (root.left === null && root.right === null && root.val === 0) {
        return null;
    }
    root.left = pruneTree(root.left);
    root.right = pruneTree(root.right);
    return (root.val === 1 || root.left || root.right) ? root : null;
}
```

<!-- @include ../leetcode/1325.delete-leaves-with-a-given-value.md -->
### Delete Leaves With a Given Value
[1325. Delete Leaves With a Given Value](https://leetcode.com/problems/delete-leaves-with-a-given-value/)

```html
Given a binary tree root and an integer target, delete all the leaf nodes with value target.

Note that once you delete a leaf node with value target, if it's parent node becomes a leaf node and has the value target, it should also be deleted (you need to continue doing that until you can't).

Example 1:
        1             1          1
      /   \          / \          \
     2     3    =>  2   3    =>    3
    /     / \            \          \
   2     2   4            4          4
Input: root = [1,2,3,2,null,2,4], target = 2
Output: [1,null,3,null,4]
Explanation: Leaf nodes in green with value (target = 2) are removed (Picture in left). 
After removing, new nodes become leaf nodes with value (target = 2) (Picture in center).

Example 2:
        1             1
      /   \          /
     3     3   =>   3
    / \              \
   3   2              2
Input: root = [1,3,3,3,2], target = 3
Output: [1,3,null,null,2]

Example 3:
        1          1        1      1
       /          /        /
      2    =>    2   =>   2   =>
     /          /
    2          2
   /
  2
Input: root = [1,2,null,2,null,2], target = 2
Output: [1]
Explanation: Leaf nodes in green with value (target = 2) are removed at each step.

Example 4:
Input: root = [1,1,1], target = 1
Output: []

Example 5:
Input: root = [1,2,3], target = 1
Output: [1,2,3]
```

```javascript
var removeLeafNodes = function(root, target) {
    if (root === null) { return null; }
    if (root.left === null && root.right === null && root.val === target) {
        return null;
    }
    root.left = removeLeafNodes(root.left, target);
    root.right = removeLeafNodes(root.right, target);
    return (root.val === target && root.left === null && root.right === null)
        ? null
        : root; 
};
```

<!-- @include ../leetcode/0129.sum-root-to-leaf-numbers.md -->
### Sum Root to Leaf Numbers
[129. Sum Root to Leaf Numbers](https://leetcode.com/problems/sum-root-to-leaf-numbers/)

```html
You are given the root of a binary tree containing digits from 0 to 9 only.

Each root-to-leaf path in the tree represents a number.

For example, the root-to-leaf path 1 -> 2 -> 3 represents the number 123.
Return the total sum of all root-to-leaf numbers. Test cases are generated so that the answer will fit in a 32-bit integer.

A leaf node is a node with no children.

Example 1:
    1
   / \
  2   3
Input: root = [1,2,3]
Output: 25
Explanation:
The root-to-leaf path 1->2 represents the number 12.
The root-to-leaf path 1->3 represents the number 13.
Therefore, sum = 12 + 13 = 25.

Example 2:
      4
    /   \
   9     0
  / \
 5   1

Input: root = [4,9,0,5,1]
Output: 1026
Explanation:
The root-to-leaf path 4->9->5 represents the number 495.
The root-to-leaf path 4->9->1 represents the number 491.
The root-to-leaf path 4->0 represents the number 40.
Therefore, sum = 495 + 491 + 40 = 1026.
```

```javascript
var sumNumbers = function(root) {
    const output = [];
    sumNumbersHelper(root, [], output);
    return output.reduce((memo, number) => memo + Number(number), 0);
};
function sumNumbersHelper(node, number, output) {
    const nextNumber = `${number}${node.val}`;
    if (node.left === null || node.right === null) {
        output.push(nextNumber);
        return;
    }
    sumNumbersHelper(node.left, nextNumber, output);
    sumNumbersHelper(node.right, nextNumber, output);
}
```

<!-- @include ../leetcode/0257.binary-tree-paths.md -->
### Binary Tree Paths
[257. Binary Tree Paths](https://leetcode.com/problems/binary-tree-paths/)

```html
Given the root of a binary tree, return all root-to-leaf paths in any order.

A leaf is a node with no children.

Example 1:
        1
      /   \
     2     3
    /
   5

Input: root = [1,2,3,null,5]
Output: ["1->2->5","1->3"]
Example 2:

Input: root = [1]
Output: ["1"]
```

```javascript
var binaryTreePaths = function(root) {
    const output = [];
    binaryTreePathsHelper(root, [], output);
    return output;
};
function binaryTreePathsHelper(node, paths, output) {
    if (node === null) { return; }
    const nextPaths = [...paths, node.val];
    if (node.left === null && node.right === null) {
        output.push([...paths, node.val].join('->'));
    }
    binaryTreePathsHelper(node.left, nextPaths, output);
    binaryTreePathsHelper(node.right, nextPaths, output);
}
```

<!-- @include ../leetcode/0508.most-frequent-subtree-sum.md -->
### Most Frequent Subtree Sum
[508. Most Frequent Subtree Sum](https://leetcode.com/problems/most-frequent-subtree-sum/)

```html
Given the root of a binary tree, return the most frequent subtree sum. If there is a tie, return all the values with the highest frequency in any order.

The subtree sum of a node is defined as the sum of all the node values formed by the subtree rooted at that node (including the node itself).

Example 1:
    5
   / \
  2   -3

Input: root = [5,2,-3]
Output: [2,-3,4]

Example 2:
    5
   / \
  2   -5
Input: root = [5,2,-5]
Output: [2]
```

```javascript
var findFrequentTreeSum = function(root) {
    const sumFreq = new Map();
    findFrequentTreeSumHelper(root, sumFreq);
    
    const maxFreq = Math.max(...sumFreq.values());
    const res = [];
    for (const [num, freq] of sumFreq) {
        if (freq === maxFreq) { res.push(num); }
    }
    return res;
};
function findFrequentTreeSumHelper(node, sumFreq) {
    if (node === null) { return 0; }

    const left = findFrequentTreeSumHelper(node.left, sumFreq);
    const right = findFrequentTreeSumHelper(node.right, sumFreq);
    const sum = left + right + node.val;
    sumFreq.set(sum, (sumFreq.get(sum) || 0) + 1);
    return sum;
}
```

<!-- @include ../leetcode/0968.binary-tree-cameras.md -->
### Binary Tree Cameras
[968. Binary Tree Cameras](https://leetcode.com/problems/binary-tree-cameras/)

```html
Given a binary tree, we install cameras on the nodes of the tree. 

Each camera at a node can monitor its parent, itself, and its immediate children.

Calculate the minimum number of cameras needed to monitor all nodes of the tree.

Example 1:


Input: [0,0,null,0,0]
Output: 1
Explanation: One camera is enough to monitor all nodes if placed as shown.
Example 2:


Input: [0,0,null,0,null,0,null,null,0]
Output: 2
Explanation: At least two cameras are needed to monitor all nodes of the tree. The above image shows one of the valid configurations of camera placement.
```

```javascript
// 0: not monitored yet
// 1: put a camera here
// 2: no camera, but can be monitored (a null)
var minCameraCover = function(root) {
    let total = 0;

    function helper(node) {
        if (node == null) { return 2; }
        const left = helper(node.left);
        const right = helper(node.right);

        if (left === 0 || right === 0) {
            total += 1;
            return 1;
        }

        if (left === 2 && right === 2) {
            return 0;
        }
        return 2;
    }
    
    if (helper(root) === 0) {
        total += 1;
    }
    return total;
};
```

<!-- @include ../leetcode/0979.distribute-coins-in-binary-tree.md -->
### Distribute Coins in Binary Tree
[979. Distribute Coins in Binary Tree](https://leetcode.com/problems/distribute-coins-in-binary-tree/)

```html
You are given the root of a binary tree with n nodes where each node in the tree has node.val coins and there are n coins total.

In one move, we may choose two adjacent nodes and move one coin from one node to another. (A move may be from parent to child, or from child to parent.)

Return the number of moves required to make every node have exactly one coin.

Example 1:
    3
  /   \
 0     0
Input: root = [3,0,0]
Output: 2
Explanation: From the root of the tree, we move one coin to its left child, and one coin to its right child.

Example 2:
    0
  /   \
 3     0
Input: root = [0,3,0]
Output: 3
Explanation: From the left child of the root, we move two coins to the root [taking two moves].  Then, we move one coin from the root of the tree to the right child.

Example 3:
    1
  /   \
 0     2

Input: root = [1,0,2]
Output: 2

Example 4:
    1
  /   \
 0     0
  \
   3
Input: root = [1,0,0,null,3]
Output: 4
```

```javascript
var distributeCoins = function(root) {
    let res = 0;

    function distributeCoinsHelper(node) {
        if (node === null) { return 0; }
        const left = distributeCoinsHelper(node.left);
        const right = distributeCoinsHelper(node.right);
        res += Math.abs(left) + Math.abs(right);
        return node.val + left + right - 1;
    }

    distributeCoinsHelper(root);
    return res;
};
```

<!-- @include ../leetcode/0100.same-tree.md -->
### Same Tree
[100. Same Tree](https://leetcode.com/problems/same-tree/)

```html
Given the roots of two binary trees p and q, write a function to check if they are the same or not.

Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.

Example 1:
    1           1
   / \         / \ 
  2   3       2   3  
Input: p = [1,2,3], q = [1,2,3]
Output: true

Example 2:
  1    1
 /      \
2        2
Input: p = [1,2], q = [1,null,2]
Output: false

Example 3:
    1        1
   / \      / \
  2   1    1   2
Input: p = [1,2,1], q = [1,1,2]
Output: false
```

```javascript
var isSameTree = function(p, q) {
    if (p === null && q === null) {
        return true;
    }
    if (p === null || q === null || p.val !== q.val) {
        return false;
    }
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
};
```

## Breath First Search

BFS can be used to traverse the tree by layers

### 1. 一棵树每层节点的平均数

637\. Average of Levels in Binary Tree (Easy)

[Leetcode](https://leetcode.com/problems/average-of-levels-in-binary-tree/description/) / [力扣](https://leetcode-cn.com/problems/average-of-levels-in-binary-tree/description/)

```java
public List<Double> averageOfLevels(TreeNode root) {
    List<Double> ret = new ArrayList<>();
    if (root == null) return ret;
    Queue<TreeNode> queue = new LinkedList<>();
    queue.add(root);
    while (!queue.isEmpty()) {
        int cnt = queue.size();
        double sum = 0;
        for (int i = 0; i < cnt; i++) {
            TreeNode node = queue.poll();
            sum += node.val;
            if (node.left != null) queue.add(node.left);
            if (node.right != null) queue.add(node.right);
        }
        ret.add(sum / cnt);
    }
    return ret;
}
```

<!-- @include ../leetcode/0513.find-bottom-left-tree-value.md -->
### Find Bottom Left Tree Value
[513. Find Bottom Left Tree Value](https://leetcode.com/problems/find-bottom-left-tree-value/)
```html
Given the root of a binary tree, return the leftmost value in the last row of the tree.

Example 1:
        2
       / \
      1   3
Input: root = [2,1,3]
Output: 1

Example 2:
             1
            / \
           2   3
          /   / \
         4   5   6
            /
           7
Input: root = [1,2,3,4,null,5,6,null,null,7]
Output: 7
```
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


<!-- @include ../leetcode/0958.check-completeness-of-a-binary-tree.md -->
### Check Completeness of a Binary Tree
[958. Check Completeness of a Binary Tree](https://leetcode.com/problems/check-completeness-of-a-binary-tree/)
```html
Given the root of a binary tree, determine if it is a complete binary tree.

In a complete binary tree, every level, except possibly the last, is completely filled, and all nodes in the last level are as far left as possible. It can have between 1 and 2h nodes inclusive at the last level h.

Example 1:
      1___
     /    \
    2      3
   / \    / 
  4   5  6
Input: root = [1,2,3,4,5,6]
Output: true
Explanation: Every level before the last is full (ie. levels with node-values {1} and {2, 3}), and all nodes in the last level ({4, 5, 6}) are as far left as possible.
Example 2:
      1__
     /   \
    2     3
   / \     \
  4   5     7
Input: root = [1,2,3,4,5,null,7]
Output: false
Explanation: The node with value 7 isn't as far left as possible.
```

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

<!-- @include ../leetcode/0429.n-ary-tree-level-order-traversal.md -->
### N-ary Tree Level Order Traversal
[429. N-ary Tree Level Order Traversal](https://leetcode.com/problems/n-ary-tree-level-order-traversal/)

```html
Given an n-ary tree, return the level order traversal of its nodes' values.

Nary-Tree input serialization is represented in their level order traversal, each group of children is separated by the null value (See examples).

Example 1:
               1
          -----|-----
         /     |     \
        3      2      4
       / \
      5   6
Input: root = [1,null,3,2,4,null,5,6]
Output: [[1],[3,2,4],[5,6]]

Example 2:
                  1
             /  /   \  \
            /  |     |   \
           2   3     4    5
              / \    |   / \
             6   7   8  9  10
                 |   |  |
                11  12  13
                 |
                14
Input: root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
Output: [[1],[2,3,4,5],[6,7,8,9,10],[11,12,13],[14]]
```
```javascript
var levelOrder = function(root) {
    const output = [];
    if (root === null) { return output; }

    let queue = [root];
    
    while (queue.length > 0) {
        const nextQueue = [];
        const nodeOfLevel = [];
        
        for (const node of queue) {
            nodeOfLevel.push(node.val);
            for (const child of node.children) {
                nextQueue.push(child);
            }
        }
        
        output.push(nodeOfLevel)
        queue = nextQueue;
    }
    return output;
};
```

<!-- @include ../leetcode/1302.deepest-leaves-sum.md -->
### Deepest Leaves Sum
[1302. Deepest Leaves Sum](https://leetcode.com/problems/deepest-leaves-sum/)

```html
Given the root of a binary tree, return the sum of values of its deepest leaves.

Example 1:
      1__
     /   \
    2     3
   / \     \
  4   5     6
 /           \
7             8
Input: root = [1,2,3,4,5,null,6,7,null,null,null,null,8]
Output: 15
Example 2:

Input: root = [6,7,8,2,7,1,3,9,null,1,4,null,null,null,5]
Output: 19
```

BFS
```javascript
var deepestLeavesSum = function(root) {
    let queue = [root];
    let lastQueue = [];
    
    while (queue.length > 0) {
        const nextQueue = [];
        for (const node of queue) {
            if (node.left) { nextQueue.push(node.left); }
            if (node.right) { nextQueue.push(node.right); }
        }
        lastQueue = [...queue];
        queue = nextQueue;
    }
    return lastQueue.reduce((sum, node) => sum + node.val, 0);
};
```

DFS
```javascript
var deepestLeavesSum = function(root) {
    let maxLevel = -1;
    let sum = 0;
    root && traverse(root, 0);

    function traverse(node, level) {
        if (node.left === null && node.right === null) {
            if (level === maxLevel) {
                sum += node.val;
            };
            if (level > maxLevel) {
                maxLevel = level;
                sum = node.val
            };
        };
        node.left && traverse(node.left, level + 1);
        node.right && traverse(node.right, level + 1);
    };
    return sum;
};
```

## Level Order Traversal
Breath First Search is the best approach for This.

<!-- @include ../leetcode/0102.binary-tree-level-order-traversal.md -->
### Binary Tree Level Order Traversal
[102. Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/)

```html
Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).

Example 1:
        3
       / \
      9   20
         /  \
        15   7
Input: root = [3,9,20,null,null,15,7]
Output: [[3],[9,20],[15,7]]
Example 2:

Input: root = [1]
Output: [[1]]
Example 3:

Input: root = []
Output: []
```

```javascript
var levelOrder = function(root) {
    let queue = [root];
    const output = [];
    
    while (queue.length > 0) {
        const nextQueue = [];
        const nodesLevel = [];
        for (const node of queue) {
            if (node === null) { continue; }
            nodesLevel.push(node.val);
            nextQueue.push(node.left);
            nextQueue.push(node.right);
        }
        if (nodesLevel.length > 0) { output.push(nodesLevel); }
        queue = nextQueue;
    }
    return output;
};
```

<!-- @include ../leetcode/0107.binary-tree-level-order-traversal-ii.md -->
### Binary Tree Level Order Traversal II
[107. Binary Tree Level Order Traversal II](https://leetcode.com/problems/binary-tree-level-order-traversal-ii/)

```html
Given the root of a binary tree, return the bottom-up level order traversal of its nodes' values. (i.e., from left to right, level by level from leaf to root).

Example 1:
    3
   / \
  9   20
     / \
   15   7
Input: root = [3,9,20,null,null,15,7]
Output: [[15,7],[9,20],[3]]

Example 2:
Input: root = [1]
Output: [[1]]

Example 3:
Input: root = []
Output: []
```

BFS
```javascript
var levelOrderBottom = function(root) {
    const output = [];
    let queue = [root];
    while (queue.length > 0) {
        const nextQueue = [];
        const level = [];
        for (const node of queue) {
            if (node === null) { continue; }
            level.push(node.val);
            nextQueue.push(node.left);
            nextQueue.push(node.right);
        }
        
        if (level.length > 0) { output.unshift(level); }
        queue = nextQueue;
    }
    return output;
};
```

DFS
```javascript
var levelOrderBottom = function(root) {
    const output = [];
    levelOrderBottomHelper(root, 0, output);
    return output.reverse();
};
function levelOrderBottomHelper(node, level, output) {
    if (node === null) { return; }
    if (!output[level]) { output[level] = []; }
    output[level].push(node.val);
    levelOrderBottomHelper(node.left, level + 1, output);
    levelOrderBottomHelper(node.right, level + 1, output);
}
```

<!-- @include ../leetcode/0589.n-ary-tree-preorder-traversal.md -->
### N-ary Tree Preorder Traversal
[589. N-ary Tree Preorder Traversal](https://leetcode.com/problems/0589.n-ary-tree-preorder-traversal/)

```html
Given the root of an n-ary tree, return the preorder traversal of its nodes' values.

Nary-Tree input serialization is represented in their level order traversal. Each group of children is separated by the null value (See examples)

 

Example 1:
               1
          -----|-----
         /     |     \
        3      2      4
       / \
      5   6
Input: root = [1,null,3,2,4,null,5,6]
Output: [1,3,5,6,2,4]
Example 2:
                  1
             /  /   \  \
            /  |     |   \
           2   3     4    5
              / \    |   / \
             6   7   8  9  10
                 |   |  |
                11  12  13
                 |
                14
Input: root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
Output: [1,2,3,6,7,11,14,4,8,12,5,9,13,10]
```

```javascript
var preorder = function(root) {
    const output = [];
    preorderTraverse(root, output);
    return output;
};
function preorderTraverse(node, output) {
    if (node === null) {
        return;
    }
    output.push(node.val);
    for (const child of node.children) {
        preorderTraverse(child, output);
    }
}
```

<!-- @include ../leetcode/0590.n-ary-tree-postorder-traversal.md -->
### N-ary Tree Postorder Traversal
[590. N-ary Tree Postorder Traversal](https://leetcode.com/problems/n-ary-tree-postorder-traversal/)

```html
Given the root of an n-ary tree, return the postorder traversal of its nodes' values.

Nary-Tree input serialization is represented in their level order traversal. Each group of children is separated by the null value (See examples)

Example 1:
               1
          -----|-----
         /     |     \
        3      2      4
       / \
      5   6
Input: root = [1,null,3,2,4,null,5,6]
Output: [5,6,3,2,4,1]
Example 2:
                  1
             /  /   \  \
            /  |     |   \
           2   3     4    5
              / \    |   / \
             6   7   8  9  10
                 |   |  |
                11  12  13
                 |
                14
Input: root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
Output: [2,6,14,11,7,3,12,8,4,13,9,10,5,1]
```

```javascript
var postorder = function(root) {
    const output = [];
    postorderTraverse(root, output);
    return output;
};
function postorderTraverse(node, output) {
    if (node === null) {
        return;
    }
    for (const child of node.children) {
        postorderTraverse(child, output);
    }
    output.push(node.val);
}
```


## 前中后序遍历

```html
    1
   / \
  2   3
 / \   \
4   5   6
```

- 层次遍历顺序：[1 2 3 4 5 6]
- 前序遍历顺序：[1 2 4 5 3 6]
- 中序遍历顺序：[4 2 5 1 3 6]
- 后序遍历顺序：[4 5 2 6 3 1]

层次遍历使用 BFS 实现，利用的就是 BFS 一层一层遍历的特性；而前序、中序、后序遍历利用了 DFS 实现。

前序、中序、后序遍只是在对节点访问的顺序有一点不同，其它都相同。

① 前序

```java
void dfs(TreeNode root) {
    visit(root);
    dfs(root.left);
    dfs(root.right);
}
```

② 中序

```java
void dfs(TreeNode root) {
    dfs(root.left);
    visit(root);
    dfs(root.right);
}
```

③ 后序

```java
void dfs(TreeNode root) {
    dfs(root.left);
    dfs(root.right);
    visit(root);
}
```

<!-- @include ../leetcode/0144.binary-tree-preorder-traversal.md -->
### Binary Tree Preorder Traversal
[144. Binary Tree Preorder Traversal](https://leetcode.com/problems/binary-tree-preorder-traversal/)

```html
Given the root of a binary tree, return the preorder traversal of its nodes' values.

Example 1:
Input: root = [1,null,2,3]
Output: [1,2,3]

Example 2:
Input: root = []
Output: []

Example 3:
Input: root = [1]
Output: [1]

Example 4:
Input: root = [1,2]
Output: [1,2]

Example 5:
Input: root = [1,null,2]
Output: [1,2]
```

Recursive

```javascript
var preorderTraversal = function(root) {
    return preorderTraversalHelper(root);
};
function preorderTraversalHelper(root) {
    if (root === null) {
        return [];
    }
    return [
        root.val,
        ...preorderTraversalHelper(root.left),
        ...preorderTraversalHelper(root.right)
    ]
}
```
Non-recursive

```javascript
var preorderTraversal = function(root) {
    const res = [];
    const stack = [root];
    while (stack.length > 0) {
        const node = stack.pop();
        if (node === null) { continue; }
        res.push(node.val);
        stack.push(node.right);
        stack.push(node.left);
    }
    return res;
};
```

<!-- @include ../leetcode/0145.binary-tree-postorder-traversal.md -->
### Binary Tree Postorder Traversal
[145. Binary Tree Postorder Traversal](https://leetcode.com/problems/binary-tree-postorder-traversal/)

```html
Given the root of a binary tree, return the postorder traversal of its nodes' values.

Example 1:
Input: root = [1,null,2,3]
Output: [3,2,1]

Example 2:
Input: root = []
Output: []

Example 3:
Input: root = [1]
Output: [1]

Example 4:
Input: root = [1,2]
Output: [2,1]

Example 5:
Input: root = [1,null,2]
Output: [2,1]
```

Recursive
```javascript
var postorderTraversal = function(root) {
    return postorderTraversalHelper(root)
};
function postorderTraversalHelper(node) {
    if (node === null) {
        return [];
    }
    return [
        ...postorderTraversalHelper(node.left),
        ...postorderTraversalHelper(node.right),
        node.val
    ]
}
```

Non-recursive
```javascript
var postorderTraversal = function(root) {
    const res = [];
    const stack = [root];
    while (stack.length > 0) {
        const node = stack.pop();
        if (node === null) { continue; }
        res.unshift(node.val);
        stack.push(node.left);
        stack.push(node.right);
    }
    return res;
};
```

<!-- @include ../leetcode/0094.binary-tree-inorder-traversal.md -->
### Binary Tree Inorder Traversal
[94. Binary Tree Inorder Traversal](https://leetcode.com/problems/binary-tree-inorder-traversal/)

```html
Given the root of a binary tree, return the inorder traversal of its nodes' values.

Example 1:
1
 \
  2
 / 
3
Input: root = [1,null,2,3]
Output: [1,3,2]

Example 2:
Input: root = []
Output: []

Example 3:
Input: root = [1]
Output: [1]

Example 4:
  1
 /
2
Input: root = [1,2]
Output: [2,1]

Example 5:
1
 \
  2
Input: root = [1,null,2]
Output: [1,2]
```

Recursive

```javascript
var inorderTraversal = function(root) {
    return inorderTraverse(root);
};
function inorderTraverse(node) {
    if (node === null) {
        return [];
    }
    return [
        ...inorderTraverse(node.left),
        node.val,
        ...inorderTraverse(node.right)
    ];
}
```
Non-recursive

```javascript
var inorderTraversal = function(root) {
    const res = [];
    const stack = [];
    let pointer = root;
    while (stack.length > 0 || pointer !== null) {
        if (pointer !== null) {
            stack.push(pointer);
            pointer = pointer.left;
        } else {
            pointer = stack.pop();
            res.push(pointer.val);
            pointer = pointer.right;
        }
    }
    return res;
};
```

### Closest Binary Search Tree Value
[270. Closest Binary Search Tree Value](https://leetcode.com/problems/closest-binary-search-tree-value/)
```javascript
var closestValue = function(root, target) {
    let minDistance = Infinity;
    let output = -1;
    function inOrder(node) {
        if (node === null) {
            return;
        }
        inOrder(node.left);
        const distance = Math.abs(node.val - target);
        if (distance < minDistance) {
            minDistance = Math.min(minDistance, Math.abs(node.val - target));
            output = node.val;
        }
        inOrder(node.right);
    }
    inOrder(root);
    return output;
};
```

<!-- @include ../leetcode/0173.binary-search-tree-iterator.md -->
### Binary Search Tree Iterator
[173. Binary Search Tree Iterator](https://leetcode.com/problems/binary-search-tree-iterator/)
```html
Implement an iterator over a binary search tree (BST). Your iterator will be initialized with the root node of a BST.

Callingnext()will return the next smallest number in the BST.

Note:next()andhasNext()should run in average O(1) time and uses O(h) memory, wherehis the height of the tree.
```

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


### Range Sum of BST
[938. Range Sum of BST](https://leetcode.com/problems/range-sum-of-bst/)
```javascript
var rangeSumBST = function(root, low, high) {
    let sum = 0;
    function inOrder(node) {
        if (node === null) {
            return;
        }
        inOrder(node.left);
        if (node.val >= low && node.val <= high) {
            sum += node.val;
        }
        inOrder(node.right);
    }
    inOrder(root);
    return sum;
};
```
## Vertical order traversal

<!-- @include ../leetcode/0987.vertical-order-traversal-of-a-binary-tree.md -->
### Vertical Order Traversal of a Binary Tree
[987. Vertical Order Traversal of a Binary Tree](https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/)


```html
Given the root of a binary tree, calculate the vertical order traversal of the binary tree.

For each node at position (row, col), its left and right children will be at positions (row + 1, col - 1) and (row + 1, col + 1) respectively. The root of the tree is at (0, 0).

The vertical order traversal of a binary tree is a list of top-to-bottom orderings for each column index starting from the leftmost column and ending on the rightmost column. There may be multiple nodes in the same row and same column. In such a case, sort these nodes by their values.

Return the vertical order traversal of the binary tree.

Example 1:

Input: root = [3,9,20,null,null,15,7]
Output: [[9],[3,15],[20],[7]]
Explanation:
Column -1: Only node 9 is in this column.
Column 0: Nodes 3 and 15 are in this column in that order from top to bottom.
Column 1: Only node 20 is in this column.
Column 2: Only node 7 is in this column.

Example 2:
Input: root = [1,2,3,4,5,6,7]
Output: [[4],[2],[1,5,6],[3],[7]]
Explanation:
Column -2: Only node 4 is in this column.
Column -1: Only node 2 is in this column.
Column 0: Nodes 1, 5, and 6 are in this column.
          1 is at the top, so it comes first.
          5 and 6 are at the same position (2, 0), so we order them by their value, 5 before 6.
Column 1: Only node 3 is in this column.
Column 2: Only node 7 is in this column.

Example 3:
Input: root = [1,2,3,4,6,5,7]
Output: [[4],[2],[1,5,6],[3],[7]]
Explanation:
This case is the exact same as example 2, but with nodes 5 and 6 swapped.
Note that the solution remains the same since 5 and 6 are in the same location and should be ordered by their values.
```

```javascript
var verticalTraversal = function(root) {
    const orders = [];
    inOrder(root, 0, 0, orders);
    orders.sort((a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2])

    const map = new Map();
    for (const [col, row, val] of orders) {
        if (!map.has(col)) { map.set(col, []); }
        map.get(col).push(val);
    }
    return [...map.values()];
};
function inOrder(node, row, col, orders) {
    if (node === null) {
        return;
    }
    inOrder(node.left, row + 1, col - 1, orders);
    orders.push([col, row, node.val]);
    inOrder(node.right, row + 1, col + 1, orders);
}
```

## BST

二叉查找树（BST）：根节点大于等于左子树所有节点，小于等于右子树所有节点。

二叉查找树中序遍历有序。

<!-- @include ../leetcode/0669.trim-a-binary-search-tree.md -->
### Trim a Binary Search Tree
[669. Trim a Binary Search Tree](https://leetcode.com/problems/trim-a-binary-search-tree/)

```html
Given the root of a binary search tree and the lowest and highest boundaries as low and high, trim the tree so that all its elements lies in [low, high]. Trimming the tree should not change the relative structure of the elements that will remain in the tree (i.e., any node's descendant should remain a descendant). It can be proven that there is a unique answer.

Return the root of the trimmed binary search tree. Note that the root may change depending on the given bounds.

Example 1:
    3            3
   / \          /
  0   4    =>  2 
   \          /
    2        1
   /
  1

Input: root = [1,0,2], low = 1, high = 2
Output: [1,null,2]

Example 2:
Input: root = [3,0,4,null,2,null,null,1], low = 1, high = 3
Output: [3,2,null,1]

Example 3:
Input: root = [1], low = 1, high = 2
Output: [1]

Example 4:
Input: root = [1,null,2], low = 1, high = 3
Output: [1,null,2]

Example 5:
Input: root = [1,null,2], low = 2, high = 4
Output: [2]
```

```javascript
var trimBST = function(root, low, high) {
    if (!root) {
        return null;
    }

    if (root.val > high) {
        return trimBST(root.left, low, high);
    }
    
    if (root.val < low) {
        return trimBST(root.right, low, high);
    }
    
    root.left = trimBST(root.left, low, high);
    root.right = trimBST(root.right, low, high);
    return root;
};
```

<!-- @include ../leetcode/0230.kth-smallest-element-in-a-bst.md -->
### Kth Smallest Element in a BST
[230. Kth Smallest Element in a BST](https://leetcode.com/problems/kth-smallest-element-in-a-bst/)

```html
Given the root of a binary search tree, and an integer k, return the kth (1-indexed) smallest element in the tree.

Example 1:

Input: root = [3,1,4,null,2], k = 1
Output: 1
Example 2:


Input: root = [5,3,6,2,4,null,null,1], k = 3
Output: 3
```

```javascript
var kthSmallest = function(root, k) {
    let res = [];
    let kth = 0;
    function kthSmallestHelper(node) {
        if (node === null) {
            return; 
        }
        kthSmallestHelper(node.left);
        res.push(node.val);
        if (res.length === k) {
            kth = node.val;
            return;
        }
        kthSmallestHelper(node.right);
    }
    kthSmallestHelper(root);
    return kth;
};
```

中序遍历解法：

```java
private int cnt = 0;
private int val;

public int kthSmallest(TreeNode root, int k) {
    inOrder(root, k);
    return val;
}

private void inOrder(TreeNode node, int k) {
    if (node == null) return;
    inOrder(node.left, k);
    cnt++;
    if (cnt == k) {
        val = node.val;
        return;
    }
    inOrder(node.right, k);
}
```

递归解法：

```java
public int kthSmallest(TreeNode root, int k) {
    int leftCnt = count(root.left);
    if (leftCnt == k - 1) return root.val;
    if (leftCnt > k - 1) return kthSmallest(root.left, k);
    return kthSmallest(root.right, k - leftCnt - 1);
}

private int count(TreeNode node) {
    if (node == null) return 0;
    return 1 + count(node.left) + count(node.right);
}
```

### 3. 把二叉查找树每个节点的值都加上比它大的节点的值

Convert BST to Greater Tree (Easy)

[Leetcode](https://leetcode.com/problems/convert-bst-to-greater-tree/description/) / [力扣](https://leetcode-cn.com/problems/convert-bst-to-greater-tree/description/)

```html
Input: The root of a Binary Search Tree like this:

              5
            /   \
           2     13

Output: The root of a Greater Tree like this:

             18
            /   \
          20     13
```

先遍历右子树。

```java
private int sum = 0;

public TreeNode convertBST(TreeNode root) {
    traver(root);
    return root;
}

private void traver(TreeNode node) {
    if (node == null) return;
    traver(node.right);
    sum += node.val;
    node.val = sum;
    traver(node.left);
}
```

### 4. 二叉查找树的最近公共祖先

235\. Lowest Common Ancestor of a Binary Search Tree (Easy)

[Leetcode](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/description/) / [力扣](https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-search-tree/description/)

```html
        _______6______
      /                \
  ___2__             ___8__
 /      \           /      \
0        4         7        9
        /  \
       3   5

For example, the lowest common ancestor (LCA) of nodes 2 and 8 is 6. Another example is LCA of nodes 2 and 4 is 2, since a node can be a descendant of itself according to the LCA definition.
```

```java
public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
    if (root.val > p.val && root.val > q.val) return lowestCommonAncestor(root.left, p, q);
    if (root.val < p.val && root.val < q.val) return lowestCommonAncestor(root.right, p, q);
    return root;
}
```

<!-- @include ../leetcode/0108.convert-sorted-array-to-binary-search-tree.md -->
### Convert Sorted Array to Binary Search Tree
[108. Convert Sorted Array to Binary Search Tree](https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/)

```html
Given an integer array nums where the elements are sorted in ascending order, convert it to a height-balanced binary search tree.

A height-balanced binary tree is a binary tree in which the depth of the two subtrees of every node never differs by more than one.

Example 1:

Input: nums = [-10,-3,0,5,9]
Output: [0,-3,9,-10,null,5]
Explanation: [0,-10,5,null,-3,null,9] is also accepted:

Example 2:

Input: nums = [1,3]
Output: [3,1]
Explanation: [1,3] and [3,1] are both a height-balanced BSTs.
```

```javascript
var sortedArrayToBST = function(nums) {
    if (nums.length === 0) {
        return null
    }
    const midIndex = Math.floor(nums.length / 2);
    const leftTree = sortedArrayToBST(nums.slice(0, midIndex));
    const rightTree = sortedArrayToBST(nums.slice(midIndex + 1));
    return new TreeNode(nums[midIndex], leftTree, rightTree);
};
```

### 7. 根据有序链表构造平衡的二叉查找树

109\. Convert Sorted List to Binary Search Tree (Medium)

[Leetcode](https://leetcode.com/problems/convert-sorted-list-to-binary-search-tree/description/) / [力扣](https://leetcode-cn.com/problems/convert-sorted-list-to-binary-search-tree/description/)

```html
Given the sorted linked list: [-10,-3,0,5,9],

One possible answer is: [0,-3,9,-10,null,5], which represents the following height balanced BST:

      0
     / \
   -3   9
   /   /
 -10  5
```

```java
public TreeNode sortedListToBST(ListNode head) {
    if (head == null) return null;
    if (head.next == null) return new TreeNode(head.val);
    ListNode preMid = preMid(head);
    ListNode mid = preMid.next;
    preMid.next = null;  // 断开链表
    TreeNode t = new TreeNode(mid.val);
    t.left = sortedListToBST(head);
    t.right = sortedListToBST(mid.next);
    return t;
}

private ListNode preMid(ListNode head) {
    ListNode slow = head, fast = head.next;
    ListNode pre = head;
    while (fast != null && fast.next != null) {
        pre = slow;
        slow = slow.next;
        fast = fast.next.next;
    }
    return pre;
}
```

### 8. 在二叉查找树中寻找两个节点，使它们的和为一个给定值

653\. Two Sum IV - Input is a BST (Easy)

[Leetcode](https://leetcode.com/problems/two-sum-iv-input-is-a-bst/description/) / [力扣](https://leetcode-cn.com/problems/two-sum-iv-input-is-a-bst/description/)

```html
Input:

    5
   / \
  3   6
 / \   \
2   4   7

Target = 9

Output: True
```

使用中序遍历得到有序数组之后，再利用双指针对数组进行查找。

应该注意到，这一题不能用分别在左右子树两部分来处理这种思想，因为两个待求的节点可能分别在左右子树中。

```java
public boolean findTarget(TreeNode root, int k) {
    List<Integer> nums = new ArrayList<>();
    inOrder(root, nums);
    int i = 0, j = nums.size() - 1;
    while (i < j) {
        int sum = nums.get(i) + nums.get(j);
        if (sum == k) return true;
        if (sum < k) i++;
        else j--;
    }
    return false;
}

private void inOrder(TreeNode root, List<Integer> nums) {
    if (root == null) return;
    inOrder(root.left, nums);
    nums.add(root.val);
    inOrder(root.right, nums);
}
```

<!-- @include ../leetcode/0530.minimum-absolute-difference-in-bst.md -->
### Minimum Absolute Difference in BST
[530. Minimum Absolute Difference in BST](https://leetcode.com/problems/minimum-absolute-difference-in-bst/)

```html
Given the root of a Binary Search Tree (BST), return the minimum absolute difference between the values of any two different nodes in the tree.

Example 1:
        4
     /     \
    2       6
   / \
  1   3

Input: root = [4,2,6,1,3]
Output: 1

Example 2:

        1
     /     \
    0       48
   / \
 12   49

Input: root = [1,0,48,null,null,12,49]
Output: 1
```

```javascript
var getMinimumDifference = function(root) {
    let minDiff = Infinity;
    let prevVal;
    
    function inorder(node) {
        if (!node) {
            return;
        }
        
        inorder(node.left);
        
        if (prevVal !== undefined) {
            minDiff = Math.min(minDiff, Math.abs(node.val - prevVal));
        }
        prevVal = node.val;
        
        inorder(node.right);
    }
    
    inorder(root);
    return minDiff;
};
```

<!-- @include ../leetcode/0700.search-in-a-binary-search-tree.md -->
### Search in a Binary Search Tree
[700. Search in a Binary Search Tree](https://leetcode.com/problems/search-in-a-binary-search-tree/)

```html
You are given the root of a binary search tree (BST) and an integer val.

Find the node in the BST that the node's value equals val and return the subtree rooted with that node. If such a node does not exist, return null.

Example 1:

        4
      /   \
     2     7
    / \
   1   3

Input: root = [4,2,7,1,3], val = 2
Output: [2,1,3]

Example 2:

        4
      /   \
     2     7
    / \
   1   3

Input: root = [4,2,7,1,3], val = 5
Output: []
```

```javascript
var searchBST = function(root, val) {
    if (root === null) { return null; }
    if (root.val === val) { return root; }
    if (root.val > val) {
        return searchBST(root.left, val);
    }
    return searchBST(root.right, val)
};
```

<!-- @include ../leetcode/0701.insert-into-a-binary-search-tree.md -->
### Insert into a Binary Search Tree
[701. Insert into a Binary Search Tree](https://leetcode.com/problems/insert-into-a-binary-search-tree/)

```html
You are given the root node of a binary search tree (BST) and a value to insert into the tree. Return the root node of the BST after the insertion. It is guaranteed that the new value does not exist in the original BST.

Notice that there may exist multiple valid ways for the insertion, as long as the tree remains a BST after insertion. You can return any of them.

Example 1:

        4                       4
      /   \                   /   \
     2     7    ====>        2     7
    / \                     / \   /
   1   3                   1   3 5

Or:
        5
      /   \
     2     7
    / \
   1   3
        \
         4
Input: root = [4,2,7,1,3], val = 5
Output: [4,2,7,1,3,5]
Explanation: Another accepted tree is:

Example 2:

Input: root = [40,20,60,10,30,50,70], val = 25
Output: [40,20,60,10,30,50,70,null,null,25]
Example 3:

Input: root = [4,2,7,1,3,null,null,null,null,null,null], val = 5
Output: [4,2,7,1,3,5]
```

```javascript
var insertIntoBST = function(root, val) {
    if (!root) { return new TreeNode(val); }
    if (val > root.val) {
        root.right = insertIntoBST(root.right, val);
    } else {
        root.left = insertIntoBST(root.left, val);
    }
    return root;
};
```

<!-- @include ../leetcode/0099.recover-binary-search-tree.md -->
### Recover Binary Search Tree
[99. Recover Binary Search Tree](https://leetcode.com/problems/recover-binary-search-tree/)

```html
You are given the root of a binary search tree (BST), where exactly two nodes of the tree were swapped by mistake. Recover the tree without changing its structure.

Follow up: A solution using O(n) space is pretty straight forward. Could you devise a constant space solution?

Example 1:

Input: root = [1,3,null,null,2]
Output: [3,1,null,null,2]
Explanation: 3 cannot be a left child of 1 because 3 > 1. Swapping 1 and 3 makes the BST valid.
Example 2:

Input: root = [3,1,4,null,null,2]
Output: [2,1,4,null,null,3]
Explanation: 2 cannot be in the right subtree of 3 because 2 < 3. Swapping 2 and 3 makes the BST valid.
```

```javascript
var recoverTree = function(root) {
    var node1, node2;
    var prev = new TreeNode(-Infinity);

    function inOrder(node) {
        if (!node) { return; }
        inOrder(node.left);
        if (node.val < prev.val) {
            node2 = node;
            if (!node1) { node1 = prev; }
        }
        prev = node;
        inOrder(node.right);
    }

    inOrder(root);
    [node1.val, node2.val] = [node2.val, node1.val];
};
```

<!-- @include ../leetcode/0450.delete-node-in-a-bst.md -->
### Delete Node in a BST
[450. Delete Node in a BST](https://leetcode.com/problems/delete-node-in-a-bst/)

```html
Given a root node reference of a BST and a key, delete the node with the given key in the BST. Return the root node reference (possibly updated) of the BST.

Basically, the deletion can be divided into two stages:

Search for a node to remove.
If the node is found, delete the node.
Follow up: Can you solve it with time complexity O(height of tree)?

Example 1:
        5                       5   
      /   \                   /   \   
     3     6       =>        4     6   
    / \     \               /       \  
   2   4     7             2         7
Input: root = [5,3,6,2,4,null,7], key = 3
Output: [5,4,6,2,null,null,7]
Explanation: Given key to delete is 3. So we find the node with value 3 and delete it.
One valid answer is [5,4,6,2,null,null,7], shown in the above BST.
Please notice that another valid answer is [5,2,6,null,4,null,7] and it's also accepted.

Example 2:
Input: root = [5,3,6,2,4,null,7], key = 0
Output: [5,3,6,2,4,null,7]
Explanation: The tree does not contain a node with value = 0.
Example 3:

Input: root = [], key = 0
Output: []
```

```javascript
var deleteNode = function(root, key) {
    if (root === null) { return null; }
    
    if (key < root.val) {
        root.left = deleteNode(root.left, key);
    } else if (key > root.val) {
        root.right = deleteNode(root.right, key);
    } else { // equal
        if (root.left === null || root.right === null) {
            return root.left || root.right;
        }
        // has two children
        let next = root.right;
        while (next.left) {
            next = next.left;
        }
        const node = new TreeNode(next.val);
        node.left = root.left;
        node.right = deleteNode(root.right, next.val);
        return node;
    }
    return root;
};
```

<!-- @include ../leetcode/0501.find-mode-in-binary-search-tree.md -->
### Find Mode in Binary Search Tree
[501. Find Mode in Binary Search Tree](https://leetcode.com/problems/find-mode-in-binary-search-tree/)

```html
Given the root of a binary search tree (BST) with duplicates, return all the mode(s) (i.e., the most frequently occurred element) in it.

If the tree has more than one mode, return them in any order.

Assume a BST is defined as follows:

The left subtree of a node contains only nodes with keys less than or equal to the node's key.
The right subtree of a node contains only nodes with keys greater than or equal to the node's key.
Both the left and right subtrees must also be binary search trees.
 
Example 1:

Input: root = [1,null,2,2]
Output: [2]

Example 2:

Input: root = [0]
Output: [0]
```

```javascript
var findMode = function(root) {
    let freqMap = new Map();
    let maxFreq = -Infinity;
    
    function inOrderTraverse(node) {
        if (!node) { return; }
        
        inOrderTraverse(node.left);
        freqMap.set(node.val, (freqMap.get(node.val) || 0) + 1);
        if (freqMap.get(node.val) > maxFreq) {
            maxFreq = freqMap.get(node.val);
        }
        inOrderTraverse(node.right);
    }

    inOrderTraverse(root);

    const res = [];
    for (const [val, freq] of freqMap) {
        if (freq === maxFreq) {
            res.push(val);
        }
    }
    return res;
};
```

<!-- @include ../leetcode/0530.minimum-absolute-difference-in-bst.md -->
### Minimum Absolute Difference in BST
[530. Minimum Absolute Difference in BST](https://leetcode.com/problems/minimum-absolute-difference-in-bst/)

```html
Given the root of a Binary Search Tree (BST), return the minimum absolute difference between the values of any two different nodes in the tree.

Example 1:
        4
     /     \
    2       6
   / \
  1   3

Input: root = [4,2,6,1,3]
Output: 1

Example 2:

        1
     /     \
    0       48
   / \
 12   49

Input: root = [1,0,48,null,null,12,49]
Output: 1
```

```javascript
var getMinimumDifference = function(root) {
    let minDiff = Infinity;
    let prevVal;
    
    function inorder(node) {
        if (!node) {
            return;
        }
        
        inorder(node.left);
        
        if (prevVal !== undefined) {
            minDiff = Math.min(minDiff, Math.abs(node.val - prevVal));
        }
        prevVal = node.val;
        
        inorder(node.right);
    }
    
    inorder(root);
    return minDiff;
};
```


## Trie

<div align="center"> <img src="https://cs-notes-1256109796.cos.ap-guangzhou.myqcloud.com/5c638d59-d4ae-4ba4-ad44-80bdc30f38dd.jpg"/> </div><br>

Trie，又称前缀树或字典树，用于判断字符串是否存在或者是否具有某种字符串前缀。

### 1. 实现一个 Trie

208\. Implement Trie (Prefix Tree) (Medium)

[Leetcode](https://leetcode.com/problems/implement-trie-prefix-tree/description/) / [力扣](https://leetcode-cn.com/problems/implement-trie-prefix-tree/description/)

```java
class Trie {

    private class Node {
        Node[] childs = new Node[26];
        boolean isLeaf;
    }

    private Node root = new Node();

    public Trie() {
    }

    public void insert(String word) {
        insert(word, root);
    }

    private void insert(String word, Node node) {
        if (node == null) return;
        if (word.length() == 0) {
            node.isLeaf = true;
            return;
        }
        int index = indexForChar(word.charAt(0));
        if (node.childs[index] == null) {
            node.childs[index] = new Node();
        }
        insert(word.substring(1), node.childs[index]);
    }

    public boolean search(String word) {
        return search(word, root);
    }

    private boolean search(String word, Node node) {
        if (node == null) return false;
        if (word.length() == 0) return node.isLeaf;
        int index = indexForChar(word.charAt(0));
        return search(word.substring(1), node.childs[index]);
    }

    public boolean startsWith(String prefix) {
        return startWith(prefix, root);
    }

    private boolean startWith(String prefix, Node node) {
        if (node == null) return false;
        if (prefix.length() == 0) return true;
        int index = indexForChar(prefix.charAt(0));
        return startWith(prefix.substring(1), node.childs[index]);
    }

    private int indexForChar(char c) {
        return c - 'a';
    }
}
```

### 2. 实现一个 Trie，用来求前缀和

677\. Map Sum Pairs (Medium)

[Leetcode](https://leetcode.com/problems/map-sum-pairs/description/) / [力扣](https://leetcode-cn.com/problems/map-sum-pairs/description/)

```html
Input: insert("apple", 3), Output: Null
Input: sum("ap"), Output: 3
Input: insert("app", 2), Output: Null
Input: sum("ap"), Output: 5
```

```java
class MapSum {

    private class Node {
        Node[] child = new Node[26];
        int value;
    }

    private Node root = new Node();

    public MapSum() {

    }

    public void insert(String key, int val) {
        insert(key, root, val);
    }

    private void insert(String key, Node node, int val) {
        if (node == null) return;
        if (key.length() == 0) {
            node.value = val;
            return;
        }
        int index = indexForChar(key.charAt(0));
        if (node.child[index] == null) {
            node.child[index] = new Node();
        }
        insert(key.substring(1), node.child[index], val);
    }

    public int sum(String prefix) {
        return sum(prefix, root);
    }

    private int sum(String prefix, Node node) {
        if (node == null) return 0;
        if (prefix.length() != 0) {
            int index = indexForChar(prefix.charAt(0));
            return sum(prefix.substring(1), node.child[index]);
        }
        int sum = node.value;
        for (Node child : node.child) {
            sum += sum(prefix, child);
        }
        return sum;
    }

    private int indexForChar(char c) {
        return c - 'a';
    }
}
```

### Design Add and Search Words Data Structure
[211. Design Add and Search Words Data Structure](https://leetcode.com/problems/design-add-and-search-words-data-structure/)
```javascript
class Node {
    constructor() {
        this.keys = new Map()
        this.isWord = false
    }
}
var WordDictionary = function() {
    this.keys = new Map()
    this.isWord = false
    this.root = new Node()
};
WordDictionary.prototype.addWord = function(word) {
    if (word.length == 0){
        return;
    }
    let node = this.root, i = 0;
    while (i < word.length) {
        if (!node.keys.has(word.charAt(i))){
           node.keys.set(word.charAt(i),new Node())
        }
        node = node.keys.get(word.charAt(i))
        i++
    }
    node.isWord = true
};
WordDictionary.prototype.search = function(word) {
    function find(word, i = 0, curr){
        if (!curr) {
            return false   
        }
        if (i == word.length){
            return curr.isWord
        }
        if (word.charAt(i) == '.') {
            for (let j=0; j < 26; j++) {
                let s = String.fromCharCode(97 + j)
                if (curr.keys.has(s)) {
                    if (find(word,i+1,curr.keys.get(s))) {
                        return true
                    }
                }
            }
        } else {
            if (curr.keys.has(word.charAt(i))) {
                curr = curr.keys.get(word.charAt(i))
                if (find(word,i+1,curr)) {
                    return true
                }
            }
        }
        return false;
    }
    return find(word,0,this.root);
};
```

### Convert Binary Search Tree to Sorted Doubly Linked List
[426. Convert Binary Search Tree to Sorted Doubly Linked List](https://leetcode.com/problems/convert-binary-search-tree-to-sorted-doubly-linked-list/)
```javascript
var treeToDoublyList = function(root) {
    if (!root) return;
    let head, previous;

    function inOrderTraverse(node) {
        if (node.left) inOrderTraverse(node.left);
        if (!head) head = node;
        if (previous) {
            previous.right = node;
            node.left = previous;
        }
        previous = node; // move pointer
        if (node.right) inOrderTraverse(node.right);
    }
    
    inOrderTraverse(root);
    previous.right = head;
    head.left = previous;
    return head;
};
```

<!-- @include ../leetcode/1026.maximum-difference-between-node-and-ancestor.md -->
### Maximum Difference Between Node and Ancestor
[1026. Maximum Difference Between Node and Ancestor](https://leetcode.com/problems/maximum-difference-between-node-and-ancestor/)
```html
Given the root of a binary tree, find the maximum value V for which there exist different nodes A and B where V = |A.val - B.val| and A is an ancestor of B.

A node A is an ancestor of B if either: any child of A is equal to B, or any child of A is an ancestor of B.

Example 1:
      8___
     /    \
    3     10
   / \      \
  1   6     14
     / \      \
    4   7     13
Input: root = [8,3,10,1,6,null,14,null,null,4,7,13]
Output: 7
Explanation: We have various ancestor-node differences, some of which are given below :
|8 - 3| = 5
|3 - 7| = 4
|8 - 1| = 7
|10 - 13| = 3
Among all possible differences, the maximum value of 7 is obtained by |8 - 1| = 7.
Example 2:
   1
    \
     2
      \
       0
      /
     3
Input: root = [1,null,2,null,0,3]
Output: 3
```

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

<!-- @include ../leetcode/0098.validate-binary-search-tree.md -->
### Validate Binary Search Tree
[98. Validate Binary Search Tree](https://leetcode.com/problems/validate-binary-search-tree/)

```html
Given the root of a binary tree, determine if it is a valid binary search tree (BST).

A valid BST is defined as follows:

The left subtree of a node contains only nodes with keys less than the node's key.
The right subtree of a node contains only nodes with keys greater than the node's key.
Both the left and right subtrees must also be binary search trees.
 

Example 1:


Input: root = [2,1,3]
Output: true
Example 2:


Input: root = [5,1,4,null,null,3,6]
Output: false
Explanation: The root node's value is 5 but its right child's value is 4.
```

In-order traversal:
```javascript
var isValidBST = function(root) {
    let prev = null
    function inOrder(node) {
        if (node === null) {
            return true;
        }
        if (!inOrder(node.left)) { return false; }
        if (prev !== null && prev.val >= node.val) { return false; }
        prev = node;
        return inOrder(node.right);
    }
    return inOrder(root, null);
};
```

DFS:
```javascript
var isValidBST = function(root) {
    return isValidBSTHelper(root, -Infinity, Infinity);
};
function isValidBSTHelper(node, min, max) {
    if (node === null) { return true; }
    if (node.val <= min || node.val >= max) { return false; }
    return isValidBSTHelper(node.left, min, node.val) && isValidBSTHelper(node.right, node.val, max)
}
```

