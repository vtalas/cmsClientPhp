var pController =  [ "$scope", "test", "$routeParams", "$location", "$rootScope", function($scope, test, $routeParams, $location, $rootScope) {
	$scope.link = $routeParams.link;

	$scope.$on("$locationChangeSuccess", function () {
		setNewLocation(getIndex());
	});


	var getIndex = function () {
		var search = $location.search().elindex,
			elemIndex = $routeParams.elementIndex,
			index;

		index = !isNaN(elemIndex) ? elemIndex : 0;

		if (!isNaN(search)) {
			index = search;
		}

		return Number(index, 10);
	};

	var setBoundaries = function (index) {
		var length = $scope.page.GridElements.length;
		$scope.isFirst = index === 0;
		$scope.isLast = index === length - 1;
	};
	
	var setNewLocation = function (index) {
		$location.search("elindex", index);
		$scope.currentGridElement = $scope.page.GridElements[index];
		setBoundaries(index);
	};

	test.getPage($scope.link)
		.then(function (response) {
			var index = getIndex();
			$scope.page = response.data;
			setBoundaries(index);
			$scope.currentGridElement = $scope.page.GridElements[index];
			return response;

		}).then(function (data) {
			test.checkForSnapshot($scope, data);
		});


	$scope.next = function () {
		var galleryIndex = getIndex(),
			length = $scope.page.GridElements.length;

		galleryIndex++;
		if (galleryIndex > length - 1) {
			return;
		}
		setNewLocation(galleryIndex);
	};

	$scope.prev = function () {
		var galleryIndex = getIndex();

		if (galleryIndex <= 0) {
			return;
		}
		galleryIndex--;
		setNewLocation(galleryIndex);
	};
}];