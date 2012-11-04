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
	
	/**
	 * Implementation of hook.initialize()
	 * This will be called once when the server starts
	 */
	database.initialize = function () {
		
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
		
		if (typeof(documents[name]) === 'undefined') {
			documents[name] = new models[name](data);
		}
		
		documents[name].save(function (error) {
			if (error) {
				console.log(error);
			}
		});
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
	 * Return the admin module to the global scope
	 */
	module.exports = database;
	
}());