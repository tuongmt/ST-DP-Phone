'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        static associate(models) {
            Product.belongsTo(models.Category, { foreignKey: 'idCate', targetKey: 'id', as: 'idCateData' })
            Product.belongsTo(models.Brand, { foreignKey: 'idBrand', targetKey: 'id', as: 'idBrandData' })
            Product.belongsTo(models.Discount, { foreignKey: 'idDiscount', targetKey: 'id', as: 'idDiscountData' })
            Product.belongsTo(models.Sale, { foreignKey: 'idSale', targetKey: 'id', as: 'idSaleData' })

            Product.hasMany(models.OrderDetail, { foreignKey: 'product_id', as: 'idProductData' })


        }
    };
    Product.init({
        name: DataTypes.STRING,
        price: DataTypes.DECIMAL,
        quantity: DataTypes.STRING,
        image: DataTypes.TEXT,
        idCate: DataTypes.INTEGER,
        idBrand: DataTypes.INTEGER,
        idDiscount: DataTypes.INTEGER,
        idSale: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Product',
    });
    return Product;
};