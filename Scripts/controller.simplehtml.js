var simplehtml = ["$scope", "$markdown", function ($scope, $markdown) {
	var gridElement = $scope.getGridElement(),
		resources = gridElement.resources || {};

	function getResource(key) {
		return resources[key] || "";
	}
	//console.log("xx",getResource("text"), $markdown.toHtml(getResource("text")));

	$scope.ContentToHtml = function () {
		return $markdown.toHtml(getResource("text"));
	};
}];