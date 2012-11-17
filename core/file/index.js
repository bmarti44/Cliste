/*jslint devel: false, browser: true, maxerr: 50, indent: 4*/
/*global global: false, module: false, $: false, jQuery: false, console: false, document: false, event: false, frames: false, history: false, Image: false, location: false, name: false, navigator: false, Option: false, parent: false, screen: false, setInterval: false, setTimeout: false, window: false, XMLHttpRequest: false */

/**
 *	@description
 *		This module will control file processing for cliste
 *	@author
 *		Brian Martin
 *	@version
 *		1.0.0
 *	@namespace
 *		File
 */
(function() {
	'use strict';
	
	var fs = require('fs'),
		file = {};
	
	/**
	 * Implementation of hook.initialize()
	 * This will be called once when the server starts
	 */
	file.initialize = function () {
		
	};
	
	/**
	 * Implementation of hook.config()
	 * This will return configuration options for this module
	 */
	file.config = function () {
		return {
			'weight': 0
		};
	};
	
	/**
	 * Get the source of a file inside the core, module or theme folders
     * @param {Object} type
     *		This can be either core, module or theme
     * @param {Object} name
     *		The name of the core, module or theme
     * @param {Object} path
     *		The path inside the core, module or theme
	 */
	file.getSource = function (type, name, path) {
		var content = fs.readFileSync(global.cliste.core.path.getFilePath(type, name, path), 'utf8');
		
		return content;
		
	};
	
	/**
	 * Get the source of any file on the file system
     * @param {Object} path
     *		The full path to the file on the file system
	 */
	file.getFile = function (path) {
		var content = fs.readFileSync(path, 'utf8');
		
		return content;
		
	};
	
	/**
	 * Test whether or not a file exists
     * @param {Object} path
     *		The path to the file
	 */
	file.fileExists = function (path) {
		
		if (fs.existsSync(path)) {
			return true;
		}
		
		return false;
		
	};
	
	/**
	 * Return the file module to the global scope
	 */
	
	global.cliste.tools.emitter.on('initialize', file.initialize);
	
	module.exports = file;
	
}());