var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request');
var urlParser = require('url');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback){
	//read txt file
	var data = "";
	fs.readFile(this.paths.list, function(err, bit){

		data += bit;
		data = data.split("\n");
		callback(data);
	});

};

exports.isUrlInList = function(target, callback){
	//checking if url is in txt file
	this.readListOfUrls(function(arrUrls){
		if(arrUrls.indexOf(target) === -1){
			callback(false);
		}else{
			callback(true);
		}
	});
};

exports.addUrlToList = function(url, callback){
	//adding url to txt file
	fs.appendFile(this.paths.list, url + "\n", function() {
		callback(url);
	});
};

exports.isUrlArchived = function(url, callback){
	//check if file is downloaded
	fs.exists(url, function(exist){
		callback(exist);
	});
};

exports.downloadUrls = function(array){
	var that = this;
	array.forEach(function(url){
		request(url, function(err, res, body){
			var parsedPath = urlParser.parse(url);
			console.log("PATHNAME: " + parsedPath.pathname);
			fs.writeFile(that.paths.archivedSites +"/"+ parsedPath.pathname, body);
		});
	});
};
