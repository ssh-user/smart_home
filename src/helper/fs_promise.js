const { promisify } = require("util");
const fs = require("fs");


/**
 * Promisify some FS methods.
 */
module.exports.fs = {
    readdir: promisify(fs.readdir),
    lstat: promisify(fs.lstat),
    removeFile: promisify(fs.unlink)
};