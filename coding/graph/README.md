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
    * [Making A Large Island](#making-a-large-island)
    * [As Far from Land as Possible](#as-far-from-land-as-possible)
    * [Keys and Rooms](#keys-and-rooms)
    * [Smallest String With Swaps](#smallest-string-with-swaps)
    * [Find Eventual Safe States](#find-eventual-safe-states)
    * [Evaluate Division](#evaluate-division)
    * [Find Eventual Safe States](#find-eventual-safe-states)
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

<!-- @include ../leetcode/0827.making-a-large-island.md -->
### Making A Large Island
[827. Making A Large Island](https://leetcode.com/problems/making-a-large-island/)

```html
You are given an n x n binary matrix grid. You are allowed to change at most one 0 to be 1.

Return the size of the largest island in grid after applying this operation.

An island is a 4-directionally connected group of 1s.

 

Example 1:

Input: grid = [[1,0],[0,1]]
Output: 3
Explanation: Change one 0 to 1 and connect two 1s, then we get an island with area = 3.
Example 2:

Input: grid = [[1,1],[1,0]]
Output: 4
Explanation: Change the 0 to 1 and make the island bigger, only one island with area = 4.
Example 3:

Input: grid = [[1,1],[1,1]]
Output: 4
Explanation: Can't change any 0 to 1, only one island with area = 4.
```

```javascript
const DIRECTIONS = [[1,0], [-1,0], [0,1], [0,-1]];

var largestIsland = function(grid) {
    if (!grid || !grid.length) return 0;

    const m = grid.length;
    const n = grid[0].length;
    let max = -Infinity;
    let color = 2;
    let map = {};

    for (let row = 0; row < m; row++) {
        for (let col = 0; col < n; col++) {
            if (grid[row][col] === 1) {
                // mark the island
                const area = dfs(grid, row, col, color);
                max = Math.max(max, area);
                map[color] = area;
                color++;
            }
        }
    }

    for (let row = 0; row < m; row++) {
        for (let col = 0; col < n; col++) {
            if (grid[row][col] !== 0) { continue; }
            let set = new Set();
            let cur = 1;

            for (const [deltaRow, deltaCol] of DIRECTIONS) {
                const nextRow = deltaRow + row;
                const nextCol = deltaCol + col;

                if (grid[nextRow] === undefined || grid[nextRow][nextCol] === undefined) { continue; }

                const islandColor = grid[nextRow][nextCol];
                if (islandColor > 1 && !set.has(islandColor)) {
                    set.add(islandColor);
                    cur += map[islandColor];
                }
            }
            max = Math.max(max, cur);
        }
    }
    return max;
}

function dfs(grid, row, col, color) {
    if (grid[row] === undefined || grid[row][col] === undefined) { return 0; }
    if (grid[row][col] === 0 || grid[row][col] === color) { return 0; }
    grid[row][col] = color;
    return 1 
        + dfs(grid, row + 1, col, color) 
        + dfs(grid, row - 1, col, color)
        + dfs(grid, row, col + 1, color)
        + dfs(grid, row, col - 1, color);
}
```

<!-- @include ../leetcode/1162.as-far-from-land-as-possible.md -->
### As Far from Land as Possible
[1162. As Far from Land as Possible](https://leetcode.com/problems/as-far-from-land-as-possible/)

```html
Given an n x n grid containing only values 0 and 1, where 0 represents water and 1 represents land, find a water cell such that its distance to the nearest land cell is maximized, and return the distance. If no land or water exists in the grid, return -1.

The distance used in this problem is the Manhattan distance: the distance between two cells (x0, y0) and (x1, y1) is |x0 - x1| + |y0 - y1|.

Example 1:


Input: grid = [[1,0,1],[0,0,0],[1,0,1]]
Output: 2
Explanation: The cell (1, 1) is as far as possible from all the land with distance 2.
Example 2:


Input: grid = [[1,0,0],[0,0,0],[0,0,0]]
Output: 4
Explanation: The cell (2, 2) is as far as possible from all the land with distance 4.
```

```javascript
const dir = [[-1, 0], [1, 0], [0,-1], [0, 1]];
var maxDistance = function(grid) {
    let ret = 0;
    let queue = [];
    for (let i = 0; i < grid.length; i++) {
        for(let j = 0; j < grid.length; j++){
            if (grid[i][j] === 1) {
                queue.push([i, j]);
            }
        }
    }

    let step = 0;
    while (queue.length > 0) {
        ret = Math.max(ret, (step++));
        const nextQueue = [];

        for (const [row, col] of queue) {
            for(const [deltaRow, deltaCol] of dir) {
                const nextRow = row + deltaRow, nextCol = col + deltaCol;
                if (grid[nextRow] !== undefined && grid[nextRow][nextCol] === 0) {
                    grid[nextRow][nextCol] = -1;
                    nextQueue.push([nextRow, nextCol]);
                }
            }
        }
        queue = nextQueue;
    }
    return ret === 0 ? -1 : ret;
};
```

<!-- @include ../leetcode/0841.keys-and-rooms.md -->
### Keys and Rooms
[841. Keys and Rooms](https://leetcode.com/problems/keys-and-rooms/)

```html
There are N rooms and you start in room 0.  Each room has a distinct number in 0, 1, 2, ..., N-1, and each room may have some keys to access the next room. 

Formally, each room i has a list of keys rooms[i], and each key rooms[i][j] is an integer in [0, 1, ..., N-1] where N = rooms.length.  A key rooms[i][j] = v opens the room with number v.

Initially, all the rooms start locked (except for room 0). 

You can walk back and forth between rooms freely.

Return true if and only if you can enter every room.

Example 1:

Input: [[1],[2],[3],[]]
Output: true
Explanation:  
We start in room 0, and pick up key 1.
We then go to room 1, and pick up key 2.
We then go to room 2, and pick up key 3.
We then go to room 3.  Since we were able to go to every room, we return true.
Example 2:

Input: [[1,3],[3,0,1],[2],[0]]
Output: false
Explanation: We can't enter the room with number 2.
```

```javascript
var canVisitAllRooms = function(rooms) {
    const visited = new Map();
    dfs(rooms, 0, visited);
    return rooms.length === visited.size;
};
function dfs(rooms, currentRoom, visited) {
    if (visited.get(currentRoom)) { return; }
    visited.set(currentRoom, true);
    for (const key of rooms[currentRoom]){
        dfs(rooms, key, visited);
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

<!-- @include ../leetcode/0802.find-eventual-safe-states.md -->
### Find Eventual Safe States
[802. Find Eventual Safe States](https://leetcode.com/problems/find-eventual-safe-states/)

```html
We start at some node in a directed graph, and every turn, we walk along a directed edge of the graph. If we reach a terminal node (that is, it has no outgoing directed edges), we stop.

We define a starting node to be safe if we must eventually walk to a terminal node. More specifically, there is a natural number k, so that we must have stopped at a terminal node in less than k steps for any choice of where to walk.

Return an array containing all the safe nodes of the graph. The answer should be sorted in ascending order.

The directed graph has n nodes with labels from 0 to n - 1, where n is the length of graph. The graph is given in the following form: graph[i] is a list of labels j such that (i, j) is a directed edge of the graph, going from node i to node j.

Example 1:

Illustration of graph
Input: graph = [[1,2],[2,3],[5],[0],[5],[],[]]
Output: [2,4,5,6]
Explanation: The given graph is shown above.
Example 2:

Input: graph = [[1,2,3,4],[1,2],[3,4],[0,4],[]]
Output: [4]
```

```javascript
const UNVISITED = 0, VISITING = -1, VISITED = 1;
var eventualSafeNodes = function(graph) {
    const visited = Array(graph.length).fill(UNVISITED);
    const res = [];
    for (let i = 0; i < graph.length; i++) {
        if (dfs(graph, i, visited)) { res.push(i); }
    }
    return res;
};
function dfs(graph, curr, visited) {
    if (visited[curr] !== UNVISITED) {
        return visited[curr] === VISITED;
    }

    // if (graph[curr].length === 0) { return true; }

    visited[curr] = VISITING;

    for (const neighbor of graph[curr]) {
        if (!dfs(graph, neighbor, visited)) {
            return false;
        }
    }
    visited[curr] = VISITED;
    return true;
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
<!-- @include ../leetcode/0802.find-eventual-safe-states.md -->
### Find Eventual Safe States
[802. Find Eventual Safe States](https://leetcode.com/problems/find-eventual-safe-states/)

```html
We start at some node in a directed graph, and every turn, we walk along a directed edge of the graph. If we reach a terminal node (that is, it has no outgoing directed edges), we stop.

We define a starting node to be safe if we must eventually walk to a terminal node. More specifically, there is a natural number k, so that we must have stopped at a terminal node in less than k steps for any choice of where to walk.

Return an array containing all the safe nodes of the graph. The answer should be sorted in ascending order.

The directed graph has n nodes with labels from 0 to n - 1, where n is the length of graph. The graph is given in the following form: graph[i] is a list of labels j such that (i, j) is a directed edge of the graph, going from node i to node j.

Example 1:

Illustration of graph
Input: graph = [[1,2],[2,3],[5],[0],[5],[],[]]
Output: [2,4,5,6]
Explanation: The given graph is shown above.
Example 2:

Input: graph = [[1,2,3,4],[1,2],[3,4],[0,4],[]]
Output: [4]
```

```javascript
const UNVISITED = 0, VISITING = -1, VISITED = 1;
var eventualSafeNodes = function(graph) {
    const visited = Array(graph.length).fill(UNVISITED);
    const res = [];
    for (let i = 0; i < graph.length; i++) {
        if (dfs(graph, i, visited)) { res.push(i); }
    }
    return res;
};
function dfs(graph, curr, visited) {
    if (visited[curr] !== UNVISITED) {
        return visited[curr] === VISITED;
    }

    // if (graph[curr].length === 0) { return true; }

    visited[curr] = VISITING;

    for (const neighbor of graph[curr]) {
        if (!dfs(graph, neighbor, visited)) {
            return false;
        }
    }
    visited[curr] = VISITED;
    return true;
}
```
