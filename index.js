/*jslint devel: false, browser: true, maxerr: 50, indent: 4*/
/*global global: false, $: false, jQuery: false, console: false, document: false, event: false, frames: false, history: false, Image: false, location: false, name: false, navigator: false, Option: false, parent: false, screen: false, setInterval: false, setTimeout: false, window: false, XMLHttpRequest: false */

(function () {
	'use strict';
	
	var requireDir = require('require-dir'),
		count = 0,
		core,
		modules,
		settings,
		themes,
		processor;
	
	settings = require('./sites/all/default/settings.js');
	core = requireDir('./core', {recurse: true});
	modules = requireDir('./sites/all/module', {recurse: true});
	themes = requireDir('./sites/all/theme', {recurse: true});
	processor = require('./processor.js');
	
	processor.initialize(settings, core, modules, themes);
	
}());