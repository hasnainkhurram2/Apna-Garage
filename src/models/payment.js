const { Model, DataTypes } = require('sequelize');

class Payment extends Model {
  //   static associate(models) {
  //     Car.hasOne(models.Sale, { foreignKey: 'car_id', as: 'sale' });
  //     Car.hasOne(models.Order, { foreignKey: 'car_id', as: 'order' });
  //     Car.hasMany(models.Review, { foreignKey: 'car_id', as: 'review' });
  //   }
}
module.exports = (sequelize) => {
  Payment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      request: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      paymentType: {
        type: DataTypes.ENUM('COD', 'card'),
        allowNull: false,
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
