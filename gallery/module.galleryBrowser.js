/*global Gallery, angular */
var galleryModule = angular.module("galleryBrowser", []);

galleryModule.factory("$gallery", [ function () {
	return new Gallery();
}]);
