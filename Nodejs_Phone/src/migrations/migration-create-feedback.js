'use strict';

const { sequelize } = require("../models");

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('feedbacks', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            rating: {
                type: Sequelize.INTEGER
            },
            comment: {
                type: Sequelize.TEXT
            },
            product_id: {
                type: Sequelize.INTEGER
            },
            customer_id: {
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
        await queryInterface.dropTable('feedbacks');
    }
};