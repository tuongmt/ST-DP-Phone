"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, {
        foreignKey: "order_idUser",
        targetKey: "id",
        as: "idUserData",
      });
      Order.hasMany(models.OrderDetail, {
        foreignKey: "order_id",
        as: "idOrderData",
      });
    }
  }
  Order.init(
    {
      id_order: DataTypes.STRING,
      receiver: DataTypes.STRING,
      order_status: DataTypes.STRING,
      receiving_point: DataTypes.STRING,
      total_value: DataTypes.DECIMAL,
      note: DataTypes.TEXT,
      payment: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      order_idUser: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
