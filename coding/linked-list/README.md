# Link List
<!-- GFM-TOC -->
* [Leetcode 题解 - 链表](#leetcode-题解---链表)
    * [1. 找出两个链表的交点](#1-找出两个链表的交点)
    * [Reverse Linked List](#reverse-linked-list)
    * [4. 从有序链表中删除重复节点](#4-从有序链表中删除重复节点)
    * [5. 删除链表的倒数第 n 个节点](#5-删除链表的倒数第-n-个节点)
    * [6. 交换链表中的相邻结点](#6-交换链表中的相邻结点)
    * [7. 链表求和](#7-链表求和)
    * [8. 回文链表](#8-回文链表)
    * [9. 分隔链表](#9-分隔链表)
    * [10. 链表元素按奇偶聚集](#10-链表元素按奇偶聚集)
    * [Copy List with Random Pointer](#copy-list-with-random-pointer)
    * Circular Linked List
        * [Insert into a Sorted Circular Linked List](#insert-into-a-sorted-circular-linked-list)
    * [Rotate List](#rotate-list)
    * [Intersection of Two Linked Lists](#intersection-of-two-linked-lists)
    * [Add Two Numbers](#add-two-numbers)
    * [Add Two Numbers II](#add-two-numbers-ii)
    * [Swap Nodes in Pairs](#swap-nodes-in-pairs)
    * [Linked List Cycle](#linked-list-cycle)
    * [Merge Sorted List](#merge-sorted-list)
        * [Merge Two Sorted Lists](#merge-two-sorted-lists)
        * [Merge k Sorted Lists](#merge-k-sorted-lists)
    * [Insertion Sort List](#insertion-sort-list)
    * [Sort List](#sort-list)
    * [Design Linked List](#design-linked-list)
<!-- GFM-TOC -->

##  1. 找出两个链表的交点

160\. Intersection of Two Linked Lists (Easy)

[Leetcode](https://leetcode.com/problems/intersection-of-two-linked-lists/description/) / [力扣](https://leetcode-cn.com/problems/intersection-of-two-linked-lists/description/)

例如以下示例中 A 和 B 两个链表相交于 c1：

```html
A:          a1 → a2
                    ↘
                      c1 → c2 → c3
                    ↗
B:    b1 → b2 → b3
```

但是不会出现以下相交的情况，因为每个节点只有一个 next 指针，也就只能有一个后继节点，而以下示例中节点 c 有两个后继节点。

```html
A:          a1 → a2       d1 → d2
                    ↘  ↗
                      c
                    ↗  ↘
B:    b1 → b2 → b3        e1 → e2
```



要求时间复杂度为 O(N)，空间复杂度为 O(1)。如果不存在交点则返回 null。

设 A 的长度为 a + c，B 的长度为 b + c，其中 c 为尾部公共部分长度，可知 a + c + b = b + c + a。

当访问 A 链表的指针访问到链表尾部时，令它从链表 B 的头部开始访问链表 B；同样地，当访问 B 链表的指针访问到链表尾部时，令它从链表 A 的头部开始访问链表 A。这样就能控制访问 A 和 B 两个链表的指针能同时访问到交点。

如果不存在交点，那么 a + b = b + a，以下实现代码中 l1 和 l2 会同时为 null，从而退出循环。

```java
public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
    ListNode l1 = headA, l2 = headB;
    while (l1 != l2) {
        l1 = (l1 == null) ? headB : l1.next;
        l2 = (l2 == null) ? headA : l2.next;
    }
    return l1;
}
```

<!-- @include ../leetcode/0206.reverse-linked-list.md -->
### Reverse Linked List
[206. Reverse Linked List](https://leetcode.com/problems/reverse-linked-list/)

```html
Given the head of a singly linked list, reverse the list, and return the reversed list.

Example 1:
Input: head = [1,2,3,4,5]
Output: [5,4,3,2,1]
Example 2:

Input: head = [1,2]
Output: [2,1]
Example 3:

Input: head = []
Output: []
```

```javascript
var reverseList = function(head) {
    if (!head) { return null; }
    
    if (!head.next) { return head; }
    
    const newEnd = head.next;
    head.next = null;
    const reversedList = reverseList(newEnd);
    newEnd.next = head;
    return reversedList;
};
```

##  4. 从有序链表中删除重复节点

83\. Remove Duplicates from Sorted List (Easy)

[Leetcode](https://leetcode.com/problems/remove-duplicates-from-sorted-list/description/) / [力扣](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list/description/)

```html
Given 1->1->2, return 1->2.
Given 1->1->2->3->3, return 1->2->3.
```

```java
public ListNode deleteDuplicates(ListNode head) {
    if (head == null || head.next == null) return head;
    head.next = deleteDuplicates(head.next);
    return head.val == head.next.val ? head.next : head;
}
```

##  5. 删除链表的倒数第 n 个节点

19\. Remove Nth Node From End of List (Medium)

[Leetcode](https://leetcode.com/problems/remove-nth-node-from-end-of-list/description/) / [力扣](https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/description/)

```html
Given linked list: 1->2->3->4->5, and n = 2.
After removing the second node from the end, the linked list becomes 1->2->3->5.
```

```java
public ListNode removeNthFromEnd(ListNode head, int n) {
    ListNode fast = head;
    while (n-- > 0) {
        fast = fast.next;
    }
    if (fast == null) return head.next;
    ListNode slow = head;
    while (fast.next != null) {
        fast = fast.next;
        slow = slow.next;
    }
    slow.next = slow.next.next;
    return head;
}
```

<!-- @include ../leetcode/0024.swap-nodes-in-pairs.md -->
### Swap Nodes in Pairs
[24. Swap Nodes in Pairs](https://leetcode.com/problems/swap-nodes-in-pairs/)

```html
Given a linked list, swap every two adjacent nodes and return its head. You must solve the problem without modifying the values in the list's nodes (i.e., only nodes themselves may be changed.)

Example 1:

1,2,3,4
   |
2,1,4,3

Input: head = [1,2,3,4]
Output: [2,1,4,3]

Example 2:

Input: head = []
Output: []

Example 3:

Input: head = [1]
Output: [1]
```

```javascript
var swapPairs = function(head) {
    if (!head) {
        return null;
    }
    if (!head.next) {
        return head;
    }
    let headNext = head.next;
    let newHead = headNext.next;
    
    newHead = swapPairs(newHead);
    
    headNext.next = head;
    head.next = newHead;
    
    return headNext;
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

##  7. 链表求和

445\. Add Two Numbers II (Medium)

[Leetcode](https://leetcode.com/problems/add-two-numbers-ii/description/) / [力扣](https://leetcode-cn.com/problems/add-two-numbers-ii/description/)

```html
Input: (7 -> 2 -> 4 -> 3) + (5 -> 6 -> 4)
Output: 7 -> 8 -> 0 -> 7
```

题目要求：不能修改原始链表。

```java
public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
    Stack<Integer> l1Stack = buildStack(l1);
    Stack<Integer> l2Stack = buildStack(l2);
    ListNode head = new ListNode(-1);
    int carry = 0;
    while (!l1Stack.isEmpty() || !l2Stack.isEmpty() || carry != 0) {
        int x = l1Stack.isEmpty() ? 0 : l1Stack.pop();
        int y = l2Stack.isEmpty() ? 0 : l2Stack.pop();
        int sum = x + y + carry;
        ListNode node = new ListNode(sum % 10);
        node.next = head.next;
        head.next = node;
        carry = sum / 10;
    }
    return head.next;
}

private Stack<Integer> buildStack(ListNode l) {
    Stack<Integer> stack = new Stack<>();
    while (l != null) {
        stack.push(l.val);
        l = l.next;
    }
    return stack;
}
```

##  8. 回文链表

234\. Palindrome Linked List (Easy)

[Leetcode](https://leetcode.com/problems/palindrome-linked-list/description/) / [力扣](https://leetcode-cn.com/problems/palindrome-linked-list/description/)

题目要求：以 O(1) 的空间复杂度来求解。

切成两半，把后半段反转，然后比较两半是否相等。

```java
public boolean isPalindrome(ListNode head) {
    if (head == null || head.next == null) return true;
    ListNode slow = head, fast = head.next;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    if (fast != null) slow = slow.next;  // 偶数节点，让 slow 指向下一个节点
    cut(head, slow);                     // 切成两个链表
    return isEqual(head, reverse(slow));
}

private void cut(ListNode head, ListNode cutNode) {
    while (head.next != cutNode) {
        head = head.next;
    }
    head.next = null;
}

private ListNode reverse(ListNode head) {
    ListNode newHead = null;
    while (head != null) {
        ListNode nextNode = head.next;
        head.next = newHead;
        newHead = head;
        head = nextNode;
    }
    return newHead;
}

private boolean isEqual(ListNode l1, ListNode l2) {
    while (l1 != null && l2 != null) {
        if (l1.val != l2.val) return false;
        l1 = l1.next;
        l2 = l2.next;
    }
    return true;
}
```

##  9. 分隔链表

725\. Split Linked List in Parts(Medium)

[Leetcode](https://leetcode.com/problems/split-linked-list-in-parts/description/) / [力扣](https://leetcode-cn.com/problems/split-linked-list-in-parts/description/)

```html
Input:
root = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], k = 3
Output: [[1, 2, 3, 4], [5, 6, 7], [8, 9, 10]]
Explanation:
The input has been split into consecutive parts with size difference at most 1, and earlier parts are a larger size than the later parts.
```

题目描述：把链表分隔成 k 部分，每部分的长度都应该尽可能相同，排在前面的长度应该大于等于后面的。

```java
public ListNode[] splitListToParts(ListNode root, int k) {
    int N = 0;
    ListNode cur = root;
    while (cur != null) {
        N++;
        cur = cur.next;
    }
    int mod = N % k;
    int size = N / k;
    ListNode[] ret = new ListNode[k];
    cur = root;
    for (int i = 0; cur != null && i < k; i++) {
        ret[i] = cur;
        int curSize = size + (mod-- > 0 ? 1 : 0);
        for (int j = 0; j < curSize - 1; j++) {
            cur = cur.next;
        }
        ListNode next = cur.next;
        cur.next = null;
        cur = next;
    }
    return ret;
}
```

##  10. 链表元素按奇偶聚集

328\. Odd Even Linked List (Medium)

[Leetcode](https://leetcode.com/problems/odd-even-linked-list/description/) / [力扣](https://leetcode-cn.com/problems/odd-even-linked-list/description/)

```html
Example:
Given 1->2->3->4->5->NULL,
return 1->3->5->2->4->NULL.
```

```java
public ListNode oddEvenList(ListNode head) {
    if (head == null) {
        return head;
    }
    ListNode odd = head, even = head.next, evenHead = even;
    while (even != null && even.next != null) {
        odd.next = odd.next.next;
        odd = odd.next;
        even.next = even.next.next;
        even = even.next;
    }
    odd.next = evenHead;
    return head;
}
```

<!-- @include ../leetcode/0138.copy-list-with-random-pointer.md -->
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


<!-- @include ../leetcode/0708.insert-into-a-sorted-circular-linked-list.md -->
### Insert into a Sorted Circular Linked List
[708. Insert into a Sorted Circular Linked List](https://leetcode.com/problems/insert-into-a-sorted-circular-linked-list/)
```html
Given a node from a Circular Linked List which is sorted in ascending order, write a function to insert a value insertVal into the list such that it remains a sorted circular list. The given node can be a reference to any single node in the list, and may not be necessarily the smallest value in the circular list.

If there are multiple suitable places for insertion, you may choose any place to insert the new value. After the insertion, the circular list should remain sorted.

If the list is empty (i.e., given node is null), you should create a new single circular list and return the reference to that single node. Otherwise, you should return the original given node.

Example 1:

Input: head = [3,4,1], insertVal = 2
Output: [3,4,1,2]
Explanation: In the figure above, there is a sorted circular list of three elements. You are given a reference to the node with value 3, and we need to insert 2 into the list. The new node should be inserted between node 1 and node 3. After the insertion, the list should look like this, and we should still return node 3.

Example 2:

Input: head = [], insertVal = 1
Output: [1]
Explanation: The list is empty (given head is null). We create a new single circular list and return the reference to that single node.
Example 3:

Input: head = [1], insertVal = 0
Output: [1,0]
```

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

<!-- @include ../leetcode/0061.rotate-list.md -->
### Rotate List
[61. Rotate List](https://leetcode.com/problems/rotate-list/)

```html
Given the head of a linked list, rotate the list to the right by k places.

Example 1:
          1 -> 2 -> 3 -> 4 -> 5
rotate 1: 5 -> 1 -> 2 -> 3 -> 4
rotate 2: 4 -> 5 -> 1 -> 2 -> 3

Input: head = [1,2,3,4,5], k = 2
Output: [4,5,1,2,3]

Example 2:
          0 -> 1 -> 2
rotate 1: 2 -> 0 -> 1
rotate 2: 1 -> 2 -> 0
rotate 3: 0 -> 1 -> 2
rotate 4: 2 -> 0 -> 1

Input: head = [0,1,2], k = 4
Output: [2,0,1]
```

```javascript
var rotateRight = function(head, k) {
    if (head === null) { return null; }
    let p = head;
    let len = 1;
    while (p.next) {
        p = p.next;
        len++;
    }
    p.next = head;
    
    let newHead;
    for (let i = 0; i < len - Math.floor(k % len) - 1; i++) {
        head = head.next;
    }
    newHead = head.next;
    head.next = null;
    return newHead;
}
```

<!-- @include ../leetcode/0160.intersection-of-two-linked-lists.md -->
### Intersection of Two Linked Lists
[160. Intersection of Two Linked Lists](https://leetcode.com/problems/intersection-of-two-linked-lists/)

```html
Given the heads of two singly linked-lists headA and headB, return the node at which the two lists intersect. If the two linked lists have no intersection at all, return null.

For example, the following two linked lists begin to intersect at node c1:
      a1 -> a2
              \
               c1 -> c2 -> c3
              /
b1 -> b2 -> b3
It is guaranteed that there are no cycles anywhere in the entire linked structure.

Note that the linked lists must retain their original structure after the function returns.

Example 1:
      4 -> 1
            \
             8 -> 4 -> 5
            /
 5 -> 6 -> 1
Input: intersectVal = 8, listA = [4,1,8,4,5], listB = [5,6,1,8,4,5], skipA = 2, skipB = 3
Output: Intersected at '8'
Explanation: The intersected node's value is 8 (note that this must not be 0 if the two lists intersect).
From the head of A, it reads as [4,1,8,4,5]. From the head of B, it reads as [5,6,1,8,4,5]. There are 2 nodes before the intersected node in A; There are 3 nodes before the intersected node in B.

Example 2:
1 -> 9 -> 1
           \
            2 -> 4 
           /
          3
Input: intersectVal = 2, listA = [1,9,1,2,4], listB = [3,2,4], skipA = 3, skipB = 1
Output: Intersected at '2'
Explanation: The intersected node's value is 2 (note that this must not be 0 if the two lists intersect).
From the head of A, it reads as [1,9,1,2,4]. From the head of B, it reads as [3,2,4]. There are 3 nodes before the intersected node in A; There are 1 node before the intersected node in B.

Example 3:
2 -> 6 -> 4

     1 -> 5
Input: intersectVal = 0, listA = [2,6,4], listB = [1,5], skipA = 3, skipB = 2
Output: No intersection
Explanation: From the head of A, it reads as [2,6,4]. From the head of B, it reads as [1,5]. Since the two lists do not intersect, intersectVal must be 0, while skipA and skipB can be arbitrary values.
Explanation: The two lists do not intersect, so return null.
```

```javascript
var getIntersectionNode = function(headA, headB) {
    let l1 = headA, l2 = headB;
    while (l1 != l2) {
        l1 = (l1 == null) ? headB : l1.next;
        l2 = (l2 == null) ? headA : l2.next;
    }
    return l1;
};
```

<!-- @include ../leetcode/0002.add-two-numbers.md -->
### Add Two Numbers
[2. Add Two Numbers](https://leetcode.com/problems/add-two-numbers/)

```html
You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

Example 1:
2 -> 4 -> 3
5 -> 6 -> 4
-----------
7 -> 0 -> 7
Input: l1 = [2,4,3], l2 = [5,6,4]
Output: [7,0,8]
Explanation: 342 + 465 = 807.

Example 2:
Input: l1 = [0], l2 = [0]
Output: [0]

Example 3:
Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
Output: [8,9,9,9,0,0,0,1]
```

```javascript
var addTwoNumbers = function(l1, l2) {
    let carry = 0;
    let head = new ListNode();
    let p = head;
    
    while (l1 !== null || l2 !== null) {
        const p1Val = l1 ? l1.val : 0;
        const p2Val = l2 ? l2.val : 0;
        const sum = p1Val + p2Val + carry;
        carry = Math.floor(sum / 10);
        p.next = new ListNode(sum % 10);
        p = p.next;
        if (l1 !== null) { l1 = l1.next; }
        if (l2 !== null) { l2 = l2.next; }
    }

    if (carry > 0) {
        p.next = new ListNode(carry);
    }
    return head.next;
};
```

<!-- @include ../leetcode/0445.add-two-numbers-ii.md -->
### Add Two Numbers II
[445. Add Two Numbers II](https://leetcode.com/problems/add-two-numbers-ii/)

```html
You are given two non-empty linked lists representing two non-negative integers. The most significant digit comes first and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

Example 1:

7 -> 2 -> 4 -> 3
     5 -> 6 -> 4
----------------
7 -> 8 -> 0 -> 7

Input: l1 = [7,2,4,3], l2 = [5,6,4]
Output: [7,8,0,7]
Example 2:

Input: l1 = [2,4,3], l2 = [5,6,4]
Output: [8,0,7]
Example 3:

Input: l1 = [0], l2 = [0]
Output: [0]
```

```javascript
var addTwoNumbers = function(l1, l2) {
    const stack1 = convertToArray(l1);
    const stack2 = convertToArray(l2);
    let carry = 0;

    const fakeHead = new ListNode(Infinity);

    while (stack1.length > 0 || stack2.length > 0 || carry > 0) {
        const num1 = stack1.length > 0 ? stack1.pop() : 0;
        const num2 = stack2.length > 0 ? stack2.pop() : 0;

        const sum = num1 + num2 + carry;
        carry = Math.floor(sum / 10);
        const digit = sum % 10;

        const node = new ListNode(digit);
        node.next = fakeHead.next;
        fakeHead.next = node;
    }
    
    return fakeHead.next;
};

function convertToArray(head) {
    const stack = [];
    while (head) {
        stack.push(head.val);
        head = head.next;
    }
    return stack;
}
```
## Merge Sorted List

<!-- @include ../leetcode/0021.merge-two-sorted-lists.md -->
### Merge Two Sorted Lists
[21. Merge Two Sorted Lists](https://leetcode.com/problems/0021.merge-two-sorted-lists.md)

```html
Merge two sorted linked lists and return it as a sorted list. The list should be made by splicing together the nodes of the first two lists.

Example 1:

1 -> 2 -> 4
1 -> 3 -> 4
1 -> 1 -> 2 -> 3 -> 4 -> 4

Input: l1 = [1,2,4], l2 = [1,3,4]
Output: [1,1,2,3,4,4]
Example 2:

Input: l1 = [], l2 = []
Output: []
Example 3:

Input: l1 = [], l2 = [0]
Output: [0]
```

```javascript
var mergeTwoLists = function(l1, l2) {
    if (l1 === null) { return l2; }
    if (l2 === null) { return l1; }
    
    const newList = new ListNode();
    if (l1.val < l2.val) {
        newList.val = l1.val;
        newList.next = mergeTwoLists(l1.next, l2);
    } else {
        newList.val = l2.val;
        newList.next = mergeTwoLists(l1, l2.next);
    }
    return newList;
};
```

<!-- @include ../leetcode/0023.merge-k-sorted-lists.md -->
### Merge k Sorted Lists
[23. Merge k Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists/)

```html
You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.

Merge all the linked-lists into one sorted linked-list and return it.

Example 1:

Input: lists = [[1,4,5],[1,3,4],[2,6]]
Output: [1,1,2,3,4,4,5,6]
Explanation: The linked-lists are:
[
  1->4->5,
  1->3->4,
  2->6
]
merging them into one sorted list:
1->1->2->3->4->4->5->6

Example 2:

Input: lists = []
Output: []

Example 3:

Input: lists = [[]]
Output: []
```

```javascript
var mergeKLists = function(lists) {
    if (lists.length === 0) { return null; }
    if (lists.length === 1) { return lists[0]; }
    if (lists.length === 2) {
        return mergeTwo(lists[0], lists[1]);
    }
    const mid = Math.floor(lists.length / 2);
    return mergeTwo(mergeKLists(lists.slice(0, mid)), mergeKLists(lists.slice(mid)));
};
const mergeTwo = (list1, list2) => {
    if (list1 === null && list2 === null) { return null; }
    if (list1 === null) { return list2; }
    if (list2 === null) { return list1; }
    const sortedHead = new ListNode();
    let p = sortedHead;

    while (list1 && list2) {
        if (list1.val < list2.val) {
            p.next = new ListNode(list1.val);
            list1 = list1.next;
        } else {
            p.next = new ListNode(list2.val);
            list2 = list2.next;
        }
        p = p.next;
    }

    if (list1) { p.next = list1; }
    if (list2) { p.next = list2; }
    return sortedHead.next;
}
```

<!-- @include ../leetcode/0148.sort-list.md -->
### Sort List
[148. Sort List](https://leetcode.com/problems/sort-list/)

```html
Given the head of a linked list, return the list after sorting it in ascending order.

Follow up: Can you sort the linked list in O(n logn) time and O(1) memory (i.e. constant space)?

Example 1:
Input: head = [4,2,1,3]
Output: [1,2,3,4]

Example 2:
Input: head = [-1,5,3,4,0]
Output: [-1,0,3,4,5]

Example 3:
Input: head = []
Output: []
```

```javascript
var sortList = function(head) {
    if (head === null || head.next === null) {
        return head;
    }

    let slow = head, fast = head, prev = head;
    while (fast !== null && fast.next !== null) {
        prev = slow;
        slow = slow.next;
        fast = fast.next.next;
    }
    prev.next = null;
    return mergeTwo(sortList(head), sortList(slow));
};
function mergeTwo(list1, list2) {
    if (list1 === null && list2 === null) { return null; }
    if (list1 === null) { return list2; }
    if (list2 === null) { return list1; }
    
    const sortedHead = new ListNode();
    let p = sortedHead;
    
    while (list1 && list2) {
        if (list1.val < list2.val) {
            p.next = new ListNode(list1.val);
            list1 = list1.next;
        } else {
            p.next = new ListNode(list2.val);
            list2 = list2.next;
        }
        p = p.next;
    }
    if (list1) { p.next = list1; }
    if (list2) { p.next = list2; }
    return sortedHead.next;
}
```

<!-- @include ../leetcode/0707.design-linked-list.md -->
### Design Linked List
[707. Design Linked List](https://leetcode.com/problems/design-linked-list/)

```html
Design your implementation of the linked list. You can choose to use a singly or doubly linked list.
A node in a singly linked list should have two attributes: val and next. val is the value of the current node, and next is a pointer/reference to the next node.
If you want to use the doubly linked list, you will need one more attribute prev to indicate the previous node in the linked list. Assume all nodes in the linked list are 0-indexed.

Implement the MyLinkedList class:

MyLinkedList() Initializes the MyLinkedList object.
int get(int index) Get the value of the indexth node in the linked list. If the index is invalid, return -1.
void addAtHead(int val) Add a node of value val before the first element of the linked list. After the insertion, the new node will be the first node of the linked list.
void addAtTail(int val) Append a node of value val as the last element of the linked list.
void addAtIndex(int index, int val) Add a node of value val before the indexth node in the linked list. If index equals the length of the linked list, the node will be appended to the end of the linked list. If index is greater than the length, the node will not be inserted.
void deleteAtIndex(int index) Delete the indexth node in the linked list, if the index is valid.
 

Example 1:

Input
["MyLinkedList", "addAtHead", "addAtTail", "addAtIndex", "get", "deleteAtIndex", "get"]
[[], [1], [3], [1, 2], [1], [1], [1]]
Output
[null, null, null, null, 2, null, 3]

Explanation
MyLinkedList myLinkedList = new MyLinkedList();
myLinkedList.addAtHead(1);
myLinkedList.addAtTail(3);
myLinkedList.addAtIndex(1, 2);    // linked list becomes 1->2->3
myLinkedList.get(1);              // return 2
myLinkedList.deleteAtIndex(1);    // now the linked list is 1->3
myLinkedList.get(1);              // return 3
```

```javascript
class Node {
    constructor(val){
        this.val = val;
        this.next = null;
    }
}

var MyLinkedList = function() {
    this.head = null;
    this.size = 0;
};

/**
 * Get the value of the index-th node in the linked list. If the index is invalid, return -1. 
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.get = function(index) {
    if (index < 0 || index >= this.size) {
        return -1;
    }
    
    let cur = this.head;
    for(let i = 0;i < index; i++){
        cur = cur.next;
    }
    return cur.val;
};

/**
 * Add a node of value val before the first element of the linked list. After the insertion, the new node will be the first node of the linked list. 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function(val) {
    const newNode = new Node(val);
    newNode.next = this.head;
    this.head = newNode;
    this.size++;
};

/**
 * Append a node of value val to the last element of the linked list. 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function(val) {
    const newNode = new Node(val);
    if (this.head !== null) {
        let cur = this.head;
        while(cur.next !== null) {
            cur = cur.next;
        }
        cur.next = newNode;
    } else {
        this.head = newNode;
    }
    this.size++;
};

/**
 * Add a node of value val before the index-th node in the linked list. If index equals to the length of linked list, the node will be appended to the end of linked list. If index is greater than the length, the node will not be inserted. 
 * @param {number} index 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function(index, val) {
    if (index < 0 || index > this.size) {
        return;
    }
    if (index === 0) { 
        this.addAtHead(val);
        return;   
    }
    if (index === this.size) {
        this.addAtTail(val);
        return;   
    }
    let cur = this.head;
    for (let i = 0;i < index - 1; i++) {
        cur = cur.next;
    }    
    const preIndexth = cur.next;
    const newNode = new Node(val);
    cur.next = newNode;
    newNode.next = preIndexth;
    this.size++;
};
```
