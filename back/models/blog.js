"use strict";

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define(
    "blogs",
    {
      title: {
        type: DataTypes.STRING(191),
        field: "title",
        allowNull: false
      },

      description: {
        type: DataTypes.TEXT,
        field: "description",
        allowNull: false
      },

      imgUrl: {
        type: DataTypes.STRING(191),
        allowNull: true
      },

      public_id: {
        type: DataTypes.STRING(191),
        allowNull: true
      },

      version: {
        type: DataTypes.STRING(191),
        allowNull: true
      },

      created_at: {
        type: DataTypes.DATE
      },
      updated_at: {
        type: DataTypes.DATE
      }
    },
    { underscored: true }
  );

  Model.associate = function(models) {
    this.user = this.belongsTo(models.users, {
      foreignKey: "created_by",
      targetKey: "id",
      as: "user"
    });
  
    this.comments = this.hasMany(models.Comments, {
      foreignKey: "blogId",
      targetKey: "id"
    });
  };

  Model.prototype.toWeb = function(pw) {
    let json = this.toJSON();
    return json;
  };

  return Model;
};
