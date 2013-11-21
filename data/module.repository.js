/*global ApiWrapper*/
var module = angular.module("repository", ["apiModule"]);

module.factory("$api", ['cmsApi', '$cacheFactory', "$q", function (cmsApi, cache, $cacheFactory, $q) {
	return new ApiWrapper(cmsApi, $cacheFactory("cmsCache"), $q);
}]);

