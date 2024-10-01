const { Model, DataTypes } = require("sequelize");

class Workplace extends Model {
  static associate(models) {
    Workplace.belongsTo(models.Location, {
      foreignKey: {
        name: "loc_id",
        allowNull: false,
        timestamps: false,
      }, 
      as: "Location"
    });
  }
}
module.exports = (sequelize) => {
  Workplace.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      work_type: {
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
