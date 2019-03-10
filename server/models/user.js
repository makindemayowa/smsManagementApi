"use strict";
module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define(
    "Contact",
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
  Contact.associate = function(models) {
    // associations can be defined here
    Contact.hasMany(models.SentMessage, {
      foreignKey: "senderId",
      as: "sentMessages"
    });
    Contact.hasMany(models.ReceivedMessage, {
      foreignKey: "receiverId",
      as: "receivedMessages"
    });
  };
  return Contact;
};
