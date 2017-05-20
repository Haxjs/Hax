const Sequelize = require('sequelize');
const equal = require('deep-equal');

const sequelize = new Sequelize('hax', 'mojo', 'ilovetesting', {
  host: 'localhost',
  dialect: 'postgres'
});

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});

const Hax = sequelize.define('hax', {
  _id: {
    type: Sequelize.INTEGER,
    primaryKey: true, // primary key will always be defined by sequelize so you should manually assign when you can
    autoIncrement: true
  },
  name: Sequelize.STRING,
  problem: Sequelize.TEXT,
  tests: Sequelize.JSON
});

function funcParse(rawInput) {

  console.log('in func parse')

  function replaceSingleQuotes (rawInput){
    return rawInput.replace(/'/g, '"');
  }
  const codeBod = replaceSingleQuotes(rawInput);

  const argStart = codeBod.indexOf('(') + 1;
  const argEnd = codeBod.indexOf(')');
  const args = codeBod.substr(argStart, argEnd - argStart);

  const bodyStart = codeBod.indexOf('{') + 1;
  const bodyEnd = codeBod.lastIndexOf('}');
  const body = codeBod.substr(bodyStart, bodyEnd - bodyStart);

  try {
    return new Function(args, body);
  }
  catch(err){
    console.log('function didnt parse properly');
    res.end();
  }
}

const dataBaseController = {

  getResults(req, res) {
    console.log('getting results')
    console.log(req.body.id);
    Hax.find({
      where: {
        _id: req.body.id
      }
    }).then(hax => {
      let data = hax.get();
      let tests = data.tests;

      let clientFunc = funcParse(req.body.code);

      const testResults = [true];

      Object.keys(tests).forEach(key => {

        console.log('match? ' + key , equal(clientFunc(tests[key][1]),tests[key][2]));

        testResults.push({
          ["test " + key]: tests[key][0],
          results: equal(clientFunc(tests[key][1]), tests[key][2]),
          expected: tests[key][2],
          got: clientFunc(tests[key][1])
        });

        testResults[0] = (testResults[0] && equal(clientFunc(tests[key][1]), tests[key][2]) );

      })

      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(testResults));
    });
  },

  getNewState(req, res) {
    console.log('getting new State')
    // FUNCTION TO ACCESS THE DB AND RETURN OUR STATE OBJECT
    let random = Math.floor(Math.random() * (4)) + 1;
    console.log(random);
    Hax.find({
      where: {
        _id: random
      } // ID WILL BE RANDOMIZED
    }).then(hax => {
      let data = hax.get();
      let state = {
        name: data.name,
        problem: data.problem,
        id: data._id
      }
      res.setHeader('Content-Type', 'application/json');

       res.send(JSON.stringify(state));
    });
  }
}

module.exports = dataBaseController;
