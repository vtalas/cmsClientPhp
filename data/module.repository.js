/*global ApiWrapper*/
var repository = angular.module("repo", ["apiModule"]);

repository.factory("$api", ['cmsApi', '$cacheFactory', "$q", function (cmsApi, $cacheFactory, $q) {
	return new ApiWrapper(cmsApi, $cacheFactory("cmsCache"), $q);
}]);

repository.factory("loadFromCache", ['cmsApi', '$cacheFactory', "$q", function (cmsApi, $cacheFactory, $q) {
	return ":ashdvjad";
}]);


repository.factory("loadGridList", ['$api', '$cacheFactory', "$q", function ($api, $cacheFactory, $q) {
	return $api.getJsonData();
}]);

