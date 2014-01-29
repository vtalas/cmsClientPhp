var gridModule = angular.module("grids", []);


gridModule.directive("ngcAspectRatio", [function () {

	return {
//		template:
//			'<div class="aspect-ratio-box" ng-style="ratioCalculated">' +
//				'<div class="aspect-ratio-content album-image-wrap">' +
//					'<div style="width: 100%;height: 100%; background-color: red">' +
//
//				'</div>' +
//				'</div>' +
//			'</div>',
		templateUrl: "aspectRatio.html",
		transclude: true,
		link: function (scope, element, attr) {

			scope.ratioWidth = Number(attr.w) || 4;
			scope.ratioHeight = Number(attr.h) || 3;

			function getRatioPercent(width, height) {
				return (height / width) * 100;
			}

			scope.$watch("ratioWidth", function (a) {
				scope.ratioCalculated = {
					"padding-top": getRatioPercent(scope.ratioWidth, scope.ratioHeight) + "%"
				};
			});

			scope.$watch("ratioHeight", function () {
				scope.ratioCalculated = {
					"padding-top": getRatioPercent(scope.ratioWidth, scope.ratioHeight) + "%"
				};
			});
		}
	};


}]);
