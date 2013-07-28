var homeController = ["$scope", "test", function ($scope, test) {

	$scope.homeImages = [];
	$scope.homeData = [];
	$scope.pageLink = "galerie";
	$scope.loadedData = false;
	$scope.loadedImages = false;

	$scope.tempLength = 0;
	function getPhotos(index, gdataAlbumId) {
		return test.getAlbumPhotos(gdataAlbumId)
			.then(function (photos) {
				$scope.homeData[index].images = photos.data[0];
				$scope.tempLength ++ ;
				if ($scope.tempLength > $scope.homeData.length) {
					$scope.loadedImages = true;
				}
			})
	}

	test.getPage($scope.pageLink)
		.then(function (data) {
			$scope.homeData = data.data.GridElements;
			setTimeout(function () {
				$scope.loadedData = true;
				$scope.$digest();
			},1000);
			return data.data;
		})
		.then(function (data) {
			var x = [];
			for (var i = 0; i < data.GridElements.length; i++) {
				var content = data.GridElements[i].Content;
				x.push(getPhotos(i, content.gdataAlbumId));
			}
		});
}];