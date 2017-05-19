const fakeDb = require('./fakeDb');
const equal = require('deep-equal');

const serverController = {

  funcParse(clientFunc) {

    const argStart = clientFunc.indexOf('(') + 1;
    const argEnd = clientFunc.indexOf(')');
    const args = clientFunc.substr(argStart, argEnd - argStart);

    const bodyStart = clientFunc.indexOf('{') + 1;
    const bodyEnd = clientFunc.lastIndexOf('}');
    const body = clientFunc.substr(bodyStart, bodyEnd - bodyStart);
    console.log(body);
    
    return new Function(args, body);

  },

  evaluateCode(req, res) {

    // let overallResults = true
    
    const testResults = [true];
    const clientFunc = serverController.funcParse(req.body.full);    
    const testCases = fakeDb[req.body.funcId].testCases;
    console.log(clientFunc);
    console.log('testing:',  clientFunc(1,2))

    // Object.keys(testCases).forEach(key => {
      
    //   testResults.push({
    //     ["test " + key]: testCases[key][0],
    //     results: equal(clientFunc(...testCases[key][1]), testCases[key][2]),
    //     expected: JSON.stringify(testCases[key][2]),
    //     got: JSON.stringify(clientFunc(testCases[key][1]))
    //   });

    //   testResults[0] = (testResults[0] && equal(clientFunc(testCases[key][1]), testCases[key][2]) );

    // })
    
    res.json();    
  }
};

module.exports = serverController;

// clientFunc = `function pow(base, power) {
	
// 	return power === 1 ? base : base * pow(base,power - 1);

// }`
// const funcNameStart = clientFunc.indexOf('function') + 9;
// const funcNameEnd = clientFunc.indexOf('(') + 1;
// let funcName = clientFunc.substr(funcNameStart, funcNameEnd - funcNameStart);
// // clientFunc.indexOf(funcName) === clientFunc.lastIndexOf(funcName)
// clientFunc.lastIndexOf(funcName)
// let test = clientFunc.split('')
// test.splice(66,3,'clientFunc')
// clientFunc = test.join('') 


//     const argStart = clientFunc.indexOf('(') + 1;
//     const argEnd = clientFunc.indexOf(')');
//     const args = clientFunc.substr(argStart, argEnd - argStart);

//     const bodyStart = clientFunc.indexOf('{') + 1;
//     const bodyEnd = clientFunc.lastIndexOf('}');
//     const body = clientFunc.substr(bodyStart, bodyEnd - bodyStart);
    
// let clientFunc= new Function(args,body)
// clientFunc(5,2)
    