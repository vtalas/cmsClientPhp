var pageController = ["$scope", "$api", "$routeParams", "$gallery", "$notify", "$timeout", "loadGridList", function ($scope, $api, $routeParams, $gallery, $notify, $timeout, loadGridList) {
	var source = null,
		/** type GridList */
			gridList;

	$scope.link = $routeParams.link;

	loadGridList
		.then(function (data) {
			gridList = data;

	//$timeout(function () {
			$scope.page = gridList.getGridByLink($scope.link);
			$scope.gridElements = $scope.page.GridElements;
			$scope.groups = $scope.page.groups;

			$scope.layoutClass = $scope.groups ? "grid_10" : "grid_12";
			$notify.trigger("content-loaded");
			source = new GridElementsList($scope.page.GridElements);
			$gallery.loadData($scope.gridElements || []);
			return $scope.page;
//},2000)

		}, function (err) {
			console.log("ERROR!!", err.status);
		})
		.then(function (data) {
			setTimeout(function () {
				$api.checkForSnapshot($scope, data);
			}, 3000);
		});


	$notify.trigger("content-loading");

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

