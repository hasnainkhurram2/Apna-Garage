const { Model, DataTypes } = require('sequelize');

class Offer extends Model {
  static associate(models) {
    Offer.belongsTo(models.Technician, {
      foreignKey: 'tech_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    Offer.belongsTo(models.Request, {
      foreignKey: 'req_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  }
}

module.exports = (sequelize) => {
  Offer.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Offer',
      tableName: 'Offer', // Table name in the database
      timestamps: false,
    }
  );

  return Offer;
};
