"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrderDetail.belongsTo(models.Product, {
        foreignKey: "product_id",
        targetKey: "id",
        as: "idProductData",
      });
      OrderDetail.belongsTo(models.Order, {
        foreignKey: "order_id",
        targetKey: "id",
        as: "idOrderData",
      });
    }
  }
  OrderDetail.init(
    {
      order_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      total_price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "OrderDetail",
      // muốn không thêm s sau tên bảng database phải thêm thuộc tính này
      freezeTableName: true,
    }
  );
  return OrderDetail;
};
