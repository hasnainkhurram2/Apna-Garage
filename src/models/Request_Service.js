const { Model, DataTypes } = require("sequelize");

class Request_Service extends Model {
  static associate(models) {
    Request_Service.belongsTo(models.User, { foreignKey: "requesting_user_id", as: "Requester" });
    Request_Service.belongsTo(models.User, { foreignKey: "providing_user_id", as: "Provider" });
    Request_Service.belongsTo(models.Location, { foreignKey: "loc_id", as: "Location" });
    Request_Service.belongsTo(models.Service, { foreignKey: "service_id", as: "Service" });
  }
}
module.exports = (sequelize) => {
  Request_Service.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Request_Service",
      tableName: "Request_Service", // optional: specify table name if different from model name
      timestamps: false, // optional: disable timestamps if not needed
    }
  );

  return Request_Service;
};
