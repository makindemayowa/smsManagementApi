'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    receiverId: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'receiverId cannot be empty',
        },
      },
      references: {
        model: 'User',
        key: 'id',
        as: 'receiverId',
      },
    },
    senderId: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'senderId cannot be empty',
        },
      },
      references: {
        model: 'User',
        key: 'id',
        as: 'senderId',
      },
    },
    message: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'message cannot be empty',
        },
      },
    },
    status: {
      type: DataTypes.ENUM,
      values: ['pending', 'sent', 'read'],
    },

  }, {});
  Message.associate = function(models) {
    // associations can be defined here
    Message.belongsTo(models.Users, {
      as: 'sender',
      foreignKey: 'senderId',
      onDelete: 'CASCADE'
    })
    Message.belongsTo(models.Users, {
      as: 'receiver',
      foreignKey: 'receiverId',
      onDelete: 'CASCADE'
    })
  };
  return Message;
};