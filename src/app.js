const { startServer } = require("./server/server");
const { startSensors } = require("./sensors/index");


// start application
async function main() {
    try {
        console.info("Starting ...");

        // only on production mode should start GSM modem
        // it's need because sensors are only on mini-board and there are not on my PC
        if (process.env.NODE_ENV == "production") {
            // start GSM            
            await startSensors();
        };
        // start server
        await startServer();

        console.info("all started successfully and ready to work!");
    } catch (error) {
        console.error(error);
        process.exit(-1);
    };
};

// main point. start all application.
main();