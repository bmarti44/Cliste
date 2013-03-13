/*jslint devel: false, browser: true, maxerr: 50, indent: 4*/
/*global cliste: false, module: false, $: false, jQuery: false, console: false, document: false, event: false, frames: false, history: false, Image: false, location: false, name: false, navigator: false, Option: false, parent: false, screen: false, setInterval: false, setTimeout: false, window: false, XMLHttpRequest: false */

/**
 *	@description
 *		This module will control user permissions
 *	@author
 *		Brian Martin
 *	@version
 *		1.0.0
 *	@namespace
 *		Cliste
 */
(function() {
	'use strict';
	
	var permission = {};
	
	/**
	 * Implementation of hook.initialize()
	 * This will be called once when the server starts
	 */
	permission.initialize = function () {
		
	};
	
	permission.hasAccess = function (user) {
		
	};
	
	permission.addPermissions = function (newPermissions) {
		
	};
	
	/**
	 * Implementation of hook.config()
	 * This will return configuration options for this module
	 */
	permission.config = function () {
		return {
			'weight': 0
		};
	};
	
	/**
	 * Return the permission module to the global scope
	 */	
	
	cliste.on('initialize', permission.initialize);
	
	module.exports = permission;
	
}());