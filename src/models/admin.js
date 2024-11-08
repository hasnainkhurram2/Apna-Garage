const { Model, DataTypes } = require('sequelize');
const sequelize = require('./database');
const User = require('./User')(sequelize, DataTypes);

class Admin extends User {
  //   static associate(models) {
  //     Feedback.belongsTo(models.User, {
  //       foreignKey: 'user_id',
  //       onDelete: 'CASCADE',
  //       onUpdate: 'CASCADE',
  //       as: 'feedbacks',
  //     }); // A feedback belongs to a user
  //   }
}

Admin.init(
  {
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
