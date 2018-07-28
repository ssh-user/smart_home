const fs = require("fs");
const { join } = require("path");


/**
 * Read and collect all models to container.
 * @param { sequelize.Sequelize } sequelize instance of sequelize.
 * @returns { Object } return container with models.
 */
function getModels(sequelize) {
    // container for models
    let db = {};

    // read and add all models to container 'db'
    fs
        .readdirSync(__dirname)
        .filter((file) => {
            return (file.indexOf(".") !== 0) && (file !== "index.js");
        })
        .forEach((file) => {
            const model = sequelize.import(join(__dirname, file));
            db[model.name] = model;
        });

    Object.keys(db).forEach((modelName) => {
        if ("associate" in db[modelName]) {
            db[modelName].associate(db);
        }
    });

    return db;
};


module.exports.getModels = getModels;