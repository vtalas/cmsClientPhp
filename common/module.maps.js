/*global Showdown, angular*/
"use strict";
var moduleMaps = angular.module("maps", []);

moduleMaps.directive("ngcGoogleMap", ['$sce', '$parse', function ($sce, $parse) {

	var defaults = {
		zoom: 18,
		lat: 49.214807,
		lng: 16.570445
	};

	return {
		scope: {
			ngcGoogleMap: "="
		},
		link: function (scope, element, attr) {
			var init = function () {
				var options = angular.extend(defaults, scope.ngcGoogleMap),
					mapOptions = {
						center: new google.maps.LatLng(options.lat, options.lng),
						zoom: options.zoom
					};
				var map = new google.maps.Map(element[0], mapOptions);
				scope.map = map;
			};

			init();
//			google.maps.event.addDomListener(window, 'load', init);
		}
	};


}]);
