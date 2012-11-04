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
	
	var node_path = require('path'),
		path = {},
		paths = {};
	
	path.initialize = function () {
		
	};
	
	path.config = function () {
		return {
			'weight': 0
		};
	};
	
	path.addPath = function (newPath) {
		Object.keys(newPath).forEach(function(key) {
		    
		    paths[key] = newPath[key];
		    
		});
	};
	
	path.getFilePath = function (type, module, path) {
		
		if (type === 'core') {
			return global.cliste.settings.base + '/' + type + '/' + module + '/' + path;
		}
		
		if (type === 'module') {
			return global.cliste.settings.base + '/sites/all/' + type + '/' + module + '/' + path;
		}
		
		if (type === 'theme') {
			return global.cliste.settings.base + '/sites/all/' + type + '/' + module + '/' + path;
		}
		
	};
	
	path.getPaths = function () {
		return paths;
	};
	
	path.update = function () {
		
	};
		
	module.exports = path;
	
}());