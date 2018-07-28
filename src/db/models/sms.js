/** 
 * SMS model.
 * @param { sequelize } sequelize 
 * @param { sequelize.Sequelize } Sequelize 
 */
module.exports = (sequelize, Sequelize) => {

    const SMS = sequelize.define('sms', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        date: {
            type: Sequelize.STRING,
            allowNull: false
        },

        from: {
            type: Sequelize.STRING,
            allowNull: true
        },

        orig_message: {
            type: Sequelize.TEXT,
            allowNull: false
        },

        dec_message: {
            type: Sequelize.TEXT,
            allowNull: false
        }
    });

    return SMS;
};