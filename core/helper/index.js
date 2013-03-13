/*jslint devel: false, browser: true, maxerr: 50, indent: 4*/
/*global cliste: false, module: false, $: false, jQuery: false, console: false, document: false, event: false, frames: false, history: false, Image: false, location: false, name: false, navigator: false, Option: false, parent: false, screen: false, setInterval: false, setTimeout: false, window: false, XMLHttpRequest: false */

/**
 *	@description
 *		This module will be the main controller for helper
 *	@author
 *		Brian Martin
 *	@version
 *		1.0.0
 *	@namespace
 *		helper
 */
(function() {
	'use strict';
	
	var helper = {},
		headers = {};
	
	/**
	 * Implementation of hook.initialize()
	 * This will be called once when the server starts
	 */
	helper.initialize = function () {
		
	};
	
	/**
	 * Implementation of hook.config()
	 * This will return configuration options for this module
	 */
	helper.config = function () {
		return {
			'weight': 0
		};
	};
	
	/**
	 * Set the headers to output for the current page
     * @param {Object} header
     *		The header(s) to set
	 */
	helper.setHeader = function (header) {
		Object.keys(header).forEach(function(key) {
		    
		    headers[key] = header[key];
		    
		});
	};
	
	helper.goTo = function(route) {
		
		headers.Location = route;
		cliste.settings.response.writeHead(302, headers);
		delete headers.Location;
		
	};
	
	/**
	 * Get the headers to output for the current page
     * @return {Object}
     *		The header(s)
	 */
	helper.getHeaders = function () {
		return headers;
	};
	
	helper.setCookie = function (cookie) {
		cliste.core.helper.setHeader({
			'Set-Cookie': cookie
		});
	};
	
	helper.getCookie = function (name) {
		var cookies = {},
			parts,
			result = false,
			request = cliste.settings.request;
		
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
	
	helper.clearHeaders = function() {
		headers = {};
	};
	/**
	 * Return the admin module to the global scope
	 */
	
	cliste.on('initialize', helper.initialize);
	
	module.exports = helper;
	
}());