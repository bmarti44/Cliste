#! /usr/bin/env node

var sys = require('sys'),
	exec = require('child_process').exec,
	terminal = require('child_process').spawn('bash'),
	install,
	link;

link = exec("git clone https://github.com/bmarti44/Cliste.git");

process.exit(0);