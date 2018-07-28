const { EventEmitter } = require("events");
const GPIO_PINS = require("../config/gpio_pins.json");
const CONFIG = require("../config/config");
const { models } = require("../db/database");
const { onExit } = require("../helper/index");
const { sleep } = require("../helper/sleep");

const { camera } = require("../server/webcam/index");
const modem = require("./modem");
const Motion = require("./s_motion");
const SMS = require("./sms");


class Engine extends EventEmitter {
    constructor() {
        super();

        // collection of motion sensors
        this.sensors = [];

        // alarm mode. is alarm enable or disable.
        this._alarm = false;

        // to prevent multy trigged alarm.
        this._executeAlarming = false;

        // subscribe to "alarm" events.
        this.on("alarm", this._onAlarm);

        // subscribe to unexpected events RING
        this.on("ring", this._onRing);

        // subscribe to unexpected events SMS
        this.on("sms", this._onSMS);

        // subscribe to unexpected events balance
        this.on("balance", this._onBalance);

        // intresting moment, it seems that with "async" we lost context and have to use "bind".
        this.startSensors = this.startSensors.bind(this);

        // set callback with parameters. On exit(or kill or ctrl+c) unexport gpio pins.
        onExit(() => this._onDestroy(this.sensors));
    };

    // get alarm field
    getAlarmMode() {
        return this._alarm;
    };

    /**
     * Enable or disable alarm.
     * @param { String } phoneNumber Called phone number.
     * @param { Boolean } value enable or disable alarm.
     */
    async setAlarmMode(phoneNumber, value) {
        // save to db who enable\disable alarm.
        let Alarm = models.alarm;
        await Alarm.create({
            phone: phoneNumber, // phone number of the one who puts on the alarm.
            date: new Date(),   // date of this event.
            status: value ? "enable" : "disable"    // is alarm enable or disable.
        });

        // put on\off alarm
        this._alarm = value;
    };

    // on ring event.
    async _onRing(number) {
        // check the number. Does the user have permission to put on\off alarm.
        if (!CONFIG.gsm.whiteList.includes(number))
            return; // nothing doing if no exist.

        // enable or disable alarm.
        await this.setAlarmMode(number, !this._alarm);

        // if alarm is enable call the user back.
        if (this._alarm) {
            // call back after 2 second.
            setTimeout(async () => {
                await modem.send(`ATD${number};`);
            }, 2000);
        };
    };

    // on sms event.
    async _onSMS(index) {
        await SMS.handleSMS(index);
    };

    // send request to modem to get sim card balance.
    async getBalance() {
        await modem.send(`AT+CUSD=1,"*101#"`);
    };

    /**
     * On ussd event.
     * @param { String } str  Message from modem.
     */
    async _onBalance(str) {
        // example of income string:  `+CUSD: 0, "Na Vashomu rahunku 8.00 grn. Taryf 'Vodafone Ligh`
        // parse msg
        let temp = str.split('"')[1].split(".");
        let msg = `${temp[0]}.${temp[1]}.`;

        // get balance from db.
        let Balance = models.balance;

        let balance = await Balance.findOne({
            attributes: ["time", "score"]
        });


        if (balance) {
            // update balance.
            await Balance.update(
                {
                    score: msg,
                    time: new Date()
                },
                {
                    where: {
                        score: balance.score,
                        time: balance.time
                    }
                });

        } else {
            // create balance.
            await Balance.create({
                score: msg,
                time: new Date()
            });
        };
    };

    // start all sensors from config file. like "gerkon", "motion" and other.
    async startSensors() {
        try {
            // start GSM modem and pass Engine to gsm module.
            await modem.start(this);
            console.info("GSM - started!");

            // create motion sensors from config file.
            for (const info of GPIO_PINS.motion) {
                let sensor = new Motion(info.name, info.pin);
                sensor.enable(this);
                this.sensors.push(sensor);
            };
            console.info("Motion sensor - ready!")

            // move all sms from modem to bd.
            await SMS.smsSyncModem();
            console.info("SMS sync!");

            return;

        } catch (error) {
            console.error(error);
            throw new Error("Error on Engine start.");
        };
    };

    // get modem status.
    async modemStatus() {
        try {
            let report = {};

            // check modem availability
            await modem.send("AT");
            report.status = true;

            // get modem model
            report.model = await modem.send("ATI");

            // check sim cart
            await modem.send("AT+CPIN?");
            report.sim = true;

            // get signal quality
            report.signal = await modem.send("AT+CSQ");

            // check gsm registration
            await modem.send("AT+CREG?");
            report.gsm = true;

            return report;
        } catch (error) {
            console.error(error);
            throw new Error("Error on get STATUS of modem.");
        };
    };

    /**
     * When sensors trigger event.
     * @param { {name: String, date: String, value: Number} } info Info about which\when\why sensor trigged.
     */
    async _onAlarm(info) {

        //check if alarm mode enable.
        if (this._alarm) {

            // save to DB event.
            let Event = models.event;
            await Event.create({
                sensor: info.name,   // name of sensor who triggered alarm.
                date: new Date()     // date of this event.
            });

            // enable camera and save video.
            // notice. camera module have protect to multy start.
            camera.start();
            camera.recording = true;


            // lock to multy sensor trigging.
            if (this._executeAlarming) return;

            this._executeAlarming = true;

            // send SMS and call to all in "whitelist".
            for (const phoneNumber of CONFIG.gsm.whiteList) {
                // send SMS.
                let message = `Sensor - ${info.name}. When - ${info.date}`;

                try {
                    // send SMS.
                    await SMS.sendSMS(phoneNumber, message);
                    // wait a bit.
                    await sleep(5000);
                    // call user, response returns when user reset phone call.
                    await modem.send(`ATD${phoneNumber};`);
                    // wait a little bit before next iteration.
                    await sleep(3000);

                } catch (error) {
                    console.error(error);
                };
            };

            // after app call to every user in list system ready to new events.
            this._executeAlarming = false;

        };
    };

    // unexport all sensors
    _onDestroy(sensors) {
        console.info("Unexporting sensors.");
        // unexport all sensors
        while (true) {
            // get sensor and remove from arr
            let sensor = sensors.pop();
            if (sensor)
                sensor.destroy();
            else
                break;
        };

        console.info("exit. app - closed.");
        // exit
        process.exit(0);
    };
};


module.exports = new Engine();