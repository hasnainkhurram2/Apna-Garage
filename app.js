const index = require('./src/models/index');
const express = require('express');
const cors = require('cors');
const session = require('express-session');

const store = new session.MemoryStore();
const app = express();

app.use(express.json());

app.use(
  cors({
    origin: 'http://127.0.0.1:5500',
    credentials: true,
  })
);

app.use(
  session({
    secret: 'something',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 60 * 30 * 1000,
      httpOnly: true,
      store,
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
