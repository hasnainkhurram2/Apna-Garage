const { Model, DataTypes } = require("sequelize");

class Service extends Model {
  static associate(models) {
    // Define associations if needed, e.g., Service may belong to other models (e.g., Mechanic or Customer)
  }
}

module.exports = (sequelize) => {
  Service.init(
    {
      serviceID: {
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
      tableName: "services", // Table name in pgAdmin
      timestamps: false, // No timestamps are needed
    }
  );

  return Service;
};
