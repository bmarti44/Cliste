/*jslint devel: false, browser: true, maxerr: 50, indent: 4*/
/*global cliste: false, module: false, $: false, jQuery: false, console: false, document: false, event: false, frames: false, history: false, Image: false, location: false, name: false, navigator: false, Option: false, parent: false, screen: false, setInterval: false, setTimeout: false, window: false, XMLHttpRequest: false */

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
	
		cliste.core.database.addDocument('user', data);
		
	};
	
	/**
	 * Theme callback
	 * @return {String}
	 *		Return the HTML for the home page
	 */
	user.getLoginForm = function(request, response) {
		cliste.core.user.getCurrentUser(function (error, user) {
			var currentUser = false;
			
			if (user.length) {
				currentUser = user[0];
				cliste.core.theme.updateModel('login', currentUser);
			} else {
				cliste.core.theme.updateModel('login', false);
			}
			
		});
		
		if (typeof(request.postData) !== 'undefined') {
			response.stop = false;
			user.login(request, response, querystring.parse(request.postData));
		} else {
			response.write(cliste.core.theme.process('login'));
		}
	};
	
	user.login = function (request, response, data) {
		var credentials = {
			'username': data.username,
			'password': data.password
		};
		
		cliste.core.database.query('user', credentials, {}, function (error, user) {
			var random = Math.floor(Math.random() * 1000000000000000001),
				random1 = Math.floor(Math.random() * 1000000000000000001),
				random2 = Math.floor(Math.random() * 1000000000000000001),
				random3 = Math.floor(Math.random() * 1000000000000000001),
				random4 = Math.floor(Math.random() * 1000000000000000001),
				session = '';
				
			if (user.length) {
				
				session += crypto.createHash('md5').update(crypto.createHash('md5').update(random2.toString()).digest("hex") + Date.now().toString()).digest("hex");
				session += crypto.createHash('md5').update(crypto.createHash('md5').update(random1.toString()).digest("hex") + Date.now().toString()).digest("hex");
				session += crypto.createHash('md5').update(crypto.createHash('md5').update(random3.toString()).digest("hex") + Date.now().toString()).digest("hex");
				session += crypto.createHash('md5').update(crypto.createHash('md5').update(random4.toString()).digest("hex") + Date.now().toString()).digest("hex");
				
				sessions.push({
					'SID': session,
					'username': user[0].username,
					'expires': Date.now() + 1209600000
				});
				
				cliste.core.helper.setCookie('SESSION=' + session);
				
				currentUser = user[0];
				
				cliste.core.database.update('user', {
					'username': user[0].username,
					'password': user[0].password
				},
				{
					'session': session	
				}, function (error, item) {
					
				});
				
				cliste.core.theme.updateModel('login', currentUser);
				
				cliste.core.theme.updateModel('admin', {
					'text': 'Hello!',
					'user': currentUser
				});
				
				cliste.core.helper.goTo('/admin');
			}
			
			response.write(cliste.core.theme.process('login'));
			response.end();
		});
	};
	/**
	 * Theme callback
	 * @return {String}
	 *		Return the HTML for the home page
	 */
	user.getRegisterForm = function(request, response) {
			
		if (typeof(request.postData) !== 'undefined') {
			response.stop = false;
			user.validateRegistration(querystring.parse(request.postData));
		}
		
		response.write(cliste.core.theme.process('register'));
		
	};
	
	user.getUser = function (SID) {
		
		if (SID !== false) {
			
			cliste.core.database.query('user', {'session': SID}, {}, function (error, user) {
				
				if (user.length) {
					currentUser = user;
					cliste.core.theme.updateModel('login', currentUser);
				}
				
			});
		}
		
		return currentUser;
	};
	
	user.getCurrentUser = function (callback) {
		var SID = cliste.core.helper.getCookie('SESSION'),
			currentUser = false;
		
		if (SID !== false) {
			cliste.core.database.query('user', {'session': SID}, {}, callback);
		} else {
			callback(null, false);
		}
		
	};
	
	user.setUser = function (SID) {
		var i;
		
		for (i = 0; i < sessions.length; i += 1) {
			
			if (SID === sessions.SID) {
				cliste.core.database.query('user', {'session': SID}, {}, function (error, user) {
					
					if (user.length) {
						currentUser = user;
						cliste.core.theme.updateModel('login', currentUser);
					}
					
				});
			}
			
		}
		
	};
	
	user.addTheme = function (callback) {
		// add a new theme for the home page
		callback({
			'login': { // name it home
				'parent': 'page', // make it's parent page.handlebars
				'view': cliste.core.file.getSource('core', 'user', 'template/login.handlebars'), // set the view as the source of home.handlebars
				'model': {}
			},
			'register': { // name it home
				'parent': 'page', // make it's parent page.handlebars
				'view': cliste.core.file.getSource('core', 'user', 'template/register.handlebars'), // set the view as the source of home.handlebars
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
	
	user.validateRegistration = function (data) {
		delete data.submit;
		user.addUser(data);
	};
	
	user.setSchema = function () {
		cliste.core.database.addSchema('user', {
			'firstname': String,
			'lastname': String,
			'username': String,
			'password': String,
			'session': String,
			'roles': {
				'administrator': Boolean,
				'authenticated': Boolean,
				'anonymous': Boolean
			}
		});
		
	};
	
	user.setModel = function () {
		cliste.core.database.addModel('user');
	};
	
	user.tests = {
		'test1': function (assert) {
			assert.ok(false, 'testing this out');
		}
	};
	
	cliste.on('initialize', user.initialize);
	cliste.on('addTheme', user.addTheme);
	cliste.on('addPath', user.addPath);
	cliste.on('addSchema', user.setSchema);
	cliste.on('addModel', user.setModel);
	
	module.exports = user;
	
}());