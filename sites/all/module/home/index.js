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
 *		Home
 */
(function() {
	'use strict';
	
	var home = {};
	
	/**
	 * Implementation of hook.initialize()
	 * This will be called once when the server starts
	 */
	home.initialize = function () {
		// add a new path for the home page
		global.cliste.core.path.addPath({
			'/home': {
				'type': 'module',
				'name': 'home',
				'callback': 'getHTML'
			}
		});
		
		// add a new alias, and point it at the home page
		global.cliste.core.alias.addAlias({
			'/': '/home'
		});
		
		// add a new theme for the home page
		global.cliste.core.theme.addTheme({
			'home': { // name it home
				'parent': 'page', // make it's parent page.handlebars
				'view': global.cliste.core.file.getSource('module', 'home', 'template/home.handlebars'), // set the view as the source of home.handlebars
				'model': { // pass the model
					'text': 'frontpage'
				}
			}
		});
		
	};
	
	/**
	 * Theme callback
	 * @return {String}
	 *		Return the HTML for the home page
	 */
	home.getHTML = function() {
		return global.cliste.core.theme.process('home');
	};
	
	/**
	 * Implementation of hook.config()
	 * This will return configuration options for this module
	 */
	home.config = function () {
		return {
			'weight': 0
		};
	};
	
	/**
	 * Return the user module to the global scope
	 */	
	global.cliste.tools.emitter.on('initialize', home.initialize);
	
	module.exports = home;
	
}());