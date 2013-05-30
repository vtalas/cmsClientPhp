function userDataForm($scope, cmsApi, $routeParams) {

	$scope.link = $routeParams.link;

	var parserStatus = function (status) {
		var message;

		switch (status) {
			case 401:
				message = "Pro odeslání formuláře je potřeba se přihásit. ";
				break;
			case 400:
			case 500:
				message = ".";
				break;
			default :
				message = "Vyskytla se neznámá chyba ".status;
		}
		return message;
	};
	console.log($scope);


	$scope.post = function () {
		cmsApi.putUserData({data: $scope.data, key: $scope.key}, function (data) {
			console.log(data);
		}, function (err) {
			$scope.$emit("set-message", parserStatus(err.status));

		});
	};
	$scope.xx = function () {
		console.log($scope.myForm)
	};

	$scope.serialized = function () {
		JSON.stringify($scope.data);
	}


}