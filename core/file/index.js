/*jslint devel: false, browser: true, maxerr: 50, indent: 4*/
/*global global: false, module: false, $: false, jQuery: false, console: false, document: false, event: false, frames: false, history: false, Image: false, location: false, name: false, navigator: false, Option: false, parent: false, screen: false, setInterval: false, setTimeout: false, window: false, XMLHttpRequest: false */

/**
 *	@description
 *		Ding is a class used to manage elements, events and timers
 *	@author
 *		Brian Martin
 *	@version
 *		1.0.0
 *	@namespace
 *		Cliste
 */
(function() {
	'use strict';
	
	var fs = require('fs'),
		file = {};
	
	file.initialize = function () {
		
	};
	
	file.config = function () {
		return {
			'weight': 0
		};
	};
	
	file.getSource = function (type, module, path) {
		var content = fs.readFileSync(global.cliste.core.path.getFilePath(type, module, path), 'utf8');
		
		return content;
		
	};
	
	file.getFile = function (path) {
		var content = fs.readFileSync(path, 'utf8');
		
		return content;
		
	};
	
	file.fileExists = function (path) {
		
		if (fs.existsSync(path)) {
			return true;
		}
		
		return false;
		
	};
	
	module.exports = file;
	
}());