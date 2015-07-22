var fs = require('fs');
var path = require('path');
var _ = require('underscore');

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

exports.readListOfUrls = function(){
	//read txt file
	var data;
	fs.readFile(paths.list, function(err, bit){
		data = JSON.parse(bit);
		console.log(data);
	});

};

exports.isUrlInList = function(){
	//checking if url is in txt file
};

exports.addUrlToList = function(){
	//adding url to txt file
};

exports.isUrlArchived = function(url, callback){
	//check if file is downloaded
	fs.exists(url, function(exist){
		callback(exist);
	});
};

exports.downloadUrls = function(){
	var fd = fs.openSync(fixturePath, "w");
	fs.writeSync(fd, "google");
	fs.closeSync(fd);
	// Write data to the file.
	fs.writeFileSync(fixturePath, "google");
};
