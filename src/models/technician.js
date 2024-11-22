const { Model, DataTypes } = require('sequelize');
const sequelize = require('./database');
const User = require('./User')(sequelize, DataTypes);

class Technician extends User {
  static associate(models) {
    Technician.hasMany(models.Request, {
      foreignKey: 'providing_user_id',
      as: 'Provider',
    });
  }
}

Technician.init(
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
    rating: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.0,
    },
    hourlyRate: {
      type: DataTypes.FLOAT,
      defaultValue: 1000.0
    },
    experience: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    availability: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    approved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    currentOffers: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    type: {
      type: DataTypes.ENUM(     // 1 body tech, 2 electrician, 3 fuelsupplier, 4 mechanic
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
