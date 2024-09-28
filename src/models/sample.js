const { Model, DataTypes } = require("sequelize");

class Car extends Model {
  static associate(models) {
    Car.hasOne(models.Sale, { foreignKey: "car_id", as: "sale" });
    Car.hasOne(models.Order, { foreignKey: "car_id", as: "order" });
    Car.hasMany(models.Review, { foreignKey: "car_id", as: "review" });
  }
}
module.exports = (sequelize) => {
  Car.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      make: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      model: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      model_year: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      category: {
        type: DataTypes.ENUM("sedan", "suv", "hatchback"),
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Car",
      tableName: "cars", // optional: specify table name if different from model name
      timestamps: false, // optional: disable timestamps if not needed
    }
  );

  return Car;
};
