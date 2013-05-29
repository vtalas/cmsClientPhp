function userDataForm($scope, cmsApi, $routeParams) {

	$scope.link = $routeParams.link;


	$scope.post = function(){
		cmsApi.putUserData( {data:$scope.data, key:$scope.key}, function(data) {
			console.log(data);
		})
	};
	$scope.xx = function(){
		console.log($scope.myForm)
	};

	$scope.serialized = function(){
		JSON.stringify($scope.data);
	}


}