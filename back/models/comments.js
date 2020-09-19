'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define('Comments', {
    comment: {
      type: DataTypes.STRING(191),
      field: "comment"
    },
    userId: {
      type: DataTypes.INTEGER,
      field: "userId"
    },
    blogId: {
      type: DataTypes.INTEGER,
      field: "blogId"
    },
    created_at: {
      type: DataTypes.DATE
    }
  }, {
    underscored: true 
  });
  
  Comments.associate = function(models) {
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
  return Comments;
};

