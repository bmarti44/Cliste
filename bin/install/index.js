#! /usr/bin/env node

var sys = require('sys'),
	exec = require('child_process').exec,
	terminal = require('child_process').spawn('bash'),
	install,
	link;

terminal.stdout.on('data', function (data) {
    console.log('stdout: ' + data);
});

install = exec("npm install require-dir handlebars mongodb mongoose node-static -g", function (error, stdout, stderr) {
	if (error === null) {
		link = exec("npm link require-dir");
		console.log("Module require-dir installed!");
		link = exec("npm link handlebars");
		console.log("Module handlebars installed!");
		link = exec("npm link mongodb");
		console.log("Module mongodb installed!");
		link = exec("npm link mongoose");
		console.log("Module mongoose installed!");
		link = exec("npm link node-static");
		console.log("Module node-static installed!");
	} else {
		console.log('cliste install error: ' + error);
	}
});