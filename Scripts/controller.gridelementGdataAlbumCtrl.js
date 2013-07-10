var gridelementGdataAlbumCtrl =  ["$scope", "test", "$routeParams", "$location", "$rootScope", function ($scope, test, $routeParams, $location, $rootScope) {
	$scope.gdataAlbumId = getAlbumId();
	$scope.route = {
		link: $routeParams.link
	};

	function getAlbumId() {
		var x = $scope.gridelement.Content;
		return x !== null ? x.gdataAlbumId : null;
	}
	test.getAlbumPhotos($scope.gdataAlbumId)
		.then(function (data) {
			var copy = data.data.slice();
			$scope.firstPhoto = copy.splice(0, 1)[0];
			$scope.gdataAlbumPhotos = copy;
			$scope.gdataAlbumPhotosAll = data.data;
		});

	$scope.showImage = function (galleryId, imageIndex) {
		$location.search("i", imageIndex);
		$location.search("gid", galleryId);
		$rootScope.$broadcast("getAlbumPhotosSuccess", $scope.gdataAlbumPhotosAll, imageIndex);
	};

}];