const { sleep } = require("./sleep");
const { onExit } = require("./exit");
const { read } = require("./sensor_read");
const { fs } = require("./fs_promise");


module.exports = {
    sleep,
    onExit,
    read,
    fs
};