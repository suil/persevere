# Leetcode 题解 - 数学
<!-- GFM-TOC -->
* [Leetcode 题解 - 数学](#leetcode-题解---数学)
    * [素数分解](#素数分解)
    * [整除](#整除)
    * [最大公约数最小公倍数](#最大公约数最小公倍数)
        * [1. 生成素数序列](#1-生成素数序列)
        * [Greatest Common Divider](#Greatest-Common-Divider)
        * [3. 使用位操作和减法求解最大公约数](#3-使用位操作和减法求解最大公约数)
    * [进制转换](#进制转换)
        * [1. 7 进制](#1-7-进制)
        * [2. 16 进制](#2-16-进制)
        * [3. 26 进制](#3-26-进制)
    * [阶乘](#阶乘)
        * [1. 统计阶乘尾部有多少个 0](#1-统计阶乘尾部有多少个-0)
    * [字符串加法减法](#字符串加法减法)
        * [Add Binary](#Add-Binary)
        * [Add Strings](#Add-Strings)
    * [相遇问题](#相遇问题)
        * [1. 改变数组元素使所有的数组元素都相等](#1-改变数组元素使所有的数组元素都相等)
    * [Majority Element](#Majority-Element)
    * [Randomness](#randomness)
        * [Random Pick Index](#random-pick-index)
    * [其它](#其它)
        * [1. 平方数](#1-平方数)
        * [2. 3 的 n 次方](#2-3-的-n-次方)
        * [4. 找出数组中的乘积最大的三个数](#4-找出数组中的乘积最大的三个数)
        * [Divide Two Integers](#Divide-Two-Integers)
        * [Pow(x, n)](#powx-n)
        * [Multiply Strings](#multiply-strings)
        * [Integer to Roman](#integer-to-roman)
        * [Roman to Integer](#roman-to-integer)
        * [String to Integer (atoi)](#string-to-integer-atoi/)
<!-- GFM-TOC -->


## 素数分解

每一个数都可以分解成素数的乘积，例如 84 = 2<sup>2</sup> \* 3<sup>1</sup> \* 5<sup>0</sup> \* 7<sup>1</sup> \* 11<sup>0</sup> \* 13<sup>0</sup> \* 17<sup>0</sup> \* …

## 整除

令 x = 2<sup>m0</sup> \* 3<sup>m1</sup> \* 5<sup>m2</sup> \* 7<sup>m3</sup> \* 11<sup>m4</sup> \* …

令 y = 2<sup>n0</sup> \* 3<sup>n1</sup> \* 5<sup>n2</sup> \* 7<sup>n3</sup> \* 11<sup>n4</sup> \* …

如果 x 整除 y（y mod x == 0），则对于所有 i，mi \<= ni。

## 最大公约数最小公倍数

x 和 y 的最大公约数为：gcd(x,y) =  2<sup>min(m0,n0)</sup> \* 3<sup>min(m1,n1)</sup> \* 5<sup>min(m2,n2)</sup> \* ...

x 和 y 的最小公倍数为：lcm(x,y) =  2<sup>max(m0,n0)</sup> \* 3<sup>max(m1,n1)</sup> \* 5<sup>max(m2,n2)</sup> \* ...

### 1. 生成素数序列

204\. Count Primes (Easy)

[Leetcode](https://leetcode.com/problems/count-primes/description/) / [力扣](https://leetcode-cn.com/problems/count-primes/description/)

埃拉托斯特尼筛法在每次找到一个素数时，将能被素数整除的数排除掉。

```javascript
var countPrimes = function(n) {
    if (n === 1) { return 0; }

    let count = 0;
    for (let i = 2; i < n; i++) {
        const isPrimeNum = isPrime(i);
        if (isPrimeNum) {
            count++;
        }
    }
    return count;
};
function isPrime(n) {
    for (let i = 2; i <= Math.ceil(n / 2); i++) {
        if (n % i === 0) {
            return false;
        }
    }
    return true;
}
```
```javascript
function countPrimes(int n) {
    const notPrimes = [...Array(n + 1)];
    let count = 0;
    for (let i = 2; i < n; i++) {
        if (notPrimes[i]) {
            continue;
        }
        count++;
        for (let j = i * i; j < n; j += i) {
            notPrimes[j] = true;
        }
    }
    return count;
}
```

### Greatest Common Divider

```javascript
function gcd(a, b) {
    return b == 0 ? a : gcd(b, a % b);
}
```

### lowest common multiple

```javascript
function lcm(a, b) {
    return a * b / gcd(a, b);
}
```

### 3. 使用位操作和减法求解最大公约数

[编程之美：2.7](#)

对于 a 和 b 的最大公约数 f(a, b)，有：

- 如果 a 和 b 均为偶数，f(a, b) = 2\*f(a/2, b/2);
- 如果 a 是偶数 b 是奇数，f(a, b) = f(a/2, b);
- 如果 b 是偶数 a 是奇数，f(a, b) = f(a, b/2);
- 如果 a 和 b 均为奇数，f(a, b) = f(b, a-b);

乘 2 和除 2 都可以转换为移位操作。

```java
public int gcd(int a, int b) {
    if (a < b) {
        return gcd(b, a);
    }
    if (b == 0) {
        return a;
    }
    boolean isAEven = isEven(a), isBEven = isEven(b);
    if (isAEven && isBEven) {
        return 2 * gcd(a >> 1, b >> 1);
    } else if (isAEven && !isBEven) {
        return gcd(a >> 1, b);
    } else if (!isAEven && isBEven) {
        return gcd(a, b >> 1);
    } else {
        return gcd(b, a - b);
    }
}
```

## 进制转换

### 1. 7 进制

504\. Base 7 (Easy)

[Leetcode](https://leetcode.com/problems/base-7/description/) / [力扣](https://leetcode-cn.com/problems/base-7/description/)

```java
public String convertToBase7(int num) {
    if (num == 0) {
        return "0";
    }
    StringBuilder sb = new StringBuilder();
    boolean isNegative = num < 0;
    if (isNegative) {
        num = -num;
    }
    while (num > 0) {
        sb.append(num % 7);
        num /= 7;
    }
    String ret = sb.reverse().toString();
    return isNegative ? "-" + ret : ret;
}
```

Java 中 static String toString(int num, int radix) 可以将一个整数转换为 radix 进制表示的字符串。

```java
public String convertToBase7(int num) {
    return Integer.toString(num, 7);
}
```

### 2. 16 进制

405\. Convert a Number to Hexadecimal (Easy)

[Leetcode](https://leetcode.com/problems/convert-a-number-to-hexadecimal/description/) / [力扣](https://leetcode-cn.com/problems/convert-a-number-to-hexadecimal/description/)

```html
Input:
26

Output:
"1a"

Input:
-1

Output:
"ffffffff"
```

负数要用它的补码形式。

```java
public String toHex(int num) {
    char[] map = {'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'};
    if (num == 0) return "0";
    StringBuilder sb = new StringBuilder();
    while (num != 0) {
        sb.append(map[num & 0b1111]);
        num >>>= 4; // 因为考虑的是补码形式，因此符号位就不能有特殊的意义，需要使用无符号右移，左边填 0
    }
    return sb.reverse().toString();
}
```

### 3. 26 进制

168\. Excel Sheet Column Title (Easy)

[Leetcode](https://leetcode.com/problems/excel-sheet-column-title/description/) / [力扣](https://leetcode-cn.com/problems/excel-sheet-column-title/description/)

```html
1 -> A
2 -> B
3 -> C
...
26 -> Z
27 -> AA
28 -> AB
```

因为是从 1 开始计算的，而不是从 0 开始，因此需要对 n 执行 -1 操作。

```java
public String convertToTitle(int n) {
    if (n == 0) {
        return "";
    }
    n--;
    return convertToTitle(n / 26) + (char) (n % 26 + 'A');
}
```

## 阶乘

### 1. 统计阶乘尾部有多少个 0

172\. Factorial Trailing Zeroes (Easy)

[Leetcode](https://leetcode.com/problems/factorial-trailing-zeroes/description/) / [力扣](https://leetcode-cn.com/problems/factorial-trailing-zeroes/description/)

尾部的 0 由 2 * 5 得来，2 的数量明显多于 5 的数量，因此只要统计有多少个 5 即可。

对于一个数 N，它所包含 5 的个数为：N/5 + N/5<sup>2</sup> + N/5<sup>3</sup> + ...，其中 N/5 表示不大于 N 的数中 5 的倍数贡献一个 5，N/5<sup>2</sup> 表示不大于 N 的数中 5<sup>2</sup> 的倍数再贡献一个 5 ...。

```java
public int trailingZeroes(int n) {
    return n == 0 ? 0 : n / 5 + trailingZeroes(n / 5);
}
```

如果统计的是 N! 的二进制表示中最低位 1 的位置，只要统计有多少个 2 即可，该题目出自 [编程之美：2.2](#) 。和求解有多少个 5 一样，2 的个数为 N/2 + N/2<sup>2</sup> + N/2<sup>3</sup> + ...

## 字符串加法减法

### Add Binary
[67\. Add Binary (Easy)](https://leetcode.com/problems/add-binary/description/)
```javascript
var addBinary = function(a, b) {
    let aIndex = a.length - 1, bIndex = b.length - 1, carry = 0;
    const output = [];
    while (aIndex >= 0 || bIndex >= 0) {
        let sum = carry;
        if (aIndex >= 0) {
            sum += Number(a[aIndex--]);
        }
        if (bIndex >= 0) {
            sum += Number(b[bIndex--]);
        }
        output.unshift(sum % 2);
        carry = Math.floor(sum / 2);
    }
    if (carry > 0) {
        output.unshift(carry);
    }
    return output.join('');
};
```

### Add Strings
[415. Add Strings](https://leetcode.com/problems/add-strings/description/)
```javascript
var addStrings = function(num1, num2) {
    let index1 = num1.length - 1, index2 = num2.length - 1, carry = 0;
    let output = [];
    const base = '0'.charCodeAt(0);
    while (index1 >= 0 || index2 >= 0) {
        let sum = carry;
        if (index1 >= 0) {
            sum += num1.charCodeAt(index1--) - base;
        }
        if (index2 >= 0) {
            sum += num2.charCodeAt(index2--) - base;
        }
        output.unshift(sum % 10);
        carry = Math.floor(sum / 10);
    }
    if (carry > 0) {
        output.unshift(carry);
    }
    return output.join('');
};
```

## 相遇问题

### 1. 改变数组元素使所有的数组元素都相等

462\. Minimum Moves to Equal Array Elements II (Medium)

[Leetcode](https://leetcode.com/problems/minimum-moves-to-equal-array-elements-ii/description/) / [力扣](https://leetcode-cn.com/problems/minimum-moves-to-equal-array-elements-ii/description/)

```html
Input:
[1,2,3]

Output:
2

Explanation:
Only two moves are needed (remember each move increments or decrements one element):

[1,2,3]  =>  [2,2,3]  =>  [2,2,2]
```

每次可以对一个数组元素加一或者减一，求最小的改变次数。

这是个典型的相遇问题，移动距离最小的方式是所有元素都移动到中位数。理由如下：

设 m 为中位数。a 和 b 是 m 两边的两个元素，且 b \> a。要使 a 和 b 相等，它们总共移动的次数为 b - a，这个值等于 (b - m) + (m - a)，也就是把这两个数移动到中位数的移动次数。

设数组长度为 N，则可以找到 N/2 对 a 和 b 的组合，使它们都移动到 m 的位置。

**解法 1**  

先排序，时间复杂度：O(NlogN)

```java
public int minMoves2(int[] nums) {
    Arrays.sort(nums);
    int move = 0;
    int l = 0, h = nums.length - 1;
    while (l <= h) {
        move += nums[h] - nums[l];
        l++;
        h--;
    }
    return move;
}
```

**解法 2**  

使用快速选择找到中位数，时间复杂度 O(N)

```java
public int minMoves2(int[] nums) {
    int move = 0;
    int median = findKthSmallest(nums, nums.length / 2);
    for (int num : nums) {
        move += Math.abs(num - median);
    }
    return move;
}

private int findKthSmallest(int[] nums, int k) {
    int l = 0, h = nums.length - 1;
    while (l < h) {
        int j = partition(nums, l, h);
        if (j == k) {
            break;
        }
        if (j < k) {
            l = j + 1;
        } else {
            h = j - 1;
        }
    }
    return nums[k];
}

private int partition(int[] nums, int l, int h) {
    int i = l, j = h + 1;
    while (true) {
        while (nums[++i] < nums[l] && i < h) ;
        while (nums[--j] > nums[l] && j > l) ;
        if (i >= j) {
            break;
        }
        swap(nums, i, j);
    }
    swap(nums, l, j);
    return j;
}

private void swap(int[] nums, int i, int j) {
    int tmp = nums[i];
    nums[i] = nums[j];
    nums[j] = tmp;
}
```
<!-- @include ../leetcode/0169.majority-element.md -->
### Majority Element
[169. Majority Element](https://leetcode.com/problems/majority-element/)

```html
Given an array nums of size n, return the majority element.

The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array.

Example 1:

Input: nums = [3,2,3]
Output: 3
Example 2:

Input: nums = [2,2,1,1,1,2,2]
Output: 2
```
Sorting:
```javascript
var majorityElement = function(nums) {
    nums.sort();
    return nums[Math.floor(nums.length / 2)];
};
```

Divide and Conquer:

```javascript
var majorityElement = function(nums) {
    return majorityElementDivideAndConquer(nums, 0, nums.length - 1);
};
function majorityElementDivideAndConquer(nums, lo, hi) {
    // base case; the only element in an array of size 1 is the majority
    // element.
    if (lo === hi) { return nums[lo]; }

    // recurse on left and right halves of this slice.
    const mid = Math.floor(lo + (hi - lo) / 2);
    const left = majorityElementDivideAndConquer(nums, lo, mid);
    const right = majorityElementDivideAndConquer(nums, mid + 1, hi);

    // if the two halves agree on the majority element, return it.
    if (left === right) { return left; }

    // otherwise, count each element and return the "winner".
    const leftCount = countInRange(nums, left, lo, hi);
    const rightCount = countInRange(nums, right, lo, hi);

    return leftCount > rightCount ? left : right;
}
function countInRange(nums, num, lo, hi) {
    let count = 0;
    for (let i = lo; i <= hi; i++) {
        if (nums[i] == num) {
            count++;
        }
    }
    return count;
}
```

Boyer-Moore Voting Algorithm:
```javascript
var majorityElement = function(nums) {
    int cnt = 0, majority = nums[0];
    for (num of nums) {
        majority = (cnt == 0) ? num : majority;
        cnt = (majority == num) ? cnt + 1 : cnt - 1;
    }
    return majority;
}
```

## Randomness
Reservoir sampling is a technique which is used to generate numbers randomly when we have a large pool of numbers. As mentioned in the note for this question, the array size can be large, hence it is a reasonable choice to use Reservoir Sampling. Consider an array of size nn from which we need to chose a number randomly. Consider these numbers to be coming in the form of a stream, hence at each step, we have to take the decision of whether or not to choose a given number, such that the overall probability of each number being chosen is same 1/n n1 in this case). If we have a total of nn numbers and we pick the i^{th}i h   number, this implies that we do not pick any number further from index (i + 1)(i+1) to nn.

<!-- @include ../leetcode/0398.random-pick-index.md -->
### Random Pick Index
[398. Random Pick Index](https://leetcode.com/problems/random-pick-index/)
```html
Given an integer array nums with possible duplicates, randomly output the index of a given target number. You can assume that the given target number must exist in the array.

Implement the Solution class:

Solution(int[] nums) Initializes the object with the array nums.
int pick(int target) Picks a random index i from nums where nums[i] == target. If there are multiple valid i's, then each index should have an equal probability of returning.

Example 1:

Input
["Solution", "pick", "pick", "pick"]
[[[1, 2, 3, 3, 3]], [3], [1], [3]]
Output
[null, 4, 0, 2]

Explanation
Solution solution = new Solution([1, 2, 3, 3, 3]);
solution.pick(3); // It should return either index 2, 3, or 4 randomly. Each index should have equal probability of returning.
solution.pick(1); // It should return 0. Since in the array only nums[0] is equal to 1.
solution.pick(3); // It should return either index 2, 3, or 4 randomly. Each index should have equal probability of returning.
```

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


## 其它

<!-- @include ../leetcode/0367.valid-perfect-square.md -->
### Valid Perfect Square
[367. Valid Perfect Square](https://leetcode.com/problems/valid-perfect-square/)

```html
Given a positive integer num, write a function which returns True if num is a perfect square else False.

Follow up: Do not use any built-in library function such as sqrt.

Example 1:
Input: num = 16
Output: true

Example 2:
Input: num = 14
Output: false
```

Binary Search:
```javascript
var isPerfectSquare = function(num) {
    if (num < 2) { return true; }
    let lo = 0, hi = num;
    while (lo <= hi) {
        const mid = Math.floor(lo + (hi - lo) / 2);
        const squre = mid * mid;
        if (squre === num) { return true; }
        if (squre > num) {
            hi = mid - 1;
        } else {
            lo = mid + 1;
        }
    }
    return false;
};
```

Math:
The series of square num：1,4,9,16,..

The gap between square numbers is ：3,5,7,...

```javascript
var isPerfectSquare = function(num) {
    let subNum = 1;
    while (num > 0) {
        num -= subNum;
        subNum += 2;
    }
    return num === 0;
};
```

### 2. 3 的 n 次方

326\. Power of Three (Easy)

[Leetcode](https://leetcode.com/problems/power-of-three/description/) / [力扣](https://leetcode-cn.com/problems/power-of-three/description/)

```java
public boolean isPowerOfThree(int n) {
    return n > 0 && (1162261467 % n == 0);
}
```

### 4. 找出数组中的乘积最大的三个数

628\. Maximum Product of Three Numbers (Easy)

[Leetcode](https://leetcode.com/problems/maximum-product-of-three-numbers/description/) / [力扣](https://leetcode-cn.com/problems/maximum-product-of-three-numbers/description/)

```html
Input: [1,2,3,4]
Output: 24
```

```java
public int maximumProduct(int[] nums) {
    int max1 = Integer.MIN_VALUE, max2 = Integer.MIN_VALUE, max3 = Integer.MIN_VALUE, min1 = Integer.MAX_VALUE, min2 = Integer.MAX_VALUE;
    for (int n : nums) {
        if (n > max1) {
            max3 = max2;
            max2 = max1;
            max1 = n;
        } else if (n > max2) {
            max3 = max2;
            max2 = n;
        } else if (n > max3) {
            max3 = n;
        }

        if (n < min1) {
            min2 = min1;
            min1 = n;
        } else if (n < min2) {
            min2 = n;
        }
    }
    return Math.max(max1*max2*max3, max1*min1*min2);
}
```

### Divide Two Integers
[29. Divide Two Integers](https://leetcode.com/problems/divide-two-integers/)
```javascript
var divide = function(dividend, divisor) {
    if (dividend === -Math.pow(2, 31) && divisor === -1) {
        return Math.pow(2, 31) - 1;
    }
    if (divisor === 1) {
      return dividend;
    }
    let isNegative = false;
    if (dividend < 0 && divisor > 0 || dividend > 0 && divisor < 0) {
        isNegative = true;
    }
    let newDividend = Math.abs(dividend);
    const newDivisor = Math.abs(divisor);
    let result = 0;
    while (newDividend >= newDivisor) {
        newDividend = newDividend - newDivisor;
        result++;
    }
    return isNegative ? -result : result;
};
```

<!-- @include ../leetcode/0050.powx-n.md -->
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


<!-- @include ../leetcode/0043.multiply-strings.md -->
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

<!-- @include ../leetcode/0012.integer-to-roman.md -->
### Integer to Roman
[12. Integer to Roman](https://leetcode.com/problems/integer-to-roman/)

```html
Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.

Symbol       Value
I             1
V             5
X             10
L             50
C             100
D             500
M             1000
For example, 2 is written as II in Roman numeral, just two one's added together. 12 is written as XII, which is simply X + II. The number 27 is written as XXVII, which is XX + V + II.

Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not IIII. Instead, the number four is written as IV. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as IX. There are six instances where subtraction is used:

I can be placed before V (5) and X (10) to make 4 and 9. 
X can be placed before L (50) and C (100) to make 40 and 90. 
C can be placed before D (500) and M (1000) to make 400 and 900.
Given an integer, convert it to a roman numeral.

Example 1:
Input: num = 3
Output: "III"

Example 2:
Input: num = 4
Output: "IV"

Example 3:
Input: num = 9
Output: "IX"

Example 4:
Input: num = 58
Output: "LVIII"
Explanation: L = 50, V = 5, III = 3.

Example 5:
Input: num = 1994
Output: "MCMXCIV"
Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.
```

```javascript
var intToRoman = function(num) {
    let res = '';
    if (num < 1 || num > 3999) { return res; }
    let weight = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    let token = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
    let i = 0;
    while (num > 0) {
        if (num >= weight[i]) {
            res += token[i];
            num -= weight[i];
        } else {
            i++;
        }
    }
    return res;
};
```

<!-- @include ../leetcode/0013.roman-to-integer.md -->
### Roman to Integer
[13. Roman to Integer](https://leetcode.com/problems/roman-to-integer/)
```
Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.

Symbol       Value
I             1
V             5
X             10
L             50
C             100
D             500
M             1000
For example, 2 is written as II in Roman numeral, just two one's added together. 12 is written as XII, which is simply X + II. The number 27 is written as XXVII, which is XX + V + II.

Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not IIII. Instead, the number four is written as IV. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as IX. There are six instances where subtraction is used:

I can be placed before V (5) and X (10) to make 4 and 9. 
X can be placed before L (50) and C (100) to make 40 and 90. 
C can be placed before D (500) and M (1000) to make 400 and 900.
Given a roman numeral, convert it to an integer.

Example 1:
Input: s = "III"
Output: 3

Example 2:
Input: s = "IV"
Output: 4

Example 3:
Input: s = "IX"
Output: 9

Example 4:
Input: s = "LVIII"
Output: 58
Explanation: L = 50, V= 5, III = 3.

Example 5:
Input: s = "MCMXCIV"
Output: 1994
Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.
```

```javascript
var romanToInt = function(s) {
    const map = new Map([
        ['M', 1000],
        ['CM', 900],
        ['D', 500],
        ['CD', 400],
        ['C', 100],
        ['XC', 90],
        ['L', 50],
        ['XL', 40],
        ['X', 10],
        ['IX', 9],
        ['V', 5],
        ['IV', 4],
        ['I', 1]
    ]);

    let res = 0;
    while (!!s && s.length > 0) {
        if (map.has(s.substr(0, 2))) {
            res += map.get(s.substr(0, 2));
            s = s.substring(2);
        } else if (map.has(s.substr(0, 1))) {
            res += map.get(s.substr(0, 1));
            s = s.substring(1);
        }
    }
    return res;
};
```

<!-- @include ../leetcode/0008.string-to-integer-atoi.md -->
### String to Integer (atoi)
[8. String to Integer (atoi)](https://leetcode.com/problems/string-to-integer-atoi/)

```html
Implement the myAtoi(string s) function, which converts a string to a 32-bit signed integer (similar to C/C++'s atoi function).

The algorithm for myAtoi(string s) is as follows:

Read in and ignore any leading whitespace.
Check if the next character (if not already at the end of the string) is '-' or '+'. Read this character in if it is either. This determines if the final result is negative or positive respectively. Assume the result is positive if neither is present.
Read in next the characters until the next non-digit charcter or the end of the input is reached. The rest of the string is ignored.
Convert these digits into an integer (i.e. "123" -> 123, "0032" -> 32). If no digits were read, then the integer is 0. Change the sign as necessary (from step 2).
If the integer is out of the 32-bit signed integer range [-231, 231 - 1], then clamp the integer so that it remains in the range. Specifically, integers less than -231 should be clamped to -231, and integers greater than 231 - 1 should be clamped to 231 - 1.
Return the integer as the final result.
Note:

Only the space character ' ' is considered a whitespace character.
Do not ignore any characters other than the leading whitespace or the rest of the string after the digits.

Example 1:

Input: s = "42"
Output: 42
Explanation: The underlined characters are what is read in, the caret is the current reader position.
Step 1: "42" (no characters read because there is no leading whitespace)
         ^
Step 2: "42" (no characters read because there is neither a '-' nor '+')
         ^
Step 3: "42" ("42" is read in)
           ^
The parsed integer is 42.
Since 42 is in the range [-231, 231 - 1], the final result is 42.
Example 2:

Input: s = "   -42"
Output: -42
Explanation:
Step 1: "   -42" (leading whitespace is read and ignored)
            ^
Step 2: "   -42" ('-' is read, so the result should be negative)
             ^
Step 3: "   -42" ("42" is read in)
               ^
The parsed integer is -42.
Since -42 is in the range [-231, 231 - 1], the final result is -42.
Example 3:

Input: s = "4193 with words"
Output: 4193
Explanation:
Step 1: "4193 with words" (no characters read because there is no leading whitespace)
         ^
Step 2: "4193 with words" (no characters read because there is neither a '-' nor '+')
         ^
Step 3: "4193 with words" ("4193" is read in; reading stops because the next character is a non-digit)
             ^
The parsed integer is 4193.
Since 4193 is in the range [-231, 231 - 1], the final result is 4193.
Example 4:

Input: s = "words and 987"
Output: 0
Explanation:
Step 1: "words and 987" (no characters read because there is no leading whitespace)
         ^
Step 2: "words and 987" (no characters read because there is neither a '-' nor '+')
         ^
Step 3: "words and 987" (reading stops immediately because there is a non-digit 'w')
         ^
The parsed integer is 0 because no digits were read.
Since 0 is in the range [-231, 231 - 1], the final result is 0.
Example 5:

Input: s = "-91283472332"
Output: -2147483648
Explanation:
Step 1: "-91283472332" (no characters read because there is no leading whitespace)
         ^
Step 2: "-91283472332" ('-' is read, so the result should be negative)
          ^
Step 3: "-91283472332" ("91283472332" is read in)
                     ^
The parsed integer is -91283472332.
Since -91283472332 is less than the lower bound of the range [-231, 231 - 1], the final result is clamped to -231 = -2147483648.

```

```javascript
var myAtoi = function(s) {
    const MAX_INT = 2 ** 31 - 1;
    const MIN_INT = 2 ** 31 * -1;
    
    const firstNumbers = s.trim().match(/^[\+-]?[\d]+/);
    
    if (!firstNumbers) { return 0; }
    const numbers = firstNumbers[0];
    const sign = numbers[0] == '-' ? -1 : 1;
    
    const result = numbers
        .replace(/\D/gi, '')
        .split('')
        .map((digit, index, digits) => {
            return Math.pow(10, digits.length - 1 - index) * sign * parseInt(digit)
        })
        .reduce((acc, number) => {
            return acc + number;
        }, 0);
    
    if (result > MAX_INT) {
        return MAX_INT;
    }
    if (result < MIN_INT) {
        return MIN_INT;
    }
    return result;    
};
```

