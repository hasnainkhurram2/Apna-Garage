const Sequelize = require('sequelize');
const sequelize = require('./database.js');
// const config = require('../config/config.js').development;
// const sequelize = new Sequelize(
//   config.database,
//   config.username,
//   config.password,
//   {
//     host: config.host,
//     dialect: config.dialect,
//   }
// );

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Service = require('./service.js')(db.sequelize, db.Sequelize.DataTypes);
db.Payment = require('./payment.js')(db.sequelize, db.Sequelize.DataTypes);
db.Request = require('./request.js')(db.sequelize, db.Sequelize.DataTypes);
db.Feedback = require('./feedback.js')(db.sequelize, db.Sequelize.DataTypes);
db.User = require('./User.js')(db.sequelize, db.Sequelize.DataTypes);
db.Customer = require('./customer.js')(db.sequelize, db.Sequelize.DataTypes);
db.Technician = require('./technician.js')(
  db.sequelize,
  db.Sequelize.DataTypes
);
db.Admin = require('./admin.js')(db.sequelize, db.Sequelize.DataTypes);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize
  .sync({ force: true })
  .then(() => {
    console.log('Database working');
  })
  .catch((error) => {
    console.error('Error creating database:', error);
  });

module.exports = db;
