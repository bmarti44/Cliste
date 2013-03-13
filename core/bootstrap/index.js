/*jslint devel: false, browser: true, maxerr: 50, indent: 4*/
/*global cliste: false, module: false, $: false, jQuery: false, console: false, document: false, event: false, frames: false, history: false, Image: false, location: false, name: false, navigator: false, Option: false, parent: false, screen: false, setInterval: false, setTimeout: false, window: false, XMLHttpRequest: false */

/**
 *	@description
 *		This module will provide URL aliases for paths in the cliste system
 *	@author
 *		Brian Martin
 *	@version
 *		1.0.0
 *	@namespace
 *		Alias
 */
(function() {
	'use strict';
	
	var bootstrap = {},
		customEvents = [
			'initialize'
		];
	
	/**
	 * Implementation of hook.initialize()
	 * This will be called once when the server starts
	 */
	bootstrap.initialize = function () {
		
	};
	
	bootstrap.addEvent = function (eventName) {
		customEvents.push(eventName);
	};
	
	/**
	 * Implementation of hook.config()
	 * This will return configuration options for this module
	 */
	bootstrap.config = function () {
		return {
			'weight': 0
		};
	};
	
	bootstrap.start = function () {
		var i;
		
		for (i = 0; i < customEvents.length; i += 1) {
			cliste.tools.emitter.emit(customEvents[i]);
	    }
	    
	};
	
	/**
	 * Return the admin module to the global scope
	 */
	module.exports = bootstrap;
	
}());