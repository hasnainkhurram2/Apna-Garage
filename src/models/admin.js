const { Model, DataTypes } = require('sequelize');
const sequelize = require('./database');
const User = require('./User')(sequelize, DataTypes);

class Admin extends User {}

Admin.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    lastLogin: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Admin',
    tableName: 'Admin', // Table name in the database
    timestamps: false,
  }
);

module.exports = (sequelize, DataTypes) => {
  return Admin;
};
