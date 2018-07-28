// Decoder UCS2.

// import hardcoded dictionary with USC2 encode table.
const ucs2 = require("./ucs2_table.json");


/**
 * Decoder for USC2.
 * @param { String } str encoded string.
 * @returns { String }
 */
module.exports.decodeUCS2 = (str) => {
    // decoded string.
    let decoded = "";

    // iterate string of 4 chars.
    for (let index = 0; index < str.length; index += 4) {
        // get 4 chars.
        let s_str = str.substring(index, index + 4);
        // compare matches with a UCS2 dictinary.
        let char = ucs2[s_str] ? ucs2[s_str] : "*";

        decoded += char;
    };

    return decoded;
};