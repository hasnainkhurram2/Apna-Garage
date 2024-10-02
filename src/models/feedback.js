const { Model, DataTypes } = require("sequelize");

class Feedback extends Model {
  static associate(models) {
    Feedback.belongsTo(models.User, { foreignKey: "user_id", onDelete: "CASCADE", onUpdate: "CASCADE", as: "feedbacks" }); // A feedback belongs to a user
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
      feedback_text: {
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
