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
	console.log(req.url)
	if(req.url === "/"){
	  	helper.serveAssets(res, archive.paths.siteAssets + "/index.html");
	} else if(req.url === "/styles.css") {
		helper.serveAssets(res, archive.paths.siteAssets + "/styles.css");
	}else{
		console.log("This LINE!!"+archive.paths.archivedSites + req.url)
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
	if(req.url !== "/"){return;}
	console.log("INSIDE POST");
	var body = "";
	req.on("data", function(chunk){
		body += chunk;
	});
	req.on("end", function(){
		archive.isUrlInList(body.substr(4), function(exist){
			if(exist){
				archive.isUrlArchived(archive.paths.archivedSites + '/' + body.substr(4), function(isPresent) {
					if (isPresent) {
						// helper.serveAssets(res, archive.paths.archivedSites + "/"+ body.substr(4));	
						
						res.writeHead(302, {'Location':  "/" + body.substr(4)});
						console.log('this page is present!!!')
						res.end();
					} else {
						helper.serveAssets(res, archive.paths.siteAssets + "/loading.html", 404);
					}
				})
				
			}else{
				archive.addUrlToList(body.substr(4), function() {
					console.log("Yay!! Added!!!")
				});
				setTimeout(worker.fetch.bind(worker), 0);
				helper.serveAssets(res, archive.paths.siteAssets + "/loading.html", 302);
			}
		});
	});
};