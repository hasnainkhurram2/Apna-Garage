const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static associate(models) {
    // User.hasMany(models.Request, {
    //   foreignKey: 'requesting_user_id',
    //   as: 'Requester',
    // });
    // User.hasMany(models.Request, {
    //   foreignKey: 'providing_user_id',
    //   as: 'Provider',
    // });
    // User.hasMany(models.Feedback, { foreignKey: 'user_id' });
    // User.hasMany(models.Offer, { foreignKey: 'user_id' });
    // User.belongsTo(models.Role, {
    //   foreignKey: 'role_id',
    //   onUpdate: 'CASCADE',
    //   onDelete: 'CASCADE',
    //   as: 'Role',
    // });
  }
}
module.exports = (sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dob: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contact: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'User', // optional: specify table name if different from model name
      timestamps: false, // optional: disable timestamps if not needed
    }
  );

  return User;
};
