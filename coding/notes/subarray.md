# Sub Array

## Framework to decide:

* Is there a running sum/balance pattern? → Prefix sum + hash map
  - Leetcode 525
  - LeetCode 560
* Does adding/removing have monotonic behavior? → Sliding window
  - LeetCode 340
* Do I need optimal substructure? → DP
  - LeetCode 53
* Do I need min/max in ranges? → Monotonic stack/deque