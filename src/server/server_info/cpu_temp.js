const { readFile } = require("fs");


// get CPU temperature
module.exports.getCpuTemp = () => {

    return new Promise((resolve, reject) => {
        readFile("/sys/class/thermal/thermal_zone0/temp", (err, value) => {
            if (err) {
                console.error(err);
                reject("Error. Cannot get CPU temp.")
            } else
                resolve(value.toString());
        });
    });

};