/**
 * @param {number[]} nums
 * @return {number[]}
 */
 var countSmaller = function(nums) {
    nums = nums.map((val, index) => ({ val, index }));
    const inversions = Array(nums.length).fill(0);
    console.log(mergeSort(nums, inversions));
    console.log(inversions)
    return inversions;
    
    if (nums.length == 0 || !nums) return nums;

    const map = nums.map((val, index) => ({ val, index }));
    
    var merge = function(arr) {
        if (arr.length === 1) { return arr; }
        let mid = Math.floor(arr.length / 2);
        let leftMerged = merge(arr.slice(0, mid));
        let rightMerged = merge(arr.slice(mid));

        let leftIndex = 0, rightIndex = 0, inversionCount = 0, sorted = [];
        // compare numbers from left part to right part
        while (leftIndex < leftMerged.length && rightIndex < rightMerged.length) {
            if (leftMerged[leftIndex].val > rightMerged[rightIndex].val) {
                // inversion found
                inversionCount++;
                sorted.push(rightMerged[rightIndex++]);
            } else {
                // no inversions for this number (or right is exhausted)
                // update its inversion count up to the current stack
                inversion[leftMerged[leftIndex].index] += inversionCount;
                sorted.push(leftMerged[leftIndex++]);
            }
        }

        // deal with left over right values and return
        return [...sorted, ...rightMerged.slice(rightIndex)];        
    }

    merge(map);
    return inversion;
};

var mergeSort = function(arr, inversions) {
    if (arr.length === 1) { return arr; }
    let mid = Math.floor(arr.length / 2);
    let leftSorted = mergeSort(arr.slice(0, mid));
    let rightSorted = mergeSort(arr.slice(mid));

    let leftIndex = 0, rightIndex = 0, sorted = [], inversionCount = 0;
    // compare numbers from left part to right part
    while (leftIndex < leftSorted.length && rightIndex < rightSorted.length) {
        if (leftSorted[leftIndex].val > rightSorted[rightIndex].val) {
            inversionCount++;
            sorted.push(rightSorted[rightIndex++]);
        } else {
            inversions[arr[leftIndex].index] += inversionCount;
            sorted.push(leftSorted[leftIndex++]);
        }
    }

    // deal with left over right values and return
    return [...sorted, ...leftSorted.slice(leftIndex), ...rightSorted.slice(rightIndex)];        
}

countSmaller([5,2,6,1])