var module = angular.module("defaultClient", ["apiModule"]);

module.factory('cache', ['$cacheFactory', function ($cacheFactory) {
	return $cacheFactory("masparti");
}]);

module.config(['$routeProvider', '$provide', function ($routeProvider) {
	$routeProvider
		.when('/page/:link', {controller: pageController, templateUrl: 'template.page.html'})
		.when('/home', {controller: homeController, templateUrl: 'template.home.html'})
		.when('/login', {controller: loginController, templateUrl: 'template.login.html'})
		.otherwise({redirectTo: '/home'});
}]);

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




