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
	
	var url = require('url'),
		alias = {},
		aliases = {};
	
	/**
	 * Implementation of hook.initialize()
	 * This will be called once when the server starts
	 */
	alias.initialize = function () {
		cliste.tools.emitter.emit('addAlias', alias.addAlias);
	};
	
	/**
	 * Implementation of hook.config()
	 * This will return configuration options for this module
	 */
	alias.config = function () {
		return {
			'weight': 0
		};
	};
	
	/**
	 * Add a new alias to the system
     * @param {Object} newAlias
     *		The new alias to add to the system
	 */
	alias.addAlias = function (newAlias) {
		Object.keys(newAlias).forEach(function(key) {
		    
		    aliases[key] = newAlias[key];
		    
		});
	};
	
	/**
	 * Return an object literal of all aliases currently on the system
	 * @return {Object}
	 *		An object literal of all aliases
	 */
	alias.getAliases = function () {
		return aliases;
	};
	
	/**
	 * Return the admin module to the global scope
	 */
	
	cliste.tools.emitter.on('initialize', alias.initialize);
	
	module.exports = alias;
	
}());