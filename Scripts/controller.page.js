var pageController = ["$scope", "test", "$routeParams", function ($scope, test, $routeParams) {
	$scope.link = $routeParams.link;

	test.getPage($scope.link)
		.then(function (data) {
			$scope.page = data.data;
			console.log($scope.page.GridElements);
			var a = new GridElementsList(data.data.GridElements);
			console.log(JSON.stringify(a.data));
			return data;
		})
		.then(function (data) {
			setTimeout(function () {
				test.checkForSnapshot($scope, data);
			}, 3000)
		});
}];

