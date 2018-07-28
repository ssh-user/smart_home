/**
 * Promise version of sensor method "read".
 * @param { Object } sensor instance of sensor.
 */
module.exports.read = (sensor) => {
    return new Promise((resolve, reject) => {
        sensor.read((err, value) => {
            if (err)
                reject(err);
            else
                resolve(value);
        });
    });
};return