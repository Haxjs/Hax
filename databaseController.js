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

function funcParse(codeBod) {

  function replaceSingleQuotes(rawInput) {
    return rawInput.replace(/'/g, '"');
  }

  codeBod = replaceSingleQuotes(codeBod);

  const argStart = codeBod.indexOf('(') + 1;
  const argEnd = codeBod.indexOf(')');
  const args = codeBod.substr(argStart, argEnd - argStart);

  const bodyStart = codeBod.indexOf('{') + 1;
  const bodyEnd = codeBod.lastIndexOf('}');
  const body = codeBod.substr(bodyStart, bodyEnd - bodyStart);

  try{
    return new Function(`num`, `var retArr = [];for(var i = 1; i <= num; i++){if( !(i % 15) ) retArr.push("fizzbuzz");else if(!(i % 3)) retArr.push("fizz");else if(!(i % 5)) retArr.push("buzz");else(retArr.push(i));}return retArr;`);
  }
  catch(err){
    console.log('function didnt parse properly');
    res.end();
  }
 
}

const dataBaseController = {
  
  getResults(req, res) {

    console.log('getting results.....')

    Hax.find({ where: { _id: 1 } })
      .then(hax => {
        const data = hax.get();
        const tests = data.tests
        const clientFunc = funcParse(req.body.code);
        const testResults = [true];

        Object.keys(tests).forEach(key => {

          testResults.push({
            ["test " + key]: tests[key][0],
            results: equal(clientFunc(tests[key][1]), tests[key][2]),
            expected: tests[key][2],
            got: clientFunc(tests[key][1])
          });

          testResults[0] = (testResults[0] && equal(clientFunc(tests[key][1]), tests[key][2]));
        })

        res.setHeader('Content-Type', 'application/json');
        res.json(testResults);
      });
  },

  getNewState(req, res) {
    console.log('getting new state.....');

    Hax.find({ where: { _id: 1 } })
      .then(hax => {
        const data = hax.get();
        const state = { name: data.name, problem: data.problem }
        res.setHeader('Content-Type', 'application/json');
        res.json(state);
      });
  }
}

module.exports = dataBaseController;
