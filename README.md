Cliste CMS
================================================
* Brian Martin
* https://twitter.com/bmarti44
* Public Domain
* 2012-11-3

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

npm install require-dir handlebars mongodb mongoose node-static -g

Update settings.js to include the correct path to Cliste

Then go into the project, and run "node index.js"

If you get a module not found error, don't forget to link it, like so:

npm link require-dir

Where require-dir is the name of the module

Also, don't forget to make sure mongodb is running

Module Creation
--------
1. To create a new module, create a new folder at /sites/all/module/{{module-name}}
2. Create a file called index.js inside the folder you just created
3. If needed, create a folder called template, and add any handlebars templates you might need


An example of the home module:

		(function() {
			'use strict';
			
			var home = {};
			
			/**
			 * Implementation of hook.initialize()
			 * This will be called once when the server starts
			 */
			home.initialize = function () {
				// add a new path for the home page
				global.cliste.core.path.addPath({
					'/home': {
						'type': 'module',
						'name': 'home',
						'callback': 'getHTML'
					}
				});
				
				// add a new alias, and point it at the home page
				global.cliste.core.alias.addAlias({
					'/': '/home'
				});
				
				// add a new theme for the home page
				global.cliste.core.theme.addTheme({
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
			 * Theme callback
			 * @return {String}
			 *		Return the HTML for the home page
			 */
			home.getHTML = function() {
				return global.cliste.core.theme.process('home');
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
 