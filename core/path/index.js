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
	
	/**
	 * Implementation of hook.initialize()
	 * This will be called once when the server starts
	 */
	path.initialize = function () {
		
	};
	
	/**
	 * Implementation of hook.config()
	 * This will return configuration options for this module
	 */
	path.config = function () {
		return {
			'weight': 0
		};
	};
	
	/**
	 * Add a new path to the system
     * @param {Object} newPath
     *		The new path to add (excluding the domain name)
	 */
	path.addPath = function (newPath) {
		Object.keys(newPath).forEach(function(key) {
		    
		    paths[key] = newPath[key];
		    
		});
	};
	
	/**
	 * Get the file path for a file in the core, module or theme folders
     * @param {Object} type
     *		Either core, module or theme
     * @param {Object} name
     *		The name of the core, module or theme
     * @param {Object} path
     *		The path to the core, module or theme inside the core, module or theme folder
	 */
	path.getFilePath = function (type, name, path) {
		
		if (type === 'core') {
			return global.cliste.settings.base + '/' + type + '/' + name + '/' + path;
		}
		
		if (type === 'module') {
			return global.cliste.settings.base + '/sites/all/' + type + '/' + name + '/' + path;
		}
		
		if (type === 'theme') {
			return global.cliste.settings.base + '/sites/all/' + type + '/' + name + '/' + path;
		}
		
	};
	
	/**
	 * Get the currently set paths
	 * @return {Object}
	 *		An object literal of all current paths
	 */
	path.getPaths = function () {
		return paths;
	};
	
	/**
	 * Return the path module to the global scope
	 */	
	
	global.cliste.tools.emitter.on('initialize', path.initialize);
	
	module.exports = path;
	
}());