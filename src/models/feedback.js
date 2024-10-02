const { Model, DataTypes } = require("sequelize");

class Feedback extends Model {
  static associate(models) {
    Feedback.belongsTo(models.User, { foreignKey: "user_id", as: "user" }); // A feedback belongs to a user
  }
}

module.exports = (sequelize) => {
  Feedback.init(
    {
      FeedbackID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, 
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "User", // References the User table
          key: "id",
        },
      },
      FeedbackText: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Feedback",
      tableName: "Feedbacks", // Table name in the database
      timestamps: false, 
    }
  );

  return Feedback;
};
