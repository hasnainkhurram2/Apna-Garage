const index = require('./src/models/index');
const express = require('express');
const cors = require('cors');
const session = require('express-session');
// const Service = require('./src/models/Service');

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: 'http://127.0.0.1:5500',
  })
);

app.use(
  session({
    secret: '#22L-XXXX',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 30 * 1000,
      httpOnly: true,
    },
  })
);

app.get('/', (req, res) => {
  res.send('hello world');
});

app.use('/api/v1', require('./src/routes/index'));

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
