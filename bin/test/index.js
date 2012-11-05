#! /usr/bin/env node

var assert = require('assert'),
	requireDir = require('require-dir');

core = requireDir('../../core', {recurse: true});
modules = requireDir('../../sites/all/module', {recurse: true});
themes = requireDir('../../sites/all/theme', {recurse: true});

Object.keys(core).forEach(function(name) {
	    
	core[name] = core[name].index;
    
    if (typeof(core[name].tests) !== 'undefined') {
    	
    	Object.keys(core[name].tests).forEach(function(assertion) {
    		
    		core[name].tests[assertion](assert);
    		
    	});
    	
    }
    
});

Object.keys(modules).forEach(function(name) {
    
    modules[name] = modules[name].index;
    
    if (typeof(modules[name].tests) !== 'undefined') {
    	
    	Object.keys(modules[name].tests).forEach(function(assertion) {
    		
    		modules[name].tests[assertion](assert);
    		
    	});
    	
    }
    
});

Object.keys(themes).forEach(function(name) {
    
    themes[name] = themes[name].index;
    
    if (typeof(themes[name].tests) !== 'undefined') {
    	
    	Object.keys(themes[name].tests).forEach(function(assertion) {
    		
    		themes[name].tests[assertion](assert);
    		
    	});
    	
    }
});