var homeController = ["$scope", "test", function ($scope, test) {

	$scope.homeImages = [];
	$scope.pageLink = "galerie";

	test.getPage($scope.pageLink )
		.then(function (data) {
			return data.data
		})
		.then(function (data) {
			for (var i = 0; i < data.GridElements.length; i++) {
				var content = data.GridElements[i].Content;
				test.getAlbumPhotos(content.gdataAlbumId)
					.then(function (xx) {
						$scope.homeImages.push(xx.data[0]);
					})
			}
		});
}];