const router = require('express').Router();
const path = require("path");
const { models, getHashPass } = require("../../db/database");
const { camera } = require("../webcam/index");
const { sysInfo } = require("../server_info/index");
const engine = require("../../sensors/index");
const helper = require("../../helper/index");


// check auth before any /api/ request and prohibit for an unauthorized user.
router.use(isLoggedIn);


///////////////////////////////////// CONTROL /////////////////////////////////////
// get all users.
router.get("/reg", async (req, res) => {
    try {
        let User = models.user;

        // get all users (only ID and username of users).
        let users = await User.findAll({
            attributes: ['id', 'username', "status", "last_login"]
        });

        res.status(200).send(JSON.stringify(users));
    } catch (error) {
        res.status(503).end();
        console.error("Error on route '/api/reg' - 'get'.", error);
    };
});

// add new user.
router.post("/reg", async (req, res) => {
    try {
        let data = req.body;
        let User = models.user;

        // check username and password field
        if (typeof data.username === "string" &&
            typeof data.password === "string" &&
            data.username.length > 0 &&
            data.password.length > 0
        ) {
            // all check pass successfully. continue execute code
        } else
            return res.status(455).end();


        // search user.
        let user = await User.findOne({
            where: {
                username: data.username
            }
        });

        // if user exists 
        if (user)
            return res.status(454).end();


        // if no user with a same name create one

        // change password to hash password
        data.password = getHashPass(data.password);
        const newUser = await User.create(data);

        // if new User isn't create send error.
        if (!newUser)
            res.status(550).end();
        else {
            let shortUserInfo = {
                id: newUser.id,
                username: newUser.username,
                status: newUser.status
            };
            res.status(200).send(JSON.stringify(shortUserInfo));
        };

    } catch (error) {
        res.status(503).end();
        console.error("Error on route '/api/reg' - 'post'.", error);
    };
});

// remove user.
router.delete("/reg/:id", async (req, res) => {
    try {
        let User = models.user;
        let id = req.params.id;

        // prevent delete 'youself' user
        if (+id === req.user.id)
            return res.status(456).end();


        let result = await User.destroy({
            where: {
                "id": id
            }
        });

        if (result == 1)
            res.status(200).send("Remove");
        else
            res.status(551).end();
    } catch (error) {
        res.status(503).end();
        console.error("Error on route '/api/reg' - 'DELETE'.", error);
    };
});

// "restart" application. Restart because app should start with some daemon like PM2 or FOREVER daemon.
// and when app exit daemon restart it.
router.get("/restart", (req, res) => {
    res.status(200).end();
    // exit after 1 seconds.
    setTimeout(() => process.exit(0), 1000);
});


///////////////////////////////////// LOG IN\OUT /////////////////////////////////////
// logout.
router.get('/logout', isLoggedIn, async (req, res) => {
    try {
        // change status of user
        let User = models.user;
        let user = await User.findOne({
            where: {
                id: req.user.id
            }
        });
        await user.updateAttributes({ status: "inactive" });

        // logout
        req.session.destroy((err) => {
            res.status(200).end();
        });
    } catch (error) {
        res.status(503).end();
        console.error("Error on route '/api/logout'", error);
    };
});


///////////////////////////////////// WEBCAM /////////////////////////////////////
router.get("/webcam/status", async (req, res) => {
    try {
        let status = {
            enable: camera.ffmpeg ? true : false,
            record: camera.recording
        };
        res.status(200).send(JSON.stringify(status));
    } catch (error) {
        res.status(503).end();
        console.error("Error on route '/api/webcam/status'", error);
    };
});

router.get("/webcam/enable", async (req, res) => {
    try {
        camera.start();
        res.status(200).end();
    } catch (error) {
        res.status(503).end();
        console.error("Error on route '/webcam/enable'", error);
    };
});

router.get("/webcam/disable", async (req, res) => {
    try {
        camera.end();
        res.status(200).end();
    } catch (error) {
        res.status(503).end();
        console.error("Error on route '/webcam/disable'", error);
    };
});

