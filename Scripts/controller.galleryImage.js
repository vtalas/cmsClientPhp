/*global MaspartiData, ApiWrapper*/
function galleryImageViewerController($scope, $routeParams, test, $location) {

	$scope.$on("getAlbumPhotosSuccess", function (e, data, index) {
		$scope.gallery = data;
		getImage(index);
	});

	$scope.$on("global-keydown", function (e, $event) {
		if (!visible()) {
			return;
		}
		var key = $event.keyCode;
		switch (key) {
			case 27 :
				$scope.close();
				break;
			case 37 :
				$scope.prev();
				break;
			case 32 :
			case 39 :
				$scope.next();
				break;
		}
	});

	$scope.$on("$locationChangeSuccess", function () {
		var index = getImageIndex();
		if (typeof index === "undefined") {
			$scope.gallery = null;
		}
	});

	$scope.$on("ngc-responsive-image-loading", function (e, data) {
		$scope.loading = data;
		if ($scope.$$phase !== "$digest"){
			$scope.$digest();
		}
	});
	$scope.$on("ngc-responsive-image-skipping", function (e, data) {
		$scope.skipping = data;
		if ($scope.$$phase !== "$digest"){
			$scope.$digest();
		}
	});


	handleUrlParams();

	function visible() {
		return $scope.gallery !== null && $scope.gallery !== undefined;
	}

	function getImageIndex() {
		return $routeParams.i;
	}

	function getGalleryId() {
		return $routeParams.g;
	}

	function getImage(index) {

		if (!$scope.gallery) {
			$scope.newindex = index;
			test.getAlbumPhotos(getGalleryId()).then(function (data) {
				$scope.gallery = data;
				$scope.image = $scope.gallery[index];
			});
			return;
		}
		$scope.image = $scope.gallery[index];
	}

	function handleUrlParams() {
		var galleryId = getGalleryId(),
			index = getImageIndex();

		if (typeof index !== "undefined" && typeof galleryId !== "undefined") {
			getImage(index);
		}
	}

	$scope.close = function () {
		location.hash = $location.path();
	};

	$scope.next = function () {
		var length = $scope.gallery.length,
			imageIndex = getImageIndex();

		imageIndex++;
		if (imageIndex >= length) {
			imageIndex = 0;
		}

		getImage(imageIndex);
		$location.search("i", imageIndex);
	};

	$scope.prev = function () {
		var length = $scope.gallery.length,
			imageIndex = getImageIndex();

		imageIndex--;
		if (imageIndex <= 0) {
			imageIndex = length - 1;
		}
		getImage(imageIndex);
		$location.search("i", imageIndex);
	};


}





