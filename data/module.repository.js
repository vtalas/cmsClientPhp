/*global ApiWrapper*/
var repository = angular.module("repo", ["apiModule"]);

repository.factory("$api", ['cmsApi', '$cacheFactory', "$q", function (cmsApi, $cacheFactory, $q) {
	return new ApiWrapper(cmsApi, $cacheFactory("cmsCache"), $q);
}]);

repository.factory("loadFromCache", ['cmsApi', '$cacheFactory', "$q", function (cmsApi, $cacheFactory, $q) {
	return ":ashdvjad";
}]);


repository.factory("db", ['$api', '$cacheFactory', "$q", function ($api, $cacheFactory, $q) {

	var data = [
		[0, 1, 2],
		["a", "b", "c"]
	];

	return function (id) {
		return data[id];
	};

}]);

