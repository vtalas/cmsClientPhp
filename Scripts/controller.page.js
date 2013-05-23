function pageController($scope, cmsApi, $routeParams) {
	var api = new ApiWrapper(cmsApi);

	$scope.link = $routeParams.link;

	api.getPage($scope.link).then(function (data) {
		$scope.page = data;
		console.log(data)
	});


	$scope.post = function(){
		cmsApi.putUserData( {data:{hvahsd:"kjbaskdjas", hjvashd: "kjabsdkjas"}}, function(data) {
			console.log(data);
		})
	} ;

}