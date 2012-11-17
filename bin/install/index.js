#! /usr/bin/env node

var sys = require('sys'),
	exec = require('child_process').exec,
	terminal = require('child_process').spawn('bash'),
	install,
	link;

link = exec("git clone https://github.com/bmarti44/Cliste.git ${0%/*}", function (error, stdout, stderr) {
	
	if (stdout) {
		console.log(stdout);
	}
	
	if (stderr) {
		console.log(stderr);
	}
	
	process.exit(0);
});