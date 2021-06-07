var calcEquation = function(equations, values, queries) {
    let roots = {}
    
    function find(key) {
        if (!roots[key]) { roots[key] = [key, 1]; }

        const [rootKey, rootValue] = roots[key];
        if (rootKey === key) {
            return roots[key];
        }
        
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

calcEquation([["a","b"],["b","c"]], [2.0,3.0], [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]);

