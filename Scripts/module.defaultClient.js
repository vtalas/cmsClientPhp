var module = angular.module("defaultClient", ["apiModule", "ui.keypress", "ui.event", "ui.bootstrap"]);

module.factory('cache', ['$cacheFactory', function ($cacheFactory) {
	return $cacheFactory("jarda");
}]);

module.factory("test", ['cmsApi' ,'cache', function (cmsApi, cache) {
	return new ApiWrapper(cmsApi, cache);
}]);

module.config(['$routeProvider', '$provide', function ($routeProvider) {
	$routeProvider
		.when('/page/:link', {reloadOnSearch: false, controller: pageController, templateUrl: 'template.page.html', resolve: {api: "test"}})
		.when('/home', {controller: homeController, templateUrl: 'template.home.html'})
		.when('/login', {controller: loginController, templateUrl: 'template.login.html'})
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


module.directive("gridelement", function ($compile, $templateCache	) {
	var directiveDefinitionObject = {
		scope: { grid: "=", gridelement: "=" },
		link: function (scope, iElement, tAttrs, controller) {
			scope.getGridElement = function (){
				return scope.gridelement;
			};

			var skin = scope.gridelement.Skin || "";
			var template = $templateCache.get(scope.gridelement.Type + skin+".thtml");
			var compiled = $compile(template)(scope);
			iElement.html(compiled);
		}
	};
	return directiveDefinitionObject;
});

module.directive("ngcGdataAlbum", ngcGdataAlbumDirective);
module.directive("ngcLazyImage", ngcLazyImage);
module.directive("ngcSimpleDrag", simpleDragDirective);
module.directive("ngcResponsiveImage", ngcResponsiveImage);
module.controller("appController", function ($scope) {

	$scope.globalKeydown = function (event) {
		$scope.$broadcast("global-keydown", event);
	};

	$scope.$on("set-message", function(e, message) {
		$scope.message = message;
	});

});


