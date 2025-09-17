const { Model, DataTypes } = require('sequelize');

class Feedback extends Model {
  static associate(models) {
    Feedback.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      as: 'feedbacks',
    }); // A feedback belongs to a user
  }
}

module.exports = (sequelize) => {
  Feedback.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Feedback',
      tableName: 'Feedback', // Table name in the database
      timestamps: false,
    }
  );

  return Feedback;
};
