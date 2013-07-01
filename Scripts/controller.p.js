function pController($scope, test, $routeParams, $location) {
	$scope.link = $routeParams.link;

	var getIndex = function () {
		var search = $location.search().g,
			elemIndex = $routeParams.elementIndex,
			index;
			
		index = !isNaN(elemIndex) ? elemIndex : 0;

		console.log(isNaN(search), search)
		if (!isNaN(search)) {
			console.log("kasbdjkas", search)
			index = search;
		}

		return index;
	};

	test.getPage($scope.link).then(function (data) {
		$scope.page = data;
		$scope.currentGridElement = $scope.page.GridElements[getIndex()];
	});

	var setNewLocation = function (index) {
		$location.search("g", index);
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
}