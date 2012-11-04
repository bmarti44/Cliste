/*jslint devel: false, browser: true, maxerr: 50, indent: 4*/
/*global module: false, $: false, jQuery: false, console: false, document: false, event: false, frames: false, history: false, Image: false, location: false, name: false, navigator: false, Option: false, parent: false, screen: false, setInterval: false, setTimeout: false, window: false, XMLHttpRequest: false */

/**
 *	@description
 *		This module will be the main controller for cliste
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
	
	/**
	 * Implementation of hook.initialize()
	 * This will be called once when the server starts
	 */
	cliste.initialize = function () {
		
	};
	
	/**
	 * Implementation of hook.config()
	 * This will return configuration options for this module
	 */
	cliste.config = function () {
		return {
			'weight': 0
		};
	};
	
	/**
	 * Set the headers to output for the current page
     * @param {Object} header
     *		The header(s) to set
	 */
	cliste.setHeader = function (header) {
		Object.keys(header).forEach(function(key) {
		    
		    headers[key] = header[key];
		    
		});
	};
	
	/**
	 * Get the headers to output for the current page
     * @return {Object}
     *		The header(s)
	 */
	cliste.getHeaders = function () {
		return headers;
	};
	
	/**
	 * Return the admin module to the global scope
	 */
	module.exports = cliste;
	
}());