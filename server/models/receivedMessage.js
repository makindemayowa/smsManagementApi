"use strict";
module.exports = (sequelize, DataTypes) => {
  const ReceivedMessage = sequelize.define("ReceivedMessage", {
    receiverId: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "receiverId cannot be empty"
        }
      },
      references: {
        model: "User",
        key: "id",
        as: "receiverId"
      }
    },
    messageId: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "messageId cannot be empty"
        }
      },
      references: {
        model: "Message",
        key: "id",
        as: "messageId"
      }
    }
  });
  ReceivedMessage.associate = function(models) {
    // associations can be defined here
    ReceivedMessage.belongsTo(models.User, {
      as: "receivedMessages",
      foreignKey: "receiverId",
      onDelete: "CASCADE"
    });
  };
  return ReceivedMessage;
};
