# Leetcode 题解 - 搜索
<!-- GFM-TOC -->
* [Leetcode 题解 - 搜索](#leetcode-题解---搜索)
    * [BFS](#bfs)
        * [1. Shortest Path in Binary Matrix](#1091-Shortest-Path-in-Binary-Matrix)
        * [2. 组成整数的最小平方数数量](#2-组成整数的最小平方数数量)
        * [3. 最短单词路径](#3-最短单词路径)
        * [Shortest Distance from All Buildings](#shortest-distance-from-all-buildings)
    * [DFS](#dfs)
        * [Max Area of Island](#Max-Area-of-Island)
        * [Number of Islands](#number-of-islands)
        * [Number of Provinces](#number-of-provinces)
        * [4. 填充封闭区域](#4-填充封闭区域)
        * [5. 能到达的太平洋和大西洋的区域](#5-能到达的太平洋和大西洋的区域)
        * [Word Search](#Word-Search)
<!-- GFM-TOC -->


DFS and BFS are widely used in graphs and trees

## BFS

<div align="center"> <img src="https://cs-notes-1256109796.cos.ap-guangzhou.myqcloud.com/95903878-725b-4ed9-bded-bc4aae0792a9.jpg"/> </div><br>

layer 1:

- 0 -\> {6,2,1,5}

layer 2:

- 6 -\> {4}
- 2 -\> {}
- 1 -\> {}
- 5 -\> {3}

layer 3:

- 4 -\> {}
- 3 -\> {}

Implementation of BFS

- queue：store nodes in every round
- mark：mark visited nodes so that they won't be reused.

<!-- @include ../leetcode/1091.shortest-path-in-binary-matrix.md -->
### Shortest Path in Binary Matrix

[1091. Shortest Path in Binary Matrix](https://leetcode.com/problems/shortest-path-in-binary-matrix/)

```html
[[1,1,0,1],
 [1,0,1,0],
 [1,1,1,1],
 [1,0,1,1]]
```

```java
public int shortestPathBinaryMatrix(int[][] grids) {
        if (grids == null || grids.length == 0 || grids[0].length == 0) {
            return -1;
        }
        int[][] direction = {{1, -1}, {1, 0}, {1, 1}, {0, -1}, {0, 1}, {-1, -1}, {-1, 0}, {-1, 1}};
        int m = grids.length, n = grids[0].length;
        Queue<Pair<Integer, Integer>> queue = new LinkedList<>();
        queue.add(new Pair<>(0, 0));
        int pathLength = 0;
        while (!queue.isEmpty()) {
            int size = queue.size();
            pathLength++;
            while (size-- > 0) {
                Pair<Integer, Integer> cur = queue.poll();
                int cr = cur.getKey(), cc = cur.getValue();
                if (grids[cr][cc] == 1) {
                    continue;
                }
                if (cr == m - 1 && cc == n - 1) {
                    return pathLength;
                }
                grids[cr][cc] = 1; // 标记
                for (int[] d : direction) {
                    int nr = cr + d[0], nc = cc + d[1];
                    if (nr < 0 || nr >= m || nc < 0 || nc >= n) {
                        continue;
                    }
                    queue.add(new Pair<>(nr, nc));
                }
            }
        }
        return -1;
    }
```
```javascript
var shortestPathBinaryMatrix = function(grid) {
    if (grid.length === 1 && grid[0].length === 1) {
        return grid[0][0] === 0 ? 1 : -1;
    }

    const rowLen = grid.length;
    const colLen = grid[0].length;

    let queue = [[0, 0]];
    let count = 0;
    const directions = [
      [1, -1], [1, 0], [1, 1],
      [0, -1], [0, 1],
      [-1, -1], [-1, 0], [-1, 1]
    ];

    while (queue.length > 0) {
      const nextQueue = [];
      count++;

      for (const [row, col] of queue) {
        if (row === rowLen - 1 && col === colLen - 1) {
          return count;
        }

        if (grid[row][col] === 1) { continue; }

        grid[row][col] = 1;

        for (const [rowDir, colDir] of directions) {
          const nextRow = row + rowDir;
          const nextCol = col + colDir;
          if (grid[nextRow]?.[nextCol] === 0) {
            nextQueue.push([nextRow, nextCol]);
          }
        }
      }

      queue = nextQueue;
    }

    return -1;
};
```
<!-- @include-end ../leetcode/1091.shortest-path-in-binary-matrix.md -->

<!-- @include ../leetcode/0279.perfect-squares.md -->
### Perfect Squares
[279. Perfect Squares](https://leetcode.com/problems/perfect-squares/)

```html
Given an integer n, return the least number of perfect square numbers that sum to n.

A perfect square is an integer that is the square of an integer; in other words, it is the product of some integer with itself. For example, 1, 4, 9, and 16 are perfect squares while 3 and 11 are not.

Example 1:

Input: n = 12
Output: 3
Explanation: 12 = 4 + 4 + 4.
Example 2:

Input: n = 13
Output: 2
Explanation: 13 = 4 + 9.
```

BFS:
```javascript
var numSquares = function(n) {
    let queue = [n];
    let count = 0;

    while (queue.length > 0) {
        const nextQueue = [];
        count++;
        
        for (const item of queue) {
            for (let i = 1; i * i <= item; i++) {
                const remainder = item - i * i;
                if (remainder === 0) {
                    return count;
                }

                nextQueue.push(remainder);
            }
            
        }

        queue = nextQueue;
    }

    return -1;
};
```

DP:
```javascript
var numSquares = function(n) {
    const dp = [...Array(n + 1)].map((_, index) => index);

    for (let i = 1; i <= n; i++) {
        for (let j = 1; j * j <= i; j++) {
            dp[i] = Math.min(dp[i], 1 + dp[i - j * j]);
        }
    }

    return dp[n];
};
```
<!-- @include-end ../leetcode/0279.perfect-squares.md -->

### 3. 最短单词路径

127\. Word Ladder (Medium)

[Leetcode](https://leetcode.com/problems/word-ladder/description/) / [力扣](https://leetcode-cn.com/problems/word-ladder/description/)

```html
Input:
beginWord = "hit",
endWord = "cog",
wordList = ["hot","dot","dog","lot","log","cog"]

Output: 5

Explanation: As one shortest transformation is "hit" -> "hot" -> "dot" -> "dog" -> "cog",
return its length 5.
```

```html
Input:
beginWord = "hit"
endWord = "cog"
wordList = ["hot","dot","dog","lot","log"]

Output: 0

Explanation: The endWord "cog" is not in wordList, therefore no possible transformation.
```

题目描述：找出一条从 beginWord 到 endWord 的最短路径，每次移动规定为改变一个字符，并且改变之后的字符串必须在 wordList 中。

```java
public int ladderLength(String beginWord, String endWord, List<String> wordList) {
    wordList.add(beginWord);
    int N = wordList.size();
    int start = N - 1;
    int end = 0;
    while (end < N && !wordList.get(end).equals(endWord)) {
        end++;
    }
    if (end == N) {
        return 0;
    }
    List<Integer>[] graphic = buildGraphic(wordList);
    return getShortestPath(graphic, start, end);
}

private List<Integer>[] buildGraphic(List<String> wordList) {
    int N = wordList.size();
    List<Integer>[] graphic = new List[N];
    for (int i = 0; i < N; i++) {
        graphic[i] = new ArrayList<>();
        for (int j = 0; j < N; j++) {
            if (isConnect(wordList.get(i), wordList.get(j))) {
                graphic[i].add(j);
            }
        }
    }
    return graphic;
}

private boolean isConnect(String s1, String s2) {
    int diffCnt = 0;
    for (int i = 0; i < s1.length() && diffCnt <= 1; i++) {
        if (s1.charAt(i) != s2.charAt(i)) {
            diffCnt++;
        }
    }
    return diffCnt == 1;
}

private int getShortestPath(List<Integer>[] graphic, int start, int end) {
    Queue<Integer> queue = new LinkedList<>();
    boolean[] marked = new boolean[graphic.length];
    queue.add(start);
    marked[start] = true;
    int path = 1;
    while (!queue.isEmpty()) {
        int size = queue.size();
        path++;
        while (size-- > 0) {
            int cur = queue.poll();
            for (int next : graphic[cur]) {
                if (next == end) {
                    return path;
                }
                if (marked[next]) {
                    continue;
                }
                marked[next] = true;
                queue.add(next);
            }
        }
    }
    return 0;
}
```

<!-- @include ../leetcode/0317.shortest-distance-from-all-buildings.md -->
### Shortest Distance from All Buildings
[317. Shortest Distance from All Buildings](https://leetcode.com/problems/shortest-distance-from-all-buildings/)
```html
You want to build a house on an empty land which reaches all buildings in the shortest amount of distance.
You can only move up, down, left and right. You are given a 2D grid of values 0, 1 or 2, where:

    Each 0 marks an empty land which you can pass by freely.
    Each 1 marks a building which you cannot pass through.
    Each 2 marks an obstacle which you cannot pass through.

Example:

Input: [[1,0,2,0,1],[0,0,0,0,0],[0,0,1,0,0]]

1 - 0 - 2 - 0 - 1
|   |   |   |   |
0 - 0 - 0 - 0 - 0
|   |   |   |   |
0 - 0 - 1 - 0 - 0

Output: 7

Explanation: Given three buildings at (0,0), (0,4), (2,2), and an obstacle at (0,2),
             the point (1,2) is an ideal empty land to build a house, as the total
             travel distance of 3+3+1=7 is minimal. So return 7.

Note:
There will be at least one building. If it is not possible to build such house according to the above
rules, return -1.
```

```javascript
const DIRECTIONS = [[0, 1], [1, 0], [0, -1], [-1, 0]];

function distanceFromBuilding(grid, startRow, startCol, distances, reaches) {
    const rowLen = grid.length;
    const colLen = grid[0].length;
    let queue = [[startRow, startCol]];
    let minDistance = Infinity;
    let dist = 0;
    const visited = [...Array(rowLen)].map(() => [...Array(colLen)].fill(false));
    
    while (queue.length > 0) {
        const nextQueue = [];
        dist++;

        for (const [row, col] of queue) {
            for (const [rowDelta, colDelta] of DIRECTIONS) {
                const nextRow = row + rowDelta;
                const nextCol = col + colDelta;
                if (grid[nextRow] === undefined
                    || grid[nextRow][nextCol] === undefined 
                    || grid[nextRow][nextCol] === 2
                    || visited[nextRow][nextCol] === true
                ) {
                    continue;
                }
                
                if (grid[nextRow][nextCol] === 0) {
                    distances[nextRow][nextCol] += dist;
                    reaches[nextRow][nextCol]++;
                    nextQueue.push([nextRow, nextCol]);
                }
                visited[nextRow][nextCol] = true;
            }
        }
        queue = nextQueue;
    }
    return minDistance;
}
var shortestDistance = function(grid) {
    const rowLen = grid.length;
    const colLen = grid[0].length;
    const distances = [...Array(rowLen)].map(() => [...Array(colLen)].fill(0));
    const reaches = [...Array(rowLen)].map(() => [...Array(colLen)].fill(0));
    
    let totalBuildings = 0;
    for (let row = 0; row < rowLen; row += 1) {
        for (let col = 0; col < colLen; col += 1) {
            if (grid[row][col] === 1) {
                totalBuildings++;
                distanceFromBuilding(grid, row, col, distances, reaches);
            }
        }
    }

    let minDistance = Infinity;
    for (let row = 0; row < rowLen; row++) {
        for (let col = 0; col < colLen; col++) {
            if (reaches[row][col] === totalBuildings
                && distances[row][col] < minDistance
            ) {
                minDistance = distances[row][col];
            }
        }
    }    
    return minDistance === Infinity ? -1 : minDistance;
};
```


## DFS

<div align="center"> <img src="https://cs-notes-1256109796.cos.ap-guangzhou.myqcloud.com/74dc31eb-6baa-47ea-ab1c-d27a0ca35093.png"/> </div><br>

广度优先搜索一层一层遍历，每一层得到的所有新节点，要用队列存储起来以备下一层遍历的时候再遍历。

而深度优先搜索在得到一个新节点时立即对新节点进行遍历：从节点 0 出发开始遍历，得到到新节点 6 时，立马对新节点 6 进行遍历，得到新节点 4；如此反复以这种方式遍历新节点，直到没有新节点了，此时返回。返回到根节点 0 的情况是，继续对根节点 0 进行遍历，得到新节点 2，然后继续以上步骤。

从一个节点出发，使用 DFS 对一个图进行遍历时，能够遍历到的节点都是从初始节点可达的，DFS 常用来求解这种   **可达性**   问题。

在程序实现 DFS 时需要考虑以下问题：

- 栈：用栈来保存当前节点信息，当遍历新节点返回时能够继续遍历当前节点。可以使用递归栈。
- 标记：和 BFS 一样同样需要对已经遍历过的节点进行标记。

<!-- @include ../leetcode/0695.max-area-of-island.md -->
### Max Area of Island
[695. Max Area of Island](https://leetcode.com/problems/max-area-of-island/)

```html
You are given an m x n binary matrix grid. An island is a group of 1's (representing land) connected 4-directionally (horizontal or vertical.) You may assume all four edges of the grid are surrounded by water.

The area of an island is the number of cells with a value 1 in the island.

Return the maximum area of an island in grid. If there is no island, return 0.

Example 1:
[0,0,1,0,0,0,0,1,0,0,0,0,0],
[0,0,0,0,0,0,0,1,1,1,0,0,0],
[0,1,1,0,1,0,0,0,0,0,0,0,0],
[0,1,0,0,1,1,0,0,1,0,1,0,0],
[0,1,0,0,1,1,0,0,1,1,1,0,0],
[0,0,0,0,0,0,0,0,0,0,1,0,0],
[0,0,0,0,0,0,0,1,1,1,0,0,0],
[0,0,0,0,0,0,0,1,1,0,0,0,0]

Input: grid = [[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]
Output: 6
Explanation: The answer is not 11, because the island must be connected 4-directionally.
```

```javascript
var maxAreaOfIsland = function(grid) {
    let max = 0;
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
            const area = maxAreaOfIslandHelper(grid, row, col);
            max = Math.max(max, area);
        }
    }
    return max;
};

function maxAreaOfIslandHelper(grid, row, col) {
    if (grid[row] === undefined
        || grid[row][col] === undefined
        || grid[row][col] === 0
    ) {
        return 0;
    }
    
    grid[row][col] = 0;
    
    return (1 +
        maxAreaOfIslandHelper(grid, row + 1, col) +
        maxAreaOfIslandHelper(grid, row - 1, col) +
        maxAreaOfIslandHelper(grid, row, col + 1) +
        maxAreaOfIslandHelper(grid, row, col - 1)
    );
}
```

<!-- @include ../leetcode/0200.number-of-islands.md -->
### Number of Islands
[200. Number of Islands](https://leetcode.com/problems/number-of-islands/)

```html
Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

Example 1:
Input: grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
Output: 1

Example 2:
Input: grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
Output: 3
```

```javascript
var numIslands = function(grid) {
    let count = 0;
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
            if (grid[row][col] === '1') {
                count++;
            }
            numIslandsHelper(grid, row, col);
        }
    }
    return count;
};
function numIslandsHelper(grid, startRow, startCol) {
    if (grid[startRow] === undefined
        || grid[startRow][startCol] === undefined
        || grid[startRow][startCol] === '0'
    ) {
        return;
    }
    
    grid[startRow][startCol] = '0';
    
    numIslandsHelper(grid, startRow + 1, startCol);
    numIslandsHelper(grid, startRow - 1, startCol);
    numIslandsHelper(grid, startRow, startCol + 1);
    numIslandsHelper(grid, startRow, startCol - 1);
}
```
<!-- @include-end ../leetcode/0200.number-of-islands.md -->

<!-- @include ../leetcode/0547.friend-circles.md -->
### Number of Provinces
[547. Number of Provinces](https://leetcode.com/problems/number-of-provinces/)

```html
There are n cities. Some of them are connected, while some are not. If city a is connected directly with city b, and city b is connected directly with city c, then city a is connected indirectly with city c.

A province is a group of directly or indirectly connected cities and no other cities outside of the group.

You are given an n x n matrix isConnected where isConnected[i][j] = 1 if the ith city and the jth city are directly connected, and isConnected[i][j] = 0 otherwise.

Return the total number of provinces.

Example 1:

Input: isConnected = [[1,1,0],[1,1,0],[0,0,1]]
Output: 2

Example 2:
Input: isConnected = [[1,0,0],[0,1,0],[0,0,1]]
Output: 3
```

```javascript
var findCircleNum = function(isConnected) {
    let count = 0;
    const visited = Array(isConnected.length).fill(false);
    for (let i = 0; i < isConnected.length; i++) {
        if (!visited[i]) {
            findCircleNumHelper(isConnected, i, visited);
            count++;
        }
    }
    return count;
};

function findCircleNumHelper(isConnected, start, visited) {
    if (isConnected[start] === undefined || visited[start]) {
        return 0;
    }

    visited[start] = true;
    
    for (let i = 0; i < isConnected.length; i++) {
        if (isConnected[start][i] === 1 && !visited[i]) {
            findCircleNumHelper(isConnected, i, visited);
        }
    }
}
```

### 4. 填充封闭区域

130\. Surrounded Regions (Medium)

[Leetcode](https://leetcode.com/problems/surrounded-regions/description/) / [力扣](https://leetcode-cn.com/problems/surrounded-regions/description/)

```html
For example,
X X X X
X O O X
X X O X
X O X X

After running your function, the board should be:
X X X X
X X X X
X X X X
X O X X
```

题目描述：使被 'X' 包围的 'O' 转换为 'X'。

先填充最外侧，剩下的就是里侧了。

```java
private int[][] direction = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};
private int m, n;

public void solve(char[][] board) {
    if (board == null || board.length == 0) {
        return;
    }

    m = board.length;
    n = board[0].length;

    for (int i = 0; i < m; i++) {
        dfs(board, i, 0);
        dfs(board, i, n - 1);
    }
    for (int i = 0; i < n; i++) {
        dfs(board, 0, i);
        dfs(board, m - 1, i);
    }

    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (board[i][j] == 'T') {
                board[i][j] = 'O';
            } else if (board[i][j] == 'O') {
                board[i][j] = 'X';
            }
        }
    }
}

private void dfs(char[][] board, int r, int c) {
    if (r < 0 || r >= m || c < 0 || c >= n || board[r][c] != 'O') {
        return;
    }
    board[r][c] = 'T';
    for (int[] d : direction) {
        dfs(board, r + d[0], c + d[1]);
    }
}
```

### 5. 能到达的太平洋和大西洋的区域

417\. Pacific Atlantic Water Flow (Medium)

[Leetcode](https://leetcode.com/problems/pacific-atlantic-water-flow/description/) / [力扣](https://leetcode-cn.com/problems/pacific-atlantic-water-flow/description/)

```html
Given the following 5x5 matrix:

  Pacific ~   ~   ~   ~   ~
       ~  1   2   2   3  (5) *
       ~  3   2   3  (4) (4) *
       ~  2   4  (5)  3   1  *
       ~ (6) (7)  1   4   5  *
       ~ (5)  1   1   2   4  *
          *   *   *   *   * Atlantic

Return:
[[0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0]] (positions with parentheses in above matrix).
```

左边和上边是太平洋，右边和下边是大西洋，内部的数字代表海拔，海拔高的地方的水能够流到低的地方，求解水能够流到太平洋和大西洋的所有位置。

```java
private int m, n;
private int[][] matrix;
private int[][] direction = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};

public List<List<Integer>> pacificAtlantic(int[][] matrix) {
    List<List<Integer>> ret = new ArrayList<>();
    if (matrix == null || matrix.length == 0) {
        return ret;
    }

    m = matrix.length;
    n = matrix[0].length;
    this.matrix = matrix;
    boolean[][] canReachP = new boolean[m][n];
    boolean[][] canReachA = new boolean[m][n];

    for (int i = 0; i < m; i++) {
        dfs(i, 0, canReachP);
        dfs(i, n - 1, canReachA);
    }
    for (int i = 0; i < n; i++) {
        dfs(0, i, canReachP);
        dfs(m - 1, i, canReachA);
    }

    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (canReachP[i][j] && canReachA[i][j]) {
                ret.add(Arrays.asList(i, j));
            }
        }
    }

    return ret;
}

private void dfs(int r, int c, boolean[][] canReach) {
    if (canReach[r][c]) {
        return;
    }
    canReach[r][c] = true;
    for (int[] d : direction) {
        int nextR = d[0] + r;
        int nextC = d[1] + c;
        if (nextR < 0 || nextR >= m || nextC < 0 || nextC >= n
                || matrix[r][c] > matrix[nextR][nextC]) {

            continue;
        }
        dfs(nextR, nextC, canReach);
    }
}
```
### Word Search

[79\. Word Search (Medium)](https://leetcode.com/problems/word-search/description/)

This is different from 0-1 grid problem when it comes to flag the visited cell. Since the next searched word is related to previous word, the flag needs to be restored if the word is not found. So that next search can continue from there.

```javascript
var exist = function(board, word) {
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[0].length; col++) {
            const hasFound = existHelper(board, word, row, col);
            if (hasFound) {
                return true;
            }
        }
    }
    return false;
};

function existHelper(board, word, row, col) {
    if (word.length === 0) {
        return true;
    }
    if (board[row] === undefined
       || board[row][col] === undefined
       || board[row][col] !== word.substr(0, 1)
    ) {
        return false;
    }

    const letter = board[row][col];
    board[row][col] = undefined;
    
    const nextWord = word.substring(1);
    const hasFound = (
        existHelper(board, nextWord, row + 1, col)
        || existHelper(board, nextWord, row - 1, col)
        || existHelper(board, nextWord, row, col + 1)
        || existHelper(board, nextWord, row, col - 1)
    );
    
    if (hasFound) {
        return true;
    }
    
    board[row][col] = letter;
    return false;
}
```
