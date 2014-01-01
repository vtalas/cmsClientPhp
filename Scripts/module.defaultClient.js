angular.module('HashBangURLs', []).config(['$locationProvider', function ($location) {
	$location.hashPrefix('!');
}]);

var module = angular.module("defaultClient", [
	"ngRoute",
	"galleryBrowser",
	"repo",
	"ui.keypress",
	"ui.event",
	"ui.bootstrap",
	"HashBangURLs",
	"stringutils",
	"ngAnimate"
]);

module.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
		.when('/page/:link', {reloadOnSearch: false, controller: pageController, templateUrl: 'Templates/template.page.html', resolve: {api: "$api"}})
		.when('/p/:link', {reloadOnSearch: false, controller: pController, templateUrl: 'Templates/template.p.html'})
		.otherwise({redirectTo: '/page/projekty'});
}]);

module.directive('shortcut', function () {
	return {
		restrict: 'E',
		replace: true,
		scope: true,
		link: function (scope) {
			jQuery(document).on('keydown', function (e) {
				scope.$apply(scope.keyPressed(e));
			});
		}
	};
});

module.directive("gridelement", ["$compile", "$templateCache", "$timeout", function ($compile, $templateCache, $timeout) {
	var timeout;
	return {
		scope: { grid: "=", gridelement: "="},
		link: function (scope, iElement, tAttrs, controller) {
			scope.$watch("gridelement", function (val) {
				if (!val) {
					return;
				}
				var skin = scope.gridelement.Skin || tAttrs.skin || null,
					skinStr = skin ? "_" + skin : "";
				var template = $templateCache.get(scope.gridelement.Type + skinStr + ".thtml");
				var compiled = $compile(template)(scope);

				if (timeout) {
					$timeout.cancel(timeout);
				}
				timeout = $timeout(function () {
					scope.$emit("page-loaded");
				}, 500);

				iElement.html(compiled);
			});
			scope.getGridElement = function () {
				return scope.gridelement;
			};
		}
	};
}]);

module.directive("ngcOverlay", ngcOverlay);
module.directive("ngcGdataAlbum", ngcGdataAlbumDirective);
module.directive("ngcLazyImage", ngcLazyImage);
module.directive("ngcSimpleDrag", simpleDragDirective);
module.directive("ngcResponsiveImage", ngcResponsiveImage);

module.controller("appController", ["$scope", "$api", "$location", "$rootScope", "$timeout", "$routeParams", "$notify", "$animate",
	function ($scope, $api, $location, $rootScope, $timeout, $routeParams, $notify, $animate) {
		$scope.showContent = false;
		$(".centered-container")
			.css("height", $(window).height())
			.css("width", $(window).width());

		var timeout;


		$(window).resize(function () {
			if (timeout) {
				$timeout.cancel(timeout);
			}
			timeout = $timeout(function () {
				$scope.$broadcast("windowChanged", {
					width: $(window).width(),
					height: $(window).height()
				})
			}, 200);
		});

		var loaderTimeout;
		$notify.addEventListener("content-loading", function () {
			loaderTimeout = setTimeout(function () {
				$scope.$apply(function () {
					$scope.showLoader = true;
				});
			}, 500);
		});



		$notify.addEventListener("content-loaded", function () {
			clearTimeout(loaderTimeout);
			$scope.showLoader = false;
			$scope.showContent = true;
		});

		$scope.globalKeydown = function (event) {
			$scope.$broadcast("global-keydown", event);
		};

		$scope.$on("set-message", function (e, message) {
			$scope.message = message;
		});

		$scope.$on("page-loaded", function () {
			var pageContent = $("html").html();
			$api.snapshot(pageContent, $location.path());
		});

		var processShowImageEvent = function () {
			var search = $location.search();
			if (search.gid && search.i !== undefined) {
				$rootScope.$broadcast("galleryImageViewer-display-image", search.gid, search.i);
			}
		};

		$scope.$watch("resourcesLoaded", function (value) {
			if (value) {
				processShowImageEvent();
			}
		});

		$scope.isSelectedLink = function (value) {
			return $routeParams.link === value ? "selected" : null;
		};
	}]);


