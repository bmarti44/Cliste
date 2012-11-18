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
		querystring = require('querystring'),
		currentUser = false;
	
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
	user.getLoginForm = function(request, response) {
		
		request.on('end', function () {
					
			if (typeof(request.postData) !== 'undefined') {
				user.login(request, response, querystring.parse(request.postData));
			} else {
				response.write(global.cliste.core.theme.process('login'));
				response.end();
			}
			
		});
		
	};
	
	user.login = function (request, response, data) {
		var credentials = {
			'username': data.username,
			'password': data.password
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
			
			response.write(global.cliste.core.theme.process('login'));
			response.end();
			
		});
	};
	/**
	 * Theme callback
	 * @return {String}
	 *		Return the HTML for the home page
	 */
	user.getRegisterForm = function(request, response) {
		
		response.write(global.cliste.core.theme.process('register'));
		response.end();
		
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
	
	global.cliste.tools.emitter.on('initialize', user.initialize);
	global.cliste.tools.emitter.on('addTheme', user.addTheme);
	global.cliste.tools.emitter.on('addPath', user.addPath);
	
	module.exports = user;
	
}());