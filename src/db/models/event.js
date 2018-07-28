/** 
 * Sensor event model.
 * @param { sequelize } sequelize 
 * @param { sequelize.Sequelize } Sequelize 
 */
module.exports = (sequelize, Sequelize) => {

    const Event = sequelize.define('event', {

        sensor: {
            type: Sequelize.TEXT,
            allowNull: false
        },

        date: {
            type: Sequelize.DATE
        }
    });

    return Event;
};