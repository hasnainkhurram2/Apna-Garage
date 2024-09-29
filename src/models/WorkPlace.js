const { Model, DataTypes } = require("sequelize");

class Workplace extends Model {
  /*static associate(models) {
    Car.hasOne(models.Sale, { foreignKey: "car_id", as: "sale" });
    Car.hasOne(models.Order, { foreignKey: "car_id", as: "order" });
    Car.hasMany(models.Review, { foreignKey: "car_id", as: "review" });
  }*/
}
module.exports = (sequelize) => {
  Workplace.init(
    {
      ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      Name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Type: {
        type: DataTypes.ENUM("Work Shop", "Fuel Pump"),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Workplace",
      tableName: "Workplace", // optional: specify table name if different from model name
      timestamps: false, // optional: disable timestamps if not needed
    }
  );

  return Workplace;
};
