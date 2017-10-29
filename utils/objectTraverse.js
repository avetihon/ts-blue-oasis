const objectTraverse = (object, callback) => {
    let stack = [];
    stack.push(object);

    let i;
    let len;
    let key;
    let keys;
    let value;

    while (stack.length > 0) {
        keys = Object.keys(stack[0]);

        for (i = 0, len = keys.length; i < len; i += 1) {
            key = keys[i];
            value = stack[0][key];

            if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
                stack.push(value);
            } else {
                callback(key, value);
            }
        }

        stack.shift();
    }

};

module.exports = objectTraverse;
