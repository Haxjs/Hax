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
