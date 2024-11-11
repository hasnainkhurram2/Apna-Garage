const { Model, DataTypes } = require('sequelize');
const sequelize = require('./database');
const Request = require('./request.js')(sequelize, DataTypes);
class Payment extends Model {
  static associate(models) {
    Payment.belongsTo(models.Request, {
      foreignKey: 'request_id',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  }
}
module.exports = (sequelize) => {
  Payment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      paymentType: {
        type: DataTypes.ENUM('COD', 'card'),
        allowNull: false,
      },
      amount: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0,
      },
    },
    {
      sequelize,
      modelName: 'Payment',
      tableName: 'Payment', // optional: specify table name if different from model name
    }
  );

  return Payment;
};
