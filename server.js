const express = require('express');
const app = express();
const serverController = require('./serverController');
const databaseController = require('./databaseController');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(express.static(__dirname +'/'));

app.get('/', databaseController.getNewState)
app.get('/init', databaseController.getNewState)
app.post('/test', databaseController.getResults);

app.listen(3000);
console.log('Listening on http://localhost:3000');
