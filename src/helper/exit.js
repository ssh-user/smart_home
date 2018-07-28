/**
 * Call on close application. On any situation ctrl+c, exit kill and other.
 * @param { Function } callback Callback before close app.
 */
module.exports.onExit = (callback) => {
    
    // catches ctrl+c event
    process.on('SIGINT', callback);

    // catches "kill pid" (for example: pm2 restart)
    process.on('SIGUSR1', callback);
    process.on('SIGUSR2', callback);

    // catches uncaught exceptions
    process.on('uncaughtException', callback);
};