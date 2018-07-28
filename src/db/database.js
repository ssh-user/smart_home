const fs = require("fs");
const { join } = require("path");
const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(join(__dirname, '../', 'config', 'config_db.json'))[env];
const { getModels } = require("./models/index");
const bCrypt = require("bcrypt-nodejs");


// connect to DB with options from "config" file
const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);

const models = getModels(sequelize);


module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    models: models,
    getHashPass: getHashPassword
};


/**
 * Get hash from password and return it (hash).
 * @param { String } password your password
 * @returns { String } return passwords hash
 */
function getHashPassword(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
};