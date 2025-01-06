const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement chainMaker object according to task description
 * 
 */
const chainMaker = {
  chain: [],
  
  getLength() {
    return this.chain.length;
  },
  addLink(value) {
    const stringValue = value === undefined || value === null ? '' : String(value);
    this.chain.push(stringValue);
    return this;
  },
  removeLink(position) {
    if (!Number.isInteger(position) || position < 1 || position > this.chain.length) {
      this.chain = [];
      throw new Error("You can't remove incorrect link!");
      return
    }
    this.chain.splice(position - 1, 1);
    return this;
  },
  reverseChain() {
    this.chain.reverse();
    return this;
  },
  finishChain() {
    let result = this.chain.map(elem =>{
      if (!elem) return `( null )`
      return `( ${elem} )`
      })
    result = result.join('~~');
    this.chain = [];
    return result;
  }
};

module.exports = {
  chainMaker
};
