const express = require('express');
const app = express();
const serverController = require('./serverController');

const cors = require('cors');

const bodyParser = require('body-parser');

const options = {
  inflate: true,
  limit: '100kb',
  type: 'application/octet-stream'
};
app.use(cors());
// app.use(bodyParser.raw(options));
app.use(bodyParser.urlencoded({
  extended: true
}));


app.use(express.static(__dirname +'/'));

app.get('/',serverController.getHome)

app.post('/test', serverController.getHome);

app.listen(3000);
console.log('Listening on http://localhost:3000');
