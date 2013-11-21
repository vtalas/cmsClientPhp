var pageController = ["$scope", "$api", "$routeParams","$location", "$gallery", function ($scope, $api, $routeParams,$location, $gallery) {
	var source = null;

	$scope.link = $routeParams.link;
	$scope.groups = ["a", "b", "c"];

	setTimeout(function () {
		$gallery.loadData(["xx","aaa", "sss"]);
		console.log("loading");
		$scope.$digest();
	},1000);

	$api.getPage($scope.link)
		.then(function (data) {
			$scope.page = data;
			$scope.gridElements = $scope.page.GridElements || [];
			source = new GridElementsList($scope.page.GridElements);
			setLocation($location.search().detail);
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
		if (value === undefined) {
			$scope.filterValue = null;
			$scope.gridElements = source.data;
			return ;
		}
		$scope.filterValue = value;
		$scope.gridElements = source.filter("group", value);
	};

	$scope.isSelectedFilter = function (value) {
		return $scope.filterValue === value ? "selected" : null;
	};

	var setLocation = function (id) {
		$scope.$emit("overlay", {source : source, active : source.findById(id)});
	};


//	//$scope.x = $location.search().detail;
//	$scope.$on("$locationChangeSuccess", function () {
//		setLocation($location.search().detail);
//	});


}];

