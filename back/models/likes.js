"use strict";
module.exports = (sequelize, DataTypes) => {
  const likes = sequelize.define(
    "likes",
    {
      userId: {
        type: DataTypes.INTEGER,
        field: "userId"
      },
      blogId: {
        type: DataTypes.INTEGER,
        field: "blogId"
      },
      count: {
        type: DataTypes.INTEGER
      }
    },
    {underscored: true }
  );
  likes.associate = function(models) {
    // associations can be defined here
    this.belongsTo(models.users, {
      foreignKey: "userId",
      targetKey: "id",
      as: "user"
    });
    this.belongsTo(models.blogs, {
      foreignKey: "blogId",
      targetKey: "id",
      as: "blog"
    });

  };
  return likes;
};
