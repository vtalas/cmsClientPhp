function loginController($scope, cmsApi, $routeParams, $location) {
	var api = new ApiWrapper(cmsApi);

	cmsApi.getRequestToken(function (data) {
		$scope.RequestToken = data.RequestToken;
	});

//	function getQueryStrings() {
//		var assoc  = {};
//		var decode = function (s) { return decodeURIComponent(s.replace(/\+/g, " ")); };
//		var queryString = location.search.substring(1);
//		var keyValues = queryString.split('&');
//
//		for(var i in keyValues) {
//			var key = keyValues[i].split('=');
//			if (key.length > 1) {
//				assoc[decode(key[0])] = decode(key[1]);
//			}
//		}
//		return assoc;
//	}

	$scope.submit = function () {
		var x = {};
		x.UserName = $scope.UserName;
		x.Password = $scope.Password;
		x.RequestToken = $scope.RequestToken;

		cmsApi.login(x, function (data) {
			window.location.hash = "home"
			console.log(data);
		},
		function(){
			console.log("401");
		});
	}

}