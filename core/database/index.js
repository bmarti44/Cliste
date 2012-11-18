/*jslint devel: false, browser: true, maxerr: 50, indent: 4*/
/*global global: false, module: false, $: false, jQuery: false, console: false, document: false, event: false, frames: false, history: false, Image: false, location: false, name: false, navigator: false, Option: false, parent: false, screen: false, setInterval: false, setTimeout: false, window: false, XMLHttpRequest: false */

/**
 *	@description
 *		This module will act as the Database API for cliste
 *	@author
 *		Brian Martin
 *	@version
 *		1.0.0
 *	@namespace
 *		Database
 */
(function() {
	'use strict';
	
	var database = {},
		mongoose = require('mongoose'),
		db = mongoose.createConnection('localhost', 'cliste'),
		schemas = {},
		models = {},
		documents = {};
	
	/**
	 * Implementation of hook.initialize()
	 * This will be called once when the server starts
	 */
	database.initialize = function () {
		global.cliste.tools.emitter.emit('addSchema');
		global.cliste.tools.emitter.emit('addModel');
	};
	
	/**
	 * Implementation of hook.config()
	 * This will return configuration options for this module
	 */
	database.config = function () {
		return {
			'weight': 0
		};
	};
	
	/**
	 * Add a schema to be used by mongodb
     * @param {Object} name
     *		The name of the schema
     * @param {Object} schema
     *		The schema
	 */
	database.addSchema = function (name, schema) {
		
		if (typeof(schemas[name]) === 'undefined') {
			schemas[name] = mongoose.Schema(schema);
		}
		
	};
	
	database.query = function (name, data, fields, callback) {
		
		if (typeof(models[name]) !== 'undefined') {
			models[name]
				.find(data)
				.select(fields)
				.exec(callback);
		}
		
	};
	
	database.update = function (name, fields, data, callback) {
		if (typeof(models[name]) !== 'undefined') {
			models[name]
				.update(fields, { $set: data}, callback);
		}
	};
	
	database.remove = function (name, fields) {
		if (typeof(models[name]) !== 'undefined') {
			models[name]
				.find(fields).remove();
		}
	};
	/**
	 * Add a new model to be used by mongodb
     * @param {Object} name
     *		The name of the new model
	 */
	database.addModel = function (name) {
		
		if (typeof(models[name]) === 'undefined') {
			models[name] = db.model(name, schemas[name]);
		}
		
	};
	
	/**
	 * Add a new document to mongodb
     * @param {Object} name
     *		The name of the model
     * @param {Object} data
     *		The data to insert
	 */
	database.addDocument = function (name, data) {
		
		if (typeof(documents[name]) === 'undefined' && typeof(models[name]) !== 'undefined') {
			documents[name] = new models[name](data);
		}
		
		if (typeof(documents[name]) !== 'undefined') {
			documents[name].save(function (error) {
				if (error) {
					console.log(error);
				}
			});
		}
	};
	
	/**
	 * Perform a query on the current database
     * @param {Object} name
     *		The name of the model
     * @param {Object} query
     *		The query to execute
     * @param {Object} callback
     *		The function to call when the query is complete
	 */
	database.getDocuments = function (name, query, callback) {
		
		models[name].find(query, callback);
		
	};
	
	/**
	 * Return the database module to the global scope
	 */
	
	global.cliste.tools.emitter.on('initialize', database.initialize);
	
	module.exports = database;
	
}());