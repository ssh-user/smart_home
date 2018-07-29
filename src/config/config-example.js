// config
module.exports = {
    "session": {
        "secret": "Cats. All like cats."
    },

    "server": {
        "port": {
            "production": 80,
            "development": 3332
        },
        "defaultUser": {
            "username": "root",
            "password": "Hi,man!"
        }
    },

    "gsm": {
        "adress": "/dev/ttyS1",
        "whiteList": ["+380991234567"],
        "baudrate": 115200
    },

    "camera": {
        "path": "/dev/video0",
        "bitrate": "2M",
        "resolution": {
            HIGH: "640x480",
            LOW: "320x240"
        }
    }
};
