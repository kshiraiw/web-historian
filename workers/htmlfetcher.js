// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var request = require('request');
var archive = require('../helpers/archive-helpers');

exports.fetch = function() {
	var array = [];
	archive.readListOfUrls(function(urls){
		urls.forEach(function(url){
			archive.isUrlArchived(url, function(isPresent){
				if(!isPresent){
					array.push(url);

				}
			});
		});
	archive.downloadUrls(array);
	});
}