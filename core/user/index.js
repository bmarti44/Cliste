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
	
	var user = {};
	
	user.initialize = function () {
		global.cliste.core.database.addSchema('user', {
			'firstName': 'string',
			'lastName': 'string',
			'username': 'string',
			'password': 'string'
		});
	
		global.cliste.core.database.addModel('user');
	};
	
	/**
	 * Implementation of hook.config()
	 * This will return configuration options for this module
	 */
	user.config = function () {
		return {
			'weight': 0
		};
	};
	
	/**
	 * Add a new user to the system
     * @param {Object} data
     *		The user data to add
	 */
	user.addUser = function (data) {
	
		global.cliste.core.database.addDocument('user', data);
		
	};
	
	/**
	 * Theme callback
	 * @return {String}
	 *		Return the HTML for the home page
	 */
	user.getHTML = function() {
		return global.cliste.core.theme.process('login');
	};
	
	user.addTheme = function (callback) {
		// add a new theme for the home page
		callback({
			'login': { // name it home
				'parent': 'page', // make it's parent page.handlebars
				'view': global.cliste.core.file.getSource('core', 'user', 'template/login.handlebars'), // set the view as the source of home.handlebars
				'model': {}
			}
		});
		
	};
	
	user.addPath = function (callback) {
		
		callback({
			'/login': {
				'type': 'core',
				'name': 'user',
				'callback': 'getHTML'
			}
		});
		
	};
	
	user.validateLogin = function (url, data) {
		if (url === '/login') {
			console.log(data);
		}
	};
	
	user.tests = {
		'test1': function (assert) {
			assert.ok(false, 'testing this out');
		}
	};
	/**
	 * Return the user module to the global scope
	 */	
	
	global.cliste.tools.emitter.on('initialize', user.initialize);
	global.cliste.tools.emitter.on('addTheme', user.addTheme);
	global.cliste.tools.emitter.on('addPath', user.addPath);
	global.cliste.tools.emitter.on('postReceived', user.validateLogin);
	
	module.exports = user;
	
}());