const { Model, DataTypes } = require("sequelize");

class Location extends Model {
  static associate(models) {
    Location.hasMany(models.Workplace, { foreignKey: "loc_id" });
    Location.hasMany(models.Request_Service, { foreignKey: "loc_id" });
  }
}
module.exports = (sequelize) => {
  Location.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      area_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
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
