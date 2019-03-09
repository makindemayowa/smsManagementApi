"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "name cannot be empty"
          }
        }
      },
      phoneNumber: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "phoneNumber cannot be empty"
          }
        }
      }
    },
    {}
  );
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.SentMessage, {
      foreignKey: "senderId",
      as: "sentMessages"
    });
    User.hasMany(models.ReceivedMessage, {
      foreignKey: "receiverId",
      as: "receivedMessages"
    });
  };
  return User;
};
