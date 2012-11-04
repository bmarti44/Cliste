Cliste CMS
================================================
* Brian Martin
* https://twitter.com/bmarti44
* Public Domain
* 2012-06-29

What is it?
-----------
Cliste CMS utilizes Node.js and Handlebars.js to create a 100% JavaScript based CMS. This is currently a work in progress
and does not yet support all functionalities you would expect in a CMS. User Management, Permissions, Database API and Forms are still
outstanding components. Implemented components include the Server, Virtual Paths, Themeing, File Management and Aliases. This
CMS has been inspired by Drupal and follows many of the file/folder structures developed by Drupal. That said, this is not
a Drupal clone by any means, although there are many similiarities. 

Setup
----------
Download/clone this project to your system. Use npm to install:

npm install require-dir

npm install mime

npm install handlebars

npm install mongodb

npm install mongoose

Module Creation
--------
1. To create a new module, create a new folder at /sites/all/module/{{module-name}}
2. Create a file called index.js inside the folder you just created
3. If needed, create a folder called template, and add any handlebars templates you might need


An example of the home module:

		(function() {
			'use strict';
			
			var home = {};
			
			// the initialze function gets called once when the server starts
			home.initialize = function () {
				global.cliste.core.path.addPath({
					'/home': {	// add a new virtual path
						'type': 'module', // adding a new module, versus a theme
						'module': 'home',  // the module name
						'template': 'getHTML'	// the name of the function that returns the content
					}
				});
				
				global.cliste.core.alias.addAlias({
					'/': '/home'	// add an alias for /home
				});
				
				global.cliste.core.theme.addTheme({
					'home': {
						'parent': 'page',	// parent theme, gets passed the home theme
						'view': global.cliste.core.file.getSource('module', 'home', 'template/home.handlebars'),
						'model': {	// the data model to pass to the handlebars template
							'text': 'holy mowley'
						}
					}
				});
				
			};
			
			home.getHTML = function() {
				return global.cliste.core.theme.process('home');	// use the themeing system to return the home theme
			};
			
			home.config = function () {
				return {
					'weight': 0		// set the weight, the order to execute the module
				};
			};
				
			module.exports = home;	// return the module back so we can make the functions accessible globally
			
		}());

Compatibility
-------------
1. Requires [Node.js](https://github.com/joyent/node "Node.js") 
2. Requires [Handlebars.js](https://github.com/wycats/handlebars.js/ "Handlebars.js")
3. Requires [MongoDB](http://www.mongodb.org "MongoDB")
4. Requires [Mongoose](http://mongoosejs.com/ "Mongoose")
 