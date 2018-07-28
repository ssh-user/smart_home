const { mem } = require('systeminformation');


// get memory size\used
module.exports.getMemory = async () => {
    const stat = await mem();

    const memoryTotal = ~~(stat.total / 1024 / 1024);
    const memUsed = ~~((stat.used - stat.buffcache) / 1024 / 1024);
    const precent = ~~(memUsed / memoryTotal * 100);

    return {
        use: memUsed,
        precent: precent,
        total: memoryTotal
    };
};