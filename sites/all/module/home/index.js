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
	
	var home = {};
	
	home.initialize = function () {
		global.cliste.core.path.addPath({
			'/home': {
				'type': 'module',
				'name': 'home',
				'template': 'getHTML'
			}
		});
		
		global.cliste.core.alias.addAlias({
			'/': '/home'
		});
		
		global.cliste.core.theme.addTheme({
			'home': {
				'parent': 'page',
				'view': global.cliste.core.file.getSource('module', 'home', 'template/home.handlebars'),
				'model': {
					'text': 'frontpage'
				}
			}
		});
		
	};
	
	home.getHTML = function() {
		return global.cliste.core.theme.process('home');
	};
	
	home.getData = function() {
		return {
			'data': 'none'
		};	
	};
	
	home.config = function () {
		return {
			'weight': 0
		};
	};
		
	module.exports = home;
	
}());