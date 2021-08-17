
var express = require('express');
var router = express.Router();
var Client = require('node-rest-client').Client;


client = new Client();
 
router.get('/', function(http_request, http_response, next) {
  client.get("http://localhost/data/notes.json", function(data, response){
	  http_response.render("notepad",data);
  } );
});

module.exports = router;
