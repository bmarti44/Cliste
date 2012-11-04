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
	
	var database = {},
		mongoose = require('mongoose'),
		db = mongoose.createConnection('localhost', 'cliste'),
		schemas = {},
		models = {},
		documents = {};
		
	database.initialize = function () {
		
	};
	
	database.config = function () {
		return {
			'weight': 0
		};
	};
	
	database.addSchema = function (name, schema) {
		
		if (typeof(schemas[name]) === 'undefined') {
			schemas[name] = mongoose.Schema(schema);
		}
		
	};
	
	database.addModel = function (name) {
		
		if (typeof(models[name]) === 'undefined') {
			models[name] = db.model(name, schemas[name]);
		}
		
	};
	
	database.addDocument = function (name, data) {
		
		if (typeof(documents[name]) === 'undefined') {
			documents[name] = new models[name](data);
		}
		
		documents[name].save(function (error) {
			if (error) {
				console.log(error);
			}
		});
	};
	
	database.getDocuments = function (name, query, callback) {
		
		models[name].find(query, callback);
		
	};
	
	module.exports = database;
	
}());