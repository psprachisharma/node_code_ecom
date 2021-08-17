
var Client = require('node-rest-client').Client;
var http_client = new Client();


var def_controller = new Object();  

def_controller.invoke = function  invoke(http_request,http_response, config) {
	//set content-type header and data as json in args parameter 
	var args = {
		"header": { "sessionId": http_request.cookies.JSESSIONID },
		"payload": { 
				"prodId": http_request.params.prodId,
				"prodType": http_request.params.prodType,
			}
	};
	 
	http_client.post(config.dataUrl, args, function (data, response) {
		http_response.render(config.view,data);
	});
}

module.exports = def_controller;	