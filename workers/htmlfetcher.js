// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var request = require('request');
var archive = require('../helpers/archive-helpers');
var crontab = require('node-crontab');


var jobId = crontab.scheduleJob("* * * * *", function(){ //This will call this function every 2 minutes 
    exports.fetch();
    // console.log(">>>>>>>>>>>>>>>>>>>>>JOB IS RUNNING<<<<<<<<<<<<<<<<<<<<<");
});

exports.fetch = function() {
	var array = [];
	// console.log("i get into fetch!!!")
	archive.readListOfUrls(function(urls){
		urls.forEach(function(url){
			// console.log(archive.paths.archivedSites + '/' + url)
			archive.isUrlArchived(archive.paths.archivedSites + '/' + url, function(isPresent){
				if(!isPresent){
					archive.downloadUrls([url]);
				}
			});
		});

	});
}              