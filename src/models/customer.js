const { Model, DataTypes } = require('sequelize');
const sequelize = require('./database');
const User = require('./User')(sequelize, DataTypes);
// const sequelize = require('./../config/config');

// const { User } = require('./User');

class Customer extends User {
  //   static associate(models) {
  //     Feedback.belongsTo(models.User, {
  //       foreignKey: 'user_id',
  //       onDelete: 'CASCADE',
  //       onUpdate: 'CASCADE',
  //       as: 'feedbacks',
  //     }); // A feedback belongs to a user
  //   }
}

Customer.init(
  {
    rating: {
      type: DataTypes.FLOAT,
      allowNull: true,
      // autoIncrement: true,
    },
    balance: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Customer',
    tableName: 'Customer', // Table name in the database
    timestamps: false,
  }
);

module.exports = (sequelize, DataTypes) => {
  return Customer;
};
