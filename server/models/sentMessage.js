"use strict";
module.exports = (sequelize, DataTypes) => {
  const SentMessage = sequelize.define("SentMessage", {
    senderId: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "senderId cannot be empty"
        }
      },
      references: {
        model: "Contact",
        key: "id",
        as: "sentMessages"
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
  SentMessage.associate = function(models) {
    // associations can be defined here
    SentMessage.belongsTo(models.Contact, {
      as: "sentMessages",
      foreignKey: "senderId",
      onDelete: "CASCADE"
    });
  };
  return SentMessage;
};
