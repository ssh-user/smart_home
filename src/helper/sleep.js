/**
 * Async analog of sync sleep. Wait some time.
 * @param { Number } ms Sleep time in ms.
 */
module.exports.sleep = (ms) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
};