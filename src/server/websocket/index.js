const socketio = require('socket.io');
const passportSocketIo = require('passport.socketio');
const cookieParser = require('cookie-parser');
const passport = require('passport');

const { camera } = require("../webcam/index");


module.exports.startWebsocketServer = (options) => {
    return new Promise((resolve) => {
        const io = socketio(options.server);

        io.use(passportSocketIo.authorize({
            key: 'connect.sid',
            secret: options.secret,
            store: options.store,
            passport: passport,
            cookieParser: cookieParser
        }));

        io.sockets.on("connection", (socket) => {
            // check auth
            if (socket.request.user) {

                // need an named function for future remove
                const onStreamHandler = (data) => {
                    socket.emit("camera", data);
                };

                // on stream event send data to user
                camera.on("stream", onStreamHandler);

                socket.on("disconnect", () => {
                    // remove listner on disconnect
                    camera.removeListener("stream", onStreamHandler);
                });
            } else {
                // disconnect all not auth users
                socket.disconnect();
            };
        });



        // websocket started
        resolve();
    });
};