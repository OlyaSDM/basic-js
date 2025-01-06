const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {
  constructor(isDirect = true) {
    this.isDirect = isDirect;
  }

  encrypt(message, key) {
    if (!message || !key) {
      throw new Error('Incorrect arguments!');
    }

    const normalizedMessage = message.toUpperCase();
    const normalizedKey = key.toUpperCase();
    let keyIndex = 0;
    let result = '';

    for (let i = 0; i < normalizedMessage.length; i++) {
      const char = normalizedMessage[i];

      if (/[A-Z]/.test(char)) {
        const messageCharCode = char.charCodeAt(0);
        const keyCharCode = normalizedKey[keyIndex % normalizedKey.length].charCodeAt(0);
        const newCharCode = ((messageCharCode - 65 + keyCharCode - 65) % 26) + 65;
        result += String.fromCharCode(newCharCode);
        keyIndex++;
      } else {
        result += char;
      }
    }

    return this.isDirect ? result : result.split('').reverse().join('');
  }

  decrypt(encryptedMessage, key) {
    if (!encryptedMessage || !key) {
      throw new Error('Incorrect arguments!');
    }

    const normalizedMessage = encryptedMessage.toUpperCase();
    const normalizedKey = key.toUpperCase();
    let keyIndex = 0;
    let result = '';

    for (let i = 0; i < normalizedMessage.length; i++) {
      const char = normalizedMessage[i];

      if (/[A-Z]/.test(char)) {
        const messageCharCode = char.charCodeAt(0);
        const keyCharCode = normalizedKey[keyIndex % normalizedKey.length].charCodeAt(0);
        const newCharCode = ((messageCharCode - keyCharCode + 26) % 26) + 65;
        result += String.fromCharCode(newCharCode);
        keyIndex++;
      } else {
        result += char;
      }
    }

    return this.isDirect ? result : result.split('').reverse().join('');
  }
}

module.exports = {
  VigenereCipheringMachine
};
