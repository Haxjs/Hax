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

function funcParse(clientFunc) {

  const argStart = clientFunc.indexOf('(') + 1;
  const argEnd = clientFunc.indexOf(')');
  const args = clientFunc.substr(argStart, argEnd - argStart);

  const bodyStart = clientFunc.indexOf('{') + 1;
  const bodyEnd = clientFunc.lastIndexOf('}');
  const body = clientFunc.substr(bodyStart, bodyEnd - bodyStart);
  // console.log('args', args);
  // console.log('bodyStart', bodyStart);
  // console.log('bodyStart', bodyEnd);
  console.log('funcparsebody', body);

  x = new Function(args, body);
  // x = new Function(`num`, `var retArr = [];for(var i = 1; i <= num; i++){if( !(i % 15) ) retArr.push("fizzbuzz");else if(!(i % 3)) retArr.push("fizz");else if(!(i % 5)) retArr.push("buzz");else(retArr.push(i));}return retArr;`);
  // console.log('x =====',x(15))
  return x;
}

function evaluateCode(codeBod) {

  // let overallResults = true
  // console.log('codeBod', codeBod, typeof codeBod)
  function replaceSingleQuotes (rawInput){
    return rawInput.replace(/'/g, '"');
  }
  replaceSingleQuotes(codeBod);

  const testResults = [true];
  const clientFunc = funcParse(codeBod);


  // console.log('this is clientFunc', clientFunc);
  // console.log('testing:',  clientFunc(1))

  return clientFunc;

  // Object.keys(tests.tests).forEach(key => {
  //   console.log('this test')
  // })
//
//     testResults.push({
//       ["test " + key]: testCases[key][0],
//       results: equal(clientFunc(...testCases[key][1]), testCases[key][2]),
//       expected: JSON.stringify(testCases[key][2]),
//       got: JSON.stringify(clientFunc(testCases[key][1]))
//     });
//
//     testResults[0] = (testResults[0] && equal(clientFunc(testCases[key][1]), testCases[key][2]) );
//
//   })
//   console.log('testResults', testResults);
// return testResults;
  // res.json();
}


const dataBaseController = {
  //
  // Hax.all().then(haxes => {
  //   console.log('haxes.length',haxes.length);
  // });

  getResults(req, res) {
    Hax.find({
      where: {
        _id: 5
      }
    }).then(hax => {
      let data = hax.get();
      let tests = {
        tests: data.tests,
      }
      // console.log('tests in getResults', tests.tests);
      // console.log('req.body', req.body.code)


      let clientFunc = evaluateCode(req.body.code);
      // console.log('!!!!',tests.tests)
      const testResults = [true];

      Object.keys(tests.tests).forEach(key => {
        // console.log('key',tests.tests[key]);
        // console.log('answer to ' + key ,tests.tests[key][2]);
        console.log('match? ' + key , equal(clientFunc(tests.tests[key][1]),tests.tests[key][2]));

        testResults.push({
          ["test " + key]: tests.tests[key][0],
          results: equal(clientFunc(tests.tests[key][1]), tests.tests[key][2]),
          expected: tests.tests[key][2],
          got: clientFunc(tests.tests[key][1])
        });

      //
        testResults[0] = (testResults[0] && equal(clientFunc(tests.tests[key][1]), tests.tests[key][2]) );
      //
      })

      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(testResults));
    });
  },

  getNewState(req, res) {

    // console.log('get new state');
    // ADD HACKS TO THE DB - MOVE TO A SEPARATE JS FILE

    // let problem = 'Write a function that returns an array containing the numbers 1 to NUM. Put fizz in place of numbers divisble by 3, buzz in place of numbers divisble by 5, and fizzbuzz in place of numbers divisble by both 3 and 5. fizzbuzz(16);  -> [ 1, 2, fizz, 4, buzz, fizz, 7, 8, fizz, buzz, 11, fizz, 13, 14, fizzbuzz, 16 ]'

    // Hax.sync().then(() => {
    //  return Hax.create({
    //    name: 'fizzBuzz',
    //    problem: problem,
    //    tests: {
    //       0: ['should return empty array if 0 passed in...', 0, []],
    //       1: ['should work for multiple of 3 ....', 9, [1, 2, 'fizz', 4, 'buzz', 'fizz', 7, 8, 'fizz']],
    //       2: ['should work for multiple of 5 & 3', 15, [1, 2, 'fizz', 4, 'buzz', 'fizz', 7, 8, 'fizz', 'buzz', 11, 'fizz', 13, 14, 'fizzbuzz']],
    //       3: ['should work for multiple of 5', 5, [1, 2, 'fizz', 4, 'buzz']],
    //       4: ['should work for number not divisble by 3 or 5...', 7, [1, 2, 'fizz', 4, 'buzz', 'fizz', 7]]
    //     }
    //  });
    // });

    // FUNCTION TO ACCESS THE DB AND RETURN OUR STATE OBJECT
    Hax.find({
      where: {
        _id: 5
      } // ID WILL BE RANDOMIZED
    }).then(hax => {
      let data = hax.get();
      let state = {
        name: data.name,
        problem: data.problem
      }
      res.setHeader('Content-Type', 'application/json');

       res.send(JSON.stringify(state));
    });
  }
}

module.exports = dataBaseController;
