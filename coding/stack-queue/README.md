# Stack and Queue
<!-- GFM-TOC -->
* [Stack and Queue](#Stack-and-Queue)
    * [1. 用栈实现队列](#1-用栈实现队列)
    * [2. 用队列实现栈](#2-用队列实现栈)
    * [3. 最小值栈](#3-最小值栈)
    * [Valid Parentheses](#valid-parentheses)
    * [6. 循环数组中比当前元素大的下一个元素](#6-循环数组中比当前元素大的下一个元素)
    * [Backspace String Compare](#Backspace-String-Compare)
    * [Minimum Remove to Make Valid Parentheses](#Minimum-Remove-to-Make-Valid-Parentheses)
    * [Exclusive Time of Functions](#Exclusive-Time-of-Functions)
    * [Simplify Path](#Simplify-Path)
    * [Evaluate Reverse Polish Notation](#evaluate-reverse-polish-notation)
    * [Design Hit Counter](#design-hit-counter)
    * [Monotonic Stack](#monotonic-stack)
        * [Daily Temperatures](#daily-temperatures)
        * [Next Greater Element I](#next-greater-element-i)
        * [Online Stock Span](#online-stock-span)

<!-- GFM-TOC -->


## 1. 用栈实现队列

232\. Implement Queue using Stacks (Easy)

[Leetcode](https://leetcode.com/problems/implement-queue-using-stacks/description/) / [力扣](https://leetcode-cn.com/problems/implement-queue-using-stacks/description/)

栈的顺序为后进先出，而队列的顺序为先进先出。使用两个栈实现队列，一个元素需要经过两个栈才能出队列，在经过第一个栈时元素顺序被反转，经过第二个栈时再次被反转，此时就是先进先出顺序。

```java
class MyQueue {

    private Stack<Integer> in = new Stack<>();
    private Stack<Integer> out = new Stack<>();

    public void push(int x) {
        in.push(x);
    }

    public int pop() {
        in2out();
        return out.pop();
    }

    public int peek() {
        in2out();
        return out.peek();
    }

    private void in2out() {
        if (out.isEmpty()) {
            while (!in.isEmpty()) {
                out.push(in.pop());
            }
        }
    }

    public boolean empty() {
        return in.isEmpty() && out.isEmpty();
    }
}
```

## 2. 用队列实现栈

225\. Implement Stack using Queues (Easy)

[Leetcode](https://leetcode.com/problems/implement-stack-using-queues/description/) / [力扣](https://leetcode-cn.com/problems/implement-stack-using-queues/description/)

在将一个元素 x 插入队列时，为了维护原来的后进先出顺序，需要让 x 插入队列首部。而队列的默认插入顺序是队列尾部，因此在将 x 插入队列尾部之后，需要让除了 x 之外的所有元素出队列，再入队列。

```java
class MyStack {

    private Queue<Integer> queue;

    public MyStack() {
        queue = new LinkedList<>();
    }

    public void push(int x) {
        queue.add(x);
        int cnt = queue.size();
        while (cnt-- > 1) {
            queue.add(queue.poll());
        }
    }

    public int pop() {
        return queue.remove();
    }

    public int top() {
        return queue.peek();
    }

    public boolean empty() {
        return queue.isEmpty();
    }
}
```

## 3. 最小值栈

155\. Min Stack (Easy)

[Leetcode](https://leetcode.com/problems/min-stack/description/) / [力扣](https://leetcode-cn.com/problems/min-stack/description/)

```java
class MinStack {

    private Stack<Integer> dataStack;
    private Stack<Integer> minStack;
    private int min;

    public MinStack() {
        dataStack = new Stack<>();
        minStack = new Stack<>();
        min = Integer.MAX_VALUE;
    }

    public void push(int x) {
        dataStack.add(x);
        min = Math.min(min, x);
        minStack.add(min);
    }

    public void pop() {
        dataStack.pop();
        minStack.pop();
        min = minStack.isEmpty() ? Integer.MAX_VALUE : minStack.peek();
    }

    public int top() {
        return dataStack.peek();
    }

    public int getMin() {
        return minStack.peek();
    }
}
```

对于实现最小值队列问题，可以先将队列使用栈来实现，然后就将问题转换为最小值栈，这个问题出现在 编程之美：3.7。

<!-- @include ../leetcode/0020.valid-parentheses.md -->
### Valid Parentheses
[20. Valid Parentheses](https://leetcode.com/problems/valid-parentheses/)

```html
Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:

Open brackets must be closed by the same type of brackets.
Open brackets must be closed in the correct order.
 

Example 1:

Input: s = "()"
Output: true
Example 2:

Input: s = "()[]{}"
Output: true
Example 3:

Input: s = "(]"
Output: false
Example 4:

Input: s = "([)]"
Output: false
Example 5:

Input: s = "{[]}"
Output: true
```

```javascript
var isValid = function(s) {
    const parenthesesMap = {
        ')': '(',
        '}': '{',
        ']': '['
    };
    const stack = [];
    
    for (let i = 0; i < s.length; i++) {
        if (parenthesesMap[s[i]]) {
            const charInStack = stack.pop();
            if (parenthesesMap[s[i]] !== charInStack) {
                return false;
            }
        } else {
            stack.push(s[i]);
        }
    }
    
    return stack.length === 0;
};
```

## 5. 数组中元素与下一个比它大的元素之间的距离

739\. Daily Temperatures (Medium)

[Leetcode](https://leetcode.com/problems/daily-temperatures/description/) / [力扣](https://leetcode-cn.com/problems/daily-temperatures/description/)

```html
Input: [73, 74, 75, 71, 69, 72, 76, 73]
Output: [1, 1, 4, 2, 1, 1, 0, 0]
```

在遍历数组时用栈把数组中的数存起来，如果当前遍历的数比栈顶元素来的大，说明栈顶元素的下一个比它大的数就是当前元素。

```java
public int[] dailyTemperatures(int[] temperatures) {
    int n = temperatures.length;
    int[] dist = new int[n];
    Stack<Integer> indexs = new Stack<>();
    for (int curIndex = 0; curIndex < n; curIndex++) {
        while (!indexs.isEmpty() && temperatures[curIndex] > temperatures[indexs.peek()]) {
            int preIndex = indexs.pop();
            dist[preIndex] = curIndex - preIndex;
        }
        indexs.add(curIndex);
    }
    return dist;
}
```

## 6. 循环数组中比当前元素大的下一个元素

503\. Next Greater Element II (Medium)

[Leetcode](https://leetcode.com/problems/next-greater-element-ii/description/) / [力扣](https://leetcode-cn.com/problems/next-greater-element-ii/description/)

```text
Input: [1,2,1]
Output: [2,-1,2]
Explanation: The first 1's next greater number is 2;
The number 2 can't find next greater number;
The second 1's next greater number needs to search circularly, which is also 2.
```

与 739. Daily Temperatures (Medium) 不同的是，数组是循环数组，并且最后要求的不是距离而是下一个元素。

```java
public int[] nextGreaterElements(int[] nums) {
    int n = nums.length;
    int[] next = new int[n];
    Arrays.fill(next, -1);
    Stack<Integer> pre = new Stack<>();
    for (int i = 0; i < n * 2; i++) {
        int num = nums[i % n];
        while (!pre.isEmpty() && nums[pre.peek()] < num) {
            next[pre.pop()] = num;
        }
        if (i < n){
            pre.push(i);
        }
    }
    return next;
}
```

## Backspace String Compare
[844. Backspace String Compare](https://leetcode.com/problems/backspace-string-compare/)
```javascript
var backspaceCompare = function(S, T) {
    return build(S) === build(T);
};

function build(s) {
    const stack = [];
    for (let i = 0; i < s.length; i++) {
        if (s[i] !== '#') {
            stack.push(s[i]);
        } else {
            stack.pop();
        }
    }
    return stack.join('');
}
```

## Minimum Remove to Make Valid Parentheses
[1249. Minimum Remove to Make Valid Parentheses](https://leetcode.com/problems/minimum-remove-to-make-valid-parentheses/)
```javascript
var minRemoveToMakeValid = function(s) {
    const stack = [];
    s = s.split('');
    for (let i = 0; i < s.length; i++) {
        if (s[i] === '(') {
            stack.push(i);
        } else if (s[i] === ')') {
            if (stack.length === 0) {
                s[i] = '';
            } else {
                stack.pop();
            }
        }
    }
    stack.forEach(i => s[i] = '');
    return s.join('');
};
```

<!-- @include ../leetcode/0636.exclusive-time-of-functions.md -->
### Exclusive Time of Functions
[636. Exclusive Time of Functions](https://leetcode.com/problems/0636.exclusive-time-of-functions/)

```html
On a single-threaded CPU, we execute a program containing n functions. Each function has a unique ID between 0 and n-1.

Function calls are stored in a call stack: when a function call starts, its ID is pushed onto the stack, and when a function call ends, its ID is popped off the stack. The function whose ID is at the top of the stack is the current function being executed. Each time a function starts or ends, we write a log with the ID, whether it started or ended, and the timestamp.

You are given a list logs, where logs[i] represents the ith log message formatted as a string "{function_id}:{"start" | "end"}:{timestamp}". For example, "0:start:3" means a function call with function ID 0 started at the beginning of timestamp 3, and "1:end:2" means a function call with function ID 1 ended at the end of timestamp 2. Note that a function can be called multiple times, possibly recursively.

A function's exclusive time is the sum of execution times for all function calls in the program. For example, if a function is called twice, one call executing for 2 time units and another call executing for 1 time unit, the exclusive time is 2 + 1 = 3.

Return the exclusive time of each function in an array, where the value at the ith index represents the exclusive time for the function with ID i.

Example 1:
Input: n = 2, logs = ["0:start:0","1:start:2","1:end:5","0:end:6"]
Output: [3,4]
Explanation:
Function 0 starts at the beginning of time 0, then it executes 2 for units of time and reaches the end of time 1.
Function 1 starts at the beginning of time 2, executes for 4 units of time, and ends at the end of time 5.
Function 0 resumes execution at the beginning of time 6 and executes for 1 unit of time.
So function 0 spends 2 + 1 = 3 units of total time executing, and function 1 spends 4 units of total time executing.

Example 2:
Input: n = 1, logs = ["0:start:0","0:start:2","0:end:5","0:start:6","0:end:6","0:end:7"]
Output: [8]
Explanation:
Function 0 starts at the beginning of time 0, executes for 2 units of time, and recursively calls itself.
Function 0 (recursive call) starts at the beginning of time 2 and executes for 4 units of time.
Function 0 (initial call) resumes execution then immediately calls itself again.
Function 0 (2nd recursive call) starts at the beginning of time 6 and executes for 1 unit of time.
Function 0 (initial call) resumes execution at the beginning of time 7 and executes for 1 unit of time.
So function 0 spends 2 + 4 + 1 + 1 = 8 units of total time executing.

Example 3:
Input: n = 2, logs = ["0:start:0","0:start:2","0:end:5","1:start:6","1:end:6","0:end:7"]
Output: [7,1]
Explanation:
Function 0 starts at the beginning of time 0, executes for 2 units of time, and recursively calls itself.
Function 0 (recursive call) starts at the beginning of time 2 and executes for 4 units of time.
Function 0 (initial call) resumes execution then immediately calls function 1.
Function 1 starts at the beginning of time 6, executes 1 units of time, and ends at the end of time 6.
Function 0 resumes execution at the beginning of time 6 and executes for 2 units of time.
So function 0 spends 2 + 4 + 1 = 7 units of total time executing, and function 1 spends 1 unit of total time executing.

Example 4:
Input: n = 2, logs = ["0:start:0","0:start:2","0:end:5","1:start:7","1:end:7","0:end:8"]
Output: [8,1]
Example 5:

Input: n = 1, logs = ["0:start:0","0:end:0"]
Output: [1]
```

```javascript
var exclusiveTime = function(n, logs) {
    let output = new Array(n).fill(0);
    let prevStartTime = 0;
    let stack = [];
    
    for (let log of logs) {
        const [logId, logAction, logTime] = log.split(':');
        
        if (logAction === 'start') {
            if (stack.length > 0) {
                const prevIdx = Number(stack[stack.length - 1]);
                output[prevIdx] += Number(logTime) - prevStartTime;
            }
            stack.push(logId);
            prevStartTime = Number(logTime);
        } else {
            stack.pop(); 
            let currIdx = Number(logId);
            let currEndTime = Number(logTime);
            
            output[currIdx] += currEndTime - prevStartTime + 1;
            prevStartTime = currEndTime + 1;
        }
    }
    return output;
};
```

## Simplify Path
[71. Simplify Path](https://leetcode.com/problems/simplify-path/)
```javascript
var simplifyPath = function(path) {
    const segments = path.split('/');
    const stack = [];

    for (let segment of segments) {
        if (segment === '' || segment === '.') { continue; }
        if (segment === '..') {
            stack.pop();
        } else {
            stack.push(segment);
        }
    }
    return '/' + stack.join('/');
};
```

<!-- @include ../leetcode/0150.evaluate-reverse-polish-notation.md -->
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

<!-- @include ../leetcode/0362.design-hit-counter.md -->
### Design Hit Counter
[362. Design Hit Counter](https://leetcode.com/problems/design-hit-counter/)

```html
Design a hit counter which counts the number of hits received in the past 5 minutes (i.e., the past 300 seconds).

Your system should accept a timestamp parameter (in seconds granularity), and you may assume that calls are being made to the system in chronological order (i.e., timestamp is monotonically increasing). Several hits may arrive roughly at the same time.

Implement the HitCounter class:

HitCounter() Initializes the object of the hit counter system.
void hit(int timestamp) Records a hit that happened at timestamp (in seconds). Several hits may happen at the same timestamp.
int getHits(int timestamp) Returns the number of hits in the past 5 minutes from timestamp (i.e., the past 300 seconds).
 

Example 1:

Input
["HitCounter", "hit", "hit", "hit", "getHits", "hit", "getHits", "getHits"]
[[], [1], [2], [3], [4], [300], [300], [301]]
Output
[null, null, null, null, 3, null, 4, 3]

Explanation
HitCounter hitCounter = new HitCounter();
hitCounter.hit(1);       // hit at timestamp 1.
hitCounter.hit(2);       // hit at timestamp 2.
hitCounter.hit(3);       // hit at timestamp 3.
hitCounter.getHits(4);   // get hits at timestamp 4, return 3.
hitCounter.hit(300);     // hit at timestamp 300.
hitCounter.getHits(300); // get hits at timestamp 300, return 4.
hitCounter.getHits(301); // get hits at timestamp 301, return 3.
```

```javascript
var HitCounter = function() {
    this.queue = [];
};

HitCounter.prototype.hit = function(timestamp) {
    this.queue.push(timestamp);
};

HitCounter.prototype.getHits = function(timestamp) {
    while(this.queue.length > 0 && timestamp - this.queue[0] >= 300) {
        this.queue.shift();
    }
    return this.queue.length;
};
```

## Monotonic Stack]

<!-- @include ../leetcode/0739.daily-temperatures.md -->
### Daily Temperatures
[739. Daily Temperatures](https://leetcode.com/problems/daily-temperatures/)

```html
Given a list of daily temperatures T, return a list such that, for each day in the input, tells you how many days you would have to wait until a warmer temperature. If there is no future day for which this is possible, put 0 instead.

For example, given the list of temperatures T = [73, 74, 75, 71, 69, 72, 76, 73], your output should be [1, 1, 4, 2, 1, 1, 0, 0].

Note: The length of temperatures will be in the range [1, 30000]. Each temperature will be an integer in the range [30, 100].
```

```javascript
var dailyTemperatures = function(T) {
    const stack = [];
    const res = [...Array(T.length)].fill(0);
    
    for (let i = 0; i < T.length; i++) {
        while (stack.length > 0 && T[i] > T[stack[stack.length - 1]]) {
            const index = stack.pop();
            res[index] = i - index;
        }
        stack.push(i);
    }
    return res;
};
```

<!-- @include ../leetcode/0496.next-greater-element-i.md -->
### Next Greater Element I
[496. Next Greater Element I](https://leetcode.com/problems/next-greater-element-i/)

```html
You are given two integer arrays nums1 and nums2 both of unique elements, where nums1 is a subset of nums2.

Find all the next greater numbers for nums1's elements in the corresponding places of nums2.

The Next Greater Number of a number x in nums1 is the first greater number to its right in nums2. If it does not exist, return -1 for this number.

 

Example 1:

Input: nums1 = [4,1,2], nums2 = [1,3,4,2]
Output: [-1,3,-1]
Explanation:
For number 4 in the first array, you cannot find the next greater number for it in the second array, so output -1.
For number 1 in the first array, the next greater number for it in the second array is 3.
For number 2 in the first array, there is no next greater number for it in the second array, so output -1.
Example 2:

Input: nums1 = [2,4], nums2 = [1,2,3,4]
Output: [3,-1]
Explanation:
For number 2 in the first array, the next greater number for it in the second array is 3.
For number 4 in the first array, there is no next greater number for it in the second array, so output -1.
```

```javascript
var nextGreaterElement = function(nums1, nums2) {
    const stack = [];
    const map = new Map();
    for (let i = 0; i < nums2.length; i++) {
        while (stack.length > 0 && nums2[i] > stack[stack.length - 1]) {
            const lastNum = stack.pop();
            map.set(lastNum, nums2[i]);
        }
        stack.push(nums2[i]);
    }
    return nums1.map(num => map.has(num) ? map.get(num) : -1);
};
```

<!-- @include ../leetcode/0901.online-stock-span.md -->
### Online Stock Span
[901. Online Stock Span](https://leetcode.com/problems/online-stock-span/)

```html
Write a class StockSpanner which collects daily price quotes for some stock, and returns the span of that stock's price for the current day.

The span of the stock's price today is defined as the maximum number of consecutive days (starting from today and going backwards) for which the price of the stock was less than or equal to today's price.

For example, if the price of a stock over the next 7 days were [100, 80, 60, 70, 60, 75, 85], then the stock spans would be [1, 1, 1, 2, 1, 4, 6].

Example 1:

Input: ["StockSpanner","next","next","next","next","next","next","next"], [[],[100],[80],[60],[70],[60],[75],[85]]
Output: [null,1,1,1,2,1,4,6]
Explanation: 
First, S = StockSpanner() is initialized.  Then:
S.next(100) is called and returns 1,
S.next(80) is called and returns 1,
S.next(60) is called and returns 1,
S.next(70) is called and returns 2,
S.next(60) is called and returns 1,
S.next(75) is called and returns 4,
S.next(85) is called and returns 6.

Note that (for example) S.next(75) returned 4, because the last 4 prices
(including today's price of 75) were less than or equal to today's price.
```

```javascript
var StockSpanner = function() {
    this.stack = [];
};
StockSpanner.prototype.next = function(price) {
    let span = 1;
    while (this.stack.length > 0 && price >= this.stack[this.stack.length - 1][0]) {
        const [prevPrice, prevDay] = this.stack.pop();
        span += prevDay;
    }
    this.stack.push([price, span]);
    return span;
};
```


