function pController($scope, test, $routeParams, $location) {
	$scope.link = $routeParams.link;

	var getIndex = function () {
		var index = $routeParams.elementIndex;
		return isNaN(index) ? 0 : index;
	};

	test.getPage($scope.link).then(function (data) {
		$scope.page = data;
		$scope.currentGridElement = $scope.page.GridElements[getIndex()];
	});


	var setNewLocation = function (index) {
		var base = "/p/" + $scope.link + "/";
		$location.path(base + index);
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