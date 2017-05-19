import React, { Component } from 'react';
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

var App = createReactClass({
	getInitialState () {
		return {
			code: defaults.javascript,
			readOnly: false,
			mode: 'javascript',
		};
	},
  sendCode(){

    alert(this.state.code);
  //   request
  // .post('/api/pet')
  // .send({ name: 'Manny', species: 'cat' })
  },
	updateCode (newCode) {
		this.setState({
			code: newCode
		});
	},

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
});





export default App;
