

var do_nothing = new Object();  

do_nothing.invoke = function  invoke(http_request,http_response) {
	http_response.render(http_request.config.view,null);
}
module.exports = do_nothing;	
