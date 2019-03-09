'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'phone cannot be empty',
        },
      },
    },
    phoneNumber: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'phoneNumber cannot be empty',
        },
      },
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Messages, {
      foreignKey: 'senderId',
      as: 'sentMessages',
    });
    User.hasMany(models.Messages, {
      foreignKey: 'receiverId',
      as: 'receivedMessages',
    });
  };
  return User;
};