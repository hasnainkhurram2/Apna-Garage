const { Model, DataTypes } = require("sequelize");

class User extends Model {
  /*static associate(models) {
    Car.hasOne(models.Sale, { foreignKey: "car_id", as: "sale" });
    Car.hasOne(models.Order, { foreignKey: "car_id", as: "order" });
    Car.hasMany(models.Review, { foreignKey: "car_id", as: "review" });
  }*/
}
module.exports = (sequelize) => {
  User.init(
    {
      ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      Name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      DOB: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "User", // optional: specify table name if different from model name
      timestamps: false, // optional: disable timestamps if not needed
    }
  );

  return User;
};
