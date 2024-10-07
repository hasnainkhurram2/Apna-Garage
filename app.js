const index = require('./src/models/index');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: 'http://127.0.0.1:5500',
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
