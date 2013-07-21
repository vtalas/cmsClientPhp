angular.module('HashBangURLs', []).config(['$locationProvider', function($location) {
	$location.hashPrefix('!');
}]);

var module = angular.module("defaultClient", ["apiModule", "ui.keypress", "ui.event", "ui.bootstrap", "HashBangURLs"]);

module.factory('cache', ['$cacheFactory', function ($cacheFactory) {
	return $cacheFactory("cmsCache");
}]);

module.factory("test", ['cmsApi' ,'cache', function (cmsApi, cache) {
	return new ApiWrapper(cmsApi, cache);
}]);

module.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
		.when('/page/:link', {reloadOnSearch: false, controller: pageController, templateUrl: 'Templates/template.page.html', resolve: {api: "test"}})
		.when('/p/:link/:elementIndex', {reloadOnSearch: false, controller: pController, templateUrl: 'Templates/template.p.html'})
		.when('/home', {controller: homeController, templateUrl: 'Templates/template.home.html'})
		.when('/login', {controller: loginController, templateUrl: 'Templates/template.login.html'})
		.otherwise({redirectTo: '/home'});
}]);

module.directive('shortcut', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: true,
		link:    function postLink(scope, iElement, iAttrs){
			jQuery(document).on('keydown', function(e){
				scope.$apply(scope.keyPressed(e));
			});
		}
	};
});

module.directive("gridelement", ["$compile", "$templateCache", function ($compile, $templateCache) {
	return {
		scope: { grid: "=", gridelement: "=" },
		link: function (scope, iElement, tAttrs, controller) {
			scope.$watch("gridelement", function (val) {
				if (!val ) {
					return ;
				}
				var skin = scope.gridelement.Skin || "";
				var template = $templateCache.get(scope.gridelement.Type + skin+".thtml");
				var compiled = $compile(template)(scope);
				iElement.html(compiled);
			});
			scope.getGridElement = function (){
				return scope.gridelement;
			};
		}
	};
}]);

module.directive("ngcGdataAlbum", ngcGdataAlbumDirective);
module.directive("ngcLazyImage", ngcLazyImage);
module.directive("ngcSimpleDrag",  simpleDragDirective);
module.directive("ngcResponsiveImage", ngcResponsiveImage);
module.controller("appController", ["$scope", "test", "$location", "$rootScope", function ($scope, test, $location, $rootScope) {

	$scope.globalKeydown = function (event) {
		$scope.$broadcast("global-keydown", event);
	};

	$scope.$on("set-message", function(e, message) {
		$scope.message = message;
	});

	$scope.$on("page-loaded", function(e) {
		var pageContent = $("html").html();
		test.snapshot(pageContent, $location.path());
	});

	var processShowImageEvent = function () {
		var search = $location.search();
		if (search.gid && search.i !== undefined){
			$rootScope.$broadcast("galleryImageViewer-display-image", search.gid, search.i);
		}
	};

	$scope.$on("$locationChangeSuccess", function () {
		processShowImageEvent();
	});

	$scope.$watch("gridElementsTemplateLoaded", function (value) {
		if (value === true ){
			processShowImageEvent();
		}
	});


}]);


