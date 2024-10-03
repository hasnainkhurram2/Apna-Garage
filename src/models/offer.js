const { Model, DataTypes } = require('sequelize');

class Offer extends Model {
  static associate(models) {
    Offer.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      as: 'Offer',
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
      offer_text: {
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
