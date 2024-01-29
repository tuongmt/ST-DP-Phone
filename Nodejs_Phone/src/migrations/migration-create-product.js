'use strict';

const { sequelize } = require("../models");

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('products', {
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
            idCate: {
                type: Sequelize.INTEGER
            },
            idBrand: {
                type: Sequelize.INTEGER
            },
            idDiscount: {
                type: Sequelize.INTEGER
            },
            idSale: {
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
        await queryInterface.dropTable('products');
    }
};