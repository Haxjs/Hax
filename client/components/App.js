import React, { Component } from 'react';
const request = require('superagent');
// const CodeMirror = require('react-codemirror');
// require('codemirror/lib/codemirror.css');

// var React = require('react');
// var ReactDOM = require('react-dom');
var Codemirror = require('../src/Codemirror');
const createReactClass = require('create-react-class');

require('codemirror/mode/javascript/javascript');
require('codemirror/mode/xml/xml');
require('codemirror/mode/markdown/markdown');

var defaults = {
	javascript: 'function fizzBuzz() = {\n\n\n}'
};

class App extends Component {
  constructor(){
    super();
    this.state ={
      code: defaults.javascript,
      readOnly: false,
      mode: 'javascript',
    }

    this.sendCode = this.sendCode.bind(this);

  }
    sendCode(){
      alert(this.state.code)
      request.post('http://localHost3001/test').send({code: this.state.code}).end(function(err, res){
        console.log(this.state.code);
        alert('sent code')
      });
    }

  	updateCode (newCode) {
  		this.setState({
  			code: newCode
  		});
  	}

  	render () {
  		var options = {
  			lineNumbers: true,
  			readOnly: this.state.readOnly,
  			mode: this.state.mode
  		};
  		return (
  			<div>
          <form onSubmit={this.sendCode}>
  				<Codemirror ref="editor" value={this.state.code} onChange={this.updateCode} options={options} autoFocus={true} />
          <br/>
          <input type="submit" value="submit" />
          </form>
        </div>
  		);
  	}
  };







export default App;
