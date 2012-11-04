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
	
	/**
	 * Implementation of hook.initialize()
	 * This will be called once when the server starts
	 */
	theme.initialize = function () {
	
	};
	
	/**
	 * Process a theme and it's corresponding handlebars
     * @param {String} name
     *		The name of the theme to generate
	 */
	theme.process = function (name) {
		var html,
			model;
		
		// if the theme doesn't exist, bail
		if (typeof(themes[name]) === 'undefined') {
			return false;
		}
		
		// compiled the handlebars for the theme
		if (typeof(themes[name].compiled) === 'undefined') {
			
			themes[name].compiled = handlebars.compile(themes[name].view);
			
		}
		
		// compile the handlebars for the parent theme
		if (typeof(themes[name].compiledParent) === 'undefined') {
			themes[name].compiledParent = handlebars.compile(global.cliste.core.file.getSource('theme', global.cliste.settings.theme, 'template/' + themes[name].parent + '.handlebars'));
		}
		
		// compile the model for the parent them, and pass the child theme as content
		model = {
			'css': global.cliste.core.theme.getCSS(),
			'js': global.cliste.core.theme.getJS(),
			'content': themes[name].compiled(themes[name].model)
		};
		
		// return the generated HTML
		return themes[name].compiledParent(model);
		
	};
	
	/**
	 * Add a new theme to the theme registry
     * @param {Object} newTheme
     *		The new theme to add
	 */
	theme.addTheme = function (newTheme) {
		Object.keys(newTheme).forEach(function(key) {
		    
		    themes[key] = newTheme[key];
		    
		});
	};
	
	/**
	 * Add CSS to the current page
     * @param {Object} newCSS
     *		The new CSS to add
	 */
	theme.addCSS = function (newCSS) {
		Object.keys(newCSS).forEach(function(key) {
		    
		    css[key] = newCSS[key];
		    
		});
	};
	
	/**
	 * Get the currently added CSS
	 * @return {Object}
	 *		The CSS that has been added to the page
	 */
	theme.getCSS = function () {
		var cssText = '';
		
		Object.keys(css).forEach(function(key) {
		    
		    cssText += css[key];
		    
		});
		
		return cssText;
		
	};
	
	/**
	 * The new JS to add to the page
     * @param {Object} newJS
     *		An object literal of the new JS to add
	 */
	theme.addJS = function (newJS) {
		Object.keys(newJS).forEach(function(key) {
		    
		    css[key] = newJS[key];
		    
		});
	};
	
	/**
	 * Get the JS currently loaded on the page
	 * @return {Object}
	 *		A object containing all the JS loaded on the page
	 */
	theme.getJS = function () {
		var jsText = '';
		
		Object.keys(js).forEach(function(key) {
		    
		    jsText += js[key];
		    
		});
		
		return jsText;
		
	};
	
	/**
	 * Generate the 404 page HTML
	 * @return {String}
	 *		The HTML for the 404 page
	 */
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
	
	/**
	 * Implementation of hook.config()
	 * This will return configuration options for this module
	 */
	theme.config = function () {
		return {
			'weight': 0
		};
	};
	
	/**
	 * Return the theme module to the global scope
	 */	
	module.exports = theme;
	
}());