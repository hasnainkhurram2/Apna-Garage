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
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dob: {
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
