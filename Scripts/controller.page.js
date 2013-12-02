var pageController = ["$scope", "$api", "$routeParams", "$gallery", "$notify", "$timeout", function ($scope, $api, $routeParams, $gallery, $notify, $timeout) {
	var source = null;

	$scope.link = $routeParams.link;
	$scope.groups = ["a", "b", "c"];

	$notify.trigger("content-loading");
	$api.getPage($scope.link)
		.then(function (data) {
//$timeout(function () {
			$scope.page = data;
			$scope.gridElements = $scope.page.GridElements || [];
			$notify.trigger("content-loaded");
			source = new GridElementsList($scope.page.GridElements);
			$gallery.loadData(data.GridElements || []);
			return data;
//},2000)
		}, function (err) {
			console.log("ERROR!!", err.status);
		})
		.then(function (data) {
			setTimeout(function () {
				$api.checkForSnapshot($scope, data);
			}, 3000);
		});

	$scope.filter = function (value) {
		if (value === undefined) {
			$scope.filterValue = null;
			$scope.gridElements = source.data;
			return;
		}
		$scope.filterValue = value;
		$scope.gridElements = source.filter("group", value);
	};

	$scope.isSelectedFilter = function (value) {
		return $scope.filterValue === value ? "selected" : null;
	};

}];

