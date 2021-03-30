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