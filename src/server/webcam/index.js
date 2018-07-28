const { EventEmitter } = require("events");
const { spawn } = require("child_process");
const { record } = require("./record");
const { camera } = require("../../config/config");


class Camera extends EventEmitter {
    constructor() {
        super();

        this.ffmpeg = null;        // field for FFMPEG process
        this._recording = false;   // bool field recording video or not
    };

    get recording() {
        return this._recording;
    };

    set recording(state) {
        if (state == false) {
            this._recording = false;
            // disable recording to file
            record.end();

        } else if (state = true) {
            this._recording = true;
        };
    };

    /**
     * Start webcam.
     * @param {Number} timer Time to disable videostream. Default is 1 hour.
     */
    start(timer = 600000) {  // 3600000
        // easy protect to create many child process        
        if (this.ffmpeg) return;

        // V1
        // call child process with FFMPEG with piping to STDOUT
        this.ffmpeg = spawn('ffmpeg', [
            "-loglevel", "error",
            "-f", "v4l2",
            "-video_size", camera.resolution.HIGH,
            "-i", camera.path,
            "-f", "mpegts",
            "-vcodec", "mpeg1video",
            "-b:v", camera.bitrate,
            "-s", camera.resolution.HIGH,
            "pipe:1"
        ]);

        this.ffmpeg.stdout.on('data', (data) => {
            // send users who subscribed to event
            this.emit("stream", data);

            // if recording field is true save video stream to file
            if (this._recording)
                record.start(data);
        });


        setTimeout(() => {
            // disable webcam stream after "timer" time. Default value is 1 hour: 60 * 60 * 1000.
            this.end();
        }, timer);
    };

    end() {
        if (this._recording) {
            // set to false.
            this.recording = false;
            // close file stream.
            record.end();
        };

        // prevent disable of null.
        if (!this.ffmpeg) return;

        // disable ffmpeg process.
        this.ffmpeg.kill();
        this.ffmpeg = null;

    };
};

// singleton
module.exports.camera = new Camera();