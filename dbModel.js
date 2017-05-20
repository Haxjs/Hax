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


// ADD HACKS TO THE DB - MOVE TO A SEPARATE JS FILE

// let problem = 'Given an array of integers, find the highest product you can get from three of the integers.'
//
// Hax.sync().then(() => {
//  return Hax.create({
//   name: 'Highest Product',
//   problem: problem,
//   tests: {
//         0: ['should return 0 if input is invalid', [1], 0],
//         1: ['should return the highest product', [1, 2, 3, 4, 5], 60],
//         2: ['should work with negative numbers in the mix', [-5, 3, 1, -4, 5], 100],
//         3: ['should work for large arrays', [7, -10, 0, 4, 2, 1, -7, 8, 5, 2, 11, 23], 2024],
//       }
//  });
// });

// Hax.find({ where: { name: 'Highest Product' } })
//   .on('success', function (record) {
//     // Check if record exists in db
//     if (record) {
//       record.updateAttributes({
//         tests: {
//               0: ['should return 0 if input is invalid', [1], 0],
//               1: ['should return the highest product', [1, 2, 3, 4, 5], 60],
//               2: ['should work with negative numbers in the mix', [-5, 3, 1, -4, 5], 100],
//               3: ['should work for large arrays', [7, -10, 0, 4, 2, 1, -7, 8, 5, 2, 11, 23], 2024],
//             }
//       })
//       .success(function () {})
//     }
//   })

// name: 'Highest Product',
// problem: 'Given an array of integers, find the highest product you can get from three of the integers.',
// tests: {
//       0: ['should return 0 if input is invalid', '[1]', 0],
//       1: ['should return the highest product', [1, 2, 3, 4, 5], 60],
//       2: ['should work with negative numbers in the mix', [-5, 3, 1, -4, 5], 100],
//       3: ['should work for large arrays', [7, -10, 0, 4, 2, 1, -7, 8, 5, 2, 11, 23], 2024],
//     }
