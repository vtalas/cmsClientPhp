function gridelementGdataAlbumCtrl($scope, cmsApi, $routeParams) {
	var api = new ApiWrapper(cmsApi);


	$scope.gdataAlbumId = getAlbumId();
	$scope.gdataAlbum = getAlbumId();

	function getAlbumId() {
		var x = JSON.parse($scope.gridelement.Content);
		return x !== null ? x.gdataAlbumId : null;
	}

	api.getAlbum($scope.gdataAlbumId).then(function (data) {
		$scope.gdataAlbum = data;
		console.log($scope.gdataAlbumId, data)
	});

//	console.log($scope.gridelement.Content, $scope.gdataAlbumId);
	$scope.link = $routeParams.link;

//	api.getPage($scope.link).then(function (data) {
//		$scope.page = data;
//		console.log(data)
//	});


}