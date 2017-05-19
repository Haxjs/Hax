const fakeDb = {
  0: {
    id: 0,
    name: 'fizzBuzz',
    testCases: {
      0: ['should return empty array if 0 passed in...', 0, []],
      1: ['should work for multiple of 3 ....', 9, [1, 2, 'fizz', 4, 'buzz', 'fizz', 7, 8, 'fizz']],
      2: ['should work for multiple of 5 & 3', 15, [1, 2, 'fizz', 4, 'buzz', 'fizz', 7, 8, 'fizz', 'buzz', 11, 'fizz', 13, 14, 'fizzbuzz']],
      3: ['should work for multiple of 5', 5, [1, 2, 'fizz', 4, 'buzz']],
      4: ['should work for number not divisble by 3 or 5...', 7, [1, 2, 'fizz', 4, 'buzz', 'fizz', 7]]
    }
  },
  1: {
    id: 1,
    name: 'pows',
    testCases: {
      0: ['should work for power of 1', [3,1], 3,]
      // 1: ['should work for multiple of 3 ....', 9, [1, 2, 'fizz', 4, 'buzz', 'fizz', 7, 8, 'fizz']],
      // 2: ['should work for multiple of 5 & 3', 15, [1, 2, 'fizz', 4, 'buzz', 'fizz', 7, 8, 'fizz', 'buzz', 11, 'fizz', 13, 14, 'fizzbuzz']],
      // 3: ['should work for multiple of 5', 5, [1, 2, 'fizz', 4, 'buzz']],
      // 4: ['should work for number not divisble by 3 or 5...', 7, [1, 2, 'fizz', 4, 'buzz', 'fizz', 7]]
    }

  }
}

module.exports = fakeDb;