# Union Find
<!-- GFM-TOC -->
* [Union Find](#union-find)
    * [Accounts Merge](#Accounts-Merge)
    * [Redundant Connection](#Redundant-Connection)
    * [Graph Valid Tree](#graph-valid-tree)
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
### Accounts Merge
[721. Accounts Merge](https://leetcode.com/problems/accounts-merge/)
```javascript
var accountsMerge = function(accounts) {
    ///// union find /////
    const parents = {};
    const find = (x) => {
        if (parents[x] !== x) {
            parents[x] = find(parents[x]);
        }
        return parents[x];
    };

    const union = (x, y) => {
        parents[find(x)] = find(y);
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

### Redundant Connection
[684. Redundant Connection](https://leetcode.com/problems/redundant-connection/description/)
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