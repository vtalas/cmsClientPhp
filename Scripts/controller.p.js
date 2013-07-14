var pController =  [ "$scope", "test", "$routeParams", "$location", function($scope, test, $routeParams, $location) {
	$scope.link = $routeParams.link;

	var getIndex = function () {
		var search = $location.search().elindex,
			elemIndex = $routeParams.elementIndex,
			index;

		index = !isNaN(elemIndex) ? elemIndex : 0;

		if (!isNaN(search)) {
			index = search;
		}

		return index;
	};

	test.getPage($scope.link)
		.then(function (response) {
			$scope.page = response.data;
			$scope.currentGridElement = $scope.page.GridElements[getIndex()];
			return response;

		}).then(function (data) {
			test.checkForSnapshot($scope, data);
		});

	var setNewLocation = function (index) {
		$location.search("elindex", index);
		$scope.currentGridElement = $scope.page.GridElements[index];
	};


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