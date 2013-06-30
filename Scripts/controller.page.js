function pageController($scope, test, $routeParams) {
	$scope.link = $routeParams.link;

	test.getPage($scope.link).then(function (data) {
		$scope.page = data;
	});
}