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
	
	var theme = {},
		themes = {},
		css = {},
		js = {},
		handlebars = require('handlebars');
	
	theme.initialize = function () {
	
	};
	
	theme.process = function (name) {
		var html,
			model;
		
		if (typeof(themes[name]) === 'undefined') {
			return false;
		}
		
		if (typeof(themes[name].compiled) === 'undefined') {
			
			themes[name].compiled = handlebars.compile(themes[name].view);
			
		}
		
		if (typeof(themes[name].compiledParent) === 'undefined') {
			themes[name].compiledParent = handlebars.compile(global.cliste.core.file.getSource('theme', global.cliste.settings.theme, 'template/' + themes[name].parent + '.handlebars'));
		}
		
		model = {
			'css': global.cliste.core.theme.getCSS(),
			'js': global.cliste.core.theme.getJS(),
			'content': themes[name].compiled(themes[name].model)
		};
		
		return themes[name].compiledParent(model);
		
	};
	
	theme.addTheme = function (newTheme) {
		Object.keys(newTheme).forEach(function(key) {
		    
		    themes[key] = newTheme[key];
		    
		});
	};
	
	theme.addCSS = function (newCSS) {
		Object.keys(newCSS).forEach(function(key) {
		    
		    css[key] = newCSS[key];
		    
		});
	};
	
	theme.getCSS = function () {
		var cssText = '';
		
		Object.keys(css).forEach(function(key) {
		    
		    cssText += css[key];
		    
		});
		
		return cssText;
		
	};
	
	theme.addJS = function (newJS) {
		Object.keys(newJS).forEach(function(key) {
		    
		    css[key] = newJS[key];
		    
		});
	};
	
	theme.getJS = function () {
		var jsText = '';
		
		Object.keys(js).forEach(function(key) {
		    
		    jsText += js[key];
		    
		});
		
		return jsText;
		
	};
	
	theme.get404 = function () {
		var html,
			model;
		
		if (typeof(themes['404']) === 'undefined') { 
			themes['404'] = {
				'compiled': '',
				'compiledParent': ''
			};
		}
		
		if (typeof(themes['404'].compiled) !== 'function') { 
			themes['404'].compiled = handlebars.compile(global.cliste.core.file.getSource('theme', global.cliste.settings.theme, 'template/404.handlebars'));
		}
		
		if (typeof(themes['404'].compiledParent) !== 'function') { 
			themes['404'].compiledParent = handlebars.compile(global.cliste.core.file.getSource('theme', global.cliste.settings.theme, 'template/page.handlebars'));
		}
		
		model = {
			'css': global.cliste.core.theme.getCSS(),
			'js': global.cliste.core.theme.getJS(),
			'content': themes['404'].compiled(themes['404'].model)
		};
		
		return themes['404'].compiledParent(model);
	};
	
	theme.config = function () {
		return {
			'weight': 0
		};
	};
		
	module.exports = theme;
	
}());