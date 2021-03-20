var productExceptSelf = function(nums) {
    const numLen = nums.length;
    const output = [1];
    
    for (let i = 1; i < numLen; i++) {
        output[i] = output[i - 1] * nums[i - 1];
    }
    
    let product = 1;
    for (let i = numLen - 1; i >= 0; i--) {
        output[i] = output[i] * product;
        product = product * nums[i];
    }
    return output;
};