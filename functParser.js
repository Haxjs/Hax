let argStart = strFunc.indexOf('(') + 1;
let argEnd = strFunc.indexOf(')') ;
let args = strFunc.substr(argStart,argEnd - argStart)

let bodyStart = strFunc.indexOf('{') + 1;
let bodyEnd = strFunc.lastIndexOf('}');
let body = strFunc.substr(bodyStart,bodyEnd - bodyStart)

const test = new Function(args, body);
