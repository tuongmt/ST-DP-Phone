'use strict';

const { sequelize } = require("../models");

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('carts', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },

            name: {
                type: Sequelize.STRING
            },
            price: {
                type: Sequelize.DECIMAL
            },
            quantity: {
                type: Sequelize.INTEGER
            },
            image: {
                type: Sequelize.BLOB('long')
            },
            iduser: {
                type: Sequelize.INTEGER
            },
            idproduct: {
                type: Sequelize.INTEGER
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('carts');
    }
};