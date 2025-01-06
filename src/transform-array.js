const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 * 
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 * 
 * @example
 * 
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 * 
 */
function transform(arr) {
  if (!Array.isArray(arr)) {
    throw new Error("'arr' parameter must be an instance of the Array!");
  }
  const res = [];
  for (let i = 0; i < arr.length; i++) {
    const current = arr[i];
    if (i > 0 && arr[i - 1] === '--discard-next') {
      continue;
    }
    switch (current) {
      case '--discard-next':
        break; 
      case '--discard-prev':
        if (res.length > 0 && i > 0 && arr[i - 2] !== '--discard-next') {
          res.pop();
        }
        break;
      case '--double-next':
        if (i < arr.length - 1 && !String(arr[i + 1]).startsWith('--')) {
          res.push(arr[i + 1]);
        }
        break;
      case '--double-prev':
        if (res.length > 0 && i > 0 && arr[i - 2] !== '--discard-next') {
          res.push(res[res.length - 1]);
        }
        break;
      default:
        res.push(current);
    }
  }
  return res;
}

module.exports = {
  transform
};
