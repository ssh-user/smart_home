/** 
 * Alarm model. Phone, date when user enable\disable alarm.
 * @param { sequelize } sequelize 
 * @param { sequelize.Sequelize } Sequelize 
 */
module.exports = (sequelize, Sequelize) => {

    const Alarm = sequelize.define('alarm', {

        phone: {
            type: Sequelize.TEXT,
            allowNull: false
        },

        date: {
            type: Sequelize.DATE
        },

        status: {
            type: Sequelize.ENUM('enable', 'disable')
        }
    });

    return Alarm;
};