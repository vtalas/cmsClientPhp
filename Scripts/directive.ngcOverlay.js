function ngcOverlay() {
	return {
		restrict: "E",
		transclude: true,
		templateUrl: "Templates/template.ngcOverlay.html",
		compile: function (x) {
			return function (scope, element, attrs) {
			}
		}

	}
}