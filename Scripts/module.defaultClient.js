angular.module('HashBangURLs', []).config(['$locationProvider', function($location) {
	$location.hashPrefix('!');
}]);

var module = angular.module("defaultClient", ["apiModule", "ui.keypress", "ui.event", "ui.bootstrap", "HashBangURLs"]);

module.factory('cache', ['$cacheFactory', function ($cacheFactory) {
	return $cacheFactory("cmsCache");
}]);

module.factory("test", ['cmsApi' ,'cache', "$q", function (cmsApi, cache, $q) {
	return new ApiWrapper(cmsApi, cache, $q);
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

module.directive("gridelement", ["$compile", "$templateCache", "$timeout", function ($compile, $templateCache, $timeout) {
	var timeout;
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

				if (timeout) {
					$timeout.cancel(timeout);
				}
				timeout = $timeout(function () {
					scope.$emit("page-loaded");
				}, 500);

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
module.controller("appController", ["$scope", "test", "$location", "$rootScope", "$timeout", function ($scope, test, $location, $rootScope, $timeout) {
	$scope.galleryImageViewerLoaded = false;
	$scope.gridElementsTemplateLoaded = false;
	var timeout;

	$(window).resize(function () {
		if (timeout) {
			$timeout.cancel(timeout);
		}
		timeout = $timeout(function () {
			$scope.$broadcast("windowChanged", {
				width : $(window).width(),
				height: $(window).height()
			})
		}, 200);
	});

	$scope.isLoaded = function () {
		$scope.resourcesLoaded = $scope.galleryImageViewerLoaded && $scope.gridElementsTemplateLoaded;
	};

	$scope.globalKeydown = function (event) {
		$scope.$broadcast("global-keydown", event);
	};

	$scope.$on("set-message", function(e, message) {
		$scope.message = message;
	});

	$scope.$on("page-loaded", function() {
		var pageContent = $("html").html();
		test.snapshot(pageContent, $location.path());
	});

	var processShowImageEvent = function () {
		var search = $location.search();
		if (search.gid && search.i !== undefined) {
			$rootScope.$broadcast("galleryImageViewer-display-image", search.gid, search.i);
		}
	};

	$scope.$on("$locationChangeSuccess", function () {
		if ($scope.resourcesLoaded){
			processShowImageEvent();
		}
	});

	$scope.$watch("resourcesLoaded", function (value) {
		if (value){
			processShowImageEvent();
		}
	});



	$scope.$watch("gridElementsTemplateLoaded", function () {
		$scope.isLoaded();
	});

	$scope.$watch("galleryImageViewerLoaded", function () {
		$scope.isLoaded();
	});


}]);


