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
	
	global.cliste = {
			'settings': settings,
			'core': core,
			'module': modules,
			'themes': themes
	};

	Object.keys(core).forEach(function(key) {
	    
		core[key] = core[key].index;
	    
	});
	
	Object.keys(modules).forEach(function(key) {
	    
	    modules[key] = modules[key].index;
	    
	});
	
	Object.keys(themes).forEach(function(key) {
	    
	    themes[key] = themes[key].index;
	    
	});
	
	Object.keys(core).forEach(function(key) {
	    
	    if (typeof(core[key].initialize) !== 'undefined') {
			core[key].initialize();
	    }
	    
	});
	
	Object.keys(modules).forEach(function(key) {
	    
	    if (typeof(modules[key].initialize) !== 'undefined') {
			modules[key].initialize();
	    }
	    
	});
	
	Object.keys(themes).forEach(function(key) {
	    
	    if (typeof(themes[key].initialize) !== 'undefined') {
			themes[key].initialize();
	    }
	    
	});
	
}());