var pageController = ["$scope", "$api", "$routeParams", function ($scope, $api, $routeParams) {
	$scope.link = $routeParams.link;

	$api.getPage($scope.link)
		.then(function (data) {
			$scope.page = data.data;
	console.log(data)
							return data;
		})
		.then(function (data) {
			setTimeout(function () {
				$api.checkForSnapshot($scope, data);
			}, 3000)
		});
}];