const { Model, DataTypes } = require('sequelize');

class Feedback extends Model {
  static associate(models) {
    Feedback.belongsTo(models.Request, {
      foreignKey: 'req_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      as: 'feedbacks',
      unique: true,
    });
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
      rating: {
        type: DataTypes.FLOAT,
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
