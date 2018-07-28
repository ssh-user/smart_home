const SerialPort = require("serialport");
const { gsm } = require("../config/config");
const { sleep } = require("../helper/sleep");


class Modem extends SerialPort {
    constructor() {
        // Open port and connect to GSM modem.
        super(gsm.adress, {
            baudRate: gsm.baudrate,
            parser: new SerialPort.parsers.Readline("\r\n")
        }, (err) => {
            if (err)
                throw new Error(err);
        });

        this.engine = null;
    };

    send(command) {
        return new Promise((resolve, reject) => {
            let answer = "";

            // write command to modem
            this.write(`${command}\r\n`, (err) => {
                if (err) {
                    return reject(err.message);
                };
            });

            // Handler for modem answer. Define function every call for correct remove listner.
            // Modem answer can be cut to a lots of chunks so collect them all.
            function handler(buffer) {
                let chunks = buffer.toString().split("\n");

                for (let chunk of chunks) {
                    chunk = chunk.replace(/(\r\n|\n|\r)/gm, "").trim();

                    if (chunk == "OK") {
                        // if end of message stop listner and return result
                        this.removeListener("data", handler);
                        resolve(answer);

                        // if line is busy or another but not error
                    } else if (chunk == "BUSY" || chunk == "NO DIAL TONE" || chunk == "NO CARRIER") {
                        resolve();

                    } else if (chunk == "ERROR") {
                        this.removeListener("data", handler);
                        reject(`ERROR result on command - ${command}. Answer - ${chunk}`);

                    } else {
                        // if message is not fully get add to result this chunk
                        answer += chunk;
                    };
                };
            };

            // catch answer and return it
            this.on("data", handler);
        });
    };

    /** Set custom settings to modem. */
    async start(ENGINE) {
        // save link to ENGINE instance.
        this.engine = ENGINE;

        // get status of modem.
        await this.send("AT");

        // set full error information. 0 - just ERROR. 1 - number of error. 2 - full info.
        await this.send("AT+CMEE=2");

        // disable echo answers.
        await this.send("ATE0");

        // set auto number detect incoming calls.
        await this.send("AT+CLIP=1");

        // set 'TEXT MODE' for SMS
        await this.send("AT+CMGF=1");

        // start listning unexpected events
        // this is event catch all data from modem and parse traffic by keywords.
        this.on("data", async (buffer) => {
            let str = buffer.toString();

            // +CLIP    detect number of calling.
            if (str.includes("+CLIP")) {

                // check if number is detected.
                if (str.search(/\d{7}/) != -1) {
                    // reset the phone call
                    await this.send("ATH");

                    // emit an RING event with phone number arg.
                    let number = str.split('"')[1]; // split income string and get second element.
                    this.engine.emit("ring", number);
                };

            }
            // +CMTI    SMS income.
            else if (str.includes("+CMTI")) {

                // get index of incoming sms. 
                let arrTemp = str.split(",");
                let index = +arrTemp[1];

                // emit event SMS of engine and pass index.
                this.engine.emit("sms", index);

            }
            // +CUSD    USSD answer. For example - current balance.
            else if (str.includes("+CUSD")) {

                // call engine event.
                // unfortunately I dont have idea how to catch all parts of the message
                // so it catch only first part. Fortunately it contain the info what i need.
                this.engine.emit("balance", str);

            }
            // +CMTE    wrong temp of modem.
            else if (str.includes("+CMTE")) {
                // maybe enable cooler ?
            };
        });
    };
};


module.exports = new Modem();