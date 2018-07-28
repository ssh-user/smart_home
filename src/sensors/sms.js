// SMS module. Get, send, remove sms from gsm modem.

// import modem.
const modem = require("./modem");
// import decoder.
const { decodeUCS2 } = require("../helper/decoder_ucs2");
// import DB and SMS model.
const { models } = require("../db/database");
const SMS = models.sms;



/**
 * Move all SMS from modem to database.
 */
async function smsSyncModem() {
    // get all sms.
    let smsString = await modem.send('AT+CMGL="ALL"');

    // cut all joined sms to different sms.
    let arrSMS = smsString.split("+CMGL");

    for (const sms of arrSMS) {
        // if sms empty pass this element.
        if (!sms.length)
            continue;

        // parse sms string.
        let result = _parseSMS(sms);

        // Add sms to db.
        await SMS.create(result);
    };

    // remove all SMS from modem. Memory of modem is too small.
    await modem.send(`AT+CMGDA="DEL ALL"`);
};

/**
 * Get sms from modem, save to db and remove it.
 */
async function handleSMS(index) {
    // get sms from modem.
    let sms = await modem.send(`AT+CMGR=${index},1`);

    // parse sms string.
    let result = _parseSMS(sms);

    // Add sms to db.
    await SMS.create(result);

    // del sms.
    await modem.send(`AT+CMGD=${index}`);
};


/**
 * Send SMS to phone number.
 * @param { String } number Phone number full format. ex +380991234567.
 * @param { String } message Message to send.
 */
function sendSMS(number, message) {
    return new Promise((resolve, reject) => {

        // set number to modem.        
        modem.write(`AT+CMGS="${number}"\r\n`, (err) => {
            if (err)
                // on error.
                reject(err.message);
            else {
                // a little pause before send msg.
                setTimeout(() => {
                    modem.write(`${message}\r\n${String.fromCharCode(26)}`, (err) => {
                        if (err)
                            // on error.
                            reject(err.message);
                        else
                            // OK
                            setTimeout(() => resolve(), 500);
                    });
                }, 500);


            };
        });

    });
};


module.exports = {
    smsSyncModem,
    handleSMS,
    sendSMS
};


/**
 * Parse sms string to js object.
 * @param { String } sms SMS from modem. 
 */
function _parseSMS(sms) {
    let data = sms.split('"');

    // form the final obj with sms data.
    let result = {
        from: data[3],
        date: data[7],
        orig_message: data[8],
        dec_message: decodeUCS2(data[8])
    };

    return result;
};