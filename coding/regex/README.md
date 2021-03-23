# Regex
<!-- GFM-TOC -->
* [Regex](#regex)
    * [Valid Number](#Valid-Number)
<!-- GFM-TOC -->

## Valid Number
[65. Valid Number](https://leetcode.com/problems/valid-number/)
```javascript
var isNumber = function(s) {
    return /^[+-]?((\d+(\.\d+)?|(\d+\.)|(\.\d+)))([eE][+-]?\d+)?$/.test(s.trim());
};
```
