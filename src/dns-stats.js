const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given an array of domains, return the object with the appearances of the DNS.
 *
 * @param {Array} domains
 * @return {Object}
 *
 * @example
 * domains = [
 *  'code.yandex.ru',
 *  'music.yandex.ru',
 *  'yandex.ru'
 * ]
 *
 * The result should be the following:
 * {
 *   '.ru': 3,
 *   '.ru.yandex': 3,
 *   '.ru.yandex.code': 1,
 *   '.ru.yandex.music': 1,
 * }
 *
 */
function getDNSStats(domains) {
  let mapDomains = {};
  for (let i in domains) {
    let temp = domains[i].split('.');
    let domain = '';
    for (let j = temp.length - 1; j >= 0; j--) {
      domain = domain +'.'+temp[j];
      if (mapDomains[domain]) {
        mapDomains[domain] += 1;
      } else {
        mapDomains[domain] = 1;
      }
    }
  }
  return mapDomains;
}

module.exports = {
  getDNSStats
};
