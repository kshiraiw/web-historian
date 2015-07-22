var path = require('path');
var archive = require('../helpers/archive-helpers');
var helper = require('./http-helpers');
var fs = require('fs');
var worker = require('../workers/htmlfetcher');

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
				// res.writeHead(404);
				// res.end("NOT FOUND");
				helper.serveAssets(res, archive.paths.siteAssets + "/loading.html", 404);
			}
		});
	}
};

var handlePost = function(req, res){
	console.log("INSIDE POST");
	var body = "";
	req.on("data", function(chunk){
		body += chunk;
	});
	req.on("end", function(){
		fs.appendFile(archive.paths.list, body.substr(4) + "\n");
		res.writeHead(302, helper.headers);
		setTimeout(worker.fetch.bind(worker), 0);
		res.end();
	});
};