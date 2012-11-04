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
			'lastName': 'string'
		});
	
		global.cliste.core.database.addModel('user');
	};
	
	user.config = function () {
		return {
			'weight': 0
		};
	};
	
	user.addUser = function (data) {
	
		global.cliste.core.database.addDocument('user', data);
		
	};
	
	user.setSchema = function (schema) {
		
	};
	
	module.exports = user;
	
}());