/** 
 * Balance model. Time - last update time and Score it.
 * @param { sequelize } sequelize 
 * @param { sequelize.Sequelize } Sequelize 
 */
module.exports = (sequelize, Sequelize) => {

    const Alarm = sequelize.define('balance', {

        score: {
            type: Sequelize.TEXT,
            allowNull: false
        },

        time: {
            type: Sequelize.DATE
        }
    });

    return Alarm;
};