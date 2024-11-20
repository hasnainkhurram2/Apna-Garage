const { Model, DataTypes } = require('sequelize');
const Technician = require('./technician.js')(sequelize, DataTypes);
const Request = require('./request.js')(sequelize, DataTypes);

class Offer extends Model {
  static associate(models) {
    Offer.belongsTo(models.Technician, {
      foreignKey: 'tech_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      as: 'Offer',
    });
    Offer.belongsTo(models.Request, {
        foreignKey: 'req_id',
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
