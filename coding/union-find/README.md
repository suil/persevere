# Union Find
<!-- GFM-TOC -->
* [Union Find](#union-find)
    * [Accounts Merge](#Accounts-Merge)
    * [Redundant Connection](#redundant-connection)
    * [Graph Valid Tree](#graph-valid-tree)
    * [Number of Connected Components in an Undirected Graph](#number-of-connected-components-in-an-undirected-graph)
    * [Smallest String With Swaps](#smallest-string-with-swaps)
    * [Evaluate Division](#evaluate-division.md)
    * [Find Eventual Safe States](#find-eventual-safe-states)
    * [Largest Component Size by Common Factor](#largest-component-size-by-common-factor)
<!-- GFM-TOC -->

## Union Find
`class` version
```javascript
class UnionFind {
    constructor(n) {
        this.roots = [...Array(n)].map((_, index) => index);
        this.extra = [];
    }
    
    find(id) {
        if (this.roots[id] === id) {
            return id;
        }
        this.roots[id] = this.find(this.roots[id]);
        return this.roots[id];
    }
    
    union(x, y) {
        const rootX = this.find(x);
        const rootY = this.find(y);
        
        if (rootX !== rootY) {
            this.roots[rootY] = rootX;
        } else {
            this.extra = [x, y];
        }
    }
}
```
simple version
```javascript
const root = {};
const find = (x) => {
    if (root[x] !== x) {
        root[x] = find(parents[x]);
    }
    return root[x];
};

const union = (x, y) => {
    root[find(x)] = find(y);
};

for (const item of arr) {
    if (!root[email]) {
        root[email] = email;
    }
    union(item, arr[0]);
}
```

<!-- @include ../leetcode/0721.accounts-merge.md -->
### Accounts Merge
[721. Accounts Merge](https://leetcode.com/problems/accounts-merge/)

```html
Given a list of accounts where each element accounts[i] is a list of strings, where the first element accounts[i][0] is a name, and the rest of the elements are emails representing emails of the account.

Now, we would like to merge these accounts. Two accounts definitely belong to the same person if there is some common email to both accounts. Note that even if two accounts have the same name, they may belong to different people as people could have the same name. A person can have any number of accounts initially, but all of their accounts definitely have the same name.

After merging the accounts, return the accounts in the following format: the first element of each account is the name, and the rest of the elements are emails in sorted order. The accounts themselves can be returned in any order.

Example 1:
Input: accounts = [["John","johnsmith@mail.com","john_newyork@mail.com"],["John","johnsmith@mail.com","john00@mail.com"],["Mary","mary@mail.com"],["John","johnnybravo@mail.com"]]
Output: [["John","john00@mail.com","john_newyork@mail.com","johnsmith@mail.com"],["Mary","mary@mail.com"],["John","johnnybravo@mail.com"]]
Explanation:
The first and third John's are the same person as they have the common email "johnsmith@mail.com".
The second John and Mary are different people as none of their email addresses are used by other accounts.
We could return these lists in any order, for example the answer [['Mary', 'mary@mail.com'], ['John', 'johnnybravo@mail.com'], 
['John', 'john00@mail.com', 'john_newyork@mail.com', 'johnsmith@mail.com']] would still be accepted.

Example 2:
Input: accounts = [["Gabe","Gabe0@m.co","Gabe3@m.co","Gabe1@m.co"],["Kevin","Kevin3@m.co","Kevin5@m.co","Kevin0@m.co"],["Ethan","Ethan5@m.co","Ethan4@m.co","Ethan0@m.co"],["Hanzo","Hanzo3@m.co","Hanzo1@m.co","Hanzo0@m.co"],["Fern","Fern5@m.co","Fern1@m.co","Fern0@m.co"]]
Output: [["Ethan","Ethan0@m.co","Ethan4@m.co","Ethan5@m.co"],["Gabe","Gabe0@m.co","Gabe1@m.co","Gabe3@m.co"],["Hanzo","Hanzo0@m.co","Hanzo1@m.co","Hanzo3@m.co"],["Kevin","Kevin0@m.co","Kevin3@m.co","Kevin5@m.co"],["Fern","Fern0@m.co","Fern1@m.co","Fern5@m.co"]]
```

```javascript
var accountsMerge = function(accounts) {
    ///// union find /////
    const parents = {};
    function find(x) {
        if (parents[x] === x) {
            return x;
        }
        parents[x] = find(parents[x]);
        return parents[x];
    };

    function union (x, y) {
        const rootX = find(x);
        const rootY = find(y);
        
        if (rootX === rootY) { return false; }
        parents[rootY] = rootX;
        return true;
    };
    ///// union find /////

    const email2name = {};
    for (const [name, ...emails] of accounts) {
        for (const email of emails) {
            if (!parents[email]) {
                parents[email] = email;
            }
            email2name[email] = name;
            union(email, emails[0]);
        }
    }

    /*
    parents = {
      'johnsmith@mail.com': 'johnsmith@mail.com',
      'john_newyork@mail.com': 'johnsmith@mail.com',
      'john00@mail.com': 'johnsmith@mail.com',
      'mary@mail.com': 'mary@mail.com',
      'johnnybravo@mail.com': 'johnnybravo@mail.com'
    }
    */
    const emails = {};
    for (const email of Object.keys(parents)) {
        const parent = find(email);
        if (parent in emails) {
            emails[parent].push(email);
        } else {
            emails[parent] = [email];
        }
    }
    return Object.entries(emails).map(([email, x]) => [email2name[email], ...x.sort()]);
};
```

<!-- @include ../leetcode/0684.redundant-connection.md -->
### Redundant Connection
[684. Redundant Connection](https://leetcode.com/problems/redundant-connection/description/)

```html
In this problem, a tree is an undirected graph that is connected and has no cycles.

The given input is a graph that started as a tree with N nodes (with distinct values 1, 2, ..., N), with one additional edge added. The added edge has two different vertices chosen from 1 to N, and was not an edge that already existed.

The resulting graph is given as a 2D-array of edges. Each element of edges is a pair [u, v] with u < v, that represents an undirected edge connecting nodes u and v.

Return an edge that can be removed so that the resulting graph is a tree of N nodes. If there are multiple answers, return the answer that occurs last in the given 2D-array. The answer edge [u, v] should be in the same format, with u < v.

Example 1:
Input: [[1,2], [1,3], [2,3]]
Output: [2,3]
Explanation: The given undirected graph will be like this:
  1
 / \
2 - 3
Example 2:
Input: [[1,2], [2,3], [3,4], [1,4], [1,5]]
Output: [1,4]
Explanation: The given undirected graph will be like this:
5 - 1 - 2
    |   |
    4 - 3
```

```javascript
var findRedundantConnection = function(edges) {
    const unionfind = new UnionFind(edges.length + 1);
    
    for(let [u, v] of edges) {
        unionfind.union(u, v);
    }
    return unionfind.answer;
};
class UnionFind {
    constructor(n) {
        this.roots = [...Array(n)].map((_, index) => index);
        this.answer = [];
    }
    find(id) {
        if (this.roots[id] === id) {
            return id;
        }
        this.roots[id] = this.find(this.roots[id]);
        return this.roots[id];
    }
    union(x, y) {
        const rootX = this.find(x);
        const rootY = this.find(y);
        
        if (rootX !== rootY) {
            this.roots[rootY] = rootX;
        } else {
            this.answer = [x, y];
        }
    }
}
```


<!-- @include ../leetcode/0261.graph-valid-tree.md -->
### Graph Valid Tree
[261. Graph Valid Tree](https://leetcode.com/problems/graph-valid-tree/)
```html
You have a graph of n nodes labeled from 0 to n - 1. You are given an integer n and a list of edges where edges[i] = [ai, bi] indicates that there is an undirected edge between nodes ai and bi in the graph.

Return true if the edges of the given graph make up a valid tree, and false otherwise.
Example 1:
        0
      / | \
     1  2  3
     |
     4

Input: n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]
Output: true
Example 2:

0 -- 1 -- 2
     | \  |
     |  \ |
     4    3
Input: n = 5, edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]
Output: false
```

DFS cycle detection
```javascript
var validTree = function(n, edges) {
    const graph = new Map();
    for (const [u, v] of edges) {
        if (!graph.has(u)) { graph.set(u, []); }
        if (!graph.has(v)) { graph.set(v, []); }
        graph.get(u).push(v);
        graph.get(v).push(u);
    }
    
    const visited = new Set();
    if (hasCycle(graph, 0, -1, visited)) { return false; }
    
    return visited.size === n;
};
function hasCycle(graph, current, last, visited) {
    visited.add(current);
    const neighbors = graph.get(current) || [];
    for (const neighbor of neighbors) {
        if (visited.has(neighbor)) {
            if (neighbor !== last) { return true; }
        } else {
            if (hasCycle(graph, neighbor, current, visited)) { return true; }
        }
    }
    return false;
}
```

Union Find
```javascript
class UnionFind {
    constructor(n) {
        this.roots = [...Array(n)].map((_, index) => index);
        this.length = n;
    }
    
    find(id) {
        if (this.roots[id] === id) {
            return id;
        }
        this.roots[id] = this.find(this.roots[id]);
        return this.roots[id];
    }
    
    union(x, y) {
        const rootX = this.find(x);
        const rootY = this.find(y);
        
        if (rootX === rootY) { return false; }
        this.roots[rootY] = rootX;
        this.length--;
        return true;
    }
    
    get size() {
        return this.length;;
    }
}

var validTree = function(n, edges) {
    const uf = new UnionFind(n);
    
    for (const [u, v] of edges) {
        if (!uf.union(u, v)) { return false; }
    }
    
    return uf.size === 1;
};
```

<!-- @include ../leetcode/0323.number-of-connected-components-in-an-undirected-graph.md -->
### Number of Connected Components in an Undirected Graph
[323. Number of Connected Components in an Undirected Graph](https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/)

```html
You have a graph of n nodes. You are given an integer n and an array edges where edges[i] = [ai, bi] indicates that there is an edge between ai and bi in the graph.

Return the number of connected components in the graph.

Example 1:

0 ---- 1      3
       |      |
       2      4
Input: n = 5, edges = [[0,1],[1,2],[3,4]]
Output: 2

Example 2:
0 ---- 1   3
       | / |
        2  4
Input: n = 5, edges = [[0,1],[1,2],[2,3],[3,4]]
Output: 1
```

DFS
```javascript
var countComponents = function(n, edges) {
    const graph = [...Array(n)].map(() => []);
    for (const [u, v] of edges) {
        graph[u].push(v);
        graph[v].push(u);
    }
    
    const visited = new Set();
    let count = 0;
    for (let i = 0; i < n; i++) {
        if (!visited.has(i)) {
            dfs(graph, i, visited);
            count++;
        }
    }
    return count;
};

function dfs(graph, current, visited) {
    visited.add(current);
    const neighbors = graph[current] || [];
    for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
            dfs(graph, neighbor, visited);
        }
    }
}
```

Union Find
```javascript
var countComponents = function(n, edges) {
    const uf = new UnionFind(n);
    for (const [u, v] of edges) {
        uf.union(u, v);
    }
    return uf.size;
};
class UnionFind {
    constructor(n) {
        this.roots = [...Array(n)].map((_, i) => i);
        this.length = n;
    }
    
    find(id) {
        if (this.roots[id] === id) {
            return id;
        }
        this.roots[id] = this.find(this.roots[id]);
        return this.roots[id];
    }
    
    union(a, b) {
        const rootA = this.find(a);
        const rootB = this.find(b);
        if (rootA !== rootB) {
            this.roots[rootB] = rootA;
            this.length--;
        }
    }
    
    get size() {
        return this.length;
    }
}
```

<!-- @include ../leetcode/1202.smallest-string-with-swaps.md -->
### Smallest String With Swaps
[1202. Smallest String With Swaps](https://leetcode.com/problems/smallest-string-with-swaps/)

```html
You are given a string s, and an array of pairs of indices in the string pairs where pairs[i] = [a, b] indicates 2 indices(0-indexed) of the string.

You can swap the characters at any pair of indices in the given pairs any number of times.

Return the lexicographically smallest string that s can be changed to after using the swaps.

Example 1:
Input: s = "dcab", pairs = [[0,3],[1,2]]
Output: "bacd"
Explaination: 
Swap s[0] and s[3], s = "bcad"
Swap s[1] and s[2], s = "bacd"

Example 2:
Input: s = "dcab", pairs = [[0,3],[1,2],[0,2]]
Output: "abcd"
Explaination: 
Swap s[0] and s[3], s = "bcad"
Swap s[0] and s[2], s = "acbd"
Swap s[1] and s[2], s = "abcd"

Example 3:
Input: s = "cba", pairs = [[0,1],[1,2]]
Output: "abc"
Explaination: 
Swap s[0] and s[1], s = "bca"
Swap s[1] and s[2], s = "bac"
Swap s[0] and s[1], s = "abc"
```

Union Find:
```javascript
var smallestStringWithSwaps = function(s, pairs) {
    const n = s.length;

    const uf = new UnionFind(s.length);
    for (let [a, b] of pairs) {
        uf.union(a, b);
    }

    const groups = {}
    for (let i = 0; i < n; i++) {
        const root = uf.find(i);
        if (!groups[root]) { groups[root] = []; }
        groups[root].push(i)
    }

    let res = s.split('');
    for (const key in groups) {
        let group = groups[key];
        let sorted = [...group].sort((i1, i2) => s[i1].localeCompare(s[i2]))
        for (let i = 0; i < group.length; i++) {
            res[group[i]] = s[sorted[i]]
        }
    }
    return res.join('')
};
class UnionFind {
    constructor(n) {
        this.roots = [...Array(n)].map((_, index) => index);
    }
    
    find(key) {
        if (this.roots[key] === key) { return key; }
        
        this.roots[key] = this.find(this.roots[key]);
        return this.roots[key];
    }
    
    union(x, y) {
        const rootX = this.find(x);
        const rootY = this.find(y);
        
        if (rootX === rootY) { return false; }
        this.roots[rootX] = rootY;
        return true;
    }
}
```

DFS:
```javascript
var smallestStringWithSwaps = function(s, pairs) {
    if (!pairs.length) { return s; }
    const graph = [...Array(s.length)].map(() => []);
    for (const [u, v] of pairs) {
        graph[u].push(v);
        graph[v].push(u);
    }

    let result = s.split('');
    let visited = new Array(s.length).fill(false);

    for (let i = 0; i < s.length; i++) {
        const indexes = [];
        dfs(s, graph, i, indexes, visited);
        indexes.sort((a, b) => a - b);
        const sorted = [...indexes].sort((a, b) => s[a].localeCompare(s[b]));
        for (let j = 0; j < indexes.length; j++) {
            result[indexes[j]] = s[sorted[j]];
        }
    }
    return result.join('');
};
function dfs(s, graph, current, indexes, visited) {
    if (visited[current]) { return; }
    visited[current] = true;
    indexes.push(current);
    for (const neighbor of graph[current]){
        dfs(s, graph, neighbor, indexes, visited);
    }
}
```

<!-- @include ../leetcode/0399.evaluate-division.md -->
### Evaluate Division
[399. Evaluate Division](https://leetcode.com/problems/evaluate-division/)

```html
You are given an array of variable pairs equations and an array of real numbers values, where equations[i] = [Ai, Bi] and values[i] represent the equation Ai / Bi = values[i]. Each Ai or Bi is a string that represents a single variable.

You are also given some queries, where queries[j] = [Cj, Dj] represents the jth query where you must find the answer for Cj / Dj = ?.

Return the answers to all queries. If a single answer cannot be determined, return -1.0.

Note: The input is always valid. You may assume that evaluating the queries will not result in division by zero and that there is no contradiction.

Example 1:

Input: equations = [["a","b"],["b","c"]], values = [2.0,3.0], queries = [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]
Output: [6.00000,0.50000,-1.00000,1.00000,-1.00000]
Explanation: 
Given: a / b = 2.0, b / c = 3.0
queries are: a / c = ?, b / a = ?, a / e = ?, a / a = ?, x / x = ?
return: [6.0, 0.5, -1.0, 1.0, -1.0 ]

Example 2:

Input: equations = [["a","b"],["b","c"],["bc","cd"]], values = [1.5,2.5,5.0], queries = [["a","c"],["c","b"],["bc","cd"],["cd","bc"]]
Output: [3.75000,0.40000,5.00000,0.20000]
Example 3:

Input: equations = [["a","b"]], values = [0.5], queries = [["a","b"],["b","a"],["a","c"],["x","y"]]
Output: [0.50000,2.00000,-1.00000,-1.00000]
```

DFS:
```javascript
var calcEquation = function(equations, values, queries) {
    const graph = {};
    for (let i = 0; i < equations.length; i++) {
        const [u, v] = equations[i];
        const value = values[i];
        if (!graph[u]) { graph [u] = {}; }
        if (!graph[v]) { graph [v] = {}; }
        graph[u][v] = value;
        graph[v][u] = 1 / value;
    }

    return queries.map(query => dfs(graph, query[0], query[1], new Set()));
};

function dfs(graph, x, y, visited) {
    if (!graph[x] || !graph[y]) { return -1; }

    if (y in graph[x]) { return graph[x][y]; }

    for (let neighbor in graph[x]) {
        if (visited.has(neighbor)) { continue; }
        visited.add(neighbor);

        const current = dfs(graph, neighbor, y, visited);
        if (current !== -1) { return graph[x][neighbor] * current; }
    }
    return -1;
};
```

Union Find:
```javascript
var calcEquation = function(equations, values, queries) {
    let roots = {}
    
    function find(key) {
        if (!roots[key]) { roots[key] = [key, 1]; }

        const [rootKey, rootValue] = roots[key];
        if (rootKey === key) { return roots[key]; }
        
        const [parentKey, parentValue] = find(rootKey);
        roots[key] = [parentKey, parentValue * rootValue];
        return roots[key];
    }

    function union(x, y, value) {
        const [xRoot, xValue] = find(x);
        const [yRoot, yValue] = find(y);
        if (xRoot !== yRoot) {
            roots[xRoot] = [yRoot, (yValue / xValue) * value];
        }
    }

    for (let i = 0; i < equations.length; i++) {
        const [v1, v2] = equations[i];
        union(v1, v2, values[i]);
    }  

    const result = [];
    for (let i = 0; i < queries.length; i++) {
        const [from, to] = queries[i];

        if (!roots[from] || !roots[to]) {
            result[i] = -1;
        } else {
            const [fromRoot, fromValue] = find(from);
            const [toRoot, toValue] = find(to);
            if (fromRoot != toRoot) {
                result[i] = -1;
            } else {
                result[i] = fromValue / toValue;
            }
        }
    }
    return result;
};
```

<!-- @include ../leetcode/0839.similar-string-groups.md -->
### Similar String Groups
[839. Similar String Groups](https://leetcode.com/problems/similar-string-groups/)

```html
Two strings X and Y are similar if we can swap two letters (in different positions) of X, so that it equals Y. Also two strings X and Y are similar if they are equal.

For example, "tars" and "rats" are similar (swapping at positions 0 and 2), and "rats" and "arts" are similar, but "star" is not similar to "tars", "rats", or "arts".

Together, these form two connected groups by similarity: {"tars", "rats", "arts"} and {"star"}.  Notice that "tars" and "arts" are in the same group even though they are not similar.  Formally, each group is such that a word is in the group if and only if it is similar to at least one other word in the group.

We are given a list strs of strings where every string in strs is an anagram of every other string in strs. How many groups are there?

Example 1:
Input: strs = ["tars","rats","arts","star"]
Output: 2

Example 2:
Input: strs = ["omv","ovm"]
Output: 1
```

DFS:
```javascript
var numSimilarGroups = function(strs) {
    let count = 0;
    for (let i = 0; i < strs.length; i++) {
        if (strs[i] !== null) {
            dfs(strs, i);
            count++;
        }
    }
    return count;
};

function dfs(strs, i) {
    const s = strs[i];
    strs[i] = null;
    for (let j = 0; j < strs.length; j++) {
        if (i !== j && isSimilar(s, strs[j])) {
            dfs(strs, j);
        }
    }
}

function isSimilar(word1, word2) {
    if (word1 === word2) { return true; }
    if ((word1 || '').length !== (word2 || '').length) { return false; }
    let diff = 0;
    for (let i = 0; i < word1.length; i++) {
        if (word1[i] !== word2[i]) { diff++; }
    }
    return diff <= 2;
}
```

Union Find:
```javascript
var numSimilarGroups = function(strs) {
    const uf = new UnionFind();
    for (let i = 0; i < strs.length; i++) {
        let matchFound = false;
        for (let j = i + 1; j < strs.length; j++) {
            if (isSimilar(strs[i], strs[j])) {
                uf.union(strs[i], strs[j]);
                matchFound = true;
            }   
        }
        if (!matchFound) {
            uf.union(strs[i], strs[i]);
        }
    }
    
    return uf.size;
};

class UnionFind {
    constructor(n) {
        this.roots = {};
    }
    
    find(key) {
        if (!this.roots[key]) { this.roots[key] = key; }
        if (this.roots[key] === key) { return key; }
        this.roots[key] = this.find(this.roots[key]);
        return this.roots[key];
    }
    
    union(u, v) {
        const rootU = this.find(u);
        const rootV = this.find(v);
        if (rootU !== rootV) {
            this.roots[rootV] = this.roots[rootU];
        }
    }
    
    get size() {
        return Object.keys(this.roots).filter(key => key == this.roots[key]).length;
    }
}

function isSimilar(word1, word2) {
    if (word1.length !== word2.length) { return false; }
    let diff = 0;
    for (let i = 0; i < word1.length; i++) {
        if (word1[i] !== word2[i]) { diff++; }
    }
    return diff <= 2;
}
```

<!-- @include ../leetcode/0952.largest-component-size-by-common-factor.md -->
### Largest Component Size by Common Factor
[952. Largest Component Size by Common Factor](https://leetcode.com/problems/largest-component-size-by-common-factor/)

```html
Given a non-empty array of unique positive integers nums, consider the following graph:

There are nums.length nodes, labelled nums[0] to nums[nums.length - 1];
There is an edge between nums[i] and nums[j] if and only if nums[i] and nums[j] share a common factor greater than 1.
Return the size of the largest connected component in the graph.

 

Example 1:

Input: nums = [4,6,15,35]
Output: 4

Example 2:

Input: nums = [20,50,9,63]
Output: 2

Example 3:

Input: nums = [2,3,6,7,4,12,21,39]
Output: 8
```

```javascript
var largestComponentSize = function(nums) {
    const uf = new UnionFind();
    for(let num of nums) {
        const factors = getFactors(num);
        for (const factor of factors) {  
            uf.union(num, factor);
        }
    }
    const countMap = new Map()
    for(let num of nums) {
        const parent = uf.find(num);
        countMap.set(parent, (countMap.get(parent) || 0) + 1) 
    }
    return Math.max(...countMap.values())
};

class UnionFind {
    constructor() {
        this.roots = {};
    }
    
    find(key) {
        if (!this.roots[key]) { this.roots[key] = key; }

        if (this.roots[key] === key) { return key; }
        this.roots[key] = this.find(this.roots[key]);
        return this.roots[key];
    }
    
    union(x, y) {
        const rootX = this.find(x);
        const rootY = this.find(y);
        if (rootX !== rootY) {
            this.roots[rootY] = rootX;
        }
    }
}

function getFactors(number) {
    const res = new Set();
    for (let i = 2; i * i <= number; i++) { 
        if (number % i === 0) {
            res.add(i);
            res.add(number / i);
        }
    }
    return [...res.values()];
}
```
