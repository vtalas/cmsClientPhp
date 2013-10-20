var gridelementGdataAlbumCtrl =  ["$scope", "$api", "$routeParams", "$location", "$rootScope", function ($scope, $api, $routeParams, $location) {
	$scope.gdataAlbumId = getAlbumId();
	$scope.route = {
		link: $routeParams.link
	};

	function getAlbumId() {
		var x = $scope.gridelement.Content;
		return x !== null ? x.gdataAlbumId : null;
	}

	$api.getAlbumPhotos($scope.gdataAlbumId)
		.then(function (data) {
			var copy = data.data.slice();
			$scope.firstPhoto = copy.splice(0, 1)[0];
			$scope.gdataAlbumPhotos = copy;
			$scope.gdataAlbumPhotosAll = data.data;
		});

	$scope.showImage = function (galleryId, imageIndex) {
		$location.search("i", imageIndex);
		$location.search("gid", galleryId);
	};

}];