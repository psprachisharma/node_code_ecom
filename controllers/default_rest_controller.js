var Constants = require("../Constants");

var Client = require('node-rest-client').Client;
var http_client = new Client();
var template = require('es6-template-strings');

var def_controller = new Object();  

def_controller.invoke = function  invoke(http_request,http_response) {



	// treat the dataUrl as if it is an es6 template string and substitute from request which also has constants in it.
	http_request.Constants = Constants;
	if (http_request.config.dataUrl)
		http_request.modifiedDataUrl = template(http_request.config.dataUrl,http_request);
	
	if (!http_request.config.reqTemplateUrl){
		http_response.render(http_request.config.view,null);
		return;
	}
	http_request.modifiedReqTemplateUrl = template(http_request.config.reqTemplateUrl, http_request);
	// get the request template
	http_client.get(http_request.modifiedReqTemplateUrl, function (reqTemplate, response){
		// treat the obtained request template as an ES6 template string.
		var dataRequest = template(reqTemplate,http_request);
		invokeEngine(dataRequest,http_request,http_response);
	});	

}

function invokeEngine(dataRequest,http_request,http_response){
// set content-type header and data as json in args parameter
        http_client.post(http_request.modifiedDataUrl,JSON.parse(dataRequest), function(data, response){
                data.Constants = Constants;
                data.req = http_request;
              http_response.render(http_request.config.view,data);
              });
}

module.exports = def_controller;	
