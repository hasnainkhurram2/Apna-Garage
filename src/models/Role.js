const { Model, DataTypes } = require("sequelize");

class Role extends Model {
  static associate(models) {
    Role.hasMany(models.User);
  }
}

module.exports = (sequelize) => {
  Role.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, 
      },
      role_name: {
        type: DataTypes.STRING, 
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Role",
      tableName: "Role", // Table name in pgAdmin
      timestamps: false, 
    }
  );

  return Role;
};
