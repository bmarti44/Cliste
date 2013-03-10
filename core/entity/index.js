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
	
	var entity = {};
	
	entity.initialize = function () {
		
	};
	
	/**
	 * Implementation of hook.config()
	 * This will return configuration options for this module
	 */
	entity.config = function () {
		return {
			'weight': 0
		};
	};
	
	entity.tests = {
		'test1': function (assert) {
			assert.ok(false, 'testing this out');
		}
	};
	
	entity.setSchema = function () {
		global.cliste.core.database.addSchema('entity', {
			'type': String,
			'name': String,
			'content': String
		});
		
	};
	
	entity.setModel = function () {
		global.cliste.core.database.addModel('entity');
	};
	
	global.cliste.tools.emitter.on('initialize', entity.initialize);
	global.cliste.tools.emitter.on('addSchema', entity.setSchema);
	global.cliste.tools.emitter.on('addModel', entity.setModel);
	
	module.exports = entity;
	
}());