/**
 * 字符串转unicode
 * @param {string} str 字符串
 * @returns {string} unicode
 */
const toUnicode = (str: string): string => {
  let unicodeString = '';

  for (let i = 0; i < str.length; i++) {
    let theUnicode = str.charCodeAt(i).toString(16).toUpperCase();

    while (theUnicode.length < 4) {
      theUnicode = '0' + theUnicode;
    }
    theUnicode = '\\u' + theUnicode;
    unicodeString += theUnicode;
  }
  return unicodeString;
};

export default toUnicode;
