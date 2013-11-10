var pageController = ["$scope", "$api", "$routeParams", function ($scope, $api, $routeParams) {
	var source = null;

	$scope.link = $routeParams.link;
	$scope.groups = ["a", "b", "c"];

	$api.getPage($scope.link)
		.then(function (data) {
			$scope.page = data.data;
			$scope.gridElements = data.data.GridElements || [];
			source =  new GridElementsList(data.data.GridElements);
			return data;
		}, function (err) {
			console.log("ERROR!!", err.status);
		})
		.then(function (data) {
			setTimeout(function () {
				$api.checkForSnapshot($scope, data);
			}, 3000)
		});

	$scope.filter = function (value) {
		$scope.gridElements = source.filter("group", value);
	}
}];

