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
	
	var user = {},
		crypto = require('crypto'),
		sessions = [],
		currentUser = false,
		queryResponse = false;
	
	user.initialize = function () {
		global.cliste.core.database.addSchema('user', {
			'firstname': String,
			'lastname': String,
			'username': String,
			'password': String,
			'roles': {
				'administrator': Boolean,
				'authenticated': Boolean,
				'anonymous': Boolean
			}
		});
	
		global.cliste.core.database.addModel('user');
		
		global.cliste.core.server.addSafeURL('/login');
		
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
	user.getLoginForm = function() {
		return global.cliste.core.theme.process('login');
	};
	
	user.login = function (user) {
		var credentials = {
			'username': user.username,
			'password': user.password
		};
		
		global.cliste.core.database.query('user', credentials, {}, function (error, user) {
			var random = Math.floor(Math.random() * 1000000000000000001),
				cipher = crypto.createHash('sha1'),
				session;
				
			if (user.length) {
				
				session = cipher.update(user[0]._id.toString()).digest() + random;
				
				sessions.push({
					'SID': session,
					'username': user[0].username,
					'expires': Date.now() + 1209600000
				});
				
				currentUser = user[0];
				
				global.cliste.core.theme.updateModel('login', currentUser);
				
			}
			
			queryResponse.write(global.cliste.core.theme.process('login'));
			queryResponse.end();
			
		});
	};
	/**
	 * Theme callback
	 * @return {String}
	 *		Return the HTML for the home page
	 */
	user.getRegisterForm = function() {
		
		return global.cliste.core.theme.process('register');
		
	};
	
	user.getUser = function () {
		return currentUser;
	};
	
	user.addTheme = function (callback) {
		// add a new theme for the home page
		callback({
			'login': { // name it home
				'parent': 'page', // make it's parent page.handlebars
				'view': global.cliste.core.file.getSource('core', 'user', 'template/login.handlebars'), // set the view as the source of home.handlebars
				'model': {}
			},
			'register': { // name it home
				'parent': 'page', // make it's parent page.handlebars
				'view': global.cliste.core.file.getSource('core', 'user', 'template/register.handlebars'), // set the view as the source of home.handlebars
				'model': {}
			}
		});
		
	};
	
	user.addPath = function (callback) {
		
		callback({
			'/login': {
				'type': 'core',
				'name': 'user',
				'callback': 'getLoginForm'
			},
			'/register': {
				'type': 'core',
				'name': 'user',
				'callback': 'getRegisterForm'
			}
		});
		
	};
	
	user.validateLogin = function (url, data) {
		if (url === '/login') {
			user.login(data);
		}
	};
	
	user.validateRegistration = function (url, data) {
		if (url === '/register') {
			delete data.submit;
			user.addUser(data);
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
	
	user.endRequest = function (request, response, html) {
		if (request.url === '/login' && request.method === 'POST') {
			queryResponse = response;
		}
		
		if (request.url === '/login' && request.method !== 'POST') {
			response.write(html);
			response.end();
		}
	};
	
	global.cliste.tools.emitter.on('initialize', user.initialize);
	global.cliste.tools.emitter.on('addTheme', user.addTheme);
	global.cliste.tools.emitter.on('addPath', user.addPath);
	global.cliste.tools.emitter.on('postReceived', user.validateLogin);
	global.cliste.tools.emitter.on('postReceived', user.validateRegistration);
	global.cliste.tools.emitter.on('onConnectionEnd', user.endRequest);
	
	module.exports = user;
	
}());