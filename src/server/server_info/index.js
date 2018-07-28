// sys_info.js
// collect system information like usage memory, storage and other.
const { getUptime } = require("./uptime");
const { getCpuTemp } = require("./cpu_temp");
const { getMemory } = require("./memory");
const { getFS } = require("./fs.js");
const { getCpuLoad } = require("./cpu_load");


// main function
module.exports.sysInfo = async () => {
    try {
        let info = {};
        info.uptime = await getUptime();
        info.cpuTemp = await getCpuTemp();
        info.memory = await getMemory();
        info.fs = await getFS();
        info.cpuLoad = await getCpuLoad();

        return info;
    } catch (error) {
        throw new Error(`Error on sys info collecting. ${error}`);
    };
};