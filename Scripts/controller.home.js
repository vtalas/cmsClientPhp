var homeController = ["$scope", "test", function($scope, test) {

	test.getPages()
		.then(function (data) {
			$scope.pages = data.data;
		});

	$scope.homeImagesBegin = [1, 2, 3, 4, 6, 1];
	$scope.homeImagesEnd = [1, 2, 3, 3];

	test.getPhotos()
		.then(function (data) {
			$scope.homeImagesBegin = data.data.slice(0, 6);
			$scope.homeImagesEnd = data.data.slice(7, 11);
			return data;
		})
		.then(function (data) {
			test.checkForSnapshot($scope, data);
		});

}]