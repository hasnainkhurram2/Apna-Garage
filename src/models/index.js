const Sequelize = require('sequelize');
const config = require('../config/config.js').development;
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Service = require('./Service.js')(db.sequelize, db.Sequelize.DataTypes);
db.Role = require('./Role.js')(db.sequelize, db.Sequelize.DataTypes);
db.User = require('./User.js')(db.sequelize, db.Sequelize.DataTypes);
db.Workplace = require('./Workplace.js')(db.sequelize, db.Sequelize.DataTypes);
db.Location = require('./Location.js')(db.sequelize, db.Sequelize.DataTypes);
db.Request_Service = require('./Request_Service.js')(
  db.sequelize,
  db.Sequelize.DataTypes
);
db.Feedback = require('./feedback.js')(db.sequelize, db.Sequelize.DataTypes);
db.Offer = require('./offer.js')(db.sequelize, db.Sequelize.DataTypes);

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
