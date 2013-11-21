var gridelementAlbumCtrl =  ["$scope", "$api", "$routeParams", "$location", "$rootScope",  function ($scope, $api, $routeParams, $location) {
	$scope.gdataAlbumId = getAlbumId();
	$scope.route = {
		link: $routeParams.link
	};

	function getAlbumId() {
		var x = $scope.gridelement.Content;
		return x !== null ? x.gdataAlbumId : null;
	}

	var resources = $scope.gridelement.resources || {};
	function getResource(key){
		return resources[key] || "";
	}

	$scope.name = getResource("name");
	$scope.type = getResource("type");
	$scope.services = getResource("services");
	$scope.year = getResource("year");
	$scope.text = getResource("text");
	$scope.y = 320;
	$api.getAlbum($scope.gdataAlbumId, {size:320, isSquare: false, type: 1})
		.then(function (data) {
			if (data) {
				$scope.album = data.data;
			}
		});



	$scope.testxxx = function (value) {
		console.log(value);
		$location.search("detail", value );
	};

	$scope.showImage = function (galleryId, imageIndex) {
		$location.search("i", imageIndex);
		$location.search("gid", galleryId);
	};

}];