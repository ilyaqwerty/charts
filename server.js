import express from 'express'
import cors from 'cors'
import path from 'path'
import favicon from 'express-favicon'

const PORT = process.env.PORT || 8000;

const app = express();
app.use(favicon(__dirname + '/build/favicon.ico'));

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.use(cors({origin: true, credentials: true}));

app.get('/ping', function (req, res) {
  return res.send('pong');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/temperature', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, 'build', 'temperature.json'))
});

app.get('/precipitation', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, 'build', 'precipitation.json'))
});

app.listen(PORT, () => console.info(`Server has started on ${PORT}`));