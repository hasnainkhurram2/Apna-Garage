const { Model, DataTypes } = require("sequelize");
const User = require('./User')

class Technician extends User {}

module.exports = (sequelize) => {
  Technician.init(
    {
      overallRating: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      hourlyRate: {
        type: DataTypes.FLOAT,
      },
      experience: {
        type: DataTypes.FLOAT
      },
      availability:{
        type: DataTypes.BOOLEAN
      },
      approved: {
        type: DataTypes.BOOLEAN
      },
      currentOffers: {
        type: DataTypes.STRING[]
      }
      
    },
    {
      sequelize,
      modelName: "Technician",
      tableName: "Technician", 
    }
  );

  return Admin;
};
