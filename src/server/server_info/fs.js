const { fsSize } = require('systeminformation');


// get fs size\used
module.exports.getFS = async () => {
    // Storage: 15% of 15G
    const fsStat = await fsSize();
    const total = fsStat[0].size / 1024 / 1024 / 1024;

    return {
        use: fsStat[0].use,
        total: total.toFixed(2)
    };
};