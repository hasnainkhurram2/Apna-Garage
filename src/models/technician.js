const { Model, DataTypes } = require('sequelize');
const sequelize = require('./database');
const User = require('./User')(sequelize, DataTypes);

class Technician extends User {
  //   static associate(models) {
  //     Feedback.belongsTo(models.User, {
  //       foreignKey: 'user_id',
  //       onDelete: 'CASCADE',
  //       onUpdate: 'CASCADE',
  //       as: 'feedbacks',
  //     }); // A feedback belongs to a user
  //   }
}

Technician.init(
  {
    rating: {
      type: DataTypes.INTEGER,
    },
    hourlyRate: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    experience: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    availability: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    approved: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    currentOffers: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    type: {
      type: DataTypes.ENUM(
        'mechanic',
        'electrician',
        'bodyWorker',
        'fuelSupplier'
      ),
      allowNull: false,
    },
    workplace: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Technician',
    tableName: 'Technician', // Table name in the database
    timestamps: false,
  }
);

module.exports = (sequelize, DataTypes) => {
  return Technician;
};
