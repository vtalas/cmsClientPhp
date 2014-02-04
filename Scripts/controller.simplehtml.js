var simplehtml = ["$scope", "$markdown", function ($scope, $markdown) {
	var gridElement = $scope.getGridElement(),
		resources = gridElement.resources || {};

	function getResource(key) {
		return resources[key] || "";
	}
	$scope.ContentToHtml = function () {
		return $markdown.toHtml(getResource("text"));
	};
}];