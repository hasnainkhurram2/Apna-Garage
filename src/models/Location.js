const { Model, DataTypes } = require("sequelize");

class Location extends Model {
  /*static associate(models) {
    Car.hasOne(models.Sale, { foreignKey: "car_id", as: "sale" });
    Car.hasOne(models.Order, { foreignKey: "car_id", as: "order" });
    Car.hasMany(models.Review, { foreignKey: "car_id", as: "review" });
  }*/
}
module.exports = (sequelize) => {
  Location.init(
    {
      ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      Area_Name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Location",
      tableName: "Location", // optional: specify table name if different from model name
      timestamps: false, // optional: disable timestamps if not needed
    }
  );

  return Location;
};
