const { Model, DataTypes } = require("sequelize");
const User = require('./User')

class Admin extends User {}

module.exports = (sequelize) => {
  Admin.init(
    {
      lastLogin: {
        type: DataTypes.DATEONLY,
      },
      
    },
    {
      sequelize,
      modelName: "Admin",
      tableName: "Admin", 
    }
  );

  return Admin;
};
