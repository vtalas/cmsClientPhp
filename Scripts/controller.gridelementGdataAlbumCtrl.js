function gridelementGdataAlbumCtrl($scope, cmsApi, $routeParams) {
	var api = new ApiWrapper(cmsApi);


	$scope.gdataAlbumId = getAlbumId();
	$scope.gdataAlbumPhotos = getAlbumId();

	function getAlbumId() {
		var x = JSON.parse($scope.gridelement.Content);
		return x !== null ? x.gdataAlbumId : null;
	}

	api.getAlbumPhotos($scope.gdataAlbumId).then(function (data) {
		$scope.firstPhoto = data.splice(0, 1)[0];
		console.log($scope.firstPhoto)
		$scope.gdataAlbumPhotos = data;

		console.log($scope.gdataAlbumId, data)
	});



}