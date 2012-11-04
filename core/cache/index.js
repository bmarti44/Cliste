/*jslint devel: false, browser: true, maxerr: 50, indent: 4*/
/*global global: false, module: false, $: false, jQuery: false, console: false, document: false, event: false, frames: false, history: false, Image: false, location: false, name: false, navigator: false, Option: false, parent: false, screen: false, setInterval: false, setTimeout: false, window: false, XMLHttpRequest: false */

/**
 *	@description
 *		This module will control caching for cliste
 *	@author
 *		Brian Martin
 *	@version
 *		1.0.0
 *	@namespace
 *		Cliste
 */
(function() {
	'use strict';
	
	var cache = {};
	
	/**
	 * Implementation of hook.initialize()
	 * This will be called once when the server starts
	 */
	cache.initialize = function () {
		
	};
	
	/**
	 * Implementation of hook.config()
	 * This will return configuration options for this module
	 */
	cache.config = function () {
		return {
			'weight': 0
		};
	};
	
	/**
	 * Return the admin module to the global scope
	 */
	module.exports = cache;
	
}());