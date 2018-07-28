const { Gpio } = require('onoff');


module.exports = class Sensor_Motion extends Gpio {
    constructor(name, pin) {
        // rising.  0 -> 1.
        // both. 0 -> 1 or 1 -> 0.
        // falling? not shure, check documentation. 1 -> 0.
        super(pin, 'in', 'rising');
        this.name = name;
    };

    enable(engine) {        
        this.watch((err, value) => {
            engine.emit("alarm", {
                name: this.name,
                date: (new Date()).toLocaleString("ru-RU"),
                value: value
            });
        });
    };

    destroy() {
        this.unwatch();
        this.unexport();
    };
};