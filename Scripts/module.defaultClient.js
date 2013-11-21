angular.module('HashBangURLs', []).config(['$locationProvider', function ($location) {
	$location.hashPrefix('!');
}]);

var module = angular.module("defaultClient", ["ngRoute", "galleryBrowser", "repo", "ui.keypress", "ui.event", "ui.bootstrap", "HashBangURLs"]);

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
		scope: { grid: "=", gridelement: "=" },
		link: function (scope, iElement, tAttrs, controller) {
			scope.$watch("gridelement", function (val) {
				if (!val) {
					return;
				}
				var skin = scope.gridelement.Skin || "";
				var template = $templateCache.get(scope.gridelement.Type + skin + ".thtml");
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

module.controller("abc", ["$scope", "$api", "$location", "$rootScope", "$timeout", "$routeParams", "$gallery", function ($scope, $api, $location, $rootScope, $timeout, $routeParams, $gallery) {
	$scope.uch = $gallery.currentIndex;
	$scope.$watch("uch", function (value, oldvalue) {
		console.log("-------value changed", value, oldvalue);
	});

	setTimeout(function () {
	//	$gallery.loadData(["xxx"]);
		console.log($scope.uch, $gallery.currentIndex);
		$scope.$apply();
	}, 2000);

	$scope.x = $location.search().detail;
	$scope.$on("$locationChangeSuccess", function () {
		var index = $location.search().detail;
//		setLocation($location.search().detail);
	});

	var source = $scope.xxx;

	var visible = function () {
		return true;
	};

	$scope.$watch("xxx", function (val) {
		if (val) {
			$scope.overlaygallery = val.active;
		}
	});

	$scope.close = function () {
		$location.search("detail", null);
	};

	$scope.prev = function () {
		$scope.currentItem = $gallery.prev()
		console.log("prev", $scope.currentItem);
	};

	$scope.next = function () {
		$scope.currentItem = $gallery.next();
		console.log("prev", $scope.currentItem);
	};

	$scope.$on("global-keydown", function (e, $event) {
		if (!visible()) {
			return;
		}
		var key = $event.keyCode;
		switch (key) {
		case 27:
			$scope.close();
			break;
		case 37:
			$scope.prev();
			break;
		case 32:
		case 39:
			$scope.next();
			break;
		}
	});


}]);

module.controller("appController", ["$scope", "$api", "$location", "$rootScope", "$timeout", "$routeParams", "$gallery", function ($scope, $api, $location, $rootScope, $timeout, $routeParams, $gallery) {
	$scope.galleryImageViewerLoaded = false;
	$scope.gridElementsTemplateLoaded = false;
	$scope.hideLoader = false;

	$scope.aaa = function (val) {
		return $scope.xxx;
	};
	$api.getJsonData().then(function (data) {
		//$scope.x = data.data[0].GridElements[0];
		//console.log($scope.x);
		//console.log(data)
	});

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

	$scope.isLoaded = function () {
		$scope.resourcesLoaded = $scope.galleryImageViewerLoaded && $scope.gridElementsTemplateLoaded;
	};

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

	$scope.$on("data-loaded", function () {
		$scope.hideLoader = true;
	});

	var processShowImageEvent = function () {
		var search = $location.search();
		if (search.gid && search.i !== undefined) {
			$rootScope.$broadcast("galleryImageViewer-display-image", search.gid, search.i);
		}
	};

//	$scope.$on("$locationChangeSuccess", function () {
//		if ($scope.resourcesLoaded){
//			processShowImageEvent();
//		}
//	});

	$scope.$on("overlay", function (x, data) {
		$scope.xxx = data;
	});

	$scope.$watch("resourcesLoaded", function (value) {
		if (value) {
			processShowImageEvent();
		}
	});

	$scope.$watch("gridElementsTemplateLoaded", function () {
		$scope.isLoaded();
	});

	$scope.$watch("galleryImageViewerLoaded", function () {
		$scope.isLoaded();
	});

	$scope.isSelectedLink = function (value) {
		return $routeParams.link === value ? "selected" : null;
	};
}]);


