function pageController($scope, cmsApi, $routeParams) {
	var api = new ApiWrapper(cmsApi);

	$scope.link = $routeParams.link;

	api.getPage($scope.link).then(function (data) {
		$scope.page = data;
	});

	$scope.$on("set-message", function(e, message) {
	    $scope.message = message;
	});
}