import React, { Component } from 'react';
import render from 'react-dom';
import 'react-select/dist/react-select.css'
const request = require('superagent');
const Codemirror = require('../src/Codemirror');
const Select = require('react-select');

require('codemirror/mode/javascript/javascript');
require('codemirror/mode/xml/xml');
require('codemirror/mode/markdown/markdown');

const defaults = {
	javascript: 'function myFunc() {\n\n\n}'
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
		this.logChange = this.logChange.bind(this);
  }

  componentWillMount(){
		const that = this;
		request.get('http://localHost:3000/init').end(function(err, res){
			const firstState = JSON.parse(res.text);
			that.setState(firstState)
			console.log('that state', that.state);
		});
  }

    sendCode(){
			const that = this;
			console.log('in send code',	this.state.code);
      request.post('http://localHost:3000/test').send({code: this.state.code, id: this.state.id}).end(function(err, res){

				const response = JSON.parse(res.text);
				that.setState({results:response[0], details: response.slice(1, 100)})

      });
    }

  	updateCode (newCode) {
  		this.state.code = newCode;
  	}

	 	logChange(val){
			const that = this;
			console.log('the selected val = ',val.value);
			request.post('http://localHost:3000/select').send({id: val.value}).end(function(err, res){
				const firstState = JSON.parse(res.text);
				that.setState(firstState)
		})
	}

  	render () {

			console.log('render', this.state.details);
  		var options = {
  			lineNumbers: true,
  			// readOnly: this.state.readOnly,
  			mode: this.state.mode
  		};

			const thisOpts = [
				{value: 1 , label: 'fizzbuzz'},
				{value: 2 , label: 'binary to decimal'},
				{value: 3 , label: 'match words'},
				{value: 4 , label: 'highest product'},
			];

			let details;

			if (this.state.details) {
				details = this.state.details.map((item, index) => {
					console.log(item);
					return (
						<div>
							<h4>{'test ' + index + ' : ' + item['test '+index]}</h4>
							<p>{'expected: ' + item.expected}</p>
							<p>{'results: ' + item.got}</p>
						</div>
					)
				})
			}

  		return (
  			<div>
					<Select name="whateva" value="one" options = {thisOpts} onChange = {this.logChange}/>
					<h2>{this.state.name}</h2>
					<h4>{this.state.problem}</h4>
  				<Codemirror ref="editor" value={this.state.code} onChange={this.updateCode} options={options} autoFocus={true} />
          <br/>
          <input type="submit" value="submit" onClick={this.sendCode}/>
					<h3>{JSON.stringify(this.state.results)}</h3>
					{details}
        </div>
  		);
  	}
  };







export default App;
