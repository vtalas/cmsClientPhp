function homeController($scope, test) {
	var api = test;

	api.getPages().then(function (data) {
   		$scope.pages = data;
	});

	$scope.homeImagesBegin = [1,2,3,4,6,1]
	$scope.homeImagesEnd = [1,2,3,3]
	api.getPhotos().then(function (data) {
		$scope.homeImagesBegin = data.slice(0, 6);
		$scope.homeImagesEnd = data.slice(7, 11);
	});
}