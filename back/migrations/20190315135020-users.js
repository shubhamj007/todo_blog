'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
        .then(() => {
            return queryInterface.createTable('users',
            {
                "id": {
                    "type": "INTEGER",
                    "allowNull": false,
                    "primaryKey": true,
                    "autoIncrement": true
                },
                "first_name": {
                    "type": "VARCHAR(191)"
                },
                "last_name": {
                    "type": "VARCHAR(191)"
                },
                "email": {
                    "type": "VARCHAR(191)",
                    "allowNull": true,
                    "unique": true,
                    "validate": {
                        "isEmail": {
                            "msg": "Email number invalid."
                        }
                    }
                },
                "password": {
                    "type": "VARCHAR(191)"
                },
                "birth_date": {
                    "type": "DATETIME"
                },
                "mobile": {
                    "type": "VARCHAR(191)"
                },
                "is_deleted": {
                    "type": "TINYINT",
                    "allowNull": false,
                    "defaultValue": "0"
                },
                "created_at": {
                    "type": "DATETIME",
                    "allowNull": false
                },
                "updated_at": {
                    "type": "DATETIME",
                    "allowNull": false
                }
            })
        })

        .then(() => {
            return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
        });
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
        .then(() => {
            return queryInterface.dropTable('users');
        })
        .then(() => {
            return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
        });
    }
};