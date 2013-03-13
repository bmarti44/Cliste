/*jslint devel: false, browser: true, maxerr: 50, indent: 4*/
/*global cliste: false, cliste: false, $: false, jQuery: false, console: false, document: false, event: false, frames: false, history: false, Image: false, location: false, name: false, navigator: false, Option: false, parent: false, screen: false, setInterval: false, setTimeout: false, window: false, XMLHttpRequest: false */

/**
 *	@description
 *		The Admin module will be used to create the administrative back end for cliste
 *	@author
 *		Brian Martin
 *	@version
 *		1.0.0
 *	@namespace
 *		Admin
 */
(function() {
	'use strict';
	
	var admin = {};
	
	/**
	 * Implementation of hook.initialize()
	 * This will be called once when the server starts
	 */
	admin.initialize = function () {
		cliste.core.path.addPath({
			'/admin': {
				'type': 'core',
				'name': 'admin',
				'callback': 'getHTML'
			}
		});
		
		cliste.core.theme.addTheme({
			'admin': {
				'parent': 'page',
				'view': cliste.core.file.getSource('core', 'admin', 'template/admin.handlebars'),
				'model': {
					'text': 'admin page'
				}
			}
		});
	};
	
	/**
	 * Admin page callback
	 * @return {String}
	 *		HTML for the admin page
	 */
	admin.getHTML = function (request, response) {
		cliste.core.user.getCurrentUser(function (error, user) {
			var currentUser = false;
			if (user.length) {
				currentUser = user[0];
				cliste.core.theme.updateModel('admin', {
					'text': 'Admin Page',
					'user': currentUser
				});
			} else {
				cliste.core.theme.updateModel('admin', {
					'text': 'Unauthorized',
					'user': false
				});
			}
			
		});
		
		cliste.settings.response.write(cliste.core.theme.process('admin'));
		cliste.settings.response.end();
	
	};
	
	/**
	 * Implementation of hook.config()
	 * This will return configuration options for this module
	 */
	admin.config = function () {
		return {
			'weight': 0
		};
	};
	
	/**
	 * Return the admin module to the global scope
	 */
	
	cliste.on('initialize', admin.initialize);
	
	module.exports = admin;
	
}());