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

	var container = $(".page-home");
	container.hide();

	function chuj(windowWidth, windowHeight) {
		var container = $(".page-home");
		var width = container.width();
		var height = container.height();
		console.log(width, height, windowHeight);

		if (windowWidth > width  ){
			var xx = width / height;
			container.css("max-width", xx * windowHeight - 120);

			console.log(xx * windowHeight, $(".page-home").height(), windowHeight);
		}
	}
	$scope.$on("windowChanged", function (e, data) {
		chuj(data.width, data.height);
	});


	test.getPage($scope.pageLink)
		.then(function (data) {
			$scope.homeData = data.data.GridElements;
			setTimeout(function () {
				$scope.loadedData = true;
				$scope.$digest();
			},1000);

			chuj($(window).width(), $(window).height());
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