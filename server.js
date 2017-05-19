const express = require('express');
const app = express();
const serverController = require('./serverController');
const bodyParser = require('body-parser');

const options = {
  inflate: true,
  limit: '100kb',
  type: 'application/octet-stream'
};

// app.use(bodyParser.raw(options));
app.use(bodyParser.urlencoded({
  extended: true
}));
// app.use(bodyParser.text());

app.get('/', (req, res) => {

});

app.post('/test', serverController.evaluateCode);

app.listen(3000);
console.log('Listening on http://localhost:3000');
