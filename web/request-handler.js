var path = require('path');
var archive = require('../helpers/archive-helpers');
var helper = require('./http-helpers');
var fs = require('fs');

// require more modules/folders here!

exports.handleRequest = function (req, res) {
	// console.log("LOOK HERE" + archive.isUrlArchived(archive.paths.archivedSites + req.url))
	// console.log(archive.isUrlArchived("hello"));
	if(req.method === "GET"){
		handleGet(req, res);
	}else if(req.method === "POST"){
		handlePost(req, res);
	}else {

	}
};

var handleGet = function(req, res) {
	if(req.url === "/"){
	  	helper.serveAssets(res, archive.paths.siteAssets + "/index.html");
	} else  {
		archive.isUrlArchived(archive.paths.archivedSites + req.url, function(exist) {
			if (exist) {
				helper.serveAssets(res, archive.paths.archivedSites + req.url);	
			}else{
				res.writeHead(404);
				res.end("NOT FOUND");
			}
		});
	}
};

var handlePost = function(req, res){
	var body = "";
	req.on("data", function(chunk){
		body += chunk;
	});
	req.on("end", function(){
		fs.appendFile(archive.paths.list, JSON.parse(body).url + "\n");
		res.writeHead(302, helper.headers);
		res.end();
	});
};