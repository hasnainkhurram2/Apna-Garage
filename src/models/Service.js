const { Model, DataTypes } = require('sequelize');
const request = require('./request');

class Service extends Model {
  static associate(models) {
    Service.hasMany(models.Request, { foreignKey: 'service_id' });
  }
}

module.exports = (sequelize) => {
  Service.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // automatically increments the serviceID
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      providerType: {
        type: DataTypes.ENUM('1', '2', '3', '4'), //1 = bodyTechnician, 2 = electrician, 3 = fuelSupplier, 4 = mechanic.
      },
    },
    {
      sequelize,
      modelName: 'Service',
      tableName: 'Service', // Table name in pgAdmin
      timestamps: false, // No timestamps are needed
    }
  );

  return Service;
};
