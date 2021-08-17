var express = require('express');
var router = express.Router();
var path = require('path');
var Constants = require("../Constants");

var Client = require('node-rest-client').Client;
client = new Client();
var path = require('path');

var def_controller = require (path.join(__dirname, "../controllers/default_rest_controller"));

client.get(Constants.config_url, function(config_data,config_response){
	  configureRoutes(config_data.config);	
});

// process the configurations. Do the following:
// 1. Set up a route for the url in the router.
function configureRoutes(configs) {
	configs.map(function (config){
		router.all(config.url,
				function (req,res,next){ 
					req.config = config;
					if (config.secure)
							return router.security.checkAndRedirect(req,res,next);
					return next();
				}, 
				renderView);
	});
}

function renderView(http_request,http_response,next){
	  try{
		  controller = require(path.join(__dirname, '../controllers/' + http_request.config.controller));
	  }catch(err) { 
		  controller = def_controller;
	  }
	  controller.invoke(http_request,http_response);
}

module.exports = router;
