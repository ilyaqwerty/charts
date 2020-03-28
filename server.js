const express = require('express')
const cors = require('cors')
const path = require('path')

const PORT = process.env.PORT || 8000;
const dist = process.env.DIST;

const app = express();

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, `${dist}`)));
app.use(cors({origin: true, credentials: true}));

app.get('/ping', function (req, res) {
  return res.send('pong');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, dist, 'index.html'));
});

app.get('/temperature', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, dist, 'temperature.json'))
});

app.get('/precipitation', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, dist, 'precipitation.json'))
});

app.listen(PORT, () => console.info(`Server has started on ${PORT}`));