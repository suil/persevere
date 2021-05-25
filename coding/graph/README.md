# Graph
<!-- GFM-TOC -->
* [Graph](#graph)
    * [Is Graph Bipartite](#is-graph-bipartite)
    * [Topology Sorting](#topology-sorting)
        * [Course Schedule](#course-schedule)
        * [Course Schedule II](#course-schedule-ii)
    * [Redundant Connection](#redundant-connection)
    * [Clone Graph](#clone-graph)
    * [Connected Components in Graph](#connected-components-in-graph)
        * [Number of Connected Components in an Undirected Graph](#number-of-connected-components-in-an-undirected-graph)
        * [Graph Valid Tree](#graph-valid-tree)
    * [Find the Celebrity](#find-the-celebrity)
    * [Flood Fill](#flood-fill)
<!-- GFM-TOC -->

<!-- @include ../leetcode/0785.is-graph-bipartite.md -->
### Is Graph Bipartite
[785. Is Graph Bipartite?](https://leetcode.com/problems/is-graph-bipartite/description/)
```html
Given an undirected graph, return true if and only if it is bipartite.

Recall that a graph is bipartite if we can split it’s set of nodes into two independent subsets A and B such that every edge in the graph has one node in A and another node in B.

The graph is given in the following form: graph[i] is a list of indexes j for which the edge between nodes i and j exists.  Each node is an integer between 0 and graph.length - 1.  There are no self edges or parallel edges: graph[i] does not contain i, and it doesn’t contain any element twice.

Example 1:
Input: [[1,3], [0,2], [1,3], [0,2]]
Output: true
Explanation: 
The graph looks like this:
0----1
|    |
|    |
3----2
We can divide the vertices into two groups: {0, 2} and {1, 3}.
Example 2:
Input: [[1,2,3], [0,2], [0,1,3], [0,2]]
Output: false
Explanation: 
The graph looks like this:
0----1
| \  |
|  \ |
3----2
We cannot find a way to divide the set of nodes into two independent subsets.
```

```javascript
const RED = 1;
const BLUE = 2;
var isBipartite = function(graph) {
    const visited = []
    for (let i = 0; i < graph.length; i++) {
        if (visited[i] === undefined && !isBipartiteHelper(graph, i, RED, visited)) {
            return false;
        }
    }
    return true;
};
function isBipartiteHelper(graph, current, marker, visited) {
    if (visited[current] !== undefined) {
        return marker === visited[current];
    }
    visited[current] = marker;
    for (const neighbor of graph[current]) {
        const nextMarker = visited[current] === RED ? BLUE : RED;
        if (!isBipartiteHelper(graph, neighbor, nextMarker, visited)) {
            return false;
        }
    }
    return true;
}
```

## Topology Sorting

Topological sorting for Directed Acyclic Graph (DAG) is a linear ordering of vertices such that for every directed edge u v, vertex u comes before v in the ordering. Topological Sorting for a graph is not possible if the graph is not a DAG.

Topological Sorting is mainly used for scheduling jobs from the given dependencies among jobs. In computer science, applications of this type arise in instruction scheduling, ordering of formula cell evaluation when recomputing formula values in spreadsheets, logic synthesis, determining the order of compilation tasks to perform in make files, data serialization, and resolving symbol dependencies in linkers [2]. 

Complexity Analysis: 

Time Complexity: O(V+E). 
The above algorithm is simply DFS with an extra stack. So time complexity is the same as DFS which is.
Auxiliary space: O(V). 
The extra space is needed for the stack.

<!-- @include ../leetcode/0207.course-schedule.md -->
### Course Schedule
[207. Course Schedule](https://leetcode.com/problems/course-schedule/description/)

```html
There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.

For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.
Return true if you can finish all courses. Otherwise, return false.

 

Example 1:

Input: numCourses = 2, prerequisites = [[1,0]]
Output: true
Explanation: There are a total of 2 courses to take. 
To take course 1 you should have finished course 0. So it is possible.
Example 2:

Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
Output: false
Explanation: There are a total of 2 courses to take. 
To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.
```

```javascript
var canFinish = function(numCourses, prerequisites) {
    const graph = [...Array(numCourses)].map(_ => []);
    for (const [course, dependency] of prerequisites) {
        if (!graph[course]) {
            graph[course] = [];
        }
        graph[course].push(dependency);
    }

    const visited = [];
    const visiting = [];
    for (let i = 0; i < numCourses; i++) {
        if (hasCircle(graph, i, visited, visiting)) {
            return false;
        }
    }
    return true;
};

function hasCircle(graph, current, visited, visiting) {
    if (visited[current]) {
        return false;
    }
    
    if (visiting[current]) {
        return true;
    }
    
    visiting[current] = true;
    
    for (const neighbor of graph[current]) {
        if (hasCircle(graph, neighbor, visited, visiting)) {
            return true;
        }
    }
    visiting[current] = false;
    visited[current] = true;
    return false;
}
```

<!-- @include ../leetcode/0210.course-schedule-ii.md -->
### Course Schedule II
[210. Course Schedule II](https://leetcode.com/problems/course-schedule-ii/description/)

```html
There are a total of n courses you have to take labelled from 0 to n - 1.
Some courses may have prerequisites, for example, if prerequisites[i] = [ai, bi] this means you must take the course bi before the course ai.
Given the total number of courses numCourses and a list of the prerequisite pairs, return the ordering of courses you should take to finish all courses.
If there are many valid answers, return any of them. If it is impossible to finish all courses, return an empty array.
Example 1:

Input: numCourses = 2, prerequisites = [[1,0]]
Output: [0,1]
Explanation: There are a total of 2 courses to take. To take course 1 you should have finished course 0. So the correct course order is [0,1].
Example 2:

Input: numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]
Output: [0,2,1,3]
Explanation: There are a total of 4 courses to take. To take course 3 you should have finished both courses 1 and 2. Both courses 1 and 2 should be taken after you finished course 0.
So one correct course order is [0,1,2,3]. Another correct ordering is [0,2,1,3].
Example 3:

Input: numCourses = 1, prerequisites = []
Output: [0]
```

```javascript
var findOrder = function(numCourses, prerequisites) {
    const graph = [...Array(numCourses)].map(_ => []);
    for (const [course, dependency] of prerequisites) {
        if (!graph[course]) {
            graph[course] = [];
        }
        graph[course].push(dependency);
    }

    const visited = [];
    const visiting = [];
    const orders = [];
    
    for (let i = 0; i < numCourses; i++) {
        if (hasCircle(graph, i, visited, visiting, orders)) {
            return [];
        }
    }
    
    return orders;
};

function hasCircle(graph, current, visited, visiting, orders) {
    if (visited[current]) {
        return false;
    }
    
    if (visiting[current]) {
        return true;
    }
    
    visiting[current] = true;
    
    for (const neighbor of graph[current]) {
        if (hasCircle(graph, neighbor, visited, visiting, orders)) {
            return true;
        }
    }
    
    visiting[current] = false;
    visited[current] = true;
    orders.push(current);
    return false;
}
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

<!-- @include ../leetcode/0133.clone-graph.md -->
### Clone Graph
[133. Clone Graph](https://leetcode.com/problems/clone-graph/)
```html
Given a reference of a node in a connected undirected graph.
Return a deep copy (clone) of the graph.
Each node in the graph contains a val (int) and a list (List[Node]) of its neighbors.

class Node {
    public int val;
    public List<Node> neighbors;
}

Test case format:
For simplicity sake, each node's value is the same as the node's index (1-indexed). For example, the first node with val = 1, the second node with val = 2, and so on. The graph is represented in the test case using an adjacency list.
Adjacency list is a collection of unordered lists used to represent a finite graph. Each list describes the set of neighbors of a node in the graph.
The given node will always be the first node with val = 1. You must return the copy of the given node as a reference to the cloned graph.

Example 1:
Input: adjList = [[2,4],[1,3],[2,4],[1,3]]
Output: [[2,4],[1,3],[2,4],[1,3]]
Explanation: There are 4 nodes in the graph.
1st node (val = 1)'s neighbors are 2nd node (val = 2) and 4th node (val = 4).
2nd node (val = 2)'s neighbors are 1st node (val = 1) and 3rd node (val = 3).
3rd node (val = 3)'s neighbors are 2nd node (val = 2) and 4th node (val = 4).
4th node (val = 4)'s neighbors are 1st node (val = 1) and 3rd node (val = 3).

Example 2:
Input: adjList = [[]]
Output: [[]]
Explanation: Note that the input contains one empty list. The graph consists of only one node with val = 1 and it does not have any neighbors.
Example 3:

Input: adjList = []
Output: []
Explanation: This an empty graph, it does not have any nodes.

Example 4:
Input: adjList = [[2],[1]]
Output: [[2],[1]]
```

```javascript
var cloneGraph = function(node) {
    const map = new Map();
    return cloneGraphHelper(node, map);
};
function cloneGraphHelper(node, map) {
    if (!node) { return null; }
    let newNode;
    if (map.has(node)) {
        newNode = node;
    } else {
        newNode = new Node(node.val);
        map.set(node, newNode)
    }
    for (const neighbor of node.neighbors) {
        if (map.has(neighbor)) {
            newNode.neighbors.push(map.get(neighbor));
        } else {
            newNode.neighbors.push(cloneGraphHelper(neighbor, map));
        }
    }
    return newNode;
}
```
## Connected Components in Graph
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

<!-- @include ../leetcode/0277.find-the-celebrity.md -->
### Find the Celebrity
[277. Find the Celebrity](https://leetcode.com/problems/find-the-celebrity/)

```html
Suppose you are at a party with n people (labeled from 0 to n - 1), and among them, there may exist one celebrity. The definition of a celebrity is that all the other n - 1 people know him/her, but he/she does not know any of them.

Now you want to find out who the celebrity is or verify that there is not one. The only thing you are allowed to do is to ask questions like: "Hi, A. Do you know B?" to get information about whether A knows B. You need to find out the celebrity (or verify there is not one) by asking as few questions as possible (in the asymptotic sense).

You are given a helper function bool knows(a, b) which tells you whether A knows B. Implement a function int findCelebrity(n). There will be exactly one celebrity if he/she is in the party. Return the celebrity's label if there is a celebrity in the party. If there is no celebrity, return -1.

Example 1:
Input: graph = [[1,1,0],[0,1,0],[1,1,1]]
Output: 1
Explanation: There are three persons labeled with 0, 1 and 2. graph[i][j] = 1 means person i knows person j, otherwise graph[i][j] = 0 means person i does not know person j. The celebrity is the person labeled as 1 because both 0 and 2 know him but 1 does not know anybody.

Example 2:
Input: graph = [[1,0,1],[1,1,0],[0,1,1]]
Output: -1
Explanation: There is no celebrity.
```

```javascript
var solution = function(knows) {
    /**
     * @param {integer} n Total people
     * @return {integer} The celebrity
     */
    return function(n) {
        let candidate = 0;
        for (let i = 1; i < n; i++) {
            if (knows(candidate, i)) {
                candidate = i;
            }
        }
        for (let i = 0; i < n; i++) {
            if (i === candidate) { continue; }
            if (!knows(i, candidate) || knows(candidate, i)) {
                return -1
            }
        }
        return candidate;
    };
};
```

<!-- @include ../leetcode/0733.flood-fill.md -->
### Flood Fill
[733. Flood Fill](https://leetcode.com/problems/flood-fill/)

```html
An image is represented by a 2-D array of integers, each integer representing the pixel value of the image (from 0 to 65535).

Given a coordinate (sr, sc) representing the starting pixel (row and column) of the flood fill, and a pixel value newColor, "flood fill" the image.

To perform a "flood fill", consider the starting pixel, plus any pixels connected 4-directionally to the starting pixel of the same color as the starting pixel, plus any pixels connected 4-directionally to those pixels (also with the same color as the starting pixel), and so on. Replace the color of all of the aforementioned pixels with the newColor.

At the end, return the modified image.

Example 1:
Input: 
image = [[1,1,1],[1,1,0],[1,0,1]]
sr = 1, sc = 1, newColor = 2
Output: [[2,2,2],[2,2,0],[2,0,1]]
Explanation: 
From the center of the image (with position (sr, sc) = (1, 1)), all pixels connected 
by a path of the same color as the starting pixel are colored with the new color.
Note the bottom corner is not colored 2, because it is not 4-directionally connected
to the starting pixel.
```

```javascript
var floodFill = function(image, sr, sc, newColor) {
    const visited = [...Array(image.length)].map(() => [...Array(image[0].length)].fill(0));
    floodFillHelper(image, sr, sc, image[sr][sc], newColor, visited);
    return image;
};
function floodFillHelper(image, currentRow, currentCol, oldColor, newColor, visited) {
    if (image[currentRow] === undefined
        || image[currentRow][currentCol] === undefined
        || image[currentRow][currentCol] !== oldColor
        || visited[currentRow][currentCol] === true) {
        return;
    }
    
    image[currentRow][currentCol] = newColor;

    visited[currentRow][currentCol] = true;
    
    floodFillHelper(image, currentRow + 1, currentCol, oldColor, newColor, visited);
    floodFillHelper(image, currentRow - 1, currentCol, oldColor, newColor, visited);
    floodFillHelper(image, currentRow, currentCol + 1, oldColor, newColor, visited);
    floodFillHelper(image, currentRow, currentCol - 1, oldColor, newColor, visited);
}
```
