'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class FeedBack extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

        }
    };
    FeedBack.init({

        rating: DataTypes.INTEGER,
        comment: DataTypes.TEXT,
        product_id: DataTypes.INTEGER,
        customer_id: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'FeedBack',
         // muốn không thêm s sau tên bảng database phải thêm thuộc tính này
       freezeTableName: true
    });
    return FeedBack;
};