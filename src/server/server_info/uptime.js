const { time } = require('systeminformation');


// get uptime
module.exports.getUptime = async () => {
    const infoTime = await time();
    const seconds = infoTime.uptime;

    let dd = ~~(seconds / (60 * 60 * 24));
    let hh = ~~(seconds / (60 * 60));
    let mm = ~~((seconds % (60 * 60)) / 60);

    // // remove full days from 'hh'
    if (dd > 0) { hh = (hh - dd * 24) };

    // These lines ensure you have two-digits
    if (hh < 10) { hh = "0" + hh; };
    if (mm < 10) { mm = "0" + mm; };

    return {
        dd: dd,
        hh: hh,
        mm: mm
    };
};