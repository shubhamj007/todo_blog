'use strict';

module.exports = (sequelize, DataTypes) => {
	var userDetail = sequelize.define('user_details', {
		custom_field_id: {
			allowNull: false,
			type: DataTypes.INTEGER,
		},
		field_value: {
			allowNull: true,
			type: DataTypes.TEXT	
		},
		user_id: {
			allowNull: false,
			type: DataTypes.INTEGER	
		}
	}, {
		underscored: true,
	});

	userDetail.associate = function (models){
        this.belongsTo(models.users,{   
			foreignKey: "user_id", 
			targetKey: 'id',
			as: 'user'
		});
	};

	return userDetail;
};