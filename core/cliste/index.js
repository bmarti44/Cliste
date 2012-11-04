/*jslint devel: false, browser: true, maxerr: 50, indent: 4*/
/*global module: false, $: false, jQuery: false, console: false, document: false, event: false, frames: false, history: false, Image: false, location: false, name: false, navigator: false, Option: false, parent: false, screen: false, setInterval: false, setTimeout: false, window: false, XMLHttpRequest: false */

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
	
	var cliste = {},
		headers = {};
	
	cliste.initialize = function () {
		
	};
	
	cliste.config = function () {
		return {
			'weight': 0
		};
	};
	
	cliste.setHeader = function (header) {
		Object.keys(header).forEach(function(key) {
		    
		    headers[key] = header[key];
		    
		});
	};
	
	cliste.getHeaders = function (header) {
		return headers;
	};
	
	cliste.update = function () {
		
	};
		
	module.exports = cliste;
	
}());