router.get("/webcam/record", async (req, res) => {
    try {
        // enable\disable video recording
        if (!camera.recording)
            camera.recording = true;
        else
            camera.recording = false;

        res.status(200).send({ record: camera.recording });
    } catch (error) {
        res.status(503).end();
        console.error("Error on route '/webcam/record'.", error);
    };
});


///////////////////////////////////// WEBCAM RECORDED FILES (SAVES) /////////////////////////////////////
// get list of files.
router.get("/webcam_files", async (req, res) => {
    try {
        let result = [];
        let pathToFolder = path.join(__dirname, "../../", "recorded");
        let files = await helper.fs.readdir(pathToFolder);

        for (const file of files) {
            let stat = await helper.fs.lstat(path.join(pathToFolder, file));
            result.push({
                size: stat.size,
                name: file
            });
        };

        res.status(200).send(JSON.stringify(result));
    } catch (error) {
        res.status(503).end();
        console.error("Error on route '/webcam_files'.", error);
    };
});

// download file.
router.get("/download/:id", async (req, res) => {
    try {
        let fileName = req.params.id;
        let pathToFile = path.join(__dirname, "../../", "recorded/", fileName);
        res.download(pathToFile);
    } catch (error) {
        res.status(503).end();
        console.error("Error on route '/api/download' - 'get'.", error);
    };
});

// remove file.
router.delete("/webcam_files/:id", async (req, res) => {
    try {
        let fileName = req.params.id;
        let pathToFolder = path.join(__dirname, "../../", "recorded");
        let files = await helper.fs.readdir(pathToFolder);

        for (const file of files) {
            if (file == fileName) {
                await helper.fs.removeFile(path.join(pathToFolder, fileName));
            };
        };

        res.status(200).end();
    } catch (error) {
        res.status(503).end();
        console.error("Error on route '/api/webcam_files' - 'DELETE'.", error);
    };
});


///////////////////////////////////// HOME PAGE /////////////////////////////////////
// system info
router.get("/sys_info", async (req, res) => {
    try {
        let system = {
            // info - cpu load, temperature and other system information.
            info: await sysInfo(),
            // camera - camera state. Is enable and recording or not.
            camera: {
                isEnable: camera.ffmpeg ? true : false,
                isRecord: camera.recording
            },
            // alarm - alarm state. Is enable or not.
            alarm: engine.getAlarmMode(),
            // sensors - list of sensors with name and state.
            sensors: []
        };

        for (const sens of engine.sensors) {
            system.sensors.push({
                name: sens.name,
                value: await helper.read(sens)
            });
        };

        res.status(200).send(system);
    } catch (error) {
        res.status(503).end();
        console.error("Error on route '/sys_info'.", error);
    };
});

// enable\disable alarm by internet.
router.get("/alarm", async (req, res) => {
    try {
        // revert alarm mode.
        let alarm = !engine.getAlarmMode();
        // set alarm mode.
        await engine.setAlarmMode("Internet", alarm);

        res.status(200).end();
    } catch (error) {
        res.status(503).end();
        console.error("Error on route '/alarm'.", error);
    };
});


///////////////////////////////////// SMS /////////////////////////////////////
// modem status
router.get("/sensors/status", async (req, res) => {
    try {
        let status = await engine.modemStatus();
        res.status(200).send(status);
    } catch (error) {
        res.status(503).end();
        console.error("Error on route '/sensors/status'.", error);
    };
});

// SMS
// get all SMS from DB.
router.get("/sensors/sms", async (req, res) => {
    try {
        let SMS = models.sms;

        // get all sms.
        let sms = await SMS.findAll({
            attributes: ['id', 'date', "from", "dec_message"]
        });

        res.status(200).send(JSON.stringify(sms));
    } catch (error) {
        res.status(503).end();
        console.error("Error on route '/sensors/sms' - 'get'.", error);
    };
});

