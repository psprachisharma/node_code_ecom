
var Client = require('node-rest-client').Client;
var http_client = new Client();


var comp_controller = new Object();  

comp_controller.invoke = function  invoke(http_request,http_response) {
  	http_client.get(http_request.config.dataUrl, function(data, response){
		  http_response.render(http_request.config.view,data);
	  	});
}

module.exports = comp_controller;	