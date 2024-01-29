'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            User.hasMany(models.Order, { foreignKey: 'order_idUser', as: 'idUserData' })


        }
    };
    User.init({
        taikhoan: DataTypes.STRING,
        password: DataTypes.STRING,
        fullName: DataTypes.STRING,
        address: DataTypes.STRING,
        phoneNumber: DataTypes.STRING,
        email: DataTypes.STRING,
        image: DataTypes.TEXT,
        roleId: DataTypes.STRING,


    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};