// "change encode" of msg. 
// Should explain a little bit. Modem set in GSM text mode and all different from English symbols encode to UCS2.
// By default I decode UCS2 but if comes sms just on English then decoding impossible.
router.post("/sensors/sms", async (req, res) => {
    try {
        let id = req.body.id;
        let SMS = models.sms;

        // search old sms.
        let smsOld = await SMS.findOne({
            where: {
                id: id
            }
        });

        // toggle msg
        let smsNew = await SMS.update(
            {
                orig_message: smsOld.dec_message,
                dec_message: smsOld.orig_message
            },
            { where: { id: id } }
        );

        let updatedSMS = await SMS.findOne({
            where: {
                id: id
            }
        });

        res.status(200).send(JSON.stringify(updatedSMS));

    } catch (error) {
        res.status(503).end();
        console.error("Error on route '/sensors/sms' - 'post'.", error);
    };
});

router.delete("/sensors/sms/:id", async (req, res) => {
    try {
        let id = req.params.id;
        let SMS = models.sms;

        let result = await SMS.destroy({
            where: {
                "id": id
            }
        });

        if (result == 1)
            res.status(200).end();
        else
            res.status(551).end();
    } catch (error) {
        res.status(503).end();
        console.error("Error on route '/api/sms' - 'DELETE'.", error);
    };
});

// SIM card balance.
router.get("/sensors/balance", async (req, res) => {
    try {
        let Balance = models.balance;

        // get balance from db.
        let balance = await Balance.findOne({
            attributes: ["time", "score"]
        });

        res.status(200).send(JSON.stringify(balance));
    } catch (error) {
        res.status(503).end();
        console.error("Error on route '/sensor/balance'.", error);
    };
});

// request to update balance info.
router.put("/sensors/balance", async (req, res) => {
    try {
        await engine.getBalance();

        res.status(200).end();
    } catch (error) {
        res.status(503).end();
        console.error("Error on route PUT '/sensor/balance'.", error);
    };
});


///////////////////////////////////// LOGs /////////////////////////////////////
// ALARM LOG.
router.get("/sensors/log_alarm", async (req, res) => {
    try {
        let Alarm = models.alarm;

        // get all "alarms".
        let alarms = await Alarm.findAll({
            attributes: ['id', 'phone', "date", "status"]
        });

        res.status(200).send(JSON.stringify(alarms));
    } catch (error) {
        res.status(503).end();
        console.error("Error on route '/sensors/log_alarm' - 'get'.", error);
    };
});

router.delete("/sensors/log_alarm_rem", async (req, res) => {
    try {
        let Alarm = models.alarm;
        // remove all "alarms".
        await Alarm.destroy({ where: {} });

        res.status(200).end();

    } catch (error) {
        res.status(503).end();
        console.error("Error on route '/api/sensors/log_alarm_rem' - 'delete'.", error);
    };
});

router.delete("/sensors/log_alarm/:id", async (req, res) => {
    try {
        let id = req.params.id;
        let Alarm = models.alarm;

        let result = await Alarm.destroy({
            where: {
                "id": id
            }
        });

        if (result == 1)
            res.status(200).end();
        else
            res.status(551).end();
    } catch (error) {
        res.status(503).end();
        console.error("Error on route '/api/sensors/log_alarm/' - 'DELETE'.", error);
    };
});

// EVENTS LOG
router.get("/sensors/log_event", async (req, res) => {
    try {
        let Event = models.event;

        // get all "events".
        let events = await Event.findAll({
            attributes: ['id', 'sensor', "date"]
        });

        res.status(200).send(JSON.stringify(events));
    } catch (error) {
        res.status(503).end();
        console.error("Error on route '/sensors/log_event' - 'get'.", error);
    };
});

router.delete("/sensors/log_event_rem", async (req, res) => {
    try {
        let Event = models.event;
        // remove all "alarms".
        await Event.destroy({ where: {} });

        res.status(200).end();

    } catch (error) {
        res.status(503).end();
        console.error("Error on route '/api/sensors/log_event_rem' - 'delete'.", error);
    };
});

router.delete("/sensors/log_event/:id", async (req, res) => {
    try {
        let id = req.params.id;
        let Event = models.event;

        let result = await Event.destroy({
            where: {
                "id": id
            }
        });

        if (result == 1)
            res.status(200).end();
        else
            res.status(551).end();
    } catch (error) {
        res.status(503).end();
        console.error("Error on route '/api/sensors/log_event/' - 'DELETE'.", error);
    };
});


module.exports = router;


// prohibits unauthorized access for dynamic requests.
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.status(401).send();
};