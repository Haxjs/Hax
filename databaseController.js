const Sequelize = require('sequelize');

const sequelize = new Sequelize('hax', 'mojo', 'ilovetesting', {
  host: 'localhost',
  dialect: 'postgres'
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  const Hax = sequelize.define('hax', {
        _id: {
        type: Sequelize.INTEGER,
        primaryKey: true, // primary key will always be defined by sequelize so you should manually assign when you can
        autoIncrement: true
      },
          name : Sequelize.STRING,
          problem : Sequelize.TEXT,
          tests : Sequelize.JSON,
  });

// ADD HACKS TO THE DB

let problem = 'Write a function that returns an array containing the numbers 1 to NUM. Put fizz in place of numbers divisble by 3, buzz in place of numbers divisble by 5, and fizzbuzz in place of numbers divisble by both 3 and 5. fizzbuzz(16);  -> [ 1, 2, fizz, 4, buzz, fizz, 7, 8, fizz, buzz, 11, fizz, 13, 14, fizzbuzz, 16 ]'

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

Hax.find(
  {
    where: {_id: 1} // ID WILL BE RANDOMIZED
  }
).then(hax => {
  let data = hax.get();
  let state = {
    name: data.name,
    problem: data.problem,
    tests: data.tests,
  }
  console.log(state.tests);
  return state;
});
