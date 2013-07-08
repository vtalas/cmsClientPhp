var pageController = ["$scope", "test", "$routeParams", function ($scope, test, $routeParams) {
	$scope.link = $routeParams.link;

	test.getPage($scope.link)
		.then(function (data) {
			$scope.page = data.data;
			return data;
		})
		.then(function (data) {
			setTimeout(function () {
				test.checkForSnapshot($scope, data);
			}, 3000)
		});
}];