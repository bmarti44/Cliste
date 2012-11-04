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
(function () {
	'use strict';
	
	var http = require("http"),
		mime = require('mime'),
		createServer,
		server;
	
	server = {};
	
	server.initialize = function () {
		createServer();
	};
	
	server.config = function () {
		return {
			'weight': 10
		};
	};
	
	createServer = function () {
		var headers = global.cliste.core.cliste.getHeaders(),
			paths = global.cliste.core.path.getPaths(),
			aliases = global.cliste.core.alias.getAliases(),
			url,
			html,
			data;
		
		http.createServer(function(request, response) {
			
			try {
				
				if (typeof(paths[request.url]) !== 'undefined' || typeof(aliases[request.url]) !== 'undefined') {
					
					global.cliste.core.cliste.setHeader({
						'Content-Type': 'text/html'
					});
					
					response.writeHead(200, headers);
					
					if (typeof(aliases[request.url]) !== 'undefined') {
						url = aliases[request.url];
					} else {
						url = request.url;
					}
					
					html = global.cliste[paths[url].type][paths[url].module][paths[url].template]();
					
				} else {
					
					if (typeof(aliases[request.url]) !== 'undefined') {
						url = aliases[request.url];
					} else {
						url = request.url;
					}
					
					if (global.cliste.core.file.fileExists(global.cliste.settings.base + url)) {
						
						if (url.indexOf('/sites/all/file') !== -1) {
							global.cliste.core.cliste.setHeader({
								'Content-Type': mime.lookup(global.cliste.settings.base + request.url)
							});
							response.writeHead(200, headers);
							html = global.cliste.core.file.getFile(global.cliste.settings.base + url);
						} else {
							global.cliste.core.cliste.setHeader({
								'Content-Type': 'text/html'
							});
							response.writeHead(404, headers);
							html = global.cliste.core.theme.get404();
						}
						
					} else {
						
						global.cliste.core.cliste.setHeader({
							'Content-Type': 'text/html'
						});
						response.writeHead(404, headers);
						html = global.cliste.core.theme.get404();
						
					}
					
				}
				
				response.write(html);
				response.end();
				
			} catch (exception) {
				console.log(exception);
				global.cliste.core.cliste.setHeader({
					'Content-Type': 'text/html'
				});
				response.writeHead(404, headers);
				html = global.cliste.core.theme.get404();
				response.write(html);
				response.end();
			}
			
		}).listen(global.cliste.settings.port);
		
	};
	
	module.exports = server;
	
}());
