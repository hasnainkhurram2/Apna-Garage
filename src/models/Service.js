const { Model, DataTypes } = require("sequelize");

class Service extends Model {
  static associate(models) {
    Service.hasMany(models.Request_Service);
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
      cost: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Service",
      tableName: "Service", // Table name in pgAdmin
      timestamps: false, // No timestamps are needed
    }
  );

  return Service;
};
