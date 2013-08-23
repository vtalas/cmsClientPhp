var homeController = ["$scope", "test", function ($scope, test) {

	$scope.homeData = [];
	$scope.nextWorkData = [];
	$scope.pageLink = "galerie";
	$scope.loadedData = false;
	$scope.loadedImages = false;

	$scope.tempLength = 0;
	function getPhotos(index, gdataAlbumId) {
		return test.getAlbumPhotos(gdataAlbumId)
			.then(function (photos) {

				if (index < 5) {
					$scope.homeData[index].images = photos.data[0];
				} else {
					$scope.nextWorkData[index] = photos.data[0];
				}
				$scope.tempLength ++ ;
				if ($scope.tempLength > $scope.homeData.length) {
					$scope.loadedImages = true;
				}
			})
	}
	var container = $(".page-home");
	container.hide();

	function updateContainerDimensions(container, windowWidth, windowHeight) {
		var width = container.width(),
			height = container.height(),
			ratio,
			newWidth;

		if (windowWidth > width  ){
			ratio = width / height;
			newWidth = Math.floor(ratio * windowHeight - 50);
			container.css("max-width", newWidth );
		}
	}
	$scope.$on("windowChanged", function (e, data) {
		updateContainerDimensions(container, data.width, data.height);
	});


	test.getPage($scope.pageLink)
		.then(function (data) {
			$scope.homeData = data.data.GridElements;
			setTimeout(function () {
				$scope.loadedData = true;
				$scope.$digest();
			},1000);

			updateContainerDimensions(container, $(window).width(), $(window).height());
			container.show();
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