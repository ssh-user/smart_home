/** 
 * User model for auth.
 * @param { sequelize } sequelize 
 * @param { sequelize.Sequelize } Sequelize 
 */
module.exports = (sequelize, Sequelize) => {

    const User = sequelize.define('user', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        username: {
            type: Sequelize.TEXT,
            allowNull: false
        },

        password: {
            type: Sequelize.TEXT,
            allowNull: false
        },

        last_login: {
            type: Sequelize.DATE
        },

        status: {
            type: Sequelize.ENUM('active', 'inactive'),
            defaultValue: 'inactive'
        }
    });

    return User;
};