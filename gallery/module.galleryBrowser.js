/*global Gallery, angular */
var galleryModule = angular.module("galleryBrowser", ["notifications"]);

galleryModule.factory("$gallery", ["$notify", function ($notify) {
	var settings = {
		onChange: function () {
			$notify.trigger("gallery-changed");
		},
		onLoad: function () {
			$notify.trigger("gallery-loaded");
		}
	};
	return new Gallery(settings);
}]);


galleryModule.controller("galleryBrowser", [
	"$scope", "$api", "$location", "$rootScope", "$timeout", "$routeParams", "$gallery", "$notify",
	function ($scope, $api, $location, $rootScope, $timeout, $routeParams, $gallery, $notify) {

//todo takhle by to mohlo byt
//		$gallery.addEventListener($gallery.events.loaded, function () {	} )

		$notify.addEventListener("gallery-loaded", function () {
			var index = $location.search().galleryIndex
			if (index) {
				$gallery.showByIndex(index);
				$scope.overlayGalleryShow = $gallery.currentIndex > -1;
			}
			$scope.currentItem = $gallery.getCurrent();
		});

		$notify.addEventListener("gallery-changed", function () {
			$scope.overlayGalleryShow = true;
			$scope.currentItem = $gallery.getCurrent();
			$location.search("galleryIndex", $gallery.currentIndex);
		});

		var visible = function () {
			return $scope.overlayGalleryShow;
		};

		$scope.close = function () {
			$scope.overlayGalleryShow = false;
			$location.search("galleryIndex", null);
		};

		$scope.prev = function () {
			$scope.currentItem = $gallery.prev();
			$location.search("galleryIndex", $gallery.currentIndex);
		};

		$scope.next = function () {
			$scope.currentItem = $gallery.next();
			$location.search("galleryIndex", $gallery.currentIndex);
		};


		$scope.$on("global-keydown", function (e, $event) {
			if (!visible()) {
				return;
			}
			var key = $event.keyCode;
			switch (key) {
				case 27:
					$scope.close();
					break;
				case 33:
					$scope.prev();
					break;
				case 34:
					$scope.next();
					break;
			}
		});
	}]);


