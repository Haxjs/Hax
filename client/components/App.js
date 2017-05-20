import React, { Component } from 'react';
import render from 'react-dom';
const request = require('superagent');

const Codemirror = require('../src/Codemirror');

require('codemirror/mode/javascript/javascript');
require('codemirror/mode/xml/xml');
require('codemirror/mode/markdown/markdown');

class App extends Component {
	constructor() {
		super();
		this.state = {
			code: { javascript: 'function fizzBuzz() {\n\n\n}' },
			readOnly: false,
			mode: 'javascript',
		}
		this.sendCode = this.sendCode.bind(this);
		this.updateCode = this.updateCode.bind(this);
	}

	componentWillMount() {
		console.log('initial mount....')
		const that = this;

		request.get('http://localHost:3000/init')
			.end((err, res) => {
				const resObj = JSON.parse(res.text);
				that.setState(resObj)
			});
	}

	sendCode() {
		console.log('sending client code...')

		const that = this;
		request.post('http://localHost:3000/test')
			.send({ code: this.state.code })
			.end((err, res) => {
				const resObj = JSON.parse(res.text);
				that.setState({ results: resObj[0], details: resObj.slice(1, 100) })
			});
	}

	updateCode(newCode) {
		this.state.code = newCode;
	}

	render() {
		const mirrorOptions = {
			lineNumbers: true,
			// readOnly: this.state.readOnly,
			mode: this.state.mode
		};

		let details;

		if (this.state.details) {
			details = this.state.details.map((item, index) => {
				return (
					<div>
						<h3> {'test ' + index + ':' + item[index]}</h3>
						<p> {'expected: ' + item.expected} </p>
						<p> {'results: ' + item.got} </p>
					</div>
				)
			})
		}

		return (
			<div>
				<h2>{this.state.name}</h2>
				<h3>{this.state.problem}</h3>
				<Codemirror ref="editor" value={this.state.code} onChange={this.updateCode} options={options} autoFocus={true} />
				<br />
				<input type="submit" value="submit" onClick={this.sendCode} />
				<h3>{JSON.stringify(this.state.results)}</h3>
				<h2> {details} </h2>
			</div>
		);
	}
};

export default App;
