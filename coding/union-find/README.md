# Union Find
<!-- GFM-TOC -->
* [Union Find](#union-find)
    * [Accounts Merge](#Accounts-Merge)
    * [Redundant Connection](#Redundant-Connection)
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