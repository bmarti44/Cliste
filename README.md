Cliste CMS
================================================
* Brian Martin
* https://twitter.com/bmarti44
* BSD License
* 2012-11-3

**** LOOKING FOR CO-MAINTAINERS, CONTACT brian@brianmartin.com ****
-------------------------------------------------------------------

What is it?
-----------
This is currently a work in progress, any developers that want to help let me know!

Cliste CMS utilizes Node.js and Handlebars.js to create a 100% JavaScript based CMS. This is currently a work in progress
and does not yet support all functionalities you would expect in a CMS. User Management, Permissions, Database API and Forms are still
outstanding components. Implemented components include the Server, Virtual Paths, Theming, File Management and Aliases. This
CMS has been inspired by Drupal and follows many of the file/folder structures. That said, this is not
a Drupal clone by any means, although there are many similiarities. 

Setup
----------
Download/clone this project to your system. Use npm to install:

npm install cliste && git clone https://github.com/bmarti44/Cliste.git ./

This will install cliste and check it out into the current working directory. Just run "node index.js" and you're good to go!

Point your browser to http://localhost:8888 and the site should load up

If you get an error, make sure MongoDB is running. Type mongo and see if it logs you in.

If you get a connect error then mongo isn't running. Type "mongod --fork" to start an instance of mongo.

If the server throws an error, make sure there isn't anything else running on port 8888

Important Notes
---------------
If you need to serve files to the client side, put them in "/sites/all/file" . Only files in that directory can be served

to the client. All other files are treated as Server Side, and will not be returned to the client.

Stay tuned for more detailed information on emitters/events and corresponding callbacks.

Module Creation
---------------
1. To create a new module, create a new folder at /sites/all/module/{{module-name}}
2. Create a file called index.js inside the folder you just created
3. If needed, create a folder called template, and add any handlebars templates you might need


An example of the home module:

		/**
		 *	@description
		 *		This module will control the home page
		 *	@author
		 *		Brian Martin
		 *	@version
		 *		1.0.0
		 *	@namespace
		 *		Home
		 */
		(function() {
			'use strict';
			
			var home = {};
			
			/**
			 * Implementation of hook.initialize()
			 * This will be called once when the server starts
			 */
			home.initialize = function () {
				
			};
			
			/**
			 * Theme callback
			 * @return {String}
			 *		Return the HTML for the home page
			 */
			home.getHTML = function(request, response) {
			
				response.write(global.cliste.core.theme.process('home'));

			};
			
			/**
			 * Implementation of hook.addTheme
			 * Add a new theme definition to the theme registry
			 */
			home.addTheme = function (callback) {
				// add a new theme for the home page
				callback({
					'home': { // name it home
						'parent': 'page', // make it's parent page.handlebars
						'view': global.cliste.core.file.getSource('module', 'home', 'template/home.handlebars'), // set the view as the source of home.handlebars
						'model': { // pass the model
							'text': 'frontpage'
						}
					}
				});
				
			};
			
			/**
			 * Implementation of hook.config()
			 * This will return configuration options for this module
			 */
			home.config = function () {
				return {
					'weight': 0
				};
			};
			
			/**
			 * Implementation of hook.addPath
			 * Add a new path to the path registry
			 */
			home.addPath = function (callback) {
				
				callback({
					'/home': {
						'type': 'module',
						'name': 'home',
						'callback': 'getHTML'
					}
				});
				
			};
			
			/**
			 * Implementation of hook.addAlias
			 * Add a new alias to the alias registry
			 */
			home.addAlias = function (callback) {
				
				// add a new alias, and point it at the home page
				callback({
					'/': '/home'
				});
				
			};
			
			/**
			 * Set listeners for emitter hooks
			 */
			global.cliste.tools.emitter.on('initialize', home.initialize);
			global.cliste.tools.emitter.on('addTheme', home.addTheme);
			global.cliste.tools.emitter.on('addPath', home.addPath);
			global.cliste.tools.emitter.on('addAlias', home.addAlias);
			
			/**
			 * Return the user module to the global scope
			 */
			module.exports = home;
			
		}());

Compatibility
-------------
1. Requires [Node.js](https://github.com/joyent/node "Node.js") 
2. Requires [Handlebars.js](https://github.com/wycats/handlebars.js/ "Handlebars.js")
3. Requires [MongoDB](http://www.mongodb.org "MongoDB")
4. Requires [Mongoose](http://mongoosejs.com/ "Mongoose")
 