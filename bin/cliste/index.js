#! /usr/bin/env node

var sys = require('sys'),
	exec = require('child_process').exec,
	terminal = require('child_process').spawn('bash'),
	link;
	
link = exec("../node index.js");