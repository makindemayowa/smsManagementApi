"use strict";
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define("Message", {
    message: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "message cannot be empty"
        }
      }
    },
    status: {
      type: DataTypes.ENUM,
      values: ["pending", "sent", "read"]
    }
  });
  Message.associate = function(models) {
    // associations can be defined here
  };
  return Message;
};
