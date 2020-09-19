'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
        .then(() => {
            return queryInterface.createTable('blogs',
            {
                "id": {
                    "type": "INTEGER",
                    "allowNull": false,
                    "primaryKey": true,
                    "autoIncrement": true
                },
                "title": {
                    "type": "VARCHAR(191)"
                },
                "created_by": {
                    "type": "INTEGER",
                    "allowNull": false,
                    "references": {
                        "model": "users",
                        "key": "id"
                    },
                    "onDelete": "cascade",
                },
                "description": {
                    "type": "TEXT"
                },
                // "post_date": {
                //     "type": "DATETIME",
                //     "allowNull":true
                // },
                "created_at": {
                    "type": "DATETIME"   
                },
                "updated_at": {
                    "type": "DATETIME"
                },
            })
        })
        .then(() => {
            return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
        });
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
        .then(() => {
            return queryInterface.dropTable('blogs');
        })
        .then(() => {
            return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
        });
    }
};