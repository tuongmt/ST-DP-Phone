'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Sale extends Model {
        static associate(models) {
            // define association here
            Sale.hasMany(models.Product, { foreignKey: 'idSale', as: 'idSale' })
        }
    };
    Sale.init({
        sale_date: DataTypes.DATE,
        quantity: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Sale',
    });
    return Sale;
};