require("dotenv").config(); // read env from file ".env"
const Server = require("http").Server;
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const { join } = require("path");
const CONFIG = require("../config/config");
const db = require("../db/database");
const routers = require("./routes/index");
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { startWebsocketServer } = require("./websocket/index");
const ENVIRONMENT = process.env.NODE_ENV;


// settings for express
const app = express();
const server = Server(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// settings for session and passport
const sessionStore = new SequelizeStore({
    db: db.sequelize,
    checkExpirationInterval: 5 * 60 * 1000, // The interval at which to cleanup expired sessions in milliseconds.
    expiration: 1 * 60 * 60 * 1000  // The maximum age (in milliseconds) of a valid session.
});

const sessionMiddleware = session({
    secret: CONFIG.session.secret,
    store: sessionStore,
    rolling: true,
    resave: false,
    saveUninitialized: false
});

app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

// load passport strategies
require(join(__dirname, "../config/passport/passport"))(passport, db.models.user);

// set routers
app.use("/", routers);

// start server
module.exports.startServer = async () => {
    try {
        // sync Database
        await db.sequelize.sync();
        console.info('Database is OK!');

        // add to site default user 'root' with password 'Hi,bro!!!'
        await addDefaulUserToSiteLogin();

        // start server
        await promisifyListenServer(CONFIG.server.port[ENVIRONMENT]);
        console.info(`Server start successfully on ${CONFIG.server.port[ENVIRONMENT]} port!`);

        await startWebsocketServer({
            secret: CONFIG.session.secret,
            server: server,
            store: sessionStore
        });
        console.info(`WebsocketServer start successfully!`);
    } catch (error) {
        console.error(error);
        throw new Error("ERROR. Start server.");
    };
};




///////////////////////////////// some helper function /////////////////////////////////

/**
 * Promisify.
 * Convert callback 'listner' func to promise.
 * @param { Number } port port number.
 */
function promisifyListenServer(port) {
    return new Promise((resolve, reject) => {
        server.listen(port, (err) => {
            if (err)
                reject(err)
            else
                resolve();
        });
    });
};


/** 
 * Add site user to db, need for first login.
 * If default user exists or defaul user is gone and another exist - nothing to do.
*/
async function addDefaulUserToSiteLogin() {
    try {
        let User = db.models.user;

        // search default user 'root'.
        let user = await User.findOne({
            where: {
                username: CONFIG.server.defaultUser.username
            }
        });

        // if user is no exists find another users.
        if (!user) {
            let users = await User.all();

            // if there are no another users - create a default 'root' user.
            let hashPassword = db.getHashPass(CONFIG.server.defaultUser.password);
            const data = {
                username: CONFIG.server.defaultUser.username,
                password: hashPassword
            };

            const newUser = await User.create(data);

            // if new User isn't create throw error.
            if (!newUser)
                throw new Error("Can't create root user");

        } else {
            // if user is nothing to do.
        };
    } catch (error) {
        console.error("Error on creating default site user", error);
        // stop with error.
        process.exit(1);
    };
};