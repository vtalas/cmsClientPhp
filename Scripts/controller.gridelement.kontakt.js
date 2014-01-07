var gridelementKontaktCtrl =  ["$scope", "$api", "$routeParams", "$location", "$rootScope", function ($scope, $api, $routeParams, $location) {
	function getResource(key) {
		return resources[key] || "";
	}
	var resources = $scope.gridelement.resources || {};

	$scope.header = getResource("header");
	$scope.subHeader = getResource("subheader");
	$scope.valueA = getResource("valuea");
	$scope.valueB = getResource("valueb");
	$scope.valueC = getResource("valuec");
	$scope.valueD = getResource("valued");
	$scope.valueE = getResource("valuee");
	$scope.valueF = getResource("valuef");

	function getMapFromResource(key) {
		return resources[key] || null;
	}

	$scope.map = getMapFromResource("map");
	console.log($scope.map);

	$scope.hasMap = $scope.map !== null;
	$scope.blockSize = $scope.map ? "grid_12" : "grid_3";


}];