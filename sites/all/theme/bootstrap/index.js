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
	
	var bootstrap = {};
	
	bootstrap.initialize = function () {
		cliste.core.theme.addCSS({
			'bootstrap.css': '<link rel="stylesheet" href="/sites/default/file/css/bootstrap/bootstrap.min.css" type="text/css" media="screen">',
			'bootstrap.responsive.css': '<link rel="stylesheet" href="/sites/default/file/css/bootstrap/bootstrap-responsive.min.css" type="text/css" media="screen">',
			'app.css': '<link rel="stylesheet" href="/sites/default/file/css/bootstrap/app.css" type="text/css" media="screen">'
		});
		
		cliste.core.theme.addJS({
			'jquery': '<script type="text/javascript" src="/sites/default/file/js/jquery/jquery.js"></script>',
			'bootstrap': '<script type="text/javascript" src="/sites/default/file/js/bootstrap/bootstrap.min.js"></script>'
		});
	};
	
	bootstrap.config = function () {
		return {
			'weight': 0
		};
	};
	
	cliste.on('initialize', bootstrap.initialize);
	
	module.exports = bootstrap;
	
}());