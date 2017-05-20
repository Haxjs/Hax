import React, { Component } from 'react';
import render from 'react-dom';
const request = require('superagent');
// const CodeMirror = require('react-codemirror');
// require('codemirror/lib/codemirror.css');

// var React = require('react');
// var ReactDOM = require('react-dom');
var Codemirror = require('../src/Codemirror');

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
		this.updateCode = this.updateCode.bind(this);
  }

  componentWillMount(){
		const that = this;
		request.get('http://localHost:3000/init').end(function(err, res){
			const firstState = JSON.parse(res.text);
			console.log('this', that)
			that.setState(firstState)
			console.log('that state', that.state);
		});
  }

  // componentDidMount(){
  //   console.log('componentDidMount')
	// 	request.post('http://localHost:3000/test').send({code: this.state.code}).end(function(err, res){
	// 		console.log(this.state);
	// 	});
  // }

    sendCode(){
			const that = this;
			console.log('in send code',	this.state.code);
      request.post('http://localHost:3000/test').send({code: this.state.code}).end(function(err, res){
        console.log(res.text);
				const response = JSON.parse(res.text);
				that.setState({results:response[0]})
				console.log(that.state.results);
      });
    }

  	updateCode (newCode) {
  		this.state.code = newCode;
  	}

  	render () {
  		var options = {
  			lineNumbers: true,
  			// readOnly: this.state.readOnly,
  			mode: this.state.mode
  		};

  		return (
  			<div>
					<h2>{this.state.name}</h2>
					<h3>{this.state.problem}</h3>
  				<Codemirror ref="editor" value={this.state.code} onChange={this.updateCode} options={options} autoFocus={true} />
          <br/>
          <input type="submit" value="submit" onClick={this.sendCode}/>
					<h3>{JSON.stringify(this.state.results)}</h3>
        </div>
  		);
  	}
  };







export default App;
