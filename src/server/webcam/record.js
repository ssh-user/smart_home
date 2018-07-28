// record.js
// function to record video to fs and mayby to external storage
const { createWriteStream } = require("fs");
const { join } = require("path");

const pathToRecordFolder = join(__dirname, "../../", "recorded/");


class Record {
    constructor() {
        this.stream = null;
    };

    start(buffer) {
        // check is it new stream or continue recording prev
        if (!this.stream) {
            // create new stream
            let filePath = pathToRecordFolder + this._generateFileName();
            this.stream = createWriteStream(filePath);
            this.stream.write(buffer);
        } else {
            // continue recording
            this.stream.write(buffer);
        };
    };

    end() {
        // close stream
        this.stream.end(() => {
            this.stream = null;
        });
    };

    _generateFileName() {
        let date = (new Date()).toLocaleString("ru-RU");
        return `rec_${date}.mp4`;
    };
};

// singleton
module.exports.record = new Record();