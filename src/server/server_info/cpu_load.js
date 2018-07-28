const { currentLoad } = require('systeminformation');

// get cpu load
// it's get a little bit strange ... information, but use what we have :)
module.exports.getCpuLoad = async () => {
    const load = await currentLoad();
    return load.currentload.toFixed(2);
};