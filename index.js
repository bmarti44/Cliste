/*jslint devel: false, browser: true, maxerr: 50, indent: 4*/
/*global module: false, global: false, $: false, jQuery: false, console: false, document: false, event: false, frames: false, history: false, Image: false, location: false, name: false, navigator: false, Option: false, parent: false, screen: false, setInterval: false, setTimeout: false, window: false, XMLHttpRequest: false */

(function () {
	'use strict';
	
	var requireDir = require('require-dir'),
		events = require('events'),
		emitter = new events.EventEmitter(),
		util = require('util'),
		count = 0,
		core,
		modules,
		settings,
		themes,
		processor;
	
	emitter.setMaxListeners(0);
	
	global.cliste = {
		'settings': false,
		'core': false,
		'module': false,
		'themes': false,
		'tools': {
			'emitter': emitter
		}
	};
	
	settings = require('./sites/default/settings.js');
	core = requireDir('./core', {recurse: true});
	modules = requireDir('./sites/all/module', {recurse: true});
	themes = requireDir('./sites/all/theme', {recurse: true});
	
	global.cliste.settings = settings;
	global.cliste.core = core;
	global.cliste.module = modules;
	global.cliste.themes = themes;

	Object.keys(core).forEach(function(key) {
	    
		core[key] = core[key].index;
	    
	});
	
	Object.keys(modules).forEach(function(key) {
	    
	    modules[key] = modules[key].index;
	    
	});
	
	Object.keys(themes).forEach(function(key) {
	    
	    themes[key] = themes[key].index;
	    
	});
	
	core.bootstrap.start();
	
	module.exports = global.cliste;
	
}());