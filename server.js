const express = require('express');
const app = express();
const serverController = require('./serverController');

app.use(express.static(__dirname +'/'));
// app.get('/', (req, res) => {
//
// });

app.post('/test', serverController.evaluateCode);

app.listen(3000);
console.log('Listening on http://localhost:3000');
