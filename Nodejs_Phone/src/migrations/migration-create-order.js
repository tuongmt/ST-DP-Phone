"use strict";

const { sequelize } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("orders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      id_order: {
        type: Sequelize.STRING,
      },
      receiver: {
        type: Sequelize.STRING,
      },
      order_date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      order_status: {
        type: Sequelize.STRING,
      },
      receiving_point: {
        type: Sequelize.STRING,
      },
      total_value: {
        type: Sequelize.DECIMAL,
      },
      note: {
        type: Sequelize.STRING,
      },
      payment: {
        type: Sequelize.STRING,
      },
      phoneNumber: {
        type: Sequelize.STRING,
      },
      order_idUser: {
        type: Sequelize.INTEGER,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("orders");
  },
};
