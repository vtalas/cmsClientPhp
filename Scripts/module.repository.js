var module = angular.module("repository", []);

module.factory('cache', ['$cacheFactory', function ($cacheFactory) {
	return $cacheFactory("cmsCache");
}]);
