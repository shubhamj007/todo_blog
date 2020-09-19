'use strict';
const bcrypt = require('bcrypt');
const bcrypt_p = require('bcrypt-promise');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define('users', {
        first_name: {
            type: DataTypes.STRING(191),
            field: 'first_name'
        },
        last_name: {
            type: DataTypes.STRING(191),
            field: 'last_name'
        },
        email: {
            type: DataTypes.STRING(191),
            allowNull: true,
            unique: true,
            validate: {
                isEmail: {
                    msg: "Email number invalid."
                }
            }
        },
        password: DataTypes.STRING(191),
        birth_date: {
            type: DataTypes.DATE,
        },
        mobile: {
            type: DataTypes.STRING(191),
        },
        is_deleted: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: '0'
        }
    },
        {
            underscored: true,
            getterMethods: {
                fullName() {
                    let firstName = this.getDataValue('first_name');
                    let lastName = this.getDataValue('last_name');

                    return firstName + " " + lastName;
                }
            },
        });


    Model.beforeSave(async (user, options) => {
        let err;
        if (user.changed('password')) {
            let salt, hash;

            [err, salt] = await to(bcrypt.genSalt(10));
            if (err) TE(err.message, true);

            [err, hash] = await to(bcrypt.hash(user.password, salt));
            if (err) TE(err.message, true);

            user.password = hash;
        }
    });

    Model.prototype.comparePassword = async function (pw) {
        let err, pass;
        if (!this.password) TE('password not set');

        [err, pass] = await to(bcrypt_p.compare(pw, this.password));
        if (err) TE(err);

        if (!pass) TE('Invalid password');

        return this;
    };

    Model.prototype.getJWT = function () {
        let expiration_time = parseInt(CONFIG.jwt.expiration);
        return "Bearer " + jwt.sign({ user_id: this.id }, CONFIG.jwt.encryption, { expiresIn: expiration_time },"session logout");
    };

    Model.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };

    Model.prototype.getForgetPasswordToken = function () {
        return crypto.createHash('md5').update(new Date().toString()).digest("hex");
    };

    return Model;
};
