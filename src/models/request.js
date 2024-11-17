const { Model, DataTypes } = require('sequelize');
const sequelize = require('./database');
const Technician = require('./technician')(sequelize, DataTypes);
const Customer = require('./customer.js')(sequelize, DataTypes);
class Request extends Model {
  static associate(models) {
    Request.belongsTo(models.Customer, {
      foreignKey: 'requesting_user_id',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      as: 'Requester',
    });
    Request.belongsTo(models.Technician, {
      foreignKey: 'providing_user_id',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      as: 'Provider',
    });
    Request.belongsTo(models.Service, {
      foreignKey: 'service_id',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      as: 'service',
    });
  }
}
module.exports = (sequelize) => {
  Request.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      // requestedBy: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      // },
      // acceptedBy: {
      //   type: DataTypes.INTEGER,
      //   allowNull: true,
      // },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      startTime: {
        type: DataTypes.TIME,
        allowNull: true,
      },
      // expectedTime: {
      //   type: DataTypes.TIME,
      //   allowNull: true,
      // },
      completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      // endTime: {
      //   type: DataTypes.TIME,
      //   allowNull: true,
      // },
    },
    {
      sequelize,
      modelName: 'Request',
      tableName: 'Request', // optional: specify table name if different from model name
      timestamps: false, // optional: disable timestamps if not needed
    }
  );

  return Request;
};
