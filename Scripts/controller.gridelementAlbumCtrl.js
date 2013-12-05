var gridelementAlbumCtrl = ["$scope", "$api", "$routeParams", "$location", "$notify", "$gallery", function ($scope, $api, $routeParams, $location, $notify, $gallery) {
	$scope.gdataAlbumId = getAlbumId();
	$scope.route = {
		link: $routeParams.link
	};

	function getAlbumId() {
		var x = $scope.gridelement.Content;
		return x !== null ? x.gdataAlbumId : null;
	}

	var resources = $scope.gridelement.resources || {};

	function getResource(key, defaultValue) {
		return resources[key] || defaultValue || "";
	}

	$scope.name = getResource("name", " ");
	$scope.type = getResource("type");
	$scope.services = getResource("services");
	$scope.year = getResource("year");
	$scope.text = getResource("text");
	$scope.y = 320;
	$scope.cssRatio = "ratio1_1";


	$api.getAlbum($scope.gdataAlbumId, {size: 320, isSquare: false, type: 1})
		.then(function (data) {
			if (data) {
				$scope.album = data.data;
			}
		});

	$scope.imageClick = function () {
		$gallery.showBy(function (obj) {
			var value = obj.resources.name || null;
			return value === $scope.name;
		});
	};
}];

var gridelementAlbumOverlayCtrl = ["$scope", "$api", "$routeParams", "$location", "$notify", "$gallery", "$markdown", function ($scope, $api, $routeParams, $location, $notify, $gallery, $markdown) {
	$scope.gdataAlbumId = getAlbumId();
	$scope.route = {
		link: $routeParams.link
	};

	function getAlbumId() {
		var x = $scope.gridelement.Content;
		return x !== null ? x.gdataAlbumId : null;
	}

	var resources = $scope.gridelement.resources || {},
		currentImageIndex;

	function getResource(key) {
		return resources[key] || "";
	}

	$scope.name = getResource("name");
	$scope.type = getResource("type");
	$scope.services = getResource("services");
	$scope.year = getResource("year");
	$scope.text = $markdown.toHtml(getResource("text"));

	$scope.toHtml = function (value) {
		return $markdown.toHtml(value);
	};

	$api.getAlbumPhotos($scope.gdataAlbumId)
		.then(function (data) {
			if (data) {
				$scope.albumPhotos = data.data;
				$scope.currentImage = $scope.albumPhotos[0];
				$scope.currentImageIndex = 0;
			}
		});

	$scope.showImagePreview = function (index) {
		$scope.currentImage = $scope.albumPhotos[index];
		$scope.currentImageIndex = index;
	};

	$scope.prevImage = function () {
		if ($scope.currentImageIndex >= 1) {
			$scope.currentImageIndex--;
			$scope.currentImage = $scope.albumPhotos[$scope.currentImageIndex];
		}
	};

	$scope.nextImage = function () {
		if ($scope.currentImageIndex < $scope.albumPhotos.length - 1 ) {
			$scope.currentImageIndex++;
			$scope.currentImage = $scope.albumPhotos[$scope.currentImageIndex];
		}
	};

	$scope.$on("global-keydown", function (e, $event) {
		var key = $event.keyCode;

		switch (key) {
			case 37:
				$scope.prevImage();
				break;
			case 39:
				$scope.nextImage();
				break;
		}
	});


}];