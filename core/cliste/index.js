/*jslint devel: false, browser: true, maxerr: 50, indent: 4*/
/*global global: false, module: false, $: false, jQuery: false, console: false, document: false, event: false, frames: false, history: false, Image: false, location: false, name: false, navigator: false, Option: false, parent: false, screen: false, setInterval: false, setTimeout: false, window: false, XMLHttpRequest: false */

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
	
	cliste.goTo = function(route) {
		
		headers.Location = route;
		global.cliste.settings.response.writeHead(302, headers);
		delete headers.Location;
		
	};
	
	/**
	 * Get the headers to output for the current page
     * @return {Object}
     *		The header(s)
	 */
	cliste.getHeaders = function () {
		return headers;
	};
	
	cliste.setCookie = function (cookie) {
		global.cliste.core.cliste.setHeader({
			'Set-Cookie': cookie
		});
	};
	
	cliste.getCookie = function (name, request) {
		var cookies = {},
			parts,
			result = false;
		
		if (request.headers.cookie)	 {
			request.headers.cookie.split(';').forEach(function( cookie ) {
				parts = cookie.split('=');
				
				if (parts.length) {
					
					if (parts[0] === name) {
						result = parts[1];
						return false;
					}
				}
				
			});
		}
		
		if (result !== false) {
			return result;
		}
		
		return false;
		
	};
	
	cliste.clearHeaders = function() {
		headers = {};
	};
	/**
	 * Return the admin module to the global scope
	 */
	
	global.cliste.tools.emitter.on('initialize', cliste.initialize);
	
	module.exports = cliste;
	
}());