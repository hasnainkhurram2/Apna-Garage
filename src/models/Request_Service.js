const { Model, DataTypes } = require('sequelize');

class Request_Service extends Model {
  static associate(models) {
    Request_Service.belongsTo(models.User, {
      foreignKey: 'requesting_user_id',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      as: 'Requester',
    });
    Request_Service.belongsTo(models.User, {
      foreignKey: 'providing_user_id',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      as: 'Provider',
    });
    Request_Service.belongsTo(models.Location, {
      foreignKey: 'loc_id',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      as: 'Location',
    });
    Request_Service.belongsTo(models.Service, {
      foreignKey: 'service_id',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      as: 'Service',
    });
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
      start_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      expected_end_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      accept_status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Request_Service',
      tableName: 'Request_Service', // optional: specify table name if different from model name
      timestamps: false, // optional: disable timestamps if not needed
    }
  );

  return Request_Service;
